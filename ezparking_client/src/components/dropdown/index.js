import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHouse} from "@fortawesome/free-solid-svg-icons"
import {useSelector, useDispatch} from 'react-redux'
import DropdownCard from './DropdownCard'
import {useState,useEffect} from 'react'

export const Dropdown = (props)=> {
  const dropdownSelection = useSelector((state) => state.redirect.dropdownSelectName)
  const dispatch = useDispatch()
  const destAPIURL="https://ezparking114514.com:9195/getAllDestination"
    const [result, setResult] = useState([])
  
    const apidest = async() =>{
        const list=await fetch(destAPIURL)
        list.json().then(json=>{
            setResult(json.data)
        }) 
    }
    
    useEffect(() => {
      apidest()

      }, []);
  return ( 
    <Menu as="div" className="relative inline-block text-left mb-auto h-10">
      <div className='mx-2 my-2 bg-blue-300 rounded-md'>
        <Menu.Button className="inline-flex w-full justify-left border-gray-300  px-4 py-2 text-sm font-medium text-gray-700 shadow-sm ">
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
          <div className="py-1 overflow-y-auto h-72 ...">
            { 
            result.map((dest, index) =>{
              return(
            <DropdownCard name={dest.name}
            id={dest.id}
            key={index}
            />
            )  
          })
          }
          </div>
        </Menu.Items>
        </div>
      </Transition>
    </Menu>
  );
}

export default Dropdown;