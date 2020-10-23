import { UPDATE_CURRENT_USER, REMOVE_CURRENT_USER } from '../actions/currentUser.js'

const reducer = (state = [], { type, payload }) => {
  switch (type) {
    case UPDATE_CURRENT_USER:
      return {
        ...state,
        ...payload.user
      }
    case REMOVE_CURRENT_USER:
      return {
        ...payload.user
      }
    default:
      return state
  }
}

export default reducer