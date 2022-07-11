import bcrypt from 'bcryptjs'
import { UserModel } from '../../models/User'
import { generateToken } from '../../helpers/generate-token'
export const login = async (request, response) => {
    try {
        const { body } = request
        const user = await UserModel.findOne({ email: body.email }).select({
            email: 1,
            password: 1,
        })
        if (!user || !bcrypt.compareSync(body.password, user.password)) {
            // returned if user exist with the same email
            return response.status(409).send({
                message:
                    'You have entered an invalid email or password! Please try again.',
            })
        }
        const data = generateToken(user)

        return response.json({
            message: 'Logged in successfully.',
            data,
        })
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log('error', error)
    }
}
