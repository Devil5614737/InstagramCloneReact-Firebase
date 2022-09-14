import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext'
import { PostContextProvider} from './context/PostContext'
import { auth } from './lib/firebase'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Signup from './pages/Signup'

function App() {
const navigate=useNavigate();
useEffect(()=>{
  if(auth.currentUser){

    navigate('/dashboard');
  }
},[])

  return (
  <>
 <AuthContextProvider>
<PostContextProvider>
<Routes>
{!auth.currentUser?
    <Route path='/' element={<Login/>}/>:
    <Route path='/dashboard' element={<Dashboard/>}/>

}
    <Route path='/signup' element={<Signup/>}/>
    <Route path='/Dashboard' element={auth.currentUser?<Dashboard/>:<Login/>}/>
    <Route path='/Profile' element={auth.currentUser?<Profile/>:<Login/>}/>
  </Routes>
</PostContextProvider>
 </AuthContextProvider>

  </>
  )
}

export default App