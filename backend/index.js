import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { dbConn } from './config/db.js'
import { authRoute } from './routes/authRoute.js'
import { challengeRoute } from './routes/challengeRoute.js'
import { checkInRoute } from './routes/checkInRoute.js'

dotenv.config()
dbConn()

const app = express()
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(cookieParser())
app.use(express.json())

const PORT = process.env.PORT

app.get('/',(req,res)=>{
    res.send('hii')
})

//Routes
app.use('/api/auth',authRoute)
app.use('/api/challenge',challengeRoute)
app.use('/api/checkin',checkInRoute)

app.listen(PORT,()=>{
    console.log(`server running on PORT ${PORT}`)
})