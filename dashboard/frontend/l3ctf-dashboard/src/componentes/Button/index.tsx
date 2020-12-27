import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'

const Button = styled(Link)`
  border: none;
  box-shadow: 0 0 0 1px ghostwhite;
  background-color: transparent;
  font-family: 'Lato';
  color: ghostwhite;
  padding: 0.5rem 2rem;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;

  &:focus {
    outline: none;
  }

  &:hover {
    box-shadow: 0 0 0 3px springgreen;
    color: springgreen;
  }
`

export default Button
