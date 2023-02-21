import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Title } from 'react-admin';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import CoordinateForm from "../components/CoordinateForm"
import TopSection from "../components/TopSection"
import Map from "../components/Map";
import { useSelector } from 'react-redux';

import InstructionSection from '../components/InstructionSection';

function Dashboard(){
    let [currentUsedSpot, setCurrentUsedSpot] = useState(0)
    useEffect(() => {
  
        fetch('https://ezparking114514.com:9195/queryCount').then(response => {
          return response.json()
        }).then(res => {
            setCurrentUsedSpot(res.data) 

        }).catch(err => {

        },)
    }, [])    

    let [totalSpot, setTotalSpot] = useState(0)
    useEffect(() => {
  
        fetch('https://ezparking114514.com:9195/getTotalNum').then(response => {
          return response.json()
        }).then(res => {
            setTotalSpot(res.data) 

        }).catch(err => {

        },)
    }, [])  

    const parkingStatus = useSelector((state) => state.parkingStatus);

    return (
        
        <Card>
            <Title title="Overview" />
            <CardContent className=" bg-[#efefef] " >
                
                <div className="grid grid-cols-12 gap-x-6 min-h-screen ">
                    
                    <div className=" row-span-1  col-start-1 col-end-7">
                        <TopSection itemName={"Total Parking Spot"} itemValue={(totalSpot == []) ? 'Loading' : totalSpot}/>
                    </div>
                    <div className=" row-span-1  col-start-7 col-end-13">
                        <TopSection itemName={"In Use"} itemValue={(currentUsedSpot == []) ? 'Loading' : currentUsedSpot}/>
                    </div>

                    <div className=" row-span-1 col-start-1 col-end-13">
                        <InstructionSection />
                    </div>  

                    <div className="row-span-5 col-start-1 col-end-3 bg-[#ffffff] rounded-md drop-shadow p-5">
                        <CoordinateForm />
                    </div>
                    
                    <div className="row-span-5  col-start-3 col-end-13 bg-[#ffffff] rounded-md drop-shadow p-5">
                        <Map />
                    </div>                                 
                </div>
            </CardContent>
        </Card>


    )
    
}
export default Dashboard