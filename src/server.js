import app from './app.js'
import dotenv from 'dotenv'
import { connectDB } from './configs/database.js'

dotenv.config()

const PORT = process.env.PORT || 5000

const startServer = async () => {
  try {
    await connectDB()
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  } catch (error) {
    console.error('Server failed to start:', error)
    process.exit(1)
  }
}

startServer()
