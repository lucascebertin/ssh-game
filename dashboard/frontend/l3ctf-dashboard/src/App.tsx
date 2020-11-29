import React, { ReactElement } from 'react'
import styled from 'styled-components'
import Home from './template/Home'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './template/Login'

const AppContainer = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
`

const App = (): ReactElement => {
  return (
    <AppContainer>
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </AppContainer>
  )
}

export default App
