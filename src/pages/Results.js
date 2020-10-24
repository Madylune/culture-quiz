import React from 'react'
import { useSelector } from 'react-redux'
import Header from '../components/Header'
import get from 'lodash/fp/get'
import size from 'lodash/fp/size'

const Results = () => {
  const currentUser = useSelector(state => state.currentUser)
  const quiz = useSelector(state => state.quiz)
  return (
    <>
      <Header />
      <h1>Ton score: {get('score', currentUser)} / {size(get('questions', quiz))}</h1>
    </>
  )
}

export default Results