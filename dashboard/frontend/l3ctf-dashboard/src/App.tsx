import React, { ReactElement, useState } from 'react'
import styled from 'styled-components'
import Home from './template/Home'
import { Router, Switch, Route } from 'react-router-dom'
import Login from './template/Login'
import Dashboard from './dominio/Dashboard'
import Modal, { ModalProps, Nivel } from './componentes/Modal'
import history from './infrastructure/history'

const AppContainer = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
`

const App = (): ReactElement => {
  const [abrir, setAbrir] = useState<boolean>(false)
  const [props, setProps] = useState<ModalProps>()

  const abrirHandler = (titulo: string, texto: string, nivel: Nivel) => {
    setProps({ titulo, texto, nivel })
    setAbrir(true)
  }

  return (
    <AppContainer>
      <Router history={history}>
        <Switch>
          <Route path="/login">
            <Login handleModal={abrirHandler} />
          </Route>
          <Route path="/dashboard">
            <Dashboard handleModal={abrirHandler} />
          </Route>
          <Route path="/">
            <Home handleModal={abrirHandler} />
          </Route>
        </Switch>
      </Router>
      {abrir && <Modal {...props} onClose={() => setAbrir(false)} />}
    </AppContainer>
  )
}

export default App
