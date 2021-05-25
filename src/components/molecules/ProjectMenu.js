// import react libraries
import React, { useCallback, useState } from 'react'

// import modules
import { useDispatch } from 'react-redux'
import { Button, Divider, IconButton, Menu } from '@material-ui/core'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import MoreIcon from '@material-ui/icons/MoreVert'

// import project files
import { useStyles } from './styles'
import { removeProject } from '../../features/projects/projectSlice'
import { createColumn } from '../../features/projects/columnSlice'
import { ColorPicker, ProjectInput } from '../atoms'
import useEventListener from '../../hooks/useEventListener'

export default function ProjectMenu({ projectId, toggleCollapsed }) {
  const classes = useStyles()
  const dispatch = useDispatch()

  //menu functionality
  const [menuOpen, setMenuOpen] = useState(false)
  const [anchorElement, setAnchorElement] = useState(null)
  const menuId = `${projectId}-menu`

  const handleMenuOpen = (event) => {
    setMenuOpen(true)
    setAnchorElement(event.currentTarget)
    toggleCollapsed(false)
  }
  const handleMenuClose = () => {
    setMenuOpen(false)
    setAnchorElement(null)
  }
  const handleKeyboardLeave = useCallback((event) => {
    if (event.key === 'Escape') setMenuOpen(false)
  }, [])
  useEventListener('keydown', handleKeyboardLeave)

  // menu items functionality
  // --ProjectInput
  const handleCreateColumn = (text) => {
    dispatch(createColumn({ projectId, titleName: text }))
  }
  // --Delete Button
  const handleDeleteProject = () => {
    dispatch(removeProject({ projectId }))
  }

  return (
    <>
      <IconButton
        aria-label='show more'
        aria-haspopup='true'
        onClick={handleMenuOpen}
        color='inherit'
      >
        <MoreIcon />
      </IconButton>
      <Menu
        anchorEl={anchorElement}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: 0, horizontal: 1320 }}
        open={menuOpen}
        onClose={handleMenuClose}
      >
        <ProjectInput handleDone={handleCreateColumn} placeholder='New Column' />
        <Divider className={classes.divider} />
        <ColorPicker projectId={projectId} />
        <Divider className={classes.divider} />
        <Button onClick={handleDeleteProject} fullWidth startIcon={<DeleteForeverIcon />}>
          Delete Project
        </Button>
      </Menu>
    </>
  )
}
