import React, { Fragment, ReactElement, useEffect, useState } from 'react'
import ContainerSections from '../../componentes/Container/Sections'
import styled from 'styled-components/macro'
import Label from '../../componentes/Label'
import Input from '../../componentes/Input'
import ActionsContainer from '../../componentes/Container/Action'
import Button from '../../componentes/Button'
import { Rank } from './rank'
import { obterRanking, enviarFlag } from './service'
import { Nivel } from '../../componentes/Modal'

const TeamSectionDashboardTitle = styled.div`
  color: springgreen;
  font-family: 'Josefin Sans';
  text-decoration: underline;
  margin-bottom: 1rem;
  font-size: 1.2rem;
`

const TeamSection = styled.section`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-column-gap: 1.5rem;
  margin-bottom: 10rem;
`

const RankingGraph = styled.div``
const RankingGraphTitle = styled.div`
  color: ghostwhite;
  letter-spacing: 1px;
`

const RankingTable = styled.div`
  display: grid;
  color: ghostwhite;
  grid-template-columns: repeat(2, 1fr);
  margin-top: 1rem;
`

const RankingName = styled.div`
  font-family: 'Josefin Sans';
  font-size: 1.2rem;
  text-decoration: underline;
  position: relative;
  padding: 1rem;
  border-bottom: 10px solid;
  border-image-slice: 1;
  border-width: 1px;
  border-image-source: linear-gradient(to left, #9b58b6, springgreen);
`

const RankingScore = styled.div`
  font-family: 'Josefin Sans';
  font-size: 1.2rem;
  text-decoration: underline;
  position: relative;
  padding: 1rem;
  border-bottom: 10px solid;
  border-image-slice: 1;
  border-width: 1px;
  border-image-source: linear-gradient(to left, #9b58b6, springgreen);
`

const TeamName = styled.div`
  position: relative;
  padding: 1rem;
  border-bottom: 10px solid;
  border-image-slice: 1;
  border-width: 1px;
  border-image-source: linear-gradient(to left, #9b58b6, springgreen);
`

const TeamScore = styled.div`
  position: relative;
  padding: 1rem;
  border-bottom: 10px solid;
  border-image-slice: 1;
  border-width: 1px;
  border-image-source: linear-gradient(to left, #9b58b6, springgreen);
  border-left: 1px solid;
`

const SubmitFlag = styled.div``
export type DashboardProps = {
  handleModal: (titulo: string, texto: string, nivel: Nivel) => void
}

const Dashboard = ({ handleModal }: DashboardProps): ReactElement => {
  const [ranking, setRanking] = useState<Rank[]>([])
  const [flag, setFlag] = useState<string>('')
  const atualizarRanking = () => obterRanking().then(setRanking)

  const clickHandler = () => {
    enviarFlag(flag)
      .then((sucesso) => {
        if (!sucesso)
          return handleModal(
            'w0opZ',
            'Oh, e agora, quem poderá nos ajudar!?',
            Nivel.erro,
          )

        handleModal('w0ot', 'Parabéns por encontrar a flag!', Nivel.sucesso)
      })
      .catch(() => {
        handleModal(
          'w0opZ',
          'Oh, e agora, quem poderá nos ajudar!?',
          Nivel.erro,
        )
      })
      .finally(() => {
        setFlag('')
        atualizarRanking()
      })
  }

  useEffect(() => {
    atualizarRanking()
    const interval = setInterval(() => {
      atualizarRanking()
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <ContainerSections>
      <TeamSectionDashboardTitle>Dashboard</TeamSectionDashboardTitle>
      <TeamSection>
        <RankingGraph>
          <RankingGraphTitle>L3CTF Ranking:</RankingGraphTitle>
          <RankingTable>
            <RankingName>Time</RankingName>
            <RankingScore>Pontos</RankingScore>
            {ranking.map((rank) => (
              <Fragment key={rank.team}>
                <TeamName>{rank.team}</TeamName>
                <TeamScore>{rank.points}</TeamScore>
              </Fragment>
            ))}
          </RankingTable>
        </RankingGraph>
        <SubmitFlag>
          <Label>
            Envie flag encontrada
            <Input
              type="text"
              value={flag}
              onChange={(event) => setFlag(event.target.value)}
            />
          </Label>
          <ActionsContainer>
            <Button to="#" onClick={clickHandler}>
              Enviar
            </Button>
          </ActionsContainer>
        </SubmitFlag>
      </TeamSection>
    </ContainerSections>
  )
}

export default Dashboard
