import { list } from '../user/list.action'
import { me } from '../user/me.action'

import authenticate from '../../helpers/authenticate'

module.exports = {
    '/': {
        get: {
            middlewares: [authenticate],
            action: list,
            level: 'private',
        },
    },
    me: {
        get: {
            middlewares: [authenticate],
            action: me,
            level: 'private',
        },
    },
}
