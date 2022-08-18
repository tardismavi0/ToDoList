import {combineReducers} from 'redux';

import user from './user';

const reducersCombined = combineReducers({
    user
});

export default reducersCombined;
