import styled from 'styled-components/macro'

export const ContainerSections = styled.section`
  margin: 1rem auto;
  width: 100%;
  max-width: 95%;
`

export const Section = styled.section`
  width: 100%;
  max-width: 350px;
  margin: 0 auto;
  padding: 1.5rem;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 0.25rem;
}
`
export const SectionGradient = styled(Section)`
  border: 10px solid;
  border-image-slice: 1;
  border-width: 3px;
  border-image-source: linear-gradient(to left, #9b58b6, springgreen);
`

export default ContainerSections
