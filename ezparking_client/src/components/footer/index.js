import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { resetState } from "../../store/redirectSlice";

function PageFooter() {
  const dispatch = useDispatch();
  return (
    <div>
      <div
        onClick={() => dispatch(resetState())}
        className="border-t-[1px] border-t-slate-200 fixed bottom-0 inset-x-0"
      >
        <div className="rounded-md block bg-blue-400 p-2 mx-auto text-center">
          <FontAwesomeIcon
            className="mx-auto text-2xl text-white "
            icon={faHouse}
          />
          <p className="font-semibold ... text-base text-white">Home</p>
        </div>
      </div>
    </div>
  );
}

export default PageFooter;
