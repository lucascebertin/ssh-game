import styled from 'styled-components/macro'

const CadastrarButton = styled.button`
  border: none;
  box-shadow: 0 0 0 1px ghostwhite;
  background-color: transparent;
  font-family: 'Lato';
  color: ghostwhite;
  padding: 0.5rem 2rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
  }

  &:hover {
    box-shadow: 0 0 0 3px springgreen;
    color: springgreen;
  }
`

export default CadastrarButton
