import React from 'react'
import styled from 'styled-components'
import { COLORS } from '../helpers/theme'

const StyledLoader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`

const StyledSpinner = styled.div`
  border: 10px solid #f3f3f3;
  border-radius: 50%;
  border-top: 10px solid ${COLORS.violet};
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`

const Loader = () => 
  <StyledLoader>
    <h2>Chargement...</h2>
    <StyledSpinner></StyledSpinner>
  </StyledLoader>

export default Loader