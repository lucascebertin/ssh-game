import React, { ReactElement } from 'react'
import styled from 'styled-components/macro'

const SignIn = styled.div`
  margin-top: 0.5rem;
  font-size: 0.8rem;
`

const SignInLink = (): ReactElement => (
  <SignIn>
    Já tem cadastro? <a href="#">faça o login</a>
  </SignIn>
)

export default SignInLink
