import { axiosInstance } from "./api"

export const checkInToday = async(challengeid,photo,comment) =>{
    const formData = new FormData()
    formData.append('photo',photo)
    formData.append('comment',comment)

    const {data}  =await axiosInstance.post(`/checkin/${challengeid}`,formData,{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    })
    return data
}