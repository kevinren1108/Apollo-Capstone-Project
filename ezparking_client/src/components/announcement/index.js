import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBullhorn } from "@fortawesome/free-solid-svg-icons"

function Announcement() {
    return (
        
        <div className=" h-10 bg-yellow-300 mx-2  rounded-md" >
            <div className="p-2 flex items-center ml-2">
                <FontAwesomeIcon icon={faBullhorn} />
                <div className="ml-2 ">
                    Parking Lot Zone Z Icy Road Condition
                </div>
            </div>
            
        </div>
        
    );
}

export default Announcement;