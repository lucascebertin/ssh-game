import React, { ReactElement } from 'react'
import Cadastro from '../../dominio/Cadastro'
import styled from 'styled-components/macro'
import Title from '../../componentes/H1'
import { DashboardProps } from '../../dominio/Dashboard'

const Container = styled.div`
  flex-direction: row;
  width: 100%;
`

const Home = ({ handleModal }: DashboardProps): ReactElement => {
  return (
    <Container>
      <Title>L3CTF</Title>
      <Cadastro handleModal={handleModal} />
    </Container>
  )
}

export default Home
