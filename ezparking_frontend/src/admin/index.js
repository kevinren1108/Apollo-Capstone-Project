import { Admin, Resource, ListGuesser, DashboardMenuItem } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import authProvider from './authProvider'
import Login from "../layout/Login.tsx";
import Dashboard from "../layout/Dashboard";
import MyLayout from "../layout/MyLayout";

const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");

const App = () => (
  <Admin 
    authProvider={authProvider}  
    dataProvider={dataProvider}
    loginPage={Login}
    dashboard={Dashboard}
    layout={MyLayout}
    requireAuth
  >
    <Resource name="posts" list={ListGuesser} />
  </Admin>
);

export default App;