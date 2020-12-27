import React, { ReactElement } from 'react'
import styled from 'styled-components/macro'
import Title from '../../componentes/H1'
import { DashboardProps } from '../../dominio/Dashboard'
import Login from '../../dominio/Login'

const Container = styled.div`
  flex-direction: row;
  width: 100%;
`

const LoginTemplate = ({ handleModal }: DashboardProps): ReactElement => {
  return (
    <Container>
      <Title>L3CTF</Title>
      <Login handleModal={handleModal} />
    </Container>
  )
}

export default LoginTemplate
