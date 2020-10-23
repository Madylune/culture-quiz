import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import Header from '../components/Header'
import { QUESTIONS } from '../helpers/fixtures'
import get from 'lodash/fp/get'
import map from 'lodash/fp/map'
import head from 'lodash/fp/head'
import find from 'lodash/fp/find'

const StyledWrapper = styled.div`
  width: 60%;
  height: 700px;
  margin: 10px auto;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.9) 0px 2px 8px;
  text-align: center;
`

const StyledQuestion = styled.div`
  padding: 20px;
  text-align: center;
  font-size: 20px;
`

const StyledImage = styled.img`
  width: 90%;
`

const StyledAnswers = styled.ul`
  padding: 0;
  list-style-type: none;
`

const StyledAnswer = styled.li`
  background-color: ${props => props.showCorrection ? props.isCorrect ? '#21bb21' : props.userAnswer ? '#ff4040' : '#8a25b1' : '#8a25b1'};
  color: #fff;
  font-size: 18px;
  margin: 15px auto;
  height: 50px;
  width: 60%;
  border-radius: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  &:hover {
    background-color: #5e1779;
  }
`

const Quiz = () => {
  const [ showCorrection, setShowCorrection ] = useState(false)
  const [ correctAnswer, setCorrectAnswer ] = useState(undefined)
  const [ userAnswer, setUserAnswer ] = useState(undefined)

  const question = head(QUESTIONS)
  const onAnswerClick = useCallback(
    answer => {
      setShowCorrection(true)
      setUserAnswer(answer.id)

      const _correctAnswer = find(answer => answer.isCorrect ,get('answers', question))
      setCorrectAnswer(_correctAnswer.id)
    }, [question])

  return (
    <div>
      <Header />
      <StyledWrapper>
        <StyledQuestion>{get('title', question)}</StyledQuestion>
        <StyledImage src={get('picture', question)} alt="Illustration de la question" />
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
          ,get('answers', question))}
        </StyledAnswers>
      </StyledWrapper>
    </div>
  )
}

export default Quiz