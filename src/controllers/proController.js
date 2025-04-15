import {
  createProProfile,
  updateProProfile,
  deleteProProfile,
  searchPros
} from '../services/proService.js'
import { body, validationResult } from 'express-validator'
import { authMiddleware } from '../middleware/authMiddleware.js'

export const createProfile = [
  authMiddleware,
  body('jobTitle').notEmpty().withMessage('Job title is required'),
  body('name').notEmpty().withMessage('Name is required'),
  body('location').notEmpty().withMessage('Location is required'),
  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string'),
  body('rate')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Rate must be a positive number'),
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() })

    try {
      const { jobTitle, name, location, description, rate } = req.body
      const userId = req.user.id
      if (req.user.role !== 'pro') {
        return res
          .status(403)
          .json({ message: 'Only professionals can create profiles' })
      }

      const profile = await createProProfile(
        userId,
        jobTitle,
        name,
        location,
        description
      )
      res.status(201).json(profile)
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  }
]

export const updateProfile = [
  authMiddleware,
  body('jobTitle')
    .optional()
    .notEmpty()
    .withMessage('Job title cannot be empty'),
  body('name').optional().notEmpty().withMessage('Name cannot be empty'),
  body('location')
    .optional()
    .notEmpty()
    .withMessage('Location cannot be empty'),
  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string'),
  body('rate')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Rate must be a positive number'),
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() })

    try {
      const { jobTitle, name, location, description } = req.body
      const userId = req.user.id
      if (req.user.role !== 'pro') {
        return res
          .status(403)
          .json({ message: 'Only professionals can update profiles' })
      }

      const profile = await updateProProfile(
        userId,
        jobTitle,
        name,
        location,
        description
      )
      res.status(200).json(profile)
    } catch (error) {
      res.status(404).json({ message: error.message })
    }
  }
]

export const deleteProfile = [
  authMiddleware,
  async (req, res) => {
    try {
      const userId = req.user.id
      if (req.user.role !== 'pro') {
        return res
          .status(403)
          .json({ message: 'Only professionals can delete profiles' })
      }

      const profile = await deleteProProfile(userId)
      res.status(200).json({ message: 'Profile deleted', profile })
    } catch (error) {
      res.status(404).json({ message: error.message })
    }
  }
]

export const getPros = async (req, res) => {
  try {
    const query = req.query.query || ''
    const pros = await searchPros(query)
    res.status(200).json(pros)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
