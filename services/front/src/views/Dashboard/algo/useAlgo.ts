import React from 'react'

import { MissionType, BloomerType } from 'src/types'

type MapDateToBloomersType = Record<string, Array<BloomerType>>
export type MapVariantToMapDateToBloomersType = Record<
  'arriving' | 'leaving',
  MapDateToBloomersType
>

const useTransformMissionToMapDateToBloomers = (
  missions: Array<MissionType>
): MapVariantToMapDateToBloomersType => {
  const getFreelanceType = React.useCallback(
    ({
      beginDate,
      endDate,
      dateMin,
      dateMax
    }: {
      beginDate: Date
      endDate: Date
      dateMin: Date
      dateMax: Date
    }) => {
      if (beginDate > dateMin && beginDate < dateMax) {
        return 'arriving'
      } else if (endDate > dateMin && endDate < dateMax) {
        return 'leaving'
      } else {
        return ''
      }
    },
    []
  )

  return React.useMemo(
    () =>
      sortMapMapByAscDate(
        missions.reduce<MapVariantToMapDateToBloomersType>(
          (acc, mission) => {
            const today = new Date()
            const dateMin = getTheFirstDateOfCurrentMonth(today)
            const dateMax = getTheLastDateOfNextMonth(today)
            const beginDate = formatISO8601ToDate(mission.beginDate)
            const endDate = formatISO8601ToDate(mission.endDate)
            const valueToPush = {
              id: mission.id,
              firstname: mission.freelance.firstname,
              lastname: mission.freelance.lastname,
              beginMission: mission.beginDate,
              endMission: mission.endDate
            }

            const freelanceType = getFreelanceType({
              beginDate,
              endDate,
              dateMin,
              dateMax
            })
            if (freelanceType) {
              const date =
                freelanceType === 'arriving'
                  ? mission.beginDate
                  : mission.endDate
              const bloomers = acc[freelanceType][date]
              if (bloomers) {
                bloomers.push(valueToPush)
              } else {
                acc[freelanceType][date] = [valueToPush]
              }
            }

            return acc
          },
          { arriving: {}, leaving: {} }
        )
      ),
    [missions, getFreelanceType]
  )
}

// ISO 8601 format: YYYY-MM-DD
const formatDateToISO8601 = (date: Date): string => {
  return date.toLocaleDateString('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}

const formatISO8601ToDate = (date: string): Date => {
  const [year, month, day] = date.split('-')
  // Put the hours to 12 to avoid the timezone problem
  return new Date(Number(year), Number(month) - 1, Number(day), 12)
}

const getTheFirstDateOfCurrentMonth = (date: Date): Date => {
  // Put the hours to 12 to avoid the timezone problem
  return new Date(date.getFullYear(), date.getMonth(), 1, 12)
}
const getTheLastDateOfNextMonth = (date: Date): Date => {
  // Put the hours to 12 to avoid the timezone problem
  // Put the day to 0 to get the last day of the previous month
  return new Date(date.getFullYear(), date.getMonth() + 2, 0, 12)
}

const sortMapByByAscDate = (
  map: MapDateToBloomersType
): MapDateToBloomersType => {
  return Object.fromEntries(
    Object.entries(map).sort(([a_date], [b_date]) => {
      return a_date.localeCompare(b_date)
    })
  )
}
const sortMapMapByAscDate = (
  map: MapVariantToMapDateToBloomersType
): MapVariantToMapDateToBloomersType => {
  return {
    arriving: sortMapByByAscDate(map.arriving),
    leaving: sortMapByByAscDate(map.leaving)
  }
}

export {
  useTransformMissionToMapDateToBloomers,
  formatISO8601ToDate,
  getTheFirstDateOfCurrentMonth,
  getTheLastDateOfNextMonth,
  formatDateToISO8601
}
