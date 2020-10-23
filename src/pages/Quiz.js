import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import Header from '../components/Header'
import { QUESTIONS } from '../helpers/fixtures'
import { COLORS, BREAKPOINTS } from '../helpers/theme'
import get from 'lodash/fp/get'
import map from 'lodash/fp/map'
import head from 'lodash/fp/head'
import find from 'lodash/fp/find'
import size from 'lodash/fp/size'
import findIndex from 'lodash/fp/findIndex'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'

const StyledQuiz = styled.div``

const StyledWrapper = styled.div`
  position: relative;
  width: 60%;
  height: 700px;
  margin: 0px auto;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.9) 0px 2px 8px;
  text-align: center;

  @media (max-width: ${BREAKPOINTS.sm}) {
    width: 95%;
    height: 500px;
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
  height: 250px;

  @media (max-width: ${BREAKPOINTS.sm}) {
    width: 90%;
    height: auto;
  }
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
  width: 40%;
  border-radius: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  &:hover {
    background-color: ${props => props.showCorrection ? undefined : COLORS.darkViolet};
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
`

const Quiz = () => {
  const [ currentQuestion, setCurrentQuestion ] = useState(head(QUESTIONS))
  const [ showCorrection, setShowCorrection ] = useState(false)
  const [ correctAnswer, setCorrectAnswer ] = useState(undefined)
  const [ userAnswer, setUserAnswer ] = useState(undefined)

  const onAnswerClick = useCallback(
    answer => {
      setShowCorrection(true)
      setUserAnswer(answer.id)

      const _correctAnswer = find(answer => answer.isCorrect ,get('answers', currentQuestion))
      setCorrectAnswer(_correctAnswer.id)
    }, [currentQuestion])

  const nextQuestion = () => {
    const nextQuestion = get(findIndex(currentQuestion, QUESTIONS) + 1, QUESTIONS)

    if (nextQuestion) {
      setCurrentQuestion(nextQuestion)
      setShowCorrection(false)
      setCorrectAnswer(undefined)
      setUserAnswer(undefined)
    }
  }
  console.log("debug", {
    showCorrection,
    correctAnswer,
    userAnswer
  })
  return (
    <StyledQuiz>
      <Header />
      <StyledWrapper>
        <StyledQuestionNumber>{findIndex(currentQuestion, QUESTIONS) + 1} / {size(QUESTIONS)}</StyledQuestionNumber>
        <StyledQuestion>{get('title', currentQuestion)}</StyledQuestion>
        <StyledImage src={get('picture', currentQuestion)} alt="Illustration de la question" />
        <StyledAnswers>
          {map(answer => 
            <StyledAnswer 
              key={get('id', answer)} 
              onClick={() => onAnswerClick(answer)} 
              isCorrect={correctAnswer === get('id', answer)} 
              showCorrection={showCorrection} 
              userAnswer={userAnswer === get('id', answer)}
            >
              {get('title', answer)}
            </StyledAnswer>
          ,get('answers', currentQuestion))}
        </StyledAnswers>
        {showCorrection && <StyledNextButton onClick={nextQuestion}>Question suivante <ArrowRightIcon /></StyledNextButton>}
      </StyledWrapper>
    </StyledQuiz>
  )
}

export default Quiz