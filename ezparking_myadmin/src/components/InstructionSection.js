import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHouse, faCircle, faArrowPointer, faSquareParking, faComputerMouse} from "@fortawesome/free-solid-svg-icons"

export default function InstructionSection() {
  return (
    <div className=" h-5/6 bg-[#ffffff] rounded-md drop-shadow p-3 ">  
        <div className=' h-5 mt-2'>
            <div className=' text-2xl text-gray-400 flex justify-evenly'>
                <p>
                    <FontAwesomeIcon icon={faHouse} className="text-[#f57f17]"/> Destination    
                </p>
                <p>
                    <FontAwesomeIcon icon={faCircle} className=" text-green-700" /> Waypoint
                </p>
                <p>
                    <FontAwesomeIcon icon={faSquareParking} className="text-[#3949ab]"/> Parking Lot
                </p>
            </div>
            <div className=' text-2xl text-gray-400 flex justify-evenly'>
                <p >
                    <FontAwesomeIcon icon={faComputerMouse} className=" text-red-200"/> Click to add Waypoint 
                </p>
                <p>
                    <FontAwesomeIcon icon={faArrowPointer} className="text-orange-400"/> Double Click to Connect Waypoint
                </p>
                <p>
                    <FontAwesomeIcon icon={faComputerMouse} className="text-red-600"/> Right Click to stop Connecting Waypoint 
                </p>
            </div>`
        </div>
    </div>
  )
}
