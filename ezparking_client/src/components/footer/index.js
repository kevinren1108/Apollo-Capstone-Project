import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCar, faP, faGear, faPencilAlt } from "@fortawesome/free-solid-svg-icons"
import {useSelector, useDispatch} from 'react-redux'
import { resetState } from '../../store/redirectSlice'

function PageFooter() {
    const dispatch = useDispatch()
    return (
        <div className="mx-6 mb-6 rounded-3xl flex bg-blue-300 text-xs px-5 py-4 justify-evenly">
            <div className="grid">

                <FontAwesomeIcon className= "mx-auto text-4xl text-white" icon={faP} />
                <div className="text-bottom text-sm text-white">Parking</div>
            </div>

            <div onClick={() => dispatch(resetState())} className="relative" >
                <div className=" bg-blue-500 p-5 rounded-full absolute left-1/2 transform -translate-x-1/2 -translate-y-3/4  mx-auto text-center ">
                    <FontAwesomeIcon className= "mx-auto text-4xl text-white " icon={faCar} />
                </div>
                <div className=" mt-5">
                    <div className="text-bottom text-sm text-white">Recommend Now</div>
                </div>
            </div>

            <div className="grid" >
                <FontAwesomeIcon className= "mx-auto text-4xl text-white" icon={faGear} />
                <div className="text-bottom text-sm text-white">Setting</div>
            </div>
        </div> 
    );
}

export default PageFooter;