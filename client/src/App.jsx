import { Navigate, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import Previous from "./pages/Previous"
import { useContext } from "react"
import UserContext from "./context/userContext"
import {ToastContainer} from 'react-toastify'

function App() {
  const {user}=useContext(UserContext)
  return (
    <>
      <Routes>
        <Route path="/" element={user ?<Navigate to='/dashboard'/>:<Home />} />
        <Route path="/dashboard" element={user ?<Dashboard/> : <Navigate to='/'/>}/>
        <Route path="/previous" element={<Previous/>}/>
      </Routes>
      <ToastContainer/>
    </>
  )
}

export default App
