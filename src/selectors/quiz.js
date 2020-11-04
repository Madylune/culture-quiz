import get from 'lodash/fp/get'

export const getQuiz = state => get('quiz', state)

export const getAllQuestions = state => get('quiz.allQuestions', state)

export const getCurrentQuestions = state => get('quiz.questions', state)

export const getIfTimeIsOver = state => get('quiz.timeIsOver', state)