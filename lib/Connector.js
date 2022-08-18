import axios from 'axios';
import {store} from '../store';




export default function (token = null) {

    if(token === null){
        const _store = store.getState();

        token = _store.user.token;


    }


    return axios.create({
        baseURL: 'http://192.168.1.38:3000',
        timeout: 30000,
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
}
