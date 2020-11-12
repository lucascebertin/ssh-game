import React, { ReactElement } from 'react'
import styled from 'styled-components'
import { theme } from './styles/main'

const AppContainer = styled.section`
    width: 100%;
`

const LoginContainer = styled.div`
    display: flex;
    justify-content: center;
`

const CtfTitle = styled.h1`
    color: ${theme.colors.green};
    font-family: 'Josefin Sans';
    font-size: 3rem;
`

const App = (): ReactElement => {
    return (
        <AppContainer>
            <LoginContainer>
                <CtfTitle>L3CTF</CtfTitle>
            </LoginContainer>
        </AppContainer>
    )
}

export default App
