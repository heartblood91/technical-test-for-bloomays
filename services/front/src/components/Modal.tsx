import React from 'react'
import { createPortal } from 'react-dom'

import Grid from './Grid'
import IconButton from './IconButton'

type Props = {
  children: React.ReactNode
  onClickOnCross?: () => void

  maxWidthInPx?: number
}

const Modal = (props: Props) => {
  const { children, modalRoot, modalRef, maxWidthInPx, onClickOnCross } =
    useModal(props)

  return createPortal(
    <div
      style={{
        position: 'absolute',
        zIndex: 2,
        backdropFilter: 'contrast(0.5)',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
      }}
    >
      <div style={{ position: 'relative', height: '100%' }}>
        <div
          ref={modalRef}
          style={{
            border: '2px solid black',
            borderRadius: '5px',
            backgroundColor: 'white',
            position: 'absolute',
            top: '100px',
            left: maxWidthInPx ? `calc(50% - ${maxWidthInPx / 2}px)` : '30%',
            maxWidth: maxWidthInPx ? `${maxWidthInPx}px` : 'inherit',
            padding: '1rem 2rem 2rem 2rem',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}
        >
          <Grid.Container style={{ gap: 0 }}>
            <Grid.Item style={{ flexGrow: 1 }} />
            <Grid.Item>
              <div style={{ margin: '0 1rem' }}>
                <IconButton onClick={onClickOnCross} icon='cross' />
              </div>
            </Grid.Item>
            <Grid.Item xs={12}>{children}</Grid.Item>
          </Grid.Container>
        </div>
      </div>
    </div>,
    modalRoot ?? document.body
  )
}

export default Modal

const useModal = ({
  children,
  onClickOnCross = () => {},
  maxWidthInPx
}: Props) => {
  const modalRoot = document.getElementById('modal-root')
  const modalRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !(modalRef.current as Node).contains(event.target as Node)
      ) {
        onClickOnCross?.()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  React.useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClickOnCross?.()
      }
    }

    document.addEventListener('keydown', handleEscapeKey)

    return () => document.removeEventListener('keydown', handleEscapeKey)
  }, [])

  return {
    children,
    modalRoot,
    maxWidthInPx,
    onClickOnCross,
    modalRef
  }
}
