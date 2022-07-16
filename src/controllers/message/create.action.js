import Message from '../../models/Message'

export const create = async (request, response) => {
    const { id, name } = request.user
    const { receiverId, reveiverName, text } = request.body

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
}
