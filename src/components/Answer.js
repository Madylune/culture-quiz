import React from 'react'
import styled from 'styled-components'
import { COLORS, BREAKPOINTS } from '../helpers/theme'
import get from 'lodash/fp/get'

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

const Answer = ({ answer, userAnswer, onAnswerClick }) => {
  return (
    <StyledAnswer 
      onClick={() => !userAnswer && onAnswerClick(answer)} 
      isCorrect={get('isCorrect', answer)} 
      showCorrection={userAnswer} 
      userAnswer={userAnswer === get('id', answer)}
    >
      {get('title', answer)}
    </StyledAnswer>
  )
}

export default Answer
