import ParkingListCard from "../../components/parkingListCard";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import DestinationHeader from "../../components/destinationHeader";

function ParkingLotList() {
  const dropdownSelectionID = useSelector(
    (state) => state.redirect.dropdownSelectID
  );
  const dropdownSelectionName = useSelector(
    (state) => state.redirect.dropdownSelectName
  );
  const [result, setResult] = useState([]);
  const detailAPI = axios.create({
    baseURL: "https://ezparking114514.com:9195/getPath",
  });
  const getList = async () => {
    const res = await detailAPI.post(
      "/",
      { name: dropdownSelectionID },
      { headers: { Authorization: process.env.REACT_APP_API_TOKEN } }
    );
    setResult(res.data.data);
  };
  useEffect(() => {
    getList();
  }, []);
  return (
    <div className="mb-auto overflow-y-auto h-1/1 ...">
      <DestinationHeader destination={dropdownSelectionName} />
      <div className="grid grid-cols-12">
        <div class="bg-gradient-to-b from-sky-400 via-sky-200 to-yellow-200 ... ml-2 my-2 rounded-md flex items-center">
          <div class=" h-5/6 grid grid-cols-1 gap-4 content-between ... ">
            <div className="-rotate-90  font-semibold ... text-base text-rose-500">
              Near
            </div>
            <div className="-rotate-90  font-semibold ... text-base text-rose-400">
              Far
            </div>
          </div>
        </div>
        <div className="col-span-11">
          {result.map((result, index) => {
            let tempAvaSpot = result.parkingLotAmount - result.parkingLotExist;
            return (
              <ParkingListCard
                key={result.parkingLotId}
                parkingLotName={result.parkingLotName}
                avaSpot={tempAvaSpot}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ParkingLotList;
