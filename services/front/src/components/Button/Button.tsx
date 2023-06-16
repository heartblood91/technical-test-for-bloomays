import React from 'react'

import './button.css'

type Props = {
  onClick: () => void | Promise<void>
  children: React.ReactNode
}

const Button = ({ onClick: parentOnClick, children }: Props) => {
  const onClick = (event: React.MouseEvent<HTMLButtonElement> | undefined) => {
    event?.preventDefault()
    parentOnClick()
  }
  return (
    <button onClick={onClick} className='button'>
      {children}
    </button>
  )
}

export default Button
