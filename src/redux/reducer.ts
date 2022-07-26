import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import { combineReducers } from 'redux';
import authReducer, { AuthState } from '../modules/auth/redux/authReducer';
import intlReducer, { IntlState } from '../modules/intl/redux/intlReducer';
import userReducer, { UserState} from 'modules/components/User/redux/userReducer'

export interface AppState {
  router: RouterState;
  intl: IntlState;
  profile: AuthState;
  user: UserState;
}

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    intl: intlReducer,
    profile: authReducer,
    user: userReducer
  });
}
