import { UserModel } from '../../models/User'
import bcrypt from 'bcryptjs'
export const signup = async (request, response) => {
    try {
        const { body } = request

        const emailAlreadyExist = await UserModel.findOne({
            email: request.body.email,
        })
        if (emailAlreadyExist) {
            // returned if user exist with the same email
            return response.status(409).send({ message: 'Email Already Exist' })
        }
        body.password = bcrypt.hashSync(body.password, 10)

        const newUser = new UserModel(body)
        await newUser.save()
        return response.json({
            message: 'Your account has been created successfully.',
        })
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log('error', error)
    }
}
