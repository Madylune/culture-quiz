import React from 'react'
import styled from 'styled-components'
import { BREAKPOINTS } from '../helpers/theme'

const StyledFooter = styled.header`
  position: absolute;
  bottom: 10px;
  right: 10px;

  @media (max-width: ${BREAKPOINTS.sm}) {
    font-size: 14px;
  }
`

const Footer = () => 
  <StyledFooter>
    © Madylune 2020
  </StyledFooter>

export default Footer