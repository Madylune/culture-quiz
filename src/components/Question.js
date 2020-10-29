import React from 'react'
import styled from 'styled-components'
import Answer from '../components/Answer'
import get from 'lodash/fp/get'
import map from 'lodash/fp/map'
import size from 'lodash/fp/size'
import { BREAKPOINTS } from '../helpers/theme'

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
  @media (max-width: ${BREAKPOINTS.sm}) {
    max-height: 200px;
  }
`

const StyledAnswers = styled.ul`
  padding: 0;
  list-style-type: none;
`

const Question = ({ onAnswerClick, quiz, currentQuestion, userAnswer, showCorrection }) => 
  <>
    <StyledQuestionNumber>{get('currentQuestionNb', quiz)} / {size(get('questions', quiz))}</StyledQuestionNumber>
    <StyledQuestion>{get('title', currentQuestion)}</StyledQuestion>
    <StyledImage src={get('picture', currentQuestion)} alt="Illustration de la question" />
    <StyledAnswers>
      {map(answer => 
        <Answer key={get('id', answer)} answer={answer} userAnswer={userAnswer} onAnswerClick={onAnswerClick} showCorrection={showCorrection} />
      , get('answers', currentQuestion))}
    </StyledAnswers>
  </>

export default Question