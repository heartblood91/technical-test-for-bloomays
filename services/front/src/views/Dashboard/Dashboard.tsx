import React from 'react'

import { Button, Grid, Modal } from '../../components'

import { MissionType } from '../../types'

import LeavingArrivingBloomers from './LeavingArrivingBloomers'
import ErrorBoundaryView from '../ErrorBoundaryView'

import { useTransformMissionToMapDateToBloomers } from './algo'

const Dashboard = () => {
  const { onClickOnButton, onClickOnCross, shouldDisplay, leaving, arriving } =
    useDashboard()

  return (
    <ErrorBoundaryView>
      <div>
        <div style={{ textAlign: 'center', paddingTop: '50px' }}>
          <Button onClick={onClickOnButton}>Open modal</Button>
        </div>
        {shouldDisplay.modal && (
          <Modal onClickOnCross={onClickOnCross} maxWidthInPx={325}>
            <div style={{ padding: '0 32px 32px 32px' }}>
              <Grid.Container>
                <Grid.Item xs={12}>
                  <LeavingArrivingBloomers
                    mapDateToBloomers={arriving}
                    variant='arriving'
                  />
                </Grid.Item>
                <Grid.Item xs={12}>
                  <LeavingArrivingBloomers
                    mapDateToBloomers={leaving}
                    variant='leaving'
                  />
                </Grid.Item>
              </Grid.Container>
            </div>
          </Modal>
        )}
      </div>
    </ErrorBoundaryView>
  )
}

export default Dashboard

const useDashboard = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const [missions, setMissions] = React.useState<Array<MissionType>>([])

  const shouldDisplay = {
    modal: isOpen
  }

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.localhost/api/missions')
        const nextMissions: Array<MissionType> = await response.json()
        setMissions(nextMissions)
      } catch (error) {
        console.error(error)
        throw new Error(
          'Error while fetching missions, see console for more details.\nFile: src/views/Dashboard/Dashboard.tsx\n'
        )
      }
    }

    fetchData()
  }, [])

  const { arriving, leaving } = useTransformMissionToMapDateToBloomers(missions)

  const onClickOnButton = () => setIsOpen((x) => !x)
  const onClickOnCross = () => setIsOpen(false)

  return {
    arriving,
    leaving,
    shouldDisplay,
    onClickOnButton,
    onClickOnCross
  }
}
