import mongoose from 'mongoose'

const proSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  avatar: {
    type: String,
    trim: true,
    default: 'https://avatars.githubusercontent.com/u/124599?v=4'
  },
  jobTitle: { type: String, required: true },
  name: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String },
  rate: {
    type: Number,
    min: 0
  }
})

export default mongoose.model('Pro', proSchema)
