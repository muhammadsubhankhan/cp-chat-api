import mongoose from 'mongoose'
const ObjectId = mongoose.SchemaTypes.ObjectId

const MessageSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
        },
        userId: { type: ObjectId, required: true },
        conversationId: { type: ObjectId, required: true },
        text: { type: String, default: null },
    },
    { timestamps: true }
)
// Compile model from schema
export default mongoose.model('messages', MessageSchema)
