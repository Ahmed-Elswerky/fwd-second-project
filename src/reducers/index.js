import {questions,users,loggedIn} from './reducers'
import { combineReducers } from 'redux'
const allReducers = combineReducers({
  questions,
  loggedIn,
  users
})
export default allReducers
