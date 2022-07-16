/* eslint-disable indent */
import dayjs from 'dayjs'
import jwt from 'jsonwebtoken'
import AuthToken from '../models/AuthToken'
import RefreshToken from '../models/RefreshToken'
import dotenv from 'dotenv'
dotenv.config()
export const generateToken = async (user) => {
    try {
        // number of seconds in a day
        const secondsInADay = 24 * 60 * 60
        const tokenExpirationDate = dayjs().add(1, 'day')

        const accessTokenInstance = new AuthToken()
        accessTokenInstance.userId = user._id
        accessTokenInstance.revokedAt = null
        accessTokenInstance.expiresAt = tokenExpirationDate
        if (await accessTokenInstance.save()) {
            const refreshTokenInstance = new RefreshToken()
            refreshTokenInstance.accessTokenId = accessTokenInstance._id
            refreshTokenInstance.expiresAt = tokenExpirationDate
            const refresh = await refreshTokenInstance.save()

            if (refresh) {
                const accessToken = jwt.sign(
                    {
                        accessTokenId: accessTokenInstance._id,
                        userId: user._id,
                    },
                    process.env.CLIENT_SECRET,
                    {
                        expiresIn: secondsInADay,
                    }
                )
                const refreshToken = jwt.sign(
                    {
                        refreshTokenId: refresh._id,
                        userId: user._id,
                    },
                    process.env.CLIENT_SECRET,
                    {
                        expiresIn: secondsInADay,
                    }
                )
                // eslint-disable-next-line no-console
                console.log('acces', accessToken, 'refresh', refreshToken)
                return { accessToken, refreshToken, tokenExpirationDate }
            }
        }
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)
    }
}
