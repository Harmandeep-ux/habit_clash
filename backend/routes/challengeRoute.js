import express from 'express'
import { createChallenge, getAllLeaderboard, getLeaderBoard, getMyChallenges, inviteByUsername, joinChallenge } from '../controllers/challengeController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { acceptInvite, rejectInvite } from '../controllers/invitationController.js'

export const challengeRoute = express.Router()

challengeRoute.post('/create',authMiddleware,createChallenge)
challengeRoute.post('/join/:id',authMiddleware,joinChallenge)
challengeRoute.get('/mine',authMiddleware,getMyChallenges)
challengeRoute.get('/leaderboard/:id',authMiddleware,getLeaderBoard)
challengeRoute.get('/leaderboard',authMiddleware,getAllLeaderboard)
challengeRoute.post('/invite/:challengeid',authMiddleware,inviteByUsername)
challengeRoute.post('/accept/:challengeid',authMiddleware,acceptInvite)
challengeRoute.post('/reject/:challengeid',authMiddleware,rejectInvite)