
import CoordinateForm from "./components/CoordinateForm"
import TopSection from "./components/TopSection"
import LeftSection from "./components/LeftSection"
import Map from "./components/Map";

function App() {
  

  return (
    <div className="grid grid-cols-6 gap-4">
      <div className="row-start-3 col-start-2 col-end-6 bg-sky-600 rounded-md drop-shadow p-10">
        <TopSection />
      </div>

      <div className="row-start-4 row-end-6 col-start-2 col-end-3 bg-sky-600 rounded-md drop-shadow p-10">
        <LeftSection />
      </div>
      
      <div className="row-start-4 row-end-6 col-start-3 col-end-5 bg-sky-400 rounded-md drop-shadow p-10">
        <Map />
      </div>

      <div className=" row-start-4 row-end-6 col-start-5 col-end-6 bg-sky-400 rounded-md drop-shadow p-10">
        <CoordinateForm />
      </div>
    </div>
  );

  
}

export default App;