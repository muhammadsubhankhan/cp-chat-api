import Conversation from '../../models/Conversation'

export const get = async (request, response) => {
    try {
        const { id } = request.user

        const data = await Conversation.find({
            $or: [
                {
                    'user1.id': id,
                },
                {
                    'user2.id': id,
                },
            ],
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
