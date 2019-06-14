import { Store, Action } from '@ngrx/store';
import { User } from '../types';

export function userReducer(state: Store<User> = null, action: any) {
    if (action.type === 'USER_LOGIN') {
        return action.user;
    }
    if (action.type === 'USER_LOGOUT') {
        return null;
    }
    if (action.type === 'USER_INIT') {
        return action.user;
    }
    return state; // null;
}
export function loading(state = true, action: Action) {
    if (action.type === 'LOADDED') {
        return false;
    }
    return state;
}
