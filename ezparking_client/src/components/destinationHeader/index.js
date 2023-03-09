import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { useDispatch} from 'react-redux'
import { resetState } from '../../store/redirectSlice'
function DestinationHeader(props) {
    const dispatch = useDispatch()
  return (
    <div className=" h-10 mx-2 my-2 bg-blue-300 rounded-md  mb-auto">
      <div className="mx-1 my-1 flex">
        <div className="px-3 py-1">
          <FontAwesomeIcon
            className="text-xl mx-3"
            icon={faHouse}
            color="white"
            onClick={() => dispatch(resetState())}
          />
          <span className="font-semibold ... text-lg text-yellow-300">
            To reach {props.destination}
          </span>
        </div>
      </div>
    </div>
  );
}

export default DestinationHeader;
