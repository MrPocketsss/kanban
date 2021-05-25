// import react libraries
import React, { useState } from 'react'

// import modules
import { useDispatch } from 'react-redux'
import { IconButton, Menu, MenuItem } from '@material-ui/core'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import MoreIcon from '@material-ui/icons/MoreVert'

// import project files
import { useStyles } from './styles'
import { removeColumn } from '../../features/projects/columnSlice'

export default function ColumnMenu({ columnId, projectId, title }) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [menuOpen, setMenuOpen] = useState(false)
  const [anchorElement, setAnchorElement] = useState(null)
  const menuId = `${title}-menu`

  //menu functionality
  const handleMenuOpen = (event) => {
    setMenuOpen(true)
    setAnchorElement(event.currentTarget)
  }
  const handleMenuClose = () => {
    setMenuOpen(false)
    setAnchorElement(null)
  }

  // menu items functionality
  // --Delete
  const handleDeleteColumn = () => {
    dispatch(removeColumn({ projectId, columnId }))
  }

  return (
    <>
      <IconButton
        aria-controls={menuId}
        aria-haspopup='true'
        aria-label='show-more'
        color='inherit'
        onClick={handleMenuOpen}
      >
        <MoreIcon />
      </IconButton>
      <Menu
        anchorEl={anchorElement}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: -15, horizontal: 213 }}
        open={menuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleDeleteColumn}>
          <DeleteForeverIcon />
          <span className={classes.deleteButton}>DeleteColumn</span>
        </MenuItem>
      </Menu>
    </>
  )
}
