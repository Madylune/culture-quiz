import currentUserReducer from '../reducers/currentUser'
import { updateCurrentUser, removeCurrentUser } from '../actions/currentUser'
import quizReducer from '../reducers/quiz'
import { updateCurrentQuiz, removeCurrentQuiz } from '../actions/quiz'

describe('Reducer - currentUser', () => {
  it('should return the initial state', () => {
    expect(currentUserReducer(undefined, {})).toEqual([])
  })

  it('should handle UPDATE_CURRENT_USER - with new data', () => {
    const currentUser = { score: 10 }
    expect(currentUserReducer({ score: 0 }, updateCurrentUser(currentUser))).toEqual({ score: 10 })
  })

  it('should handle UPDATE_CURRENT_USER - without new data', () => {
    const currentUser = {}
    expect(currentUserReducer({ score: 10 }, updateCurrentUser(currentUser))).toEqual({ score: 10 })
  })

  it('should handle REMOVE_CURRENT_USER', () => {
    expect(currentUserReducer({ score: 10 }, removeCurrentUser({}))).toEqual({})
  })
})

describe('Reducer - quiz', () => {
  it('should return the initial state', () => {
    expect(quizReducer(undefined, {})).toEqual([])
  })

  it('should handle UPDATE_CURRENT_QUIZ - with new data', () => {
    const quizData = {
      questions: [],
      currentQuestionNb: 1,
      timeIsOver: false
    }
    expect(quizReducer([], updateCurrentQuiz(quizData))).toEqual(quizData)
  })

  it('should handle UPDATE_CURRENT_QUIZ - without new data', () => {
    const quiz = {
      questions: [],
      currentQuestionNb: 1,
      timeIsOver: false
    }
    const newData = { timeIsOver: true }
    expect(quizReducer(quiz, updateCurrentQuiz(newData))).toEqual({
      questions: [],
      currentQuestionNb: 1,
      timeIsOver: true
    })
  })

  it('should handle REMOVE_CURRENT_QUIZ', () => {
    const quiz = {
      questions: [],
      currentQuestionNb: 1,
      timeIsOver: false
    }
    expect(quizReducer(quiz, removeCurrentQuiz({}))).toEqual({})
  })
})