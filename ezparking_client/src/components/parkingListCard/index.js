import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHouse} from "@fortawesome/free-solid-svg-icons"
import {useSelector, useDispatch} from 'react-redux'

import { updateParkingLot } from '../../store/redirectSlice'

function ParkingListCard(props) {
    const dispatch = useDispatch()
    const dropdownSelection = useSelector((state) => state.redirect.dropdownSelectName)
    const re = /\d+/;
    const lotNum=re.exec(props.parkingLotName)[0]

    return (     
    <div className='my-2 rounded-md'>
    <div className='bg-blue-300 mx-2 rounded-md '>
    <div onClick={() => dispatch(updateParkingLot(props.parkingLotName))} className="  rounded-md flex justify-evenly" >
      <div className=" py-1">
        <div className=" text-center text-6xl text-white">
          {lotNum}
        </div>
        <div className="text-bottom font-semibold ... text-base text-white">
          Parking Lot 
        </div>
      </div>
      <div className=" py-1 text-white">
        <div className=" text-center text-6xl">
          {props.avaSpot}
        </div>
        <div className="text-bottom font-semibold ... text-base text-white">
          Avaiable Spot 
        </div>
      </div>
      </div>
    </div>
  </div> );
}

export default ParkingListCard;