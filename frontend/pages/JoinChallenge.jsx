import React, { useState } from 'react'
import { joinChallenge } from '../api/ChallengeApi'
import { useParams } from 'react-router-dom'

const JoinChallenge = () => {

const challengeid = useParams()

const [joinedChallenge, setjoinedChallenge] = useState([])

    const joinChall = async () =>{
        try{
        const res= await joinChallenge(challengeid)
         setjoinedChallenge(res.data)
        }catch(err){
            console.log(err)
        }
    }
if(challengeid){
    joinChall()
}

  return (
    <div>JoinChallenge</div>
  )
}

export default JoinChallenge