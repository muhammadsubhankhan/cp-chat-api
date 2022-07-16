import User from '../../models/User'

export const me = async (request, response) => {
    const data = await User.findById(request.body._id).slect({ password: 1 })
    return response.status(200).send({ data })
}
