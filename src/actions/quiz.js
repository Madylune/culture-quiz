export const UPDATE_CURRENT_QUIZ = 'update.current.quiz'
export const updateCurrentQuiz = quizData => ({
  type: UPDATE_CURRENT_QUIZ,
  payload: quizData
})

export const REMOVE_CURRENT_QUIZ = 'remove.current.quiz'
export const removeCurrentQuiz = quizData => ({
  type: REMOVE_CURRENT_QUIZ,
  payload: quizData
})