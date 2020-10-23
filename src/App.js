import React from 'react'
import {
  Route,
  HashRouter as Router,
  Switch
} from 'react-router-dom'
import { getPath } from './helpers/routes'
import Home from './pages/Home'
import Quiz from './pages/Quiz'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path={getPath('home')} component={Home}></Route>
        <Route path={getPath('quiz')} component={Quiz}></Route>
      </Switch>
    </Router>
  )
}

export default App
