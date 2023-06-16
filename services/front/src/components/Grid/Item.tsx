import React from 'react'

type Props = {
  children?: React.ReactNode

  xs?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  style?: {
    flexGrow?: React.CSSProperties['flexGrow']
  }
}

const Item = ({ children, style, xs }: Props) => {
  const flexBasis: React.CSSProperties['flexBasis'] = xs
    ? `${(xs / 12) * 100}%`
    : 'auto'

  return (
    <div
      style={{
        flex: '0 1 auto',
        flexBasis,
        ...style
      }}
    >
      {children}
    </div>
  )
}

export default Item
