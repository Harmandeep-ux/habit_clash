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
    origin: [
        "http://localhost:5173",               // local
        "https://habit-clash-cfpz.vercel.app"  // frontend deployed
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
}));
app.use(cookieParser())
app.use(express.json())


app.get('/',(req,res)=>{
    res.send('hii')
})

//Routes
app.use('/api/auth',authRoute)
app.use('/api/challenge',challengeRoute)
app.use('/api/checkin',checkInRoute)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on PORT ${PORT}`);
});
