import React, { ReactElement } from 'react'
import CadastrarButton from '../../componentes/Button/CadastrarButton'
import ActionsContainer from '../../componentes/Container/Action'
import LoginContainer from '../../componentes/Container/Login'
import Label from '../../componentes/Label'
import SignInLink from '../../componentes/Link/SignIn'
import styled from 'styled-components/macro'
import ContainerSections from '../../componentes/Container/Sections'
import Input from '../../componentes/Input'

const LoginSection = styled.section`
  width: 100%;
  max-width: 350px;
  margin: 0 auto;
  padding: 1.5rem;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 0.25rem;
}
`
const LoginSectionGradient = styled(LoginSection)`
  border: 10px solid;
  border-image-slice: 1;
  border-width: 3px;
  border-image-source: linear-gradient(to left, #9b58b6, springgreen);
`

const Cadastro = (): ReactElement => {
  return (
    <ContainerSections>
      <LoginSectionGradient>
        <LoginContainer>
          <Label>
            Cadastre seu time
            <Input type="text"></Input>
            <SignInLink />
          </Label>
          <ActionsContainer>
            <CadastrarButton>Cadastrar</CadastrarButton>
          </ActionsContainer>
        </LoginContainer>
      </LoginSectionGradient>
    </ContainerSections>
  )
}

export default Cadastro
