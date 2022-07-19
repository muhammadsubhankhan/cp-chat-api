import Message from '../../models/Message'

export const create = async (request, response) => {
    const { id, name } = request.user
    const { receiverId, reveiverName, text } = request.body
    try {
        const data = await Message.create({
            receiverId,
            reveiverName,
            senderId: id,
            senderName: name,
            text,
        })

        return response.json({
            data,
        })
    } catch (error) {
        return response.status(500).json({
            message: 'Whoops. Something went wrong!',
            error,
        })
    }
}
