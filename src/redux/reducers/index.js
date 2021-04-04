import { combineReducers } from 'redux';
import auth from './auth.reducers';
import submit from './submit.reducers'
import homeFeed from './homeFeed.reducers'

const rootReducer = combineReducers({auth, submit, homeFeed})

export default rootReducer;