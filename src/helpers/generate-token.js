/* eslint-disable indent */
import dayjs from 'dayjs'
import jwt from 'jsonwebtoken'
import { AuthToken } from '../models/AuthToken'
import { RefreshToken } from '../models/RefreshToken'
import dotenv from 'dotenv'
dotenv.config()
export const generateToken = async (user, scopes = [], rememberMe = false) => {
    try {
        // number of seconds in a day
        const secondsInADay = 24 * 60 * 60
        const tokenExpirationDate = rememberMe
            ? dayjs().add(process.env.TOKEN_EXPIRATION_TIME_REMEMBER_ME, 'day')
            : dayjs().add(process.env.TOKEN_EXPIRATION, 'day')

        const accessTokenInstance = new AuthToken()
        accessTokenInstance.userId = user._id
        accessTokenInstance.scopes = scopes
        accessTokenInstance.revokedAt = null
        accessTokenInstance.expiresAt = tokenExpirationDate
        // eslint-disable-next-line no-console
        console.log('--->', accessTokenInstance, typeof tokenExpirationDate)
        if (await accessTokenInstance.save()) {
            // eslint-disable-next-line no-console
            console.log('accessTokenInstance,', accessTokenInstance)
            const refreshTokenInstance = new RefreshToken()
            refreshTokenInstance.accessTokenId = accessTokenInstance._id
            refreshTokenInstance.expiresAt = tokenExpirationDate

            if (await refreshTokenInstance.save()) {
                const accessToken = jwt.sign(
                    {
                        accessTokenId: accessTokenInstance._id,
                        userId: user._id,
                        scopes: accessTokenInstance.scopes,
                    },
                    process.env.ClIENT_SECRET,
                    {
                        expiresIn: rememberMe
                            ? process.env.TOKEN_EXPIRATION_TIME_REMEMBER_ME *
                              secondsInADay
                            : process.env.TOKEN_EXPIRATION_TIME * secondsInADay,
                    }
                )
                const refreshToken = jwt.sign(
                    {
                        refreshTokenId: refreshTokenInstance._id,
                        userId: user._id,
                        scopes: accessTokenInstance.scopes,
                    },
                    process.env.ClIENT_SECRET,
                    {
                        expiresIn: rememberMe
                            ? process.env.TOKEN_EXPIRATION_TIME_REMEMBER_ME *
                              secondsInADay
                            : process.env.TOKEN_EXPIRATION_TIME * secondsInADay,
                    }
                )

                return { accessToken, refreshToken, tokenExpirationDate }
            }
        }
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)
    }
}
