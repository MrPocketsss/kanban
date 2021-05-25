// import react libraries
import React, { useCallback, useEffect, useState } from 'react'

// import modules
import { ClickAwayListener, IconButton, Paper } from '@material-ui/core'
import MoreIcon from '@material-ui/icons/MoreVert'

// import project files
import { useStyles } from './styles'
import useEventListener from '../../hooks/useEventListener'

export default function Menu({ whenOpened, close, ...props }) {
  const classes = useStyles()

  // listens to the close paramater (should be boolean flag) passed from the parent
  // handles use-case where menu needs to be opened and closed by parent
  useEffect(() => {
    if (close !== undefined || close !== null) {
      setMenuOpen(close.flag)
    }
  }, [close])

  // handles menu functionality
  const [menuOpen, setMenuOpen] = useState(false)
  const handleMenuOpen = () => {
    setMenuOpen(true)
    if (whenOpened) whenOpened()
  }
  const handleMenuClose = () => {
    setMenuOpen(false)
  }
  const handleKeyboardLeave = useCallback((event) => {
    if (event.key === 'Escape') setMenuOpen(false)
  }, [])
  useEventListener('keydown', handleKeyboardLeave)

  return (
    <div className={classes.menuIcon}>
      <IconButton
        aria-label='show more'
        aria-haspopup='true'
        onClick={handleMenuOpen}
        color='inherit'
      >
        <MoreIcon />
      </IconButton>
      {menuOpen ? (
        <ClickAwayListener onClickAway={handleMenuClose}>
          <Paper className={classes.menuBody} elevation={8} {...props} />
        </ClickAwayListener>
      ) : null}
    </div>
  )
}
