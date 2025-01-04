import mongoose, { Types } from 'mongoose'
export interface IBlog {
  title: string
  author: string
  url: string
  likes: number
  id?: string
  user?: Types.ObjectId
}

const blogSchema = new mongoose.Schema<IBlog>({
  title: { type: String, required: true },
  author: String,
  url: { type: String, required: true },
  likes: { type: Number, default: 0 },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    if (returnedObject.user) {
      returnedObject.user = returnedObject.user.id.toString()
    }
    delete returnedObject._id
    delete returnedObject.__v
  },
})

export default mongoose.model('Blog', blogSchema)
