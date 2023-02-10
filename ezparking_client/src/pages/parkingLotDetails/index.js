import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faMap,faPersonWalking,faPersonRunning} from "@fortawesome/free-solid-svg-icons"
import {useSelector} from 'react-redux'
import {useEffect,useState} from 'react'
import axios from 'axios'



function ParkingLotDetails(props) {
  const dropdownSelectionID = useSelector((state) => state.redirect.dropdownSelectID)
  const [result, setResult] = useState([])
  const detailAPI=axios.create({ baseURL :'https://ezparking114514.com:9195/getPath'})
  const walkingSpeed=1.3
  const runningSpeed=3
  let walkingTime=0.0
  let runningTime=0.0
  const getList=async()=>{
  const res=await detailAPI.post('/',{name:dropdownSelectionID})
  setResult(res.data.data)
  }

  useEffect(() => {
      getList()

      }, []);
  const parkingLotSelect = useSelector((state) => state.redirect.destinationSelect)

  const i = result.findIndex(e => e.parkingLotName === parkingLotSelect);
  if (i > -1) {
    let tempWalkTime=(result[i].distance)/walkingSpeed
    let tempRunTime=(result[i].distance)/runningSpeed
    // const minutes = Math.floor(tempTime / 60);
    // const seconds = tempTime - minutes * 60;
    walkingTime=Math.round(tempWalkTime/60 * 10) / 10
    runningTime=Math.round(tempRunTime/60 * 10) / 10
  }

    return (     
    <div className="mb-auto h-10">
    <div className='bg-blue-300 mx-2 my-2 rounded-md '>
        <div className='mx-4 font-bold ... text-lg text-yellow-300'  >Parking at {parkingLotSelect}</div>
    <div className=" flex justify-evenly" >
      <div className=" py-2">
        <div className="text-6xl">
        <FontAwesomeIcon icon={faMap}  color="white"/>
        </div>
        <a href="https://www.google.com/maps/@50.4118672,-104.6100754,15.75z" className="text-bottom font-semibold ... text-base text-white">Direction</a>
      </div>
      <div className=" py-2">
        <div className=" text-center text-6xl">
        <FontAwesomeIcon icon={faPersonWalking} color="white"/>
        </div>
        <div className="text-bottom font-semibold ... text-base text-white">{walkingTime} Mins</div>
      </div>
      <div className=" py-2">
        <div className=" text-center text-6xl">
        <FontAwesomeIcon icon={faPersonRunning} color="white"/>
        </div>
        <div className="text-bottom font-semibold ... text-base text-white">{runningTime} Mins</div>
      </div>
    </div>
    </div>
  </div> );
}

export default ParkingLotDetails;