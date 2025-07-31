import mongoose from "mongoose";

export const dbConn = async() =>{
    try{
     const conn = await mongoose.connect(process.env.MONGO_URI)
     console.log(`succesfully connected ${conn.connection.host}`)
    }catch(err){
        console.log('err while connection')
    }
}