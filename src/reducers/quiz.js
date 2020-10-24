import { UPDATE_CURRENT_QUIZ, REMOVE_CURRENT_QUIZ } from '../actions/quiz.js'

const reducer = (state = [], { type, payload }) => {
  switch (type) {
    case UPDATE_CURRENT_QUIZ:
      return {
        ...state,
        ...payload
      }
    case REMOVE_CURRENT_QUIZ:
      return {
        ...payload
      }
    default:
      return state
  }
}

export default reducer