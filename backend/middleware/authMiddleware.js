import jwt from 'jsonwebtoken'

export const authMiddleware = (req,res,next)=>{
    try{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if(!token){
        return res.staus(401).json({msg:'no token provided authorization declined'})
    }
    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    req.user = {id:decoded.id};
    next()
    }catch(err){
        return res.status(500).json({msg:err.message})
    }
}