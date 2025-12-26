
import Markdown from 'react-markdown'
import { IoMdLogOut } from "react-icons/io";
import { MdHistory } from "react-icons/md";
import Nav from './Nav';
import { useContext, useState } from 'react';
import UserContext from '../context/userContext';
function Dashboard() {
  const [selected,setSelected]=useState("english")
  const {user}=useContext(UserContext)
  return (
    <div className='w-screen h-screen relative'>
      <Nav/>
      <div className='w-full h-full pt-30 flex flex-col md:flex-row'>
        <div className='md:w-1/2 w-full md:p-15 p-5 flex flex-col gap-10 '>
          <div className='flex md:gap-10 gap-3'>
            <div className='md:w-[280px] w-[200px] h-[100px] bg-blue-950 rounded-lg hover:shadow-2xl text-white flex flex-col md:px-5 md:py-4 p-2'>
              <h1 className='text-2xl'>Welcome ,</h1>
              <h1 className='md:text-[20px] text-[22px] md:pl-12 pl-2'>{user.name}</h1>
            </div>
            <div className='md:w-[280px] w-[200px] h-[100px] bg-blue-950 rounded-lg flex flex-col  text-white md:px-5 md:py-4 p-2 hover:shadow-2xl gap-3'>
              <h1 className='text-2xl'>Previous Report</h1>
              <h1 className='text-[20px] pl-12'>8</h1>
            </div>
          </div>
          <div className='md:w-[95%] w-full h-[300px] flex flex-col p-5 gap-5 bg-gray-300 rounded-lg'>
            <h1 className='text-[25px] text-black'>Report Analyzer</h1>
            <form className='flex flex-col gap-2 md:w-[350px] w-full'>
              <p>Upload your report </p>
              <input type="file" className='bg-gray-200 md:w-[350px] w-full h-10 p-2 px-5 outline-none rounded-md text-[15px] shadow-2xl border-b border-gray-600 cursor-pointer' placeholder='Enter file here' accept='application/pdf' required />
              <p className='text-sm text-end text-red-700'>Supports PDF report only *</p>
              <div className='flex gap-10'>
                <div className='flex gap-4'>
                  <input
                    type="radio"
                    name="choice"
                    value="hindi"
                    checked={selected === "hindi"}
                    onChange={(e) => setSelected(e.target.value)}
                    className='w-4 cursor-pointer' />
                  <label htmlFor="">Hindi</label>
                </div>
                <div className='flex gap-4'>
                  <input 
                    type="radio"
                    name="choice"
                    value="english"
                    checked={selected === "english"}
                    onChange={(e) => setSelected(e.target.value)}
                    className='w-4 cursor-pointer' />
                  <label htmlFor="">Simple English</label>
                </div>
              </div>
            </form>
            <button className='p-2 bg-blue-900 w-50 rounded-lg text-white text-2xl cursor-pointer'>Analyze</button>

          </div>
        </div>
        <div className='md:w-1/2 w-full h-full flex flex-col gap-5 md:p-15 p-5'>
          <div>
            <h1 className='text-center text-2xl'>Analyzed report</h1>
          </div>
          <div className='w-full h-[500px] bg-gray-300 rounded-lg overflow-auto p-3'>
            <div className='reset-tw'>
              <Markdown>Great question—having the right roadmap + support system can save you months of confusion. Below is a complete, trusted ecosystem you can use to build your AI Medical Report Analyzer (or any full-stack project) from scratch to deployment</Markdown>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
