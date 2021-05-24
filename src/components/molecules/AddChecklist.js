// import react modules
import React, { useState } from 'react'

// import modules
import { Chip, Menu } from '@material-ui/core'
import ListIcon from '@material-ui/icons/List'

// import project files
import { useStyles } from './styles'
import { AddChecklistCard } from '../atoms'

export default function AddChecklist({ taskId }) {
  const classes = useStyles()

  const [anchorElement, setAnchorElement] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)

  const handleMenuOpen = (event) => {
    setAnchorElement(event.currentTarget)
    setMenuOpen(true)
  }
  const handleMenuClose = () => {
    setAnchorElement(null)
    setMenuOpen(false)
  }

  return (
    <>
      <Chip avatar={<ListIcon />} label='Checklist' onClick={handleMenuOpen} />
      <Menu
        id='checklist-menu'
        anchorEl={anchorElement}
        classes={{ list: classes.menuList }}
        keepMounted
        open={menuOpen}
        onClose={handleMenuClose}
        transformOrigin={{ vertical: -95, horizontal: 100 }}
      >
        <div>
          <AddChecklistCard close={handleMenuClose} taskId={taskId} />
        </div>
      </Menu>
    </>
  )
}
