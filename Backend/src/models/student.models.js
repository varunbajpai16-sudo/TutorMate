import mongoose from 'mongoose'

const studentSchema = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  studentClass: {
    type: String,
    required: true,
  },
  subjects: {
    type: [String],
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
})

export const Student = mongoose.model('Student', studentSchema)
