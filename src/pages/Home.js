import React from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import Header from '../components/Header'
import { getPath } from '../helpers/routes'
import { COLORS, BREAKPOINTS } from '../helpers/theme'

const StyledText = styled.div`
  width: 80%;
  margin: 20px auto;
  text-align: center;

  h1 {
    font-size: 22px;
    line-height: 30px;
    color: #383838;

    @media (max-width: ${BREAKPOINTS.sm}) {
      font-size: 16px;
      line-height: 25px;
    }
  }
`

const StyledPlay = styled.div`
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
