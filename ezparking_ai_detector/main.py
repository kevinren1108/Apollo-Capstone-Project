import numpy as np
import tracker
from detector import Detector
import cv2
import urllib.request
from multiprocessing import Process, Queue
import os
import time
import threading
import sys

def request_task_inc(parkinglotID):
    print("inc start")
    startTime = time.perf_counter()
    urllib.request.urlopen('https://ezparking114514.com:9195/countUp?parkingLot=' + parkinglotID)
    endTime = time.perf_counter()
    print("inc end, time: ", endTime-startTime)

def request_task_dec(parkinglotID):
    print("dec start")
    startTime = time.perf_counter()
    urllib.request.urlopen('https://ezparking114514.com:9195/countDown?parkingLot=' + parkinglotID)
    endTime = time.perf_counter()
    print("inc end, time: ", endTime-startTime)

def inc(parkinglotID):
    threading.Thread(target=request_task_inc, args=(parkinglotID, )).start()

def dec(parkinglotID):
    threading.Thread(target=request_task_dec, args=(parkinglotID, )).start()

def detection(incQ: Queue, decQ: Queue)->None:
    mask_image_temp = np.zeros((1080, 1920), dtype=np.uint8)
    list_pts_blue = [[204, 305], [227, 431], [755, 522], [1101, 522], [1900, 395], [1902, 289], [1125, 437], [704, 437],
                     [299, 375], [267, 289]]
    #list_pts_blue = [[204, 305], [227, 431], [605, 522], [1101, 464], [1900, 601], [1902, 495], [1125, 379], [604, 437],
                     #[299, 375], [267, 289]]
    ndarray_pts_blue = np.array(list_pts_blue, np.int32)
    polygon_blue_value_1 = cv2.fillPoly(mask_image_temp, [ndarray_pts_blue], color=1)
    polygon_blue_value_1 = polygon_blue_value_1[:, :, np.newaxis]
    mask_image_temp = np.zeros((1080, 1920), dtype=np.uint8)
    list_pts_yellow = [[190, 308], [215, 460], [730, 554], [1107, 540], [1898, 438], [1893, 495], [1150, 608],
                       [675, 620], [153, 525], [115, 331]]
    #list_pts_yellow = [[181, 305], [207, 442], [603, 544], [1107, 485], [1898, 625], [1893, 701], [1101, 568],
                       #[594, 637], [118, 483], [109, 303]]
    ndarray_pts_yellow = np.array(list_pts_yellow, np.int32)
    polygon_yellow_value_2 = cv2.fillPoly(mask_image_temp, [ndarray_pts_yellow], color=2)
    polygon_yellow_value_2 = polygon_yellow_value_2[:, :, np.newaxis]
    polygon_mask_blue_and_yellow = polygon_blue_value_1 + polygon_yellow_value_2
    polygon_mask_blue_and_yellow = cv2.resize(polygon_mask_blue_and_yellow, (960, 540))
    blue_color_plate = [255, 0, 0]
    blue_image = np.array(polygon_blue_value_1 * blue_color_plate, np.uint8)
    yellow_color_plate = [0, 255, 255]
    yellow_image = np.array(polygon_yellow_value_2 * yellow_color_plate, np.uint8)
    color_polygons_image = blue_image + yellow_image
    color_polygons_image = cv2.resize(color_polygons_image, (960, 540))
    list_overlapping_blue_polygon = []
    list_overlapping_yellow_polygon = []
    down_count = 0
    up_count = 0
    font_draw_number = cv2.FONT_HERSHEY_SIMPLEX
    draw_text_postion = (int(960 * 0.01), int(540 * 0.05))
    detector = Detector()

    capture = cv2.VideoCapture('./video/test.mp4')

    while True:
        _, im = capture.read()
        if im is None:
            break
        im = cv2.resize(im, (960, 540))
        list_bboxs = []
        bboxes = detector.detect(im)
        if len(bboxes) > 0:
            list_bboxs = tracker.update(bboxes, im)
            output_image_frame = tracker.draw_bboxes(im, list_bboxs, line_thickness=None)
            pass
        else:
            output_image_frame = im
        pass
        output_image_frame = cv2.add(output_image_frame, color_polygons_image)
        if len(list_bboxs) > 0:
            for item_bbox in list_bboxs:
                x1, y1, x2, y2, label, track_id = item_bbox
                y1_offset = int(y1 + ((y2 - y1) * 0.6))
                y = y1_offset
                x = x1
                if polygon_mask_blue_and_yellow[y, x] == 1:
                    if track_id not in list_overlapping_blue_polygon:
                        list_overlapping_blue_polygon.append(track_id)
                    pass
                    if track_id in list_overlapping_yellow_polygon:
                        decQ.put(1)
                       
                        print(f'Type: {label} | id: {track_id} | going up | going up total: {up_count} | all going up : {list_overlapping_yellow_polygon}')
                        list_overlapping_yellow_polygon.remove(track_id)
                        pass
                    else:
                        pass

                elif polygon_mask_blue_and_yellow[y, x] == 2:
                    if track_id not in list_overlapping_yellow_polygon:
                        list_overlapping_yellow_polygon.append(track_id)
                    pass
                    if track_id in list_overlapping_blue_polygon:
                        incQ.put(1)
                                         
                        print(f'Type: {label} | id: {track_id} | going down | going down total: {down_count} | all going down : {list_overlapping_blue_polygon}')
                        list_overlapping_blue_polygon.remove(track_id)
                        pass
                    else:
                        pass
                    pass
                else:
                    pass
                pass
            pass

            list_overlapping_all = list_overlapping_yellow_polygon + list_overlapping_blue_polygon
            for id1 in list_overlapping_all:
                is_found = False
                for _, _, _, _, _, bbox_id in list_bboxs:
                    if bbox_id == id1:
                        is_found = True
                        break
                    pass
                pass

                if not is_found:
                    if id1 in list_overlapping_yellow_polygon:
                        list_overlapping_yellow_polygon.remove(id1)
                    pass
                    if id1 in list_overlapping_blue_polygon:
                        list_overlapping_blue_polygon.remove(id1)
                    pass
                pass
            list_overlapping_all.clear()
            pass
            list_bboxs.clear()

            pass
        else:
            list_overlapping_blue_polygon.clear()
            list_overlapping_yellow_polygon.clear()
            pass
        pass

#        text_draw = 'DOWN: ' + str(down_count) + \
#                    ' , UP: ' + str(up_count)
#        output_image_frame = cv2.putText(img=output_image_frame, text=text_draw,
#                                         org=draw_text_postion,
#                                        fontFace=font_draw_number,
#                                         fontScale=1, color=(255, 255, 255), thickness=2)

        cv2.imshow('demo', output_image_frame)
        cv2.waitKey(1)
        pass
    pass

    capture.release()
    cv2.destroyAllWindows()

def worker(incQ: Queue, decQ: Queue, parkinglotID)->None:
    while True:
        if not incQ.empty():
            inc(parkinglotID)
            incQ.get()
        if not decQ.empty():
            dec(parkinglotID)
            decQ.get()
        time.sleep(2)

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("[ERROR] Not enough arguments, please call with parking lot id")
        sys.exit(0)
    else:
        parkinglotID = sys.argv[1]

    incQ : Queue = Queue()
    decQ : Queue = Queue()

    detectionProcess = Process(target=detection, args=(incQ, decQ, ))
    workerProcess = Process(target=worker, args=(incQ, decQ, parkinglotID, ))

    detectionProcess.start()
    workerProcess.start()
