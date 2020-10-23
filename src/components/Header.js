import React from 'react'
import styled from 'styled-components'

const StyledHeader = styled.header`
  height: 200px;
`

const StyledLogo = styled.img`
  height: 100%;
`

const Header = () => 
  <StyledHeader>
    <StyledLogo src={require('../assets/culture_quiz_logo.png')} alt="logo" />
  </StyledHeader>

export default Header