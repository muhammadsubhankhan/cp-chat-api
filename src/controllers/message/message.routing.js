import { create } from './create.action'
import { list } from './list.action'

import authenticate from '../../helpers/authenticate'
module.exports = {
    '/': {
        post: {
            middlewares: [authenticate],
            action: create,
            level: 'private',
        },
    },
    '/:conversationId': {
        get: {
            middlewares: [authenticate],
            action: list,
            level: 'private',
        },
    },
}
