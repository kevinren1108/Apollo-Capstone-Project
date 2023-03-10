import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMap,
  faPersonWalking,
  faPersonRunning,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import DestinationHeader from "../../components/destinationHeader";

function ParkingLotDetails(props) {
  const dropdownSelectionID = useSelector(
    (state) => state.redirect.dropdownSelectID
  );
  const dropdownSelectionName = useSelector(
    (state) => state.redirect.dropdownSelectName
  );
  const [result, setResult] = useState([]);
  const detailAPI = axios.create({
    baseURL: "https://ezparking114514.com:9195/getPath",
  });
  const walkingSpeed = 1.3;
  const runningSpeed = 3;
  let walkingTime = 0.0;
  let runningTime = 0.0;
  let lng = 0.0;
  let lat = 0.0;
  let destURL = "";
  const getList = async () => {
    const res = await detailAPI.post(
      "/",
      { name: dropdownSelectionID },
      { headers: { Authorization: process.env.REACT_APP_API_TOKEN } }
    );
    setResult(res.data.data);
  };

  useEffect(() => {
    getList();
  }, []);
  const parkingLotSelect = useSelector(
    (state) => state.redirect.destinationSelect
  );

  const i = result.findIndex((e) => e.parkingLotName === parkingLotSelect);
  if (i > -1) {
    let tempWalkTime = result[i].distance / walkingSpeed;
    let tempRunTime = result[i].distance / runningSpeed;
    // const minutes = Math.floor(tempTime / 60);
    // const seconds = tempTime - minutes * 60;
    walkingTime = Math.round((tempWalkTime / 60) * 10) / 10;
    runningTime = Math.round((tempRunTime / 60) * 10) / 10;
    lng = result[i].lNG;
    lat = result[i].lAT;
  }
  destURL =
    "https://www.google.com/maps/dir/?api=1&travelmode=driving&layer=traffic&destination=" +
    lat +
    ",%20" +
    lng;
  return (
    <div className="mb-auto">
      <DestinationHeader destination={dropdownSelectionName} />
      <div className="mb-auto h-10">
        <div className="bg-blue-300 mx-2 my-2 rounded-md ">
          <div className="mx-4 font-bold ... text-lg text-yellow-300">
            Parking at {parkingLotSelect}
          </div>
          <div className=" flex justify-evenly">
            <a href={destURL} className=" py-2 ">
              <div className="text-center text-6xl relative">
                <span className="animate-ping absolute top-0 right-0 mr-3 mt-1 rounded-full h-3 w-3 bg-rose-400"></span>
                <span className="absolute top-0 right-0 mr-3 mt-1 rounded-full h-3 w-3 bg-rose-500"></span>

                <FontAwesomeIcon icon={faMap} color="white " />
              </div>
              <div className="text-bottom font-semibold ... text-base text-white">
                Navigate Now
              </div>
            </a>
            <div className=" py-2">
              <div className=" text-center text-6xl">
                <FontAwesomeIcon icon={faPersonWalking} color="white" />
              </div>
              <div className="text-bottom font-semibold ... text-base text-white">
                {walkingTime} Mins
              </div>
            </div>
            <div className=" py-2">
              <div className=" text-center text-6xl">
                <FontAwesomeIcon icon={faPersonRunning} color="white" />
              </div>
              <div className="text-bottom font-semibold ... text-base text-white">
                {runningTime} Mins
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ParkingLotDetails;
