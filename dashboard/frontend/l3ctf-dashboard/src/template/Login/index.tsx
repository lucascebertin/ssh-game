import React, { ReactElement } from 'react'
import styled from 'styled-components/macro'
import Title from '../../componentes/H1'
import Login from '../../dominio/Login'

const Container = styled.div`
  flex-direction: row;
  width: 100%;
`

const LoginTemplate = (): ReactElement => {
  return (
    <Container>
      <Title>L3CTF</Title>
      <Login />
    </Container>
  )
}

export default LoginTemplate
