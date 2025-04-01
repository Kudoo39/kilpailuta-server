import express from 'express'
import { postGig, getClientGigs } from '../../controllers/clientController.js'

const router = express.Router()

router.post('/gigs', postGig)
router.get('/gigs', getClientGigs)

export default router
