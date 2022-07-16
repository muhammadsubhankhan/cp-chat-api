import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
const authTokenSchema = new Schema(
    {
        userId: { type: ObjectId, required: true },
        revoked: { type: mongoose.Schema.Types.Boolean, default: false },
        revokedAt: { type: Date, default: Date.now },
        expiresAt: {
            type: Date,
            default: Date.now(),
            expires: process.env.TIME_TO_EXPIRE,
        },
    },
    { timestamps: true }
)
// oauthTokenSchema.set('toJSON', { virtuals: true })
export default mongoose.model('authToken', authTokenSchema)
