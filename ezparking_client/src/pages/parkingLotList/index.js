import ParkingListCard from '../../components/parkingListCard';
import {useSelector} from 'react-redux'
import {useEffect,useState} from 'react'
import axios from 'axios'
import DestinationHeader from '../../components/destinationHeader';

function ParkingLotList() {
    const dropdownSelectionID = useSelector((state) => state.redirect.dropdownSelectID)
    const dropdownSelectionName = useSelector((state) => state.redirect.dropdownSelectName)
    const [result, setResult] = useState([])
    const detailAPI=axios.create({ baseURL :'https://ezparking114514.com:9195/getPath'})
    const getList=async()=>{
    const res=await detailAPI.post('/',{name:dropdownSelectionID})
    setResult(res.data.data)
    }
    useEffect(() => {getList()});
    return ( 
    <div className="mb-auto overflow-y-auto h-screen">
        <DestinationHeader destination={dropdownSelectionName}/>
        {
        result.map((result, index) =>{
            let tempAvaSpot=result.parkingLotAmount - result.parkingLotExist
            return(
        <ParkingListCard key={result.parkingLotId}
        parkingLotName={result.parkingLotName}
        avaSpot={tempAvaSpot}
        />  
        )  
        })
        }
    </div>
    );
}

export default ParkingLotList;