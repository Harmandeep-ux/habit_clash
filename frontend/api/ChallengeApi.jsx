import  axiosInstance  from "./api"

export const createChallenge = async(challengedata)=>{
    const {data} = await axiosInstance.post('/challenge/create',challengedata)
    return data
}

export const joinChallenge = async(id)=>{
    const {data}  = await axiosInstance.post(`/challenge/join/${id}`)
    return data
}

export const getMyChallenges = async() =>{
    const {data} = await axiosInstance.get(`/challenge/mine`)
    return data
}

export const getLeaderboards = async(challengeid)=>{
    const {data} = await axiosInstance.get(`/challenge/leaderboard/${challengeid}`)
    return data
}

export const inviteUser = async(challengeid,username)=>{
    const {data} = await axiosInstance.post(`/challenge/invite/${challengeid}`,{username})
    return data
}

export const acceptInvite = async(challengeid)=>{
    const {data} = await axiosInstance.post(`/challenge/accept/${challengeid}`)
    return data
}

export const rejectInvite = async(challengeid) =>{
    const {data} = axiosInstance.post(`/challenge/reject${challengeid}`)
    return data
}

export const getAllLeaders = async () =>{
    const {data} = await axiosInstance.get('challenge/leaderboard')
    return data
}