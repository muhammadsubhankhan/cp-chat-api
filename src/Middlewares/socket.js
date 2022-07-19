import jwt from 'jsonwebtoken'

import User from '../models/User'
import AuthToken from '../models/AuthToken'

export default async (socket, next) => {
    try {
        if (socket.handshake.auth?.token) {
            const { token } = socket.handshake.auth

            // Verify jwt token
            const payload = await jwt.verify(token, process.env.CLIENT_SECRET)

            // Check if the token is not revoked
            const accessToken = await AuthToken.findById(payload.id)

            if (!accessToken || !!accessToken.revokedAt) {
                // Unauthenticated if access token not in database
                // or the access token has been revoked
                return next(new Error('Authentication error'))
            }

            socket.user = await User.findById(payload.userId)
            delete socket.user.password

            socket.accessTokenId = accessToken._id

            return next()
        }

        return next(new Error('Authentication error'))
    } catch (error) {
        return next(new Error('Authentication error'))
    }
}
