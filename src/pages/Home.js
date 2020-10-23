import React from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import Header from '../components/Header'
import { getPath } from '../helpers/routes'

const StyledPlay = styled.div`
  background-color: #8a25b1;
  border-radius: 40px;
  width: 300px;
  height: 80px;
  line-height: 80px;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  cursor: pointer;

  &:hover {
    background-color: #5e1779;
  }
`

const Home = ({ history }) => {
  return (
    <>
      <Header />
      <StyledPlay onClick={() => history.push(getPath('quiz'))}>Tester ma culture</StyledPlay>
    </>
  )
}

export default withRouter(Home)
