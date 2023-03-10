import { Menu} from '@headlessui/react'
import {useDispatch} from 'react-redux'
import { updateDropdown } from '../../store/redirectSlice'

export const DropdownCard = (props)=> {
  const dispatch = useDispatch()

  return ( 
            <Menu.Item>
                <div
                  className='bg-blue-300 border-b-2 text-white hover:bg-blue-500 block px-4 py-2 text-base font-semibold ...'
                  onClick={() => dispatch(updateDropdown({name : props.name,id:props.id}) )}
                >
                  {props.name}
                </div>  
            </Menu.Item>
  );
}

export default DropdownCard;