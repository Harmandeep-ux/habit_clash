import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../src/context/AuthContext'

const Dashboard = () => {
  const navigate = useNavigate()
  const {logout} = useAuth()

  const handleLogout = ()=>{
    logout()
    navigate('/login')
  }

  return (
    <div>Dashboard
      <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default Dashboard