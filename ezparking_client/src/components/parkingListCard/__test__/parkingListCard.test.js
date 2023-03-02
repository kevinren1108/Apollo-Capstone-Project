import React from 'react'
import  ReactDOM  from 'react-dom'
import   ParkingListCard  from '../index'
import {render,screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import { Provider } from 'react-redux';
import { store } from '../../../store'

function wrapper(element) {
    return(
      <Provider store={store}>{element}</Provider>
    )
}

it("renders without crashing",()=>{
    const div=document.createElement("div");
    ReactDOM.render(wrapper(<ParkingListCard parkingLotName={'test 1'} avaSpot={31}/>), div)
})

it("if the prop is passed, render the avaSpot", ()=>{
    render(wrapper(<ParkingListCard parkingLotName={'test 1'} avaSpot={31}/>))
    expect(screen.getByText(/31/i)).toBeInTheDocument();
})

it("if the prop is passed, render the parkingLotName", ()=>{
    render(wrapper(<ParkingListCard parkingLotName={'test 2'} avaSpot={31}/>))
    expect(screen.getByText(/2/i)).toBeInTheDocument();
})
