import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import Header from '../components/Header'
import get from 'lodash/fp/get'
import getOr from 'lodash/fp/getOr'
import size from 'lodash/fp/size'
import { BREAKPOINTS, COLORS } from '../helpers/theme'

const StyledCertificate = styled.div`
  width: 60%;
  margin: auto;
  position: relative;

  @media (max-width: ${BREAKPOINTS.sm}) {
    width: 90%;
  }
`

const StyledCertificateImg = styled.img`
  width: 100%;
`

const StyledContent = styled.div`
  position: absolute;
  top: 35%;
  left: 20%;
`

const StyledTitle = styled.h1`
  @media (max-width: ${BREAKPOINTS.xs}) {
    font-size: 20px;
  }
`

const StyledSubtitle = styled.h2`
  color: ${props => props.isBad ? COLORS.red : COLORS.green};
  @media (max-width: ${BREAKPOINTS.xs}) {
    font-size: 18px;
  }
`

const getGrading = score => {
  switch (score) {
    case 10:
      return 'Excellent'
    case 9:
      return 'Très bien'
    case 8:
      return 'Bien'
    case 7:
      return 'Très suffisant'
    case 6:
      return 'Suffisant'
    case 5:	
      return 'Moyen'
    case 4:
      return 'Insuffisant'
    case 3:
      return 'Très insuffisant'
    case 2:
      return 'Mauvais'
    case 1:
    case 0:
      return 'Très mauvais'
    default:
      return null
  }
}

const Results = () => {
  const currentUser = useSelector(state => state.currentUser)
  const quiz = useSelector(state => state.quiz)
  return (
    <>
      <Header />
      <StyledCertificate>
        <StyledCertificateImg src={require('../assets/certificate.png')} alt="Certificat" />
        <StyledContent>
          <StyledTitle>Ton score: {getOr(0, 'score', currentUser)} / {size(get('questions', quiz))}</StyledTitle>
          <StyledSubtitle isBad={getOr(0, 'score', currentUser) < 5}>{getGrading(getOr(0, 'score', currentUser))}</StyledSubtitle>
        </StyledContent>
      </StyledCertificate>
    </>
  )
}

export default Results