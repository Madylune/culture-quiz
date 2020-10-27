import React, { useState, useCallback, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import Header from '../components/Header'
import { COLORS, BREAKPOINTS } from '../helpers/theme'
import { getPath } from '../helpers/routes'
import get from 'lodash/fp/get'
import getOr from 'lodash/fp/getOr'
import map from 'lodash/fp/map'
import head from 'lodash/fp/head'
import find from 'lodash/fp/find'
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

const StyledAnswer = styled.li`
  background-color: ${props => props.showCorrection ? props.isCorrect ? COLORS.green : props.userAnswer ? COLORS.red : COLORS.violet : COLORS.violet};
  color: #fff;
  font-size: 18px;
  margin: 15px auto;
  height: 50px;
  min-width: 40%;
  max-width: 75%;
  border-radius: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s;
  cursor: ${props => props.showCorrection ? 'default' : 'pointer'};

  &:hover {
    background-color: ${props => props.showCorrection ? undefined : COLORS.darkViolet};
    transform: scale(${props => props.showCorrection ? undefined : 1.1});
  }

  @media (max-width: ${BREAKPOINTS.sm}) {
    margin: 10px auto;
    font-size: 16px;
    height: 40px;
    width: 90%;
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
  const [ showCorrection, setShowCorrection ] = useState(false)
  const [ showResults, setShowResults ] = useState(false)
  const [ correctAnswer, setCorrectAnswer ] = useState(undefined)
  const [ userAnswer, setUserAnswer ] = useState(undefined)

  const currentUser = useSelector(state => state.currentUser)
  const quiz = useSelector(state => state.quiz)

  const onAnswerClick = useCallback(
    answer => {
      setUserAnswer(answer.id)
      const userScore = answer.isCorrect ? 1 : 0
      dispatch(updateCurrentUser({ score: getOr(0, 'score', currentUser) + userScore }))
      
      const _correctAnswer = find(answer => answer.isCorrect ,get('answers', currentQuestion))
      setCorrectAnswer(_correctAnswer.id)

      setShowCorrection(true)

      if (get('currentQuestionNb', quiz) === size(get('questions', quiz))) {
        setShowResults(true)
      }

    }, [currentQuestion, currentUser, quiz])

  const nextQuestion = () => {
    dispatch(updateCurrentQuiz({ currentQuestionNb: get('currentQuestionNb', quiz) + 1 }))

    const nextQuestion = get(['questions', quiz.currentQuestionNb], quiz)
    if (nextQuestion) {
      setCurrentQuestion(nextQuestion)
      setShowCorrection(false)
      setCorrectAnswer(undefined)
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
              <StyledAnswer 
                key={get('id', answer)} 
                onClick={() => !showCorrection && onAnswerClick(answer)} 
                isCorrect={correctAnswer === get('id', answer)} 
                showCorrection={showCorrection} 
                userAnswer={userAnswer === get('id', answer)}
              >
                {get('title', answer)}
              </StyledAnswer>
            , get('answers', currentQuestion))}
          </StyledAnswers>
          {showCorrection && !showResults && <StyledNextButton onClick={nextQuestion}>Question suivante <ArrowRightIcon /></StyledNextButton>}
          {showResults && <StyledNextButton onClick={goResults}>Résultats <ArrowRightIcon /></StyledNextButton>}
        </StyledWrapper>
      )}
    </StyledQuiz>
  )
}

export default withRouter(Quiz)