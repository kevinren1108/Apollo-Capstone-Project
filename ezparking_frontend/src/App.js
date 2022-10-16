
import { GoogleMap, useLoadScript } from "@react-google-maps/api"

function App() {
  const MAP_API = process.env.REACT_APP_API_KEY
  const { isLoaded } = useLoadScript({googleMapsApiKey: MAP_API})


  if (!isLoaded){
    return (
      <div className="bg-red-400 rounded-md drop-shadow-sm p-5 m-5">
        Loading Google map
      </div>
    )
  }

  return (
    <div className="grid grid-cols-6 gap-4">
      
      <div className="row-start-3 col-start-2 col-end-6 bg-sky-600 rounded-md drop-shadow p-10">
        <div className="text-3xl text-white">
          Welcome 
        </div>
        <div className="text-2xl text-white">
          EZparking frontend demo
        </div>
        <div className="text-sm text-right text-white">
          Team Appllo Present
        </div>
      </div>

      <div className="row-start-4 row-end-6 col-start-2 col-end-3 bg-sky-600 rounded-md drop-shadow p-10">
        <ul className=" list-disc text-xl text-white" >
          <li className=" px-5 pd-2">
            The main purpose of making this front-end page is to 
            verify the feasibility in our project
          </li>
          <li className=" px-5 pt-10">
            The result is positive
          </li>
          <li className=" pl-10">
            I can embed the map in the React
          </li>
          <li className=" pl-10">
            I can get the coordinates of the mouse click location.
          </li>
          
        </ul>
      </div>

      <div className="row-start-4 row-end-6 col-start-3 col-end-5 bg-sky-400 rounded-md drop-shadow p-10">
        <Map />
      </div>

      <div className=" row-start-4 row-end-6 col-start-5 col-end-6 bg-sky-400 rounded-md drop-shadow p-10">
        <label className=" text-3xl text-white ">
          Coordinates
        </label>
        <table className=" table-fixed border-collapse border border-black text-white mt-4">
          <thead>
            <tr>
              <th className=" w-1/3 border border-black ">Clicks</th>
              <th className=" w-1/3 border border-black ">Lng</th>
              <th className=" w-1/3 border border-black ">Lat</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-black ">1</td>
              <td className="border border-black">50.4181</td>
              <td className="border border-black ">-104.5888</td>
            </tr>
            
          </tbody>
        </table>

      </div>


    </div>
  );

  
}

export default App;

function handleClick(e) {
  console.log(e.latLng.lat())
  console.log(e.latLng.lng())
}

function Map(){
  return (
    <GoogleMap 
      zoom={16} 
      center={{lat: 50.417884, lng:-104.588749}}
      mapContainerClassName="h-96"
      onClick={ e => {
        handleClick(e)
      }}
    >
    </GoogleMap>
  );
}