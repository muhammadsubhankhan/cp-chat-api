import Conversation from '../../models/Conversation'
import User from '../../models/User'

export const create = async (request, response) => {
    try {
        const { body, user } = request
        // eslint-disable-next-line no-console
        console.log(body.userId, user._id)
        if (body.userId === user._id) {
            return response.json({
                message: 'You can not create a conversation with yourself',
            })
        }
        let data = await Conversation.findOne({
            $or: [
                {
                    $and: [
                        { 'user1.id': user._id },
                        { 'user2.id': body.userId },
                    ],
                },
                {
                    $and: [
                        { 'user1.id': body.userId },
                        { 'user2.id': user._id },
                    ],
                },
            ],
        })

        if (!data) {
            const secondUser = await User.findById(body.userId).select({
                fullName: 1,
            })
            // eslint-disable-next-line no-console
            console.log('secondUser', secondUser, 'request.user', request.user)
            const record = new Conversation({
                user1: { id: user._id, fullName: user.fullName },
                user2: { id: body.userId, fullName: secondUser.fullName },
            })

            data = await record.save()
        }
        return response.json({ data })
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)
    }
}
