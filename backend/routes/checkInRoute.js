import express from 'express'
import { checkInToday } from '../controllers/checkInController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { upload } from '../config/multer.js'

export const checkInRoute = express.Router()

checkInRoute.post('/:challengeid', authMiddleware, upload.single('photo'), checkInToday);