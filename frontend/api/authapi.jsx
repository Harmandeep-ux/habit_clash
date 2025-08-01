import { axiosInstance } from "./api"

export const loginUser = async(Credential) =>{
   const {data} = await axiosInstance.post('/auth/login',Credential)
   return data
}

export const registerUser = async(Credential)=>{
    const {data} = await axiosInstance.post("/auth/signup",Credential)
    return data
}

export const logoutUser = async () =>{
    const {data} = await axiosInstance.post('/auth/logout',Credential)
    return data
}