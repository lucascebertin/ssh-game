import React, { ReactElement } from 'react'
import Cadastro from '../../dominio/Cadastro'
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
      <Cadastro />
    </Container>
  )
}

export default Home
