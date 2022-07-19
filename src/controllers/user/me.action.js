import User from '../../models/User'

export const me = async (request, response) => {
    try {
        const data = await User.findById(request.body._id).slect({
            password: 1,
        })
        return response.status(200).send({ data })
    } catch (error) {
        return response.status(500).json({
            message: 'Whoops. Something went wrong!',
            error,
        })
    }
}
