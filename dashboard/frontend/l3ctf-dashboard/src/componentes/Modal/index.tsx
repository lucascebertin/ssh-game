import React, { ReactElement } from 'react'
import styled from 'styled-components/macro'

const Container = styled.div`
  width: 400px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 2em;
  background: black;
  border: 10px solid;
  border-image-slice: 1;
  border-width: 3px;
  border-image-source: ${({ color }) => color};
`

const InternalContainer = styled.div`
  color: white;
`

const Title = styled.h1`
  font-size: 150%;
  margin: 0 0 15px;
  color: white;
`

const CloseModalWindow = styled.a`
  color: #aaa;
  line-height: 50px;
  font-size: 80%;
  position: absolute;
  right: 0;
  text-align: center;
  top: 0;
  width: 70px;
  text-decoration: none;
  &:hover {
    color: black;
  }
`

const ModalWindow = styled.div`
  position: fixed;
  background-color: rgba(255, 255, 255, 0.25);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  visibility: hidden;
  pointer-events: none;
  transition: all 0.3s;
  visibility: visible;
  opacity: 1;
  pointer-events: auto;
`

export enum Nivel {
  default,
  erro,
  sucesso,
  aviso,
}

export type ModalProps = {
  titulo: string
  texto: string
  nivel: Nivel
}

export type ModalCloseProp = {
  onClose: () => void
}

const selecionaCores = (nivel: Nivel): string => {
  switch (nivel) {
    case Nivel.aviso:
      return 'linear-gradient(to left, #3497db, springgreen)'
    case Nivel.sucesso:
      return 'linear-gradient(to left, springgreen, yellow)'
    case Nivel.erro:
      return 'linear-gradient(to left, #9b58b6, orangered)'
    case Nivel.default:
      return 'linear-gradient(to left, #9b58b6, springgreen)'
    default:
      return 'linear-gradient(to left, #9b58b6, springgreen)'
  }
}

const Modal = ({
  nivel,
  titulo,
  texto,
  onClose,
}: ModalProps & ModalCloseProp): ReactElement => (
  <ModalWindow id="open-modal">
    <Container color={selecionaCores(nivel)}>
      <CloseModalWindow href="#" title="Fechar" onClick={onClose}>
        Fechar
      </CloseModalWindow>
      <Title>{titulo}</Title>
      <InternalContainer>{texto}</InternalContainer>
    </Container>
  </ModalWindow>
)

export default Modal
