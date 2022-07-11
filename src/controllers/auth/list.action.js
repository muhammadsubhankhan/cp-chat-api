import { UserModel } from '../../models/User'

export const list = async (request, response) => {
    try {
        const users = await UserModel.find({}).select({ password: 0 })
        return response.json({ message: 'List of users', data: users })
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)
    }
}
