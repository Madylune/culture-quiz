import React from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import Header from '../components/Header'
import { getPath } from '../helpers/routes'

const StyledText = styled.div`
  width: 80%;
  margin: 20px auto;
  text-align: center;

  h1 {
    font-size: 22px;
    line-height: 30px;
    color: #383838;
  }
`

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
  margin: 50px auto;

  &:hover {
    background-color: #5e1779;
  }
`

const Home = ({ history }) => {
  return (
    <>
      <Header />
      <StyledText>
        <h1>
          Développe ta culture générale facilement en t'amusant ! Avec Culture Quiz, teste-toi et améliore ton score quotidiennement afin de booster ta matière grise !
        </h1>
      </StyledText>
      <StyledPlay onClick={() => history.push(getPath('quiz'))}>Lancer le quiz</StyledPlay>
    </>
  )
}

export default withRouter(Home)
