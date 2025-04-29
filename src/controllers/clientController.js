import { createGig, findGigsByClient } from '../services/clientService.js'
import { body, validationResult } from 'express-validator'
import { authMiddleware } from '../middleware/authMiddleware.js'

export const postGig = [
  authMiddleware,
  body('title').notEmpty().withMessage('Title is required'),
  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string'),
  body('budget')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Rate must be a positive number'),
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() })

    try {
      const { title, description, budget } = req.body
      const clientId = req.user.id
      if (req.user.role !== 'client') {
        return res.status(403).json({ message: 'Only clients can post gigs' })
      }

      const gig = await createGig(clientId, title, description, budget)
      res.status(201).json(gig)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
]

export const getClientGigs = [
  authMiddleware,
  async (req, res) => {
    try {
      const clientId = req.user.id
      if (req.user.role !== 'client') {
        return res
          .status(403)
          .json({ message: 'Only clients can view their gigs' })
      }

      const gigs = await findGigsByClient(clientId)
      res.status(200).json(gigs)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
]
