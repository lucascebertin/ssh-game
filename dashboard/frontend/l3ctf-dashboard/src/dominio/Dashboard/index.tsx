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
import Link from '../../componentes/Link'

const TeamSectionDashboardTitle = styled.div`
  color: springgreen;
  font-family: 'Josefin Sans';
  text-decoration: underline;
  margin-bottom: 1rem;
  font-size: 1.2rem;
`

const TeamSection = styled.section`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-column-gap: 1.5rem;
  margin-bottom: 2rem;
  margin-top: 30px;
`

const RankingGraph = styled.div``

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

const SubmitFlag = styled.div`
  width: 600px;
`

export type DashboardProps = {
  handleModal: (titulo: string, texto: string, nivel: Nivel) => void
}

const Dashboard = ({ handleModal }: DashboardProps): ReactElement => {
  const [ranking, setRanking] = useState<Rank[]>([])
  const [flag, setFlag] = useState<string>('')
  const atualizarRanking = () => obterRanking().then(setRanking)

  const clickHandler = () => {
    if (flag === '' || typeof flag === 'undefined')
      return handleModal(
        'w0opZ',
        'É necessário inserir uma flag antes de submeter',
        Nivel.erro,
      )

    enviarFlag(flag)
      .then((sucesso) => {
        if (!sucesso)
          return handleModal(
            'w0opZ',
            'A flag pode não existir ou ter sido submetida mais de uma vez.',
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

      <div>
        <TeamSectionDashboardTitle>Sanity check</TeamSectionDashboardTitle>
        <Label>
          As flags encontradas terão o formato a seguir, envie esta na sessão
          acima para obter 10 pontos.
        </Label>
        <Label>
          L3CTF{'{'}0k_c4n_w3_st4rt?{'}'}
        </Label>
      </div>

      <TeamSection>
        <RankingGraph>
          <TeamSectionDashboardTitle>Ranking:</TeamSectionDashboardTitle>
          <RankingTable>
            <RankingName>Time</RankingName>
            <RankingScore>Pontos</RankingScore>
            {ranking &&
              ranking.map((rank) => (
                <Fragment key={rank.team}>
                  <TeamName>{rank.team}</TeamName>
                  <TeamScore>{rank.points}</TeamScore>
                </Fragment>
              ))}
          </RankingTable>
        </RankingGraph>
      </TeamSection>

      <Link to="/" onClick={() => localStorage.removeItem('token')}>
        Logout
      </Link>
    </ContainerSections>
  )
}

export default Dashboard
