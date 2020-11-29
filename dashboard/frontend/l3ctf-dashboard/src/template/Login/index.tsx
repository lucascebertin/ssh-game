import React, { ReactElement } from 'react'
import styled from 'styled-components/macro'
import ContainerSections, {
  SectionGradient,
} from '../../componentes/Container/Sections'
import LoginContainer from '../../componentes/Container/Login'
import ActionsContainer from '../../componentes/Container/Action'
import Label from '../../componentes/Label'
import Input from '../../componentes/Input'
import Button from '../../componentes/Button'
import Title from '../../componentes/H1'

const Container = styled.div`
  flex-direction: row;
  width: 100%;
`

const Login = (): ReactElement => {
  return (
    <Container>
      <Title>L3CTF</Title>
      <ContainerSections>
        <SectionGradient>
          <LoginContainer>
            <Label>
              Entre com sua chave de acesso
              <Input type="text"></Input>
            </Label>
            <ActionsContainer>
              <Button>Cadastrar</Button>
            </ActionsContainer>
          </LoginContainer>
        </SectionGradient>
      </ContainerSections>
    </Container>
  )
}

export default Login
