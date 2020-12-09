import React, { ReactElement } from 'react'
import Dashboard from '../../dominio/Dashboard'
import styled from 'styled-components/macro'
import Title from '../../componentes/H1'

const Container = styled.div`
  flex-direction: row;
  width: 100%;
`

const Home = (): ReactElement => {
  return (
    <Container>
      <Title>L3CTF</Title>
      <Dashboard />
    </Container>
  )
}

export default Home
