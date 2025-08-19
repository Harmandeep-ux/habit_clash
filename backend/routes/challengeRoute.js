import express from 'express'
import { createChallenge, getAllChallenges, getAllLeaderboard, getLeaderBoard, getMyChallenges, getMyStreak, inviteByUsername, joinChallenge } from '../controllers/challengeController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { acceptInvite, pendingInvites, rejectInvite } from '../controllers/invitationController.js'

export const challengeRoute = express.Router()

challengeRoute.post('/create',authMiddleware,createChallenge)
challengeRoute.post('/join/:id',authMiddleware,joinChallenge)
challengeRoute.get('/mine',authMiddleware,getMyChallenges)
challengeRoute.get('/allchallenge',authMiddleware,getAllChallenges)
challengeRoute.get('/leaderboard/:id',authMiddleware,getLeaderBoard)
challengeRoute.get('/leaderboard',authMiddleware,getAllLeaderboard )
challengeRoute.post('/invite/:challengeid',authMiddleware,inviteByUsername)
challengeRoute.post('/accept/:challengeid',authMiddleware,acceptInvite)
challengeRoute.post('/reject/:challengeid',authMiddleware,rejectInvite)
challengeRoute.get('/my-invites',authMiddleware,pendingInvites)
challengeRoute.get('/my-streak',authMiddleware,getMyStreak)