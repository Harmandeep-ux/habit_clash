import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../src/context/AuthContext'
import Navbar from '../components/Navbar'

const Dashboard = () => {
  const navigate = useNavigate()
  const {logout} = useAuth()

  const handleLogout = ()=>{
    logout()
    navigate('/login')
  }

  return (
    <>
    <Navbar/>
    Dashboard
      <button onClick={handleLogout}>logout</button>
    </>
  )
}

export default Dashboard