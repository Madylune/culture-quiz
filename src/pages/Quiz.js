import React, { useState, useCallback, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import Header from '../components/Header'
import Question from '../components/Question'
import Anecdote from '../components/Anecdote'
import Loader from '../components/Loader'
import Timer from '../components/Timer'
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
import { getQuiz, getAllQuestions } from '../selectors/quiz'
import { getCurrentUser } from '../selectors/currentUser'

const TOTAL_QUESTIONS = 10

const StyledQuiz = styled.div`
  display: flex;

  @media (max-width: ${BREAKPOINTS.sm}) {
    flex-direction: column;
  }
`

const StyledQuestion = styled.div`
  width: 100%;
`

const StyledWrapper = styled.div`
  position: relative;
  width: 50%;
  min-height: 700px;
  height: fit-content;
  margin: 20px auto 0;
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
  const [ correction, showCorrection ] = useState(false)
  const [ anecdote, showAnecdote ] = useState(false)

  const currentUser = useSelector(getCurrentUser)
  const quiz = useSelector(getQuiz)
  const allQuestions = useSelector(getAllQuestions)

  const onAnswerClick = useCallback(
    answer => {
      setUserAnswer(answer.id)
      showCorrection(true)
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

  const goAnecdote = () => {
    showAnecdote(true)
    dispatch(updateCurrentQuiz({ timeIsOver: false }))
    showCorrection(false)
  }

  const goResults = () => history.push(getPath('results'))

  useEffect(() => {
    const sortedQuestion = shuffle(take(TOTAL_QUESTIONS, allQuestions))
    const quizData = {
      questions: sortedQuestion,
      currentQuestionNb: 1,
      timeIsOver: false
    }
    setCurrentQuestion(head(sortedQuestion))
    quizData && dispatch(updateCurrentQuiz(quizData))
  }, [])

  useEffect(() => {
    if (get('timeIsOver', quiz)) {
      setUserAnswer(undefined)
      showCorrection(true)
      dispatch(updateCurrentUser({ score: getOr(0, 'score', currentUser) + 0 }))
    }
  }, [quiz])

  const showResults = get('currentQuestionNb', quiz) === size(get('questions', quiz))
  return (
    <StyledQuiz>
      <Header />
      {currentQuestion ? (
        <StyledQuestion>
          {!anecdote && <Timer />}
          <StyledWrapper>
            {anecdote ? (
              <Anecdote currentQuestion={currentQuestion} />
            ) : (
              <Question onAnswerClick={onAnswerClick} quiz={quiz} currentQuestion={currentQuestion} userAnswer={userAnswer} showCorrection={correction} />
            )}
            {!anecdote && correction && <StyledNextButton onClick={goAnecdote}>Suite <ArrowRightIcon /></StyledNextButton>}
            {anecdote && !showResults && <StyledNextButton onClick={nextQuestion}>Question suivante <ArrowRightIcon /></StyledNextButton>}
            {anecdote && showResults && <StyledNextButton onClick={goResults}>Résultats <ArrowRightIcon /></StyledNextButton>}
          </StyledWrapper>
        </StyledQuestion>
      ) : <Loader />}
    </StyledQuiz>
  )
}

export default withRouter(Quiz)