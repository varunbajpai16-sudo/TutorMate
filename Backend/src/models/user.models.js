import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    avatar: String,

    role: {
      type: String,
      enum: ['teacher', 'student', 'parent'],
      required: true,
    },

    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
)

export const User = mongoose.model('User', userSchema)
