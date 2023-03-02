import React from 'react'
import  ReactDOM  from 'react-dom'
import   DropdownCard  from '../DropdownCard'
import {render,screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import { Provider } from 'react-redux';
import { store } from '../../../store'
import { Menu} from '@headlessui/react'




function wrapper(element) {
    return(
      <Provider store={store}><Menu><Menu.Item>{element}</Menu.Item></Menu></Provider>
    )
}

it("renders without crashing",()=>{
    const div=document.createElement("div");
    ReactDOM.render(wrapper(<DropdownCard/>), div)
})

it('renders dropdownCard correctly', () =>{
    render(wrapper(<DropdownCard />))
})

it("if the prop is passed, render the name and id", ()=>{
    render(wrapper(<DropdownCard name={'test building'}
        id={'2'}/>))
    expect(screen.getByRole('menuitem', {
        name: /test building/i
      })).toBeInTheDocument();
})
