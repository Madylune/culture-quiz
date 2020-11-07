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
  width: 70%;
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
    width: 100%;
  }
`

const Answer = ({ answer, userAnswer, onAnswerClick, showCorrection }) => {
  return (
    <StyledAnswer 
      onClick={() => !showCorrection && onAnswerClick(answer)} 
      isCorrect={get('isCorrect', answer)} 
      showCorrection={showCorrection} 
      userAnswer={userAnswer === get('id', answer)}
    >
      {get('title', answer)}
    </StyledAnswer>
  )
}

export default Answer
