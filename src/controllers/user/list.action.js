import User from '../../models/User'

export const list = async (request, response) => {
    try {
        // eslint-disable-next-line no-console
        console.log(request.user._id)
        const data = await User.find({ _id: { $ne: request.user._id } }).select(
            { password: 0 }
        )
        return response.json({ message: 'List of users', data })
    } catch (error) {
        return response.status(500).json({
            message: 'Whoops. Something went wrong!',
            error,
        })
    }
}
