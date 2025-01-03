import mongoose from 'mongoose'

export interface IUser {
    username: string
    name: string
    passwordHash?: string
    blogs: mongoose.Types.ObjectId[]
    id?: string
    password?: string
}

const userSchema = new mongoose.Schema<IUser>({
    username: { type: String, required: true, unique: true },
    name: String,
    passwordHash: String,
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog',
        },
    ],
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        //
        delete returnedObject.passwordHash
    },
})

const User = mongoose.model('User', userSchema)

export default User
