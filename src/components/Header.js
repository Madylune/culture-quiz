import React from 'react'
import styled from 'styled-components'
import { BREAKPOINTS } from '../helpers/theme'

const StyledHeader = styled.header`
  height: 200px;

  @media (max-width: ${BREAKPOINTS.sm}) {
    height: 150px;
    text-align: center;
  }
`

const StyledLogo = styled.img`
  height: 100%;
`

const Header = () => 
  <StyledHeader>
    <StyledLogo src={require('../assets/culture_quiz_logo.png')} alt="logo" />
  </StyledHeader>

export default Header