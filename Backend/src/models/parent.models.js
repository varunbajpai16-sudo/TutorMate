import mongoose from 'mongoose'

const parentSchema = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  children: [
    {
      name: String,
      class: String,
      subjects: [String],
    },
  ],

  location: String,
})
export const Parent = mongoose.model('Parent', parentSchema)
