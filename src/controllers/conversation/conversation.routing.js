import { create } from './create.action'
import authenticate from '../../helpers/authenticate'
module.exports = {
    '/': {
        post: {
            middlewares: [authenticate],
            action: create,
            level: 'private',
        },
    },
}
