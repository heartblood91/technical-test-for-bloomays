import React from 'react'

import { Grid, Typography, TypographyColorType } from 'src/components'

import { BloomerType } from 'src/types'

import { pick } from 'src/util'
import texts from 'src/wording/views/dashboard.json'

type VariantType = 'leaving' | 'arriving'

type Props = {
  variant: VariantType
  mapDateToBloomers: Record<string, Array<BloomerType>>
}

const LeavingArrivingBloomers = (props: Props) => {
  const { elements, color, mapDateToBloomers, variant } =
    useLeavingArrivingBloomers(props)

  return (
    <Grid.Container
      style={{
        flexDirection: 'column',
        gap: '0.5rem'
      }}
    >
      <Grid.Item xs={12}>
        <Title
          mapDateToBloomers={mapDateToBloomers}
          variant={variant}
          color={color}
        />
      </Grid.Item>
      <Grid.Item xs={12}>
        <div style={{ marginLeft: '1rem' }}>
          <Grid.Container style={{ gap: '0.5rem' }}>{elements}</Grid.Container>
        </div>
      </Grid.Item>
    </Grid.Container>
  )
}

export default LeavingArrivingBloomers

const useLeavingArrivingBloomers = ({ variant, mapDateToBloomers }: Props) => {
  const color: TypographyColorType = variant === 'leaving' ? 'error' : 'success'

  const elements: Array<React.ReactElement> =
    Object.entries(mapDateToBloomers).map(([rawDate, bloomers], index, arr) => {
      const date = new Date(rawDate).toLocaleDateString('fr-FR')
      const isTheLastBloomers = arr.length === index + 1

      return (
        <React.Fragment key={date}>
          <Grid.Item>
            <TextWithDot color={color} text={date} />
          </Grid.Item>
          <Grid.Item>
            <ListOfBloomers
              bloomers={bloomers}
              isTheLastBloomers={isTheLastBloomers}
            />
          </Grid.Item>
        </React.Fragment>
      )
    }) ?? []

  return {
    elements,
    mapDateToBloomers,
    variant,
    color
  }
}

const ListOfBloomers = ({
  bloomers,
  isTheLastBloomers
}: {
  bloomers: Array<BloomerType>
  isTheLastBloomers: boolean
}) => {
  const elements = bloomers.map(({ firstname, lastname, id }) => {
    const borderWidthInPx = isTheLastBloomers ? 0 : 2
    const fullName = `${firstname} ${lastname}`
    return (
      <Grid.Item key={id}>
        <div
          key={id}
          style={{
            marginLeft: `calc(${dotWidthInPx / 2}px - ${borderWidthInPx / 2}px`
          }}
        >
          <div
            style={{
              borderLeft: `${borderWidthInPx}px solid lightgrey`,
              paddingLeft: `calc(${dotWidthInPx / 2}px + 1rem)`
            }}
          >
            <Typography
              variant='subtitle'
              color='light_gray'
              contentText={fullName}
            />
          </div>
        </div>
      </Grid.Item>
    )
  })

  return (
    <Grid.Container
      style={{
        gap: 0,
        flexDirection: 'column'
      }}
    >
      {elements}
    </Grid.Container>
  )
}

const dotWidthInPx = 16

const TextWithDot = ({
  color,
  text
}: {
  color: TypographyColorType
  text: string
}) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
      }}
    >
      <div
        style={{
          width: `${dotWidthInPx}px`,
          height: `${dotWidthInPx}px`,
          borderRadius: '50%',
          backgroundColor: 'lightgray'
        }}
      />
      <Typography variant='body' color={color} contentText={text} />
    </div>
  )
}

const Title = ({
  mapDateToBloomers,
  variant,
  color
}: {
  mapDateToBloomers: Record<string, Array<BloomerType>>
  variant: VariantType
  color: TypographyColorType
}) => {
  const numberOfBloomers = Object.values(mapDateToBloomers).reduce(
    (acc, bloomers) => acc + bloomers.length,
    0
  )

  return (
    <div
      style={{
        paddingBottom: '0.5rem',
        display: 'flex',
        columnGap: '0.5rem',
        alignItems: 'baseline'
      }}
    >
      <Typography
        variant='h6'
        color={color}
        contentText={`${numberOfBloomers}`}
        style={{
          textDecoration: 'underline',
          fontSize: '1.5rem',
          fontWeight: 400
        }}
      />
      <Typography
        variant='h6'
        color='primary'
        contentText={pick({ texts, path: variant, quantity: numberOfBloomers })}
      />
    </div>
  )
}
