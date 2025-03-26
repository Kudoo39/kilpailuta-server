import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const registerUser = async (email, password, role) => {
  const existingUser = await User.findOne({ email })
  if (existingUser) throw new Error('Email already exists')

  const hashedPassword = await bcrypt.hash(password, 10)
  const user = await User.create({ email, password: hashedPassword, role })

  const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  })

  return { token }
}

export const loginUser = async (email, password) => {
  const user = await User.findOne({ email })
  if (!user) throw new Error('Invalid email or password')

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) throw new Error('Invalid email or password')

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: '1h'
    }
  )

  return { token }
}
  