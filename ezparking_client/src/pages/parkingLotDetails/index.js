import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faMap,faPersonWalking,faPersonRunning} from "@fortawesome/free-solid-svg-icons"

function ParkingLotDetails() {
    return (     
    <div className="mb-auto h-10">
    <div className='bg-blue-300 mx-2 my-2 rounded-md '>
        <div className='mx-10 font-bold ... text-lg text-yellow-300'  >Parking at Lot 10</div>
    <div className=" flex justify-evenly" >
      <div className=" py-2">
        <div className="text-6xl">
        <FontAwesomeIcon icon={faMap}  color="white"/>
        </div>
        <div className="text-bottom font-semibold ... text-base text-white">Direction</div>
      </div>
      <div className=" py-2">
        <div className=" text-center text-6xl">
        <FontAwesomeIcon icon={faPersonWalking} color="white"/>
        </div>
        <div className="text-bottom font-semibold ... text-base text-white">4.2 Mins</div>
      </div>
      <div className=" py-2">
        <div className=" text-center text-6xl">
        <FontAwesomeIcon icon={faPersonRunning} color="white"/>
        </div>
        <div className="text-bottom font-semibold ... text-base text-white">2.30 Mins</div>
      </div>
    </div>
    </div>
  </div> );
}

export default ParkingLotDetails;