import React, { useState, useCallback, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import Header from '../components/Header'
import Question from '../components/Question'
import Anecdote from '../components/Anecdote'
import Loader from '../components/Loader'
import { BREAKPOINTS } from '../helpers/theme'
import { getPath } from '../helpers/routes'
import get from 'lodash/fp/get'
import getOr from 'lodash/fp/getOr'
import head from 'lodash/fp/head'
import size from 'lodash/fp/size'
import shuffle from 'lodash/fp/shuffle'
import take from 'lodash/fp/take'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
import { dispatch } from '../services/store'
import { updateCurrentUser } from '../actions/currentUser'
import { updateCurrentQuiz } from '../actions/quiz'
import { QUIZ_API_URL } from '../services/api'
import axios from 'axios'

const TOTAL_QUESTIONS = 10

const StyledQuiz = styled.div``

const StyledWrapper = styled.div`
  position: relative;
  width: 50%;
  min-height: 700px;
  height: fit-content;
  margin: 0px auto;
  padding: 10px;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.9) 0px 2px 8px;
  text-align: center;

  @media (max-width: ${BREAKPOINTS.sm}) {
    width: 90%;
    min-height: 560px;
  }
`

const StyledNextButton = styled.div`
  position: absolute;
  bottom: 15px;
  right: 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  animation: back-and-forth 0.5s infinite alternate;
  
  @keyframes back-and-forth {
    from { transform: translateX(0px); }
    to { transform: translateX(-10px); }
  }
`

const Quiz = ({ history }) => {
  const [ currentQuestion, setCurrentQuestion ] = useState(undefined)
  const [ userAnswer, setUserAnswer ] = useState(undefined)
  const [ anecdote, showAnecdote ] = useState(false)

  const currentUser = useSelector(state => state.currentUser)
  const quiz = useSelector(state => state.quiz)

  const onAnswerClick = useCallback(
    answer => {
      setUserAnswer(answer.id)
      const userScore = answer.isCorrect ? 1 : 0
      dispatch(updateCurrentUser({ score: getOr(0, 'score', currentUser) + userScore }))
    }, [currentUser])

  const nextQuestion = () => {
    dispatch(updateCurrentQuiz({ currentQuestionNb: get('currentQuestionNb', quiz) + 1 }))

    const nextQuestion = get(['questions', quiz.currentQuestionNb], quiz)
    if (nextQuestion) {
      setCurrentQuestion(nextQuestion)
      setUserAnswer(undefined)
      showAnecdote(false)
    }
  }

  const goResults = () => history.push(getPath('results'))

  useEffect(() => {
    axios.get(QUIZ_API_URL).then(res => {
      const results = get('data', res)
      const sortedQuestion = shuffle(take(TOTAL_QUESTIONS, results))
      const quizData = {
        questions: sortedQuestion,
        currentQuestionNb: 1
      }
      setCurrentQuestion(head(sortedQuestion))
      quizData && dispatch(updateCurrentQuiz(quizData))
    })
  }, [])

  const showResults = get('currentQuestionNb', quiz) === size(get('questions', quiz))
  return (
    <StyledQuiz>
      <Header />
      {currentQuestion ? (
        <StyledWrapper>
          {anecdote ? (
            <Anecdote currentQuestion={currentQuestion} />
          ) : (
            <Question onAnswerClick={onAnswerClick} quiz={quiz} currentQuestion={currentQuestion} userAnswer={userAnswer} />
          )}
          {!anecdote && userAnswer && <StyledNextButton onClick={() => showAnecdote(true)}>Suite <ArrowRightIcon /></StyledNextButton>}
          {anecdote && userAnswer && !showResults && <StyledNextButton onClick={nextQuestion}>Question suivante <ArrowRightIcon /></StyledNextButton>}
          {anecdote && userAnswer && showResults && <StyledNextButton onClick={goResults}>Résultats <ArrowRightIcon /></StyledNextButton>}
        </StyledWrapper>
      ) : <Loader />}
    </StyledQuiz>
  )
}

export default withRouter(Quiz)