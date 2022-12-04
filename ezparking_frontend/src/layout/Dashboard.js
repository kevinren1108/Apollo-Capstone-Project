import * as React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Title } from 'react-admin';

import CoordinateForm from "../components/CoordinateForm"
import TopSection from "../components/TopSection"
import Map from "../components/Map";


function Dashboard(){
    return (
        <Card>
            <Title title="Overview" />
            <CardContent className=" bg-[#efefef] " >
                <div className=" text-4xl px-3 ">
                    Map
                </div>
                <div className="grid grid-cols-12 gap-6 min-h-screen ">
                    <div className="row-start-2 row-end-3 col-start-1 col-end-4">
                        <TopSection itemName={"vehicles"} itemValue={"60"}/>
                    </div>
                    <div className="row-start-2 row-end-3 col-start-4 col-end-7">
                        <TopSection itemName={"Parking Lots"} itemValue={"16"}/>
                    </div>
                    <div className="row-start-2 row-end-3 col-start-7 col-end-10">
                        <TopSection itemName={"Total Parking Spot"} itemValue={"241"}/>
                    </div>
                    <div className="row-start-2 row-end-3 col-start-10 col-end-13">
                        <TopSection itemName={"In Use"} itemValue={"60"}/>
                    </div>

                    <div className="row-start-3 row-end-6 col-start-1 col-end-5 bg-[#ffffff] rounded-md drop-shadow p-5">
                        <CoordinateForm />
                    </div>
                    
                    <div className="row-start-3 row-end-6 col-start-5 col-end-13 bg-[#ffffff] rounded-md drop-shadow p-5">
                        <Map />
                    </div>          
                    
                </div>

            </CardContent>
        </Card>


    )
    
}
export default Dashboard