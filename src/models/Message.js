import mongoose from 'mongoose'
const ObjectId = mongoose.SchemaTypes.ObjectId

const MessageSchema = new mongoose.Schema(
    {
        conversationId: ObjectId,
        receiverId: ObjectId,
        receiverName: String,
        senderId: ObjectId,
        senderName: String,
        text: String,
    },
    { timestamps: true }
)
// Compile model from schema
export default mongoose.model('messages', MessageSchema)
