import styled from 'styled-components/macro'
import Input from '../Input'

const Label = styled.label`
  display: flex;
  flex-direction: column;
  color: ghostwhite;

  ${Input} {
    margin-top: 0.5rem;
    height: 35px;
    font-size: 1.2rem;
    padding: 0 0.5rem;
    color: rgba(0, 0, 0, 0.9);
  }
`

export default Label
