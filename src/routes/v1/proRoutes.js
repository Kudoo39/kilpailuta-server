import express from 'express'
import {
  createProfile,
  updateProfile,
  deleteProfile,
  getPros
} from '../../controllers/proController.js'

const router = express.Router()

router.post('/profile', createProfile)
router.put('/profile', updateProfile)
router.delete('/profile', deleteProfile)
router.get('/search', getPros)

export default router
