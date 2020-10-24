import React from 'react'
import { useSelector } from 'react-redux'
import Header from '../components/Header'
import get from 'lodash/fp/get'

const Results = () => {
  const currentUser = useSelector(state => state.currentUser)
  return (
    <>
      <Header />
      <h1>Ton score: {get('score', currentUser)} / 10</h1>
    </>
  )
}

export default Results