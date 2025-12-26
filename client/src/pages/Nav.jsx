import React, { useContext, useState } from 'react'
import profile from '../assets/profile.jpg'
import logo from '../assets/web_logo.png'
import { MdHistory} from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import UserContext from '../context/userContext';

function Nav() {
    const [profileClick, setProfileClick] = useState(false)
    const {user}=useContext(UserContext)
  return (
      <div className='w-full h-25 bg-blue-950 fixed z-10 flex justify-between items-center md:pl-[100px] md:pr-[130px] pr-3 pl-2'>
          <div className='md:w-28 md:h-22 w-22 h-18 overflow-hidden bg-cover cursor-pointer'>
              <img src={logo} className='w-full h-full' alt="" />
          </div>
          <div className='flex justify-center items-center text-white text-[20px] gap-10 '>
              <p className='cursor-pointer md:flex hidden hover:underline'>Previous report</p>
              <div className='w-15 h-15 rounded-full bg-white overflow-hidden bg-cover cursor-pointer relative' onClick={() => setProfileClick(prev => !prev)}>
                  <img src={profile|| user.image} alt="" className='w-full h-full' />
              </div>
          </div>
          {profileClick && <div className='bg-gray-300 md:w-27 z-15 md:h-22 w-30 h-25 absolute md:right-35 md:top-21 right-2 top-20 rounded-lg flex flex-col justify-center items-center gap-2 hover:shadow-2xl border-gray-500 hover:border-b cursor-pointer'>
              <div className='flex gap-2 justify-center items-center'>
                  <p className='text-[20px]'>Previous </p><MdHistory className='w-5 h-5' />
              </div>
              <div className='w-full h-[0.5px] bg-black'></div>
              <div className='flex gap-2 justify-center items-center'>
                  <p className='text-[20px]'>Log Out </p><IoMdLogOut className='w-5 h-5' />
              </div>

          </div>}
      </div>
  )
}

export default Nav
