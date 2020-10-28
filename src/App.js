import React from 'react'
import { useSelector } from 'react-redux'
import {
  Route,
  HashRouter as Router,
  Switch,
  Redirect
} from 'react-router-dom'
import { getPath } from './helpers/routes'
import Home from './pages/Home'
import Quiz from './pages/Quiz'
import Results from './pages/Results'
import isEmpty from 'lodash/fp/isEmpty'

const PrivateRoute = ({ component: Component, currentUser, ...rest }) =>
  <Route 
    {...rest}
    render={props => !isEmpty(currentUser)
      ? <Component {...props} />
      : <Redirect to={{ pathname: getPath('home'), state: { from: props.location } }} />
    }
  />

function App() {
  const currentUser = useSelector(state => state.currentUser)
  return (
    <Router>
      <Switch>
        <Route exact path={getPath('home')} component={Home}></Route>
        <Route path={getPath('quiz')} component={Quiz}></Route>
        <PrivateRoute path={getPath('results')} currentUser={currentUser} component={Results}></PrivateRoute>
      </Switch>
    </Router>
  )
}

export default App
