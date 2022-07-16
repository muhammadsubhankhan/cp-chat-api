import mongoose from 'mongoose'
const ConversationSchema = new mongoose.Schema(
    {
        user1: { type: Object, required: true },

        user2: { type: Object, required: true },
    },
    { timestamps: true }
)
// Compile model from schema
export default mongoose.model('conversations', ConversationSchema)
