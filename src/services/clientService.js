import Gig from '../models/gigModel.js'

export const createGig = async (clientId, title, description) => {
  const gig = await Gig.create({
    clientId,
    title,
    description
  })
  return gig
}

export const findGigsByClient = async (clientId) => {
  const gigs = await Gig.find({ clientId })
  return gigs
}
