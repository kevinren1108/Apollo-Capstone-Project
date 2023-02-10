import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHouse} from "@fortawesome/free-solid-svg-icons"

function destinationHeader(props) {
    return (

        <div className=" h-10 mx-2 my-2 bg-blue-300 rounded-md  mb-auto" >
            <div className="p-2 flex">
                <div className="">
                <FontAwesomeIcon className= "text-xl mx-3" icon={faHouse} color="white"/>
                <span className=' font-bold ... text-lg text-yellow-300'  >To reach {props.destination}</span>
                </div>
            </div>
            
        </div>
        
    );
}

export default destinationHeader;