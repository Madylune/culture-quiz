import { dispatch } from './store'
import { updateCurrentQuiz } from '../actions/quiz'

const QUIZ_API_URL = "https://culture-quiz-api.herokuapp.com/questions"

export async function fetchQuestionsFromAPI() {
  try {
    const result = await fetch(QUIZ_API_URL)
    const data = await result.json()
    data && dispatch(updateCurrentQuiz({ allQuestions: data }))
    return data.res
  } catch (e) {
    return null
  }
}
