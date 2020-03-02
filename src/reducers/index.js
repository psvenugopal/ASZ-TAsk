import { combineReducers } from 'redux'
import user from './userReducer'
import todo from './todoReducer'

export default combineReducers({
  user,
  todo
})
