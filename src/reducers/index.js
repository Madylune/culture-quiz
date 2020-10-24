import { combineReducers } from 'redux'
import currentUser from './currentUser'
import quiz from './quiz'

const reducers = combineReducers({
  currentUser,
  quiz
})

export default reducers