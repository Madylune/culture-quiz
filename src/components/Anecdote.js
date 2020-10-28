import React from 'react'
import styled from 'styled-components'
import get from 'lodash/fp/get'
import { BREAKPOINTS } from '../helpers/theme'

const StyledAnecdote = styled.div`
  font-size: 22px;
`

const StyledImage = styled.img`
  max-height: 250px;
  max-width: 80%;
`

const StyledTitle = styled.h2`
  font-size: 25px;
  width: 80%;
  margin: 20px auto;

  @media (max-width: ${BREAKPOINTS.sm}) {
    font-size: 20px;
  }
`

const Anecdote = ({ currentQuestion }) => 
  <StyledAnecdote>
    <StyledImage src={get('picture', currentQuestion)} alt="Illustration de la question" />
    <StyledTitle>{get('desc', currentQuestion)}</StyledTitle>
  </StyledAnecdote>

export default Anecdote