import { useEffect, useState } from "react"
import UserContext from "./userContext"
import axios from 'axios'


function UserContextProvider({ children }) {
  const [user, setUser] = useState(null)

  const getUser = async () => {
    try {
      const {data} = await axios.get("http://localhost:8000/auth/getuser",{withCredentials:true});
      setUser(data.user)
      console.log(data.user)
      console.log("Authentication successfull...")
    } catch (error) {
      console.log("authentication failed...",error)
    }
  }

  useEffect(() => {
    getUser()
  },[])

  const data = { user, setUser }
  return (
      <UserContext.Provider value={data}>
          {children}
     </UserContext.Provider>
  )
}

export default UserContextProvider
