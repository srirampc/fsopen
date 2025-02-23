import mongoose, { Types } from 'mongoose'
export interface IComment {
    text: string
    id?: string
    blog?: Types.ObjectId
}

const commentSchema = new mongoose.Schema<IComment>({
    text: { type: String, required: true },
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
        required: true,
    },
})

commentSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        // if (returnedObject.user) {
        //   returnedObject.user = returnedObject.user.id.toString()
        // }
        delete returnedObject._id
        delete returnedObject.__v
    },
})

export default mongoose.model('Comment', commentSchema)


