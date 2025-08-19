import React, { useEffect, useState } from 'react'
import axiosInstance from '../api/api'

const Streak = () => {
  const [streak, setstreak] = useState(0)

    useEffect(()=>{
  const getStreak = async () =>{
    try{
      const {data} = await axiosInstance.get('challenge/my-streak')
      setstreak(data.streak)
    }catch(err){
      console.log(`err ${err.message}`)
    }
  }
    getStreak()
  },[])
  return (
    <div className='text-center text-3xl font-bold text-orange-500'>🔥{streak}</div>
  )
}

export default Streak