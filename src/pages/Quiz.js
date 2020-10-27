import React, { useState, useCallback, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import Header from '../components/Header'
import Answer from '../components/Answer'
import { BREAKPOINTS } from '../helpers/theme'
import { getPath } from '../helpers/routes'
import get from 'lodash/fp/get'
import getOr from 'lodash/fp/getOr'
import map from 'lodash/fp/map'
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
    min-height: 600px;
  }
`

const StyledQuestionNumber = styled.div``

const StyledQuestion = styled.div`
  padding: 20px;
  text-align: center;
  font-size: 20px;

  @media (max-width: ${BREAKPOINTS.sm}) {
    padding: 15px;
    font-size: 18px;
  }
`

const StyledImage = styled.img`
  max-height: 250px;
  max-width: 80%;
`

const StyledAnswers = styled.ul`
  padding: 0;
  list-style-type: none;
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
    }
  }

  const goResults = () => history.push(getPath('results'))

  useEffect(() => {
    axios.get(QUIZ_API_URL).then(res => {
      const results = get('data', res)
      const sortedQuestion = shuffle(take(10, results))
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
      {currentQuestion && (
        <StyledWrapper>
        <StyledQuestionNumber>{get('currentQuestionNb', quiz)} / {size(get('questions', quiz))}</StyledQuestionNumber>
          <StyledQuestion>{get('title', currentQuestion)}</StyledQuestion>
          <StyledImage src={get('picture', currentQuestion)} alt="Illustration de la question" />
          <StyledAnswers>
            {map(answer => 
              <Answer key={get('id', answer)} answer={answer} userAnswer={userAnswer} onAnswerClick={onAnswerClick} />
            , get('answers', currentQuestion))}
          </StyledAnswers>
          {userAnswer && !showResults && <StyledNextButton onClick={nextQuestion}>Question suivante <ArrowRightIcon /></StyledNextButton>}
          {userAnswer && showResults && <StyledNextButton onClick={goResults}>Résultats <ArrowRightIcon /></StyledNextButton>}
        </StyledWrapper>
      )}
    </StyledQuiz>
  )
}

export default withRouter(Quiz)