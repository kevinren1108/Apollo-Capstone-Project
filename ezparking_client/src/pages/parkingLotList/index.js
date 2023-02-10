import ParkingListCard from '../../components/parkingListCard';
import {useSelector} from 'react-redux'
import {useEffect,useState} from 'react'
import axios from 'axios'

function ParkingLotList() {
    const dropdownSelectionID = useSelector((state) => state.redirect.dropdownSelectID)
    const [result, setResult] = useState([])
    const detailAPI=axios.create({ baseURL :'https://ezparking114514.com:9195/getPath'})

    const getList=async()=>{
    const res=await detailAPI.post('/',{name:dropdownSelectionID})
    setResult(res.data.data)
    }

    useEffect(() => {
        getList()
  
        }, []);
    return ( 
    <div className="mb-auto overflow-y-auto h-3/5 ...">
        {
        result.map((result, index) =>{
            return(
        <ParkingListCard key={result.parkingLotId}
        parkingLotName={result.parkingLotName}
        avaSpot={result.parkingLotExist}
        />  
        )  
        })
        }
    </div>
    );
}

export default ParkingLotList;