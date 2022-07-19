import bcrypt from 'bcryptjs'
import User from '../../models/User'
import { generateToken } from '../../helpers/generate-token'
export const login = async (request, response) => {
    try {
        const { body } = request
        const user = await User.findOne({ email: body.email }).select({
            email: 1,
            password: 1,
        })
        if (!user || !bcrypt.compareSync(body.password, user.password)) {
            // returned if user exist with the same email
            return response.status(401).send({
                message:
                    'You have entered an invalid email or password! Please try again.',
            })
        }
        const data = await generateToken(user)

        return response.json({
            message: 'Logged in successfully.',
            data,
        })
    } catch (error) {
        return response.status(500).json({
            message: 'Whoops. Something went wrong!',
            error,
        })
    }
}
