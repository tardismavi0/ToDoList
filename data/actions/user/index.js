import {store} from '../../../store';
import {USER, TOKEN} from '../../DATA_TYPE';

export function set_user(user) {
    store.dispatch({
        type: USER,
        payload: {
            user
        }
    });
}

export function set_token(token) {
    store.dispatch({
        type: TOKEN,
        payload: {
            token
        }
    });
}

