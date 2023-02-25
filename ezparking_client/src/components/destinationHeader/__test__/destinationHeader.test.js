import React from 'react'
import  ReactDOM  from 'react-dom'
import DestinationHeader from './../index'
import {render,screen} from '@testing-library/react'
import '@testing-library/jest-dom'

it("renders without crashing",()=>{
    const div=document.createElement("div");
    ReactDOM.render(<DestinationHeader/>, div)
})

it("renders destinationHeader correctly", ()=>{
    render(<DestinationHeader/>)
})

it("if the prop is passed, render the destination", ()=>{
    render(<DestinationHeader destination='test building'/>)
    expect(screen.getByText(/to reach test building/i)).toBeInTheDocument();
})


