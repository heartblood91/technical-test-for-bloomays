import { renderHook } from '@testing-library/react-hooks'

import {
  useTransformMissionToMapDateToBloomers,
  formatISO8601ToDate,
  getTheFirstDateOfCurrentMonth,
  getTheLastDateOfNextMonth,
  formatDateToISO8601,
  MapVariantToMapDateToBloomersType
} from './useAlgo'

import { MissionType } from '../../../types'

describe('Algo Functions', () => {
  describe('getTheFirstDateOfCurrentMonth', () => {
    it('should return the first date of the current month', () => {
      const date = new Date(2020, 6, 15, 12)
      const expected = new Date(2020, 6, 1, 12)

      expect(getTheFirstDateOfCurrentMonth(date)).toEqual(expected)
    })
  })
  describe('getTheLastDateOfNextMonth', () => {
    it('should return the last date of the next month', () => {
      const date = new Date(2020, 0, 15, 12)
      // Be careful, it's a bisextile year
      const expected = new Date(2020, 1, 29, 12)

      expect(getTheLastDateOfNextMonth(date)).toEqual(expected)
    })
  })

  describe('formatISO8601ToDate', () => {
    it('should return a good date', () => {
      const date = '2020-02-29'
      const expected = new Date(2020, 1, 29, 12)

      expect(formatISO8601ToDate(date)).toEqual(expected)
    })
  })

  describe('formatDateToISO8601', () => {
    it('should the date to the format ISO8601 --> YYYY-MM-DD', () => {
      const date = new Date(2020, 0, 15, 12)
      const expected = '2020-01-15'

      expect(formatDateToISO8601(date)).toEqual(expected)
    })
  })

  describe('transformMissionToMapDateToBloomers', () => {
    it('should return an map_date_to_bloomers object', () => {
      const transformDate = (date: Date) => {
        return date.toLocaleDateString('en-CA', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        })
      }

      const today = new Date()
      const tomorrow = transformDate(
        new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)
      )
      const todayPlusOneWeek = transformDate(
        new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7)
      )
      const missions: Array<MissionType> = [
        {
          id: 0,
          label: 'Mission 0',
          beginDate: todayPlusOneWeek,
          endDate: '2020-09-10',
          missionType: '0',
          freelance: {
            id: 0,
            firstname: 'John',
            lastname: 'Doe',
            email: ''
          }
        },
        {
          id: 1,
          label: 'Mission 1',
          beginDate: tomorrow,
          endDate: '2020-12-15',
          missionType: '1',
          freelance: {
            id: 1,
            firstname: 'John',
            lastname: 'Doe',
            email: ''
          }
        },
        {
          id: 2,
          label: 'Mission 2',
          beginDate: '2020-01-15',
          endDate: tomorrow,
          missionType: '2',
          freelance: {
            id: 2,
            firstname: 'John',
            lastname: 'Doe',
            email: ''
          }
        },
        {
          id: 3,
          label: 'Mission 3',
          beginDate: '2020-03-15',
          endDate: '2020-09-15',
          missionType: '3',
          freelance: {
            id: 3,
            firstname: 'John',
            lastname: 'Doe',
            email: ''
          }
        },
        {
          id: 4,
          label: 'Mission 4',
          beginDate: tomorrow,
          endDate: '2020-09-15',
          missionType: '4',
          freelance: {
            id: 4,
            firstname: 'John',
            lastname: 'Doe',
            email: ''
          }
        }
      ]
      const expected: MapVariantToMapDateToBloomersType = {
        arriving: {
          [tomorrow]: [
            {
              firstname: 'John',
              lastname: 'Doe',
              beginMission: tomorrow,
              endMission: '2020-12-15',
              id: 1
            },
            {
              firstname: 'John',
              lastname: 'Doe',
              beginMission: tomorrow,
              endMission: '2020-09-15',
              id: 4
            }
          ],
          [todayPlusOneWeek]: [
            {
              firstname: 'John',
              lastname: 'Doe',
              beginMission: todayPlusOneWeek,
              endMission: '2020-09-10',
              id: 0
            }
          ]
        },
        leaving: {
          [tomorrow]: [
            {
              firstname: 'John',
              lastname: 'Doe',
              beginMission: '2020-01-15',
              endMission: tomorrow,
              id: 2
            }
          ]
        }
      }

      const { result } = renderHook(() =>
        useTransformMissionToMapDateToBloomers(missions)
      )

      expect(result.current).toEqual(expected)
      expect(Object.keys(result.current.arriving)[0]).toEqual(tomorrow)
      expect(Object.keys(result.current.arriving)[1]).toEqual(todayPlusOneWeek)
    })
    it('should return an empty object if missions is empty', () => {
      const missions: Array<MissionType> = []
      const expected = { arriving: {}, leaving: {} }

      const { result } = renderHook(() =>
        useTransformMissionToMapDateToBloomers(missions)
      )
      expect(result.current).toEqual(expected)
    })
  })
})
