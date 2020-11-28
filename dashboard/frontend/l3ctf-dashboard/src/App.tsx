import React, { ReactElement } from 'react'
import styled from 'styled-components'
import Home from './template/Home'

const AppContainer = styled.section`
  width: 100%;
`

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
`

const App = (): ReactElement => {
  return (
    <AppContainer>
      <LoginContainer>
        <Home />
      </LoginContainer>
    </AppContainer>
  )
}

export default App
