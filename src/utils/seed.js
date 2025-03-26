import { connectDB } from '../configs/database.js'
import User from '../models/userModel.js'
import Pro from '../models/proModel.js'
import bcrypt from 'bcryptjs'

async function seedDB() {
  await connectDB()

  await User.deleteMany({})
  await Pro.deleteMany({})

  const user = await User.create({
    email: 'pro@example.com',
    password: await bcrypt.hash('password123', 10),
    role: 'pro'
  })

  await Pro.create([
    {
      userId: user._id,
      jobTitle: 'Plumber',
      name: 'John Doe',
      location: 'Helsinki',
      rate: '€40/hr'
    },
    {
      userId: user._id,
      jobTitle: 'Web Developer',
      name: 'Jane Smith',
      location: 'Tampere',
      rate: '€50/hr'
    }
  ])

  console.log('Database seeded!')
  process.exit(0)
}

seedDB().catch((err) => console.error(err))
