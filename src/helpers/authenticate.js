import dotenv from 'dotenv'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import BearerStrategy from 'passport-http-bearer'
/*
    include mongodb models
*/
import User from '../models/User'
import AuthToken from '../models/AuthToken'

dotenv.config()

// token verification
passport.use(
    new BearerStrategy(async (token, done) => {
        // if token is not given return

        if (!token) {
            return done(null, false)
        } else {
            try {
                // verify token with secret
                // and retrieve token payload
                const payload = await jwt.verify(
                    token,
                    process.env.CLIENT_SECRET
                )

                // Check if the token is not revoked
                const accessToken = await AuthToken.findById(
                    payload.accessTokenId
                )

                if (!accessToken || !!accessToken.revoked) {
                    // Unauthenticated if access token not in database
                    // or the access token has been revoked
                    return done(null, false)
                }

                // retrieve user from payload
                const user = await User.findById(payload.userId).select({
                    password: 0,
                })
                // return user with token data to
                // callback function for current route
                return done(null, user, payload)
            } catch (error) {
                return done(null, false)
            }
        }
    })
)
export default passport.authenticate('bearer', {
    session: false,
})
