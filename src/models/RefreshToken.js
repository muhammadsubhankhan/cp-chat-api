import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const authRefreshTokenSchema = new Schema({
    accessTokenId: { type: ObjectId, required: true },
    revokedAt: { type: Date, default: null },
    revoked: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    expiredAt: { type: Date, default: null },
})

// oauthRefreshTokenSchema.set('toJSON', { virtuals: true })
export default mongoose.model('authRefreshToken', authRefreshTokenSchema)
