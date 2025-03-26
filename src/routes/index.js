import express from 'express'
import authRoutes from './v1/authRoutes.js'
import proRoutes from './v1/proRoutes.js'
import clientRoutes from './v1/clientRoutes.js'

export const router = express.Router()

router.use('/auth', authRoutes)
router.use('/pros', proRoutes)
router.use('/clients', clientRoutes)
    