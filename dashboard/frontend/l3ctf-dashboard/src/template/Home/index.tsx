import React, { ReactElement } from 'react'
import Cadastro from '../../dominio/Cadastro'
import styled from 'styled-components/macro'
import { theme } from '../../styles/main'

const Title = styled.h1`
  color: ${theme.colors.green};
  font-family: 'Josefin Sans';
  font-size: 3rem;
  text-align: center;
`

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
