import React from 'react'
import  ReactDOM  from 'react-dom'
import   Footer  from '../index'
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
    ReactDOM.render(wrapper(<Footer/>), div)
})

it('renders footer correctly', () =>{
    render(wrapper(<Footer />))
})
