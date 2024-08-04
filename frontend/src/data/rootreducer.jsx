
import { combineReducers } from 'redux';
import watchLaterReducer from '../slices/Watchlaterslice';
import authReducer from '../slices/Authslice';
import  appReducer  from '../slices/appslice';

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  watchLaterlist: watchLaterReducer,
});

export default rootReducer;

