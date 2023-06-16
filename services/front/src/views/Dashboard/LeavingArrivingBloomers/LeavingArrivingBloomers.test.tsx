import React from 'react'

import { render } from '@testing-library/react'
import LeavingArrivingBloomers from './LeavingArrivingBloomers'

import { BloomerType } from 'src/types'

describe('LeavingArrivingBloomers', () => {
  describe('leaving bloomers', () => {
    describe('renders without bloomers', () => {
      test('should return 0 bloomer sortant', () => {
        const { getByText } = render(
          <LeavingArrivingBloomers variant='leaving' mapDateToBloomers={{}} />
        )

        const numberOfBloomers = getByText('0')
        expect(numberOfBloomers).toBeInTheDocument()
        expect(numberOfBloomers).toHaveStyle('color: #B71C1C')
        expect(numberOfBloomers).toHaveStyle('text-decoration: underline')
        expect(getByText('bloomer sortant')).toBeInTheDocument()
      })
    })
    describe('renders with 1 bloomer', () => {
      test('should return 1 bloomer sortant', () => {
        const mapDateToBloomers: Record<string, Array<BloomerType>> = {
          '2023-06-25': [
            {
              id: 5,
              firstname: 'Emma',
              lastname: 'Davis',
              beginMission: '2023-06-25',
              endMission: '2022-12-31'
            }
          ]
        }
        const { getByText } = render(
          <LeavingArrivingBloomers
            variant='leaving'
            mapDateToBloomers={mapDateToBloomers}
          />
        )

        const numberOfBloomersEl = getByText('1')
        expect(numberOfBloomersEl).toBeInTheDocument()
        expect(numberOfBloomersEl).toHaveStyle('color: #B71C1C')
        expect(numberOfBloomersEl).toHaveStyle('text-decoration: underline')

        const dateEl = getByText('25/06/2023')
        expect(dateEl).toBeInTheDocument()
        expect(dateEl).toHaveStyle('color: #B71C1C')

        expect(getByText('bloomer sortant')).toBeInTheDocument()
        expect(getByText('Emma Davis')).toBeInTheDocument()
      })
    })
    describe('renders with several bloomers', () => {
      test('should return 3 bloomers sortants', () => {
        const mapDateToBloomers: Record<string, Array<BloomerType>> = {
          '2023-06-15': [
            {
              id: 1,
              firstname: 'John',
              lastname: 'Doe',
              beginMission: '2023-06-15',
              endMission: '2022-12-31'
            },
            {
              id: 16,
              firstname: 'Bob',
              lastname: 'Williams',
              beginMission: '2023-06-15',
              endMission: '2023-01-31'
            }
          ],
          '2023-06-25': [
            {
              id: 5,
              firstname: 'Emma',
              lastname: 'Davis',
              beginMission: '2023-06-25',
              endMission: '2022-12-31'
            }
          ]
        }

        const { getByText } = render(
          <LeavingArrivingBloomers
            variant='leaving'
            mapDateToBloomers={mapDateToBloomers}
          />
        )

        const numberOfBloomersEl = getByText('3')
        expect(numberOfBloomersEl).toBeInTheDocument()
        expect(numberOfBloomersEl).toHaveStyle('color: #B71C1C')
        expect(numberOfBloomersEl).toHaveStyle('text-decoration: underline')

        const dateEl1 = getByText('25/06/2023')
        expect(dateEl1).toBeInTheDocument()
        expect(dateEl1).toHaveStyle('color: #B71C1C')

        const dateEl2 = getByText('15/06/2023')
        expect(dateEl2).toBeInTheDocument()
        expect(dateEl2).toHaveStyle('color: #B71C1C')

        expect(getByText('bloomers sortants')).toBeInTheDocument()
        expect(getByText('Emma Davis')).toBeInTheDocument()
        expect(getByText('John Doe')).toBeInTheDocument()
        expect(getByText('Bob Williams')).toBeInTheDocument()
      })
    })
  })

  describe('arriving bloomers', () => {
    describe('renders without bloomers', () => {
      test('should return 0 bloomer entrant', () => {
        const { getByText } = render(
          <LeavingArrivingBloomers variant='arriving' mapDateToBloomers={{}} />
        )

        const numberOfBloomers = getByText('0')
        expect(numberOfBloomers).toBeInTheDocument()
        expect(numberOfBloomers).toHaveStyle('color: #1B5E20')
        expect(numberOfBloomers).toHaveStyle('text-decoration: underline')
        expect(getByText('bloomer entrant')).toBeInTheDocument()
      })
    })
    describe('renders with 1 bloomer', () => {
      test('should return 1 bloomer entrant', () => {
        const mapDateToBloomers: Record<string, Array<BloomerType>> = {
          '2023-06-25': [
            {
              id: 5,
              firstname: 'Emma',
              lastname: 'Davis',
              beginMission: '2023-06-25',
              endMission: '2022-12-31'
            }
          ]
        }
        const { getByText } = render(
          <LeavingArrivingBloomers
            variant='arriving'
            mapDateToBloomers={mapDateToBloomers}
          />
        )

        const numberOfBloomersEl = getByText('1')
        expect(numberOfBloomersEl).toBeInTheDocument()
        expect(numberOfBloomersEl).toHaveStyle('color: #1B5E20')
        expect(numberOfBloomersEl).toHaveStyle('text-decoration: underline')

        const dateEl = getByText('25/06/2023')
        expect(dateEl).toBeInTheDocument()
        expect(dateEl).toHaveStyle('color: #1B5E20')

        expect(getByText('bloomer entrant')).toBeInTheDocument()
        expect(getByText('Emma Davis')).toBeInTheDocument()
      })
    })
    describe('renders with several bloomers', () => {
      test('should return 3 bloomers entrants', () => {
        const mapDateToBloomers: Record<string, Array<BloomerType>> = {
          '2023-06-15': [
            {
              id: 1,
              firstname: 'John',
              lastname: 'Doe',
              beginMission: '2023-06-15',
              endMission: '2022-12-31'
            },
            {
              id: 16,
              firstname: 'Bob',
              lastname: 'Williams',
              beginMission: '2023-06-15',
              endMission: '2023-01-31'
            }
          ],
          '2023-06-25': [
            {
              id: 5,
              firstname: 'Emma',
              lastname: 'Davis',
              beginMission: '2023-06-25',
              endMission: '2022-12-31'
            }
          ]
        }

        const { getByText } = render(
          <LeavingArrivingBloomers
            variant='arriving'
            mapDateToBloomers={mapDateToBloomers}
          />
        )

        const numberOfBloomersEl = getByText('3')
        expect(numberOfBloomersEl).toBeInTheDocument()
        expect(numberOfBloomersEl).toHaveStyle('color: #1B5E20')
        expect(numberOfBloomersEl).toHaveStyle('text-decoration: underline')

        const dateEl1 = getByText('25/06/2023')
        expect(dateEl1).toBeInTheDocument()
        expect(dateEl1).toHaveStyle('color: #1B5E20')

        const dateEl2 = getByText('15/06/2023')
        expect(dateEl2).toBeInTheDocument()
        expect(dateEl2).toHaveStyle('color: #1B5E20')

        expect(getByText('bloomers entrants')).toBeInTheDocument()
        expect(getByText('Emma Davis')).toBeInTheDocument()
        expect(getByText('John Doe')).toBeInTheDocument()
        expect(getByText('Bob Williams')).toBeInTheDocument()
      })
    })
  })
})
