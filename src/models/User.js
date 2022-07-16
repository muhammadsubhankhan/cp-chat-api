import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: { type: String, default: null },
    },
    { timestamps: true }
)
// Compile model from schema
export default mongoose.model('users', UserSchema)
