import React from 'react'
import styled from 'styled-components'
import { COLORS, BREAKPOINTS } from '../helpers/theme'

const StyledButton = styled.div`
  background-color: ${COLORS.violet};
  border-radius: 40px;
  width: 300px;
  height: 80px;
  line-height: 80px;
  text-align: center;
  font-size: 22px;
  font-weight: bold;
  text-transform: uppercase;
  color: #fff;
  cursor: pointer;
  margin: 50px auto;
  transition: 0.3s;

  &:hover {
    background-color: ${COLORS.darkViolet};
    transform: scale(1.1);
  }

  @media (max-width: ${BREAKPOINTS.sm}) {
    width: 250px;
    height: 50px;
    line-height: 50px;
    font-size: 20px;
  }
`

const Button = ({ children, onClick }) => 
  <StyledButton onClick={onClick}>
    {children}
  </StyledButton>

export default Button