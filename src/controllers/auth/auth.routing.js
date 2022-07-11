import { list } from './list.action'
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
    list: {
        get: {
            action: list,
            level: 'public',
        },
    },
}
