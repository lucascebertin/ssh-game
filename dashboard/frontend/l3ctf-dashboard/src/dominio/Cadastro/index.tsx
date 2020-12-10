import React, { ReactElement, useState } from 'react'
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

const Hash = styled.div`
  background-color: ghostwhite;
  padding: 0.5rem;
  color: dimgray;
  text-align: center;
  margin: 1rem 0;
`

const Warning = styled.div`
  color: khaki;
`

const ComponenteCadastro = ({ onCadastrado }): ReactElement => (
  <LoginContainer>
    <Label>
      Cadastre seu time
      <Input type="text"></Input>
      <SignIn>
        Já tem cadastro? <Link to="/login">faça o login</Link>
      </SignIn>
    </Label>
    <ActionsContainer>
      <Button to="/" onClick={() => onCadastrado(true)}>
        Cadastrar
      </Button>
    </ActionsContainer>
  </LoginContainer>
)

const ComponenteChaveDeAcesso = (): ReactElement => (
  <LoginContainer>
    <Label>
      Chave de acesso gerada com sucesso, use-a para se logar:
      <Hash>#09901283klsajsklALKjdks9239!@</Hash>
      <Warning>
        Lembre-se, está é a última vez que terá acesso a essa chave, salve-a em
        um lugar seguro antes de prosseguir.
      </Warning>
    </Label>
    <ActionsContainer>
      <Button to="/dashboard">Prosseguir</Button>
    </ActionsContainer>
  </LoginContainer>
)

const Cadastro = (): ReactElement => {
  const [cadastrado, setCadastrado] = useState<boolean>(false)

  return (
    <ContainerSections>
      <SectionGradient>
        {cadastrado ? (
          <ComponenteChaveDeAcesso />
        ) : (
          <ComponenteCadastro onCadastrado={setCadastrado} />
        )}
      </SectionGradient>
    </ContainerSections>
  )
}

export default Cadastro
