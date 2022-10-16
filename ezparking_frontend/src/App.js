import CoordinateForm from "./components/CoordinateForm"
import TopSection from "./components/TopSection"
import LeftSection from "./components/LeftSection"
import Map from "./components/Map";
import nodejsLogo from "./svg/nodejs.svg";
import reactLogo from "./svg/react.svg";
import reduxLogo from "./svg/redux.svg";
import googleCloud from "./svg/googleCloud.svg";
import googleMap from "./svg/googleMap.svg";
function App() {
  

  return (
    
    <div className="bg-[#39393b] grid grid-cols-6 gap-4 min-h-screen ">
      <div className="row-start-3 col-start-2 col-end-6 bg-[#055c8b] rounded-md drop-shadow p-10">
        <TopSection />
      </div>

      <div className="row-start-4 row-end-6 col-start-2 col-end-3 bg-[#055c8b] rounded-md drop-shadow p-10">
        <LeftSection />
      </div>
      
      <div className="row-start-4 row-end-6 col-start-3 col-end-5 bg-[#055c8b] rounded-md drop-shadow p-10">
        <Map />
      </div>

      <div className=" row-start-4 row-end-6 col-start-5 col-end-6 bg-[#055c8b] rounded-md drop-shadow p-10">
        <CoordinateForm />
      </div>

      <div className="row-start-6 row-end-7 col-start-2 col-end-6 bg-[#055c8b] rounded-md drop-shadow p-10">
        <img className="h-20 inline pr-5" src={nodejsLogo} alt="nodejs" />
        <img className="h-20 inline pr-5" src={reactLogo} alt="react" />
        <img className="h-20 inline pr-5" src={reduxLogo} alt="redux" />
        <img className="h-20 inline pr-5" src={googleCloud} alt="gcloud" />
        <img className="h-20 inline pr-5" src={googleMap} alt="gmap" />
      </div>

      <div className="row-start-7 row-span-5">

      </div>

    </div>
  );

  
}

export default App;

