import express from 'express'
import { postGig } from '../../controllers/clientController.js'

const router = express.Router()

router.post('/gigs', postGig)

export default router
