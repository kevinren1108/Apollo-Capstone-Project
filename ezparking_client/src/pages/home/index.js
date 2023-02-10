import {useSelector} from 'react-redux'
import Dropdown from '../../components/dropdown';
import ParkingLotList from '../parkingLotList';
import ParkingLotDetails from '../parkingLotDetails';


function Home() {
    const dropdownSelection = useSelector((state) => state.redirect.dropdownSelectName)
    const parkingLotSelect = useSelector((state) => state.redirect.destinationSelect)

    if(dropdownSelection === "Choose Your Destination") // default state
    { 
        return ( 
            <Dropdown/>
        );
     
    }
    else if(dropdownSelection !== "Choose Your Destination" && parkingLotSelect === "" ) // dropdown selected, parking lot not
    {
        return(
            <ParkingLotList />
        )
    }else if(dropdownSelection !== "Choose Your Destination" && parkingLotSelect !== ""){
        return(
            <ParkingLotDetails />
        )
    }
}

export default Home;