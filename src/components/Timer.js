import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Slider from '@material-ui/core/Slider'
import { COLORS, BREAKPOINTS } from '../helpers/theme'
import { dispatch } from '../services/store'
import { updateCurrentQuiz } from '../actions/quiz'

const MAX_SECOND = 30

const StyledTimer = styled.div`
  width: 40%;
  margin: 50px auto 20px;

  @media (max-width: ${BREAKPOINTS.sm}) {
    width: 70%;
    margin: auto;
  }
`

const StyledSlider = styled(Slider)`
  && .MuiSlider-root, .MuiSlider-rail, .MuiSlider-track {
    height: 8px;
    border-radius: 4px;
    color: ${props => props.value > 15 ? COLORS.green : COLORS.red};
  }
  && .MuiSlider-thumb {
    color: transparent;
  }
`

const Timer = ({ stop }) => {
  const [ progress, setProgress ] = useState(MAX_SECOND)

  useEffect(() => {
    let timeout
    if (progress > 0) {
      timeout = setTimeout(() => !stop && setProgress(progress - 1), 1000)
    } else {
      setProgress(0)
      dispatch(updateCurrentQuiz({ timeIsOver: true }))
    }
    return () =>  clearTimeout(timeout)
  }, [progress, stop])
  
  return (
    <StyledTimer>
      <StyledSlider
        value={progress}
        step={1}
        min={0}
        max={MAX_SECOND}
      />
    </StyledTimer>
  )
}

export default Timer