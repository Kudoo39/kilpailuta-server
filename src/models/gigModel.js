import mongoose from 'mongoose'

const gigSchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: { type: String, required: true },
  description: { type: String },
  budget: {
    type: Number,
    min: 0
  },
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('Gig', gigSchema)
