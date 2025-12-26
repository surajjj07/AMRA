import React, { useContext, useState } from 'react'
import login_pic from '../assets/login_pic.png'
import axios from 'axios'
import UserContext from '../context/userContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


function Home() {
  const [login, setLogin] = useState(false)
  const [signupName, setSignupName] = useState("")
  const [signupEmail,setSignupEmail]=useState("")
  const [signupPassword,setSignupPassword]=useState("")
  const [loginEmail,setLoginEmail]=useState("")
  const [loginPassword, setLOginPassword] = useState("")
  const { setUser } = useContext(UserContext)
  const navigate=useNavigate()


  const SingUp = async (e) => {
    e.preventDefault()
    try {
      const {data} = await axios.post('http://localhost:8000/user/signup', { name: signupName, email: signupEmail, password: signupPassword },{withCredentials:true});
      setUser(data.user)
      navigate('/dashboard');
      setSignupName("")
      setSignupEmail("")
      setSignupPassword("")
      toast.success("Signup Successful", {
        position: "top-right",
        autoClose: 3000,
        draggable: true,
        theme: "colored"
      });
      
    } catch (error) {
      console.log("Signup failed...",error)
    }
  }

  const LogIn = async (e) => {
    e.preventDefault()
    try {
      const {data} = await axios.post('http://localhost:8000/user/login', { email: loginEmail, password: loginPassword },{withCredentials:true});
      console.log(data.user)
      setUser(data.user)
      navigate('/dashboard');
      setLoginEmail("")
      setLOginPassword("")
      toast.success("Login Successful", {
        position: "top-right",
        autoClose: 3000,
        draggable: true,
        theme: "colored"
      });
    } catch (error) {
      toast.error("Something wrong..", {
        position: "top-right",
        autoClose: 3000,
        draggable: true,
        theme: "colored"
      });
    }
  }

  return (
    <div className='w-screen h-screen bg-gradient-to-r from-blue-900 to-blue-900 flex justify-center items-center transition-transform duration-500 ease-in-out'>
      {
        !login &&
        <div className='w-[900px] h-[500px] flex justify-center items-center'>
          <img src={login_pic} alt="" className=' border rounded-l-full shadow-2xl w-[60%] h-full hidden md:flex' />
          <div className='bg-blue-950 text-white rounded-l-lg md:rounded-l-none rounded-r-lg flex flex-col items-center p-5 h-full md:w-[40%] w-[80%] gap-7'>
              <h2 className='text-2xl font-bold'>SIGN UP <span className='text-[15px]'>in AMRA</span></h2>
              <form onSubmit={SingUp} className='flex flex-col w-full gap-7 text-[18px] items-center'>
              <div className='flex flex-col gap-2 w-full'>
                <label htmlFor="" className='text-[23px]'>Name : </label>
                  <input
                    type="text"
                    placeholder='Enter your name here'
                    name='name'
                    value={signupName}
                    onChange={(e)=>{setSignupName(e.target.value)}}
                    className='outline-none text-gray-200 bg-gray-700 pl-2 rounded-lg p-1' />
              </div>
              <div className='flex flex-col gap-2 w-full'>
                <label className='text-[23px]'>Email : </label>
                  <input
                    type="text"
                    placeholder='Enter your email here'
                    name='email'
                    value={signupEmail}
                    onChange={(e)=>{setSignupEmail(e.target.value)}}
                    className='outline-none text-gray-200 bg-gray-700 pl-2 rounded-lg p-1' />
              </div>
              <div className='flex flex-col gap-2 w-full'>
                <label htmlFor="" className='text-[23px]'>Password : </label>
                  <input
                    type="text"
                    placeholder='Enter your password'
                    name='password'
                    value={signupPassword}
                    onChange={(e)=>{setSignupPassword(e.target.value)}}
                    className='outline-none text-gray-200 bg-gray-700 pl-2 rounded-lg p-1' />
              </div>
              <button type='submit' className='p-[5px] bg-blue-700 w-[100px] rounded-full text-[22px] cursor-pointer'>Sign up</button>
            </form>
            <p>Already have an account <span className='underline text-blue-500 cursor-pointer' onClick={() => setLogin(prev => !prev)} >Log In</span></p>
          </div>
        </div>
      }

      {
        login &&
        <div className=' w-[900px] h-[500px] flex justify-center items-center'>
            <img src={login_pic} alt="" className=' border rounded-l-full shadow-2xl w-[60%] h-full hidden md:flex' />
            <div className='bg-blue-950 text-white  rounded-l-lg md:rounded-l-none rounded-r-lg flex flex-col items-center p-5 h-full w-[80%] md:w-[40%] gap-7'>
            <h2 className='text-2xl font-bold'>LOG IN <span className='text-[15px]'>in AMRA</span></h2>
              <form onSubmit={LogIn} className='flex flex-col w-full gap-7 text-[18px] items-center'>

              <div className='flex flex-col gap-2 w-full'>
                <label htmlFor="" className='text-[23px]'>Email : </label>
                  <input
                    type="text"
                    placeholder='Enter your email here'
                    name='email'
                    value={loginEmail}
                    onChange={(e)=>{setLoginEmail(e.target.value)}}
                    className='outline-none text-gray-200 bg-gray-700 pl-2 rounded-lg p-1' />
              </div>
              <div className='flex flex-col gap-2 w-full'>
                <label htmlFor="" className='text-[23px]'>Password : </label>
                  <input
                    type="text"
                    placeholder='Enter your password'
                    name='password'
                    value={loginPassword}
                    onChange={(e)=>{setLOginPassword(e.target.value)}}
                    className='outline-none text-gray-200 bg-gray-700 pl-2 rounded-lg p-1' />
              </div>
              <div className=' w-full flex justify-end underline text-blue-500 text-[17px] '><button className='cursor-pointer'>Forget password ?</button></div>
              <button type='submit' className='p-[5px] bg-blue-700 w-[100px] rounded-full text-[22px] cursor-pointer'>Log in</button>
            </form>
            <p>Do not have any account  <span className='underline text-blue-500 cursor-pointer' onClick={() => setLogin(prev => !prev)}>Sign up</span></p>
          </div>
        </div>
      }
    </div>
  )
}

export default Home











