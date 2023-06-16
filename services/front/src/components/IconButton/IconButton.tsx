import React from 'react'

import './iconButton.css'

import CrossIcon from '../../assets/cross.svg'

type Props = {
  onClick: () => void | Promise<void>
  icon: 'cross'
}

const IconButton = ({ onClick: parentOnClick, icon }: Props) => {
  const onClick = (event: React.MouseEvent<HTMLButtonElement> | undefined) => {
    event?.preventDefault()
    parentOnClick()
  }
  const map_icon_id_to_icon_image = {
    cross: CrossIcon
  }

  return (
    <button onClick={onClick} className='iconButton'>
      <img
        src={map_icon_id_to_icon_image[icon]}
        alt=''
        width='15px'
        height='15px'
      />
    </button>
  )
}

export default IconButton
