import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHouse} from "@fortawesome/free-solid-svg-icons"
import {useSelector, useDispatch} from 'react-redux'

import { updateDropdown } from '../../store/redirectSlice'

function Dropdown() {
  const dropdownSelection = useSelector((state) => state.redirect.dropdownSelect)
  const dispatch = useDispatch()

  return ( 
    <Menu as="div" className="relative inline-block text-left mb-auto h-10">
      <div className='mx-2 my-2 bg-blue-300 rounded-md'>
        <Menu.Button className="inline-flex w-full justify-left  border border-gray-300  px-4 py-2 text-sm font-medium text-gray-700 shadow-sm ">
        <FontAwesomeIcon className= "text-xl mx-3" icon={faHouse} color="white"/>
          <div className='font-semibold ... text-base text-white'>
          {dropdownSelection}
          </div>
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" color="white"/>
        </Menu.Button>
      </div>
      
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <div className='mx-2 my-2 bg-blue-300 rounded-md'>
        <Menu.Items className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-blue-300 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
                <div
                  className='bg-blue-300 text-white hover:bg-blue-500 block px-4 py-2 text-base font-semibold ...'
                  onClick={() => dispatch(updateDropdown("CL Building"))}
                >
                  CL Building
                </div>
                    
            </Menu.Item>
            <Menu.Item>
              <div
                  className='bg-blue-300 text-white hover:bg-blue-500 block px-4 py-2 text-base font-semibold ...'
                  onClick={() => dispatch(updateDropdown("ED Building"))}
                >
                  ED Building
              </div>
              
            </Menu.Item>
            <Menu.Item>

                <div
                  className='bg-blue-300 text-white hover:bg-blue-500 block px-4 py-2 text-base font-semibold ...'
                  onClick={() => dispatch(updateDropdown("CW Building"))}
                >
                  CW Building
                </div>
   
            </Menu.Item>
          </div>
        </Menu.Items>
        </div>
      </Transition>
    </Menu>
  );
}

export default Dropdown;