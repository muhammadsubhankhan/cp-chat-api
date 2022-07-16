import { login } from './login.action'
import { signup } from './signup.action'
module.exports = {
    signup: {
        post: {
            action: signup,
            level: 'public',
        },
    },
    login: {
        post: {
            action: login,
            level: 'public',
        },
    },
}
