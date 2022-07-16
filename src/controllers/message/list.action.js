import Message from '../../models/Message'
export const list = async (request, response) => {
    try {
        const data = await Message.find({
            conversationId: request.params.conversationId,
        })
            .sort({ createdAt: -1 })
            .limit(20)
            .lean()
            .exec()
        return response.status(200).json({ message: 'List of messages', data })
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)
    }
}
