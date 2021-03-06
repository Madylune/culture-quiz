import React from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { BREAKPOINTS } from '../helpers/theme'
import { getPath } from '../helpers/routes'

const StyledHeader = styled.header`
  height: 180px;

  @media (max-width: ${BREAKPOINTS.sm}) {
    height: 150px;
    text-align: center;
  }

  @media (max-width: ${BREAKPOINTS.xs}) {
    display: ${props => props.hide ? 'none' : undefined};
  }
`

const StyledLogo = styled.img`
  height: 100%;
  cursor: pointer;
`

const Header = ({ history, hide }) => 
  <StyledHeader hide={hide}>
    <StyledLogo src={require('../assets/culture_quiz_logo.png')} alt="logo" onClick={() => history.push(getPath('home'))} />
  </StyledHeader>

export default withRouter(Header)