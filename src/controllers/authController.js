import { registerUser, loginUser } from '../services/authService.js'
import { body, validationResult } from 'express-validator' // Add validation

export const register = [
  // Validation middleware
  body('email').isEmail().withMessage('Invalid email format'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  body('role')
    .isIn(['client', 'pro'])
    .withMessage('Role must be "client" or "pro"'),
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() })

    try {
      const { email, password, role } = req.body
      const { token } = await registerUser(email, password, role)
      res.status(200).json({ token })
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  }
]

export const login = [
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').notEmpty().withMessage('Password is required'),
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() })

    try {
      const { email, password } = req.body
      const { token } = await loginUser(email, password)
      res.status(200).json({ token })
    } catch (error) {
      res.status(401).json({ message: error.message })
    }
  }
]
