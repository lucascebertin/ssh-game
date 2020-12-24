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
import { cadastrar } from './service'
import { useHistory } from 'react-router-dom'
import { login } from '../Login/service'

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

const ComponenteCadastro = ({ onCadastrado }): ReactElement => {
  const [itemInput, setItemInput] = useState('')
  const cadastrarTime = () => {
    cadastrar(itemInput).then((token) => onCadastrado(token))
  }

  return (
    <LoginContainer>
      <Label>
        Cadastre seu time
        <Input
          type="text"
          value={itemInput}
          onChange={(event) => setItemInput(event.target.value)}
        ></Input>
        <SignIn>
          Já tem cadastro? <Link to="/login">faça o login</Link>
        </SignIn>
      </Label>
      <ActionsContainer>
        <Button to="/" onClick={() => cadastrarTime()}>
          Cadastrar
        </Button>
      </ActionsContainer>
    </LoginContainer>
  )
}

const ComponenteChaveDeAcesso = ({ token }): ReactElement => {
  const history = useHistory()

  const clickHandler = () => {
    login(token).then((bearer) => {
      localStorage.setItem('token', bearer)
      history.push('/dashboard')
    })
  }

  return (
    <LoginContainer>
      <Label>
        Chave de acesso gerada com sucesso, use-a para se logar:
        <Hash>{token || ''}</Hash>
        <Warning>
          Lembre-se, está é a última vez que terá acesso a essa chave, salve-a
          em um lugar seguro antes de prosseguir.
        </Warning>
      </Label>
      <ActionsContainer>
        <Button to="#" onClick={clickHandler}>
          Prosseguir
        </Button>
      </ActionsContainer>
    </LoginContainer>
  )
}

const Cadastro = (): ReactElement => {
  const [cadastrado, setCadastrado] = useState<boolean>(false)
  const [token, setToken] = useState<string>('')

  const cadastroHandler = (tokenCadastro: string): void => {
    setToken(tokenCadastro)
    setCadastrado(true)
  }

  return (
    <ContainerSections>
      <SectionGradient>
        {cadastrado ? (
          <ComponenteChaveDeAcesso token={token} />
        ) : (
          <ComponenteCadastro onCadastrado={cadastroHandler} />
        )}
      </SectionGradient>
    </ContainerSections>
  )
}

export default Cadastro
