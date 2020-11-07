import React from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Button from '../components/Button'
import { getPath } from '../helpers/routes'
import { BREAKPOINTS } from '../helpers/theme'
import { generateRandomId } from '../helpers/utils'
import { dispatch } from '../services/store'
import { updateCurrentUser } from '../actions/currentUser'

const StyledText = styled.div`
  width: 50%;
  margin: 20px auto;
  text-align: center;

  @media (max-width: ${BREAKPOINTS.sm}) {
    width: 80%;
  }

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
  const startQuiz = () => {
    createUser()
    history.push(getPath('quiz'))
  }
  const createUser = () => {
    dispatch(updateCurrentUser({ id: generateRandomId() }))
  }
  return (
    <>
      <Header />
      <StyledText>
        <h1>
          Développe ta culture générale facilement en t'amusant ! Avec Culture Quiz, teste-toi et améliore ton score quotidiennement afin de booster ta matière grise !
        </h1>
      </StyledText>
      <Button onClick={startQuiz}>Lancer le quiz</Button>
      <Footer />
    </>
  )
}

export default withRouter(Home)
