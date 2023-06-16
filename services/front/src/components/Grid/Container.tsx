import React from 'react'

type Props = {
  children: React.ReactNode

  style?: {
    justifyContent?: React.CSSProperties['justifyContent']
    alignItems?: React.CSSProperties['alignItems']
    columnGap?: React.CSSProperties['columnGap']
    rowGap?: React.CSSProperties['rowGap']
    gap?: React.CSSProperties['gap']
    flexDirection?: React.CSSProperties['flexDirection']
  }
}

const Container = ({ children, style }: Props) => {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1rem',
        ...style
      }}
    >
      {children}
    </div>
  )
}

export default Container
