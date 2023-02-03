import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHouse} from "@fortawesome/free-solid-svg-icons"
import {useSelector, useDispatch} from 'react-redux'

import { updateParkingLot } from '../../store/redirectSlice'

function ParkingListCard() {
    const dispatch = useDispatch()
    const dropdownSelection = useSelector((state) => state.redirect.dropdownSelect)
    return (     
    <div className="mb-auto h-10">
    <div className='bg-blue-300 mx-2 my-2 rounded-md '>
        <div className='mx-10 font-bold ... text-lg text-yellow-300'  >To reach {dropdownSelection}</div>
    <div onClick={() => dispatch(updateParkingLot("Zone Z"))} className="  rounded-md flex justify-evenly" >
      <div className=" py-2">
        <div className=" text-center text-6xl text-white">
          10
        </div>
        <div className="text-bottom font-semibold ... text-base text-white">
          Parking Lot 
        </div>
      </div>
      <div className=" py-2 text-white">
        <div className=" text-center text-6xl">
          3
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