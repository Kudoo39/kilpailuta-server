import Pro from '../models/proModel.js'

export const createProProfile = async (
  userId,
  jobTitle,
  name,
  location,
  description
) => {
  const existingProfile = await Pro.findOne({ userId })
  if (existingProfile) throw new Error('Profile already exists for this user')

  const profile = await Pro.create({
    userId,
    jobTitle,
    name,
    location,
    description
  })
  return profile
}

export const updateProProfile = async (
  userId,
  jobTitle,
  name,
  location,
  description
) => {
  const profile = await Pro.findOneAndUpdate(
    { userId },
    { jobTitle, name, location, description },
    { new: true, runValidators: true }
  )
  if (!profile) throw new Error('Profile not found')
  return profile
}

export const searchPros = async (query) => {
  const pros = await Pro.find({
    $or: [
      { jobTitle: { $regex: query, $options: 'i' } },
      { description: { $regex: query, $options: 'i' } }
    ]
  })
  return pros
}
