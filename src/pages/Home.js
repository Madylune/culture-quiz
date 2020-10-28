import React from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import Header from '../components/Header'
import Button from '../components/Button'
import { getPath } from '../helpers/routes'
import { BREAKPOINTS } from '../helpers/theme'

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

const Home = ({ history }) => {
  return (
    <>
      <Header />
      <StyledText>
        <h1>
          Développe ta culture générale facilement en t'amusant ! Avec Culture Quiz, teste-toi et améliore ton score quotidiennement afin de booster ta matière grise !
        </h1>
      </StyledText>
      <Button onClick={() => history.push(getPath('quiz'))}>Lancer le quiz</Button>
    </>
  )
}

export default withRouter(Home)
