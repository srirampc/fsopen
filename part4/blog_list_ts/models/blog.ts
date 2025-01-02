import mongoose from 'mongoose'
export interface IBlog {
  title: string
  author: string
  url: string
  likes: number
  id?: string
}

const blogSchema = new mongoose.Schema<IBlog>({
  title: {type: String, required: true},
  author: String,
  url: {type: String, required: true},
  likes: { type: Number, default: 0 },
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

export default mongoose.model('Blog', blogSchema)
