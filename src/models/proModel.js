import mongoose from 'mongoose'

const proSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
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
