import { generateToken } from "../helper/generateToken.js";
import { User } from "../models/User.js";
import bcrypt from 'bcrypt'

export const signup = async(req,res)=>{

    try{
        const {name,email,password} = req.body;
        const hashPass =await bcrypt.hash(password,10)
     const existingUser = await User.findOne({email})
     if(existingUser){
        return res.status(400).json({msg:"user already exists"})
     }
    const user = await User.create({
      name,
      email, 
      password:hashPass
     })
     const token =generateToken(user._id)
     res.cookie('token',token)

     return res.status(200).json({msg:token, user:{id:user._id, name:user.name, email:user.email}})
    }catch(err){
        return res.status(500).json({msg:"error while signUp",err:err.message})
    }
}

export const login = async(req,res) =>{
    try{
     const {email , password} = req.body
     
     const user = await User.findOne({email})
    const isMatch =  bcrypt.compare(password,user.password)
    if(!isMatch){
        return res.status(400).json({msg:"invalid credentials"})
    }

    const token =generateToken(user._id)
    res.cookie('token',token)
     
    return res.status(200).json(
        {token:token ,
        user:
        {name:user.name,
          email:user.email
            }})
     
    }catch(err){
        return res.status(500).json({msg:"error while login",err:err.message})
    }
}

export const logout = () =>{
    res.cookie('token','')
}