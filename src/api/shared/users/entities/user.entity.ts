import mongoose from 'mongoose'

export const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
      require: true,
    },
    username: {
      type: String,
      require: true,
      unique: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      require: true,
      unique: true,
    },
    hash: {
      type: String,
      require: true,
    },
    hashRt: String,
  },
  { timestamps: true }
)

export interface User {
  _id: string
  username: string
  email: string
  phoneNumber: string
  createdAt: string
  updatedAt: string
}
