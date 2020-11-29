import React, { ReactElement } from 'react'
import Button from '../../componentes/Button'
import ActionsContainer from '../../componentes/Container/Action'
import LoginContainer from '../../componentes/Container/Login'
import Label from '../../componentes/Label'
import styled from 'styled-components/macro'
import ContainerSections, {
  SectionGradient,
} from '../../componentes/Container/Sections'
import Input from '../../componentes/Input'
import Link from '../../componentes/Link'

const SignIn = styled.div`
  margin-top: 0.5rem;
  font-size: 0.8rem;
`

const Cadastro = (): ReactElement => {
  return (
    <ContainerSections>
      <SectionGradient>
        <LoginContainer>
          <Label>
            Cadastre seu time
            <Input type="text"></Input>
            <SignIn>
              Já tem cadastro? <Link to="/login">faça o login</Link>
            </SignIn>
          </Label>
          <ActionsContainer>
            <Button>Cadastrar</Button>
          </ActionsContainer>
        </LoginContainer>
      </SectionGradient>
    </ContainerSections>
  )
}

export default Cadastro
