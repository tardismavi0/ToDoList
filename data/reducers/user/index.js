import {USER, TOKEN, CONTACT, LANG, NOTICE, BANNER, NOTICE_TYPE, PRESIDENT} from '../../DATA_TYPE';

const initalState = {
    user: {},
    contact: {},
    notice: {},
    noticeType: 0,
    banner: {},
    president: {},
    lang: '',
    token: null
};

export default function user(state = initalState, action) {
    switch (action.type) {
        case USER:
            return Object.assign({}, state, {user: action.payload.user});
        case TOKEN:
            return Object.assign({}, state, {token: action.payload.token});

        default:
            return state;
    }
}
