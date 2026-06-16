import mongoose from 'mongoose';

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

  coordinates: {
    type: {
      type: String,
      default: 'Point',
      enum: ['Point'],
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },

});

parentSchema.index({ coordinates: '2dsphere' });

export const Parent = mongoose.model('Parent', parentSchema);
