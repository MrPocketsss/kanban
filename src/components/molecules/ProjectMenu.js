// import react libraries
import React, { useCallback, useState } from 'react'

// import modules
import { useDispatch, useSelector } from 'react-redux'
import { Button, Divider, IconButton, Menu } from '@material-ui/core'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import MoreIcon from '@material-ui/icons/MoreVert'

// import project files
import { useStyles } from './styles'
import { removeProject } from '../../features/projects/projectSlice'
import { createColumn } from '../../features/projects/columnSlice'
import { ColorPicker, ProjectInput } from '../atoms'
import useEventListener from '../../hooks/useEventListener'
import { MenuItem } from '@material-ui/core'

export default function ProjectMenu({ projectId, toggleCollapsed }) {
  const classes = useStyles()
  const dispatch = useDispatch()

  // I need to gather all the columns and tasks related to the project, because
  // when I delete the project, I need to delete all related columns and tasks
  const columnIds = useSelector(
    (state) => state.projects.list.find((project) => project.id === projectId).columnIds
  )
  const columns = useSelector((state) =>
    state.columns.filter((column) => columnIds.includes(column.id))
  )

  const getTasks = () => {
    let taskIds = []

    if (columnIds.length > 0) {
      columns.forEach((column) => {
        if (column.taskIds.length > 0) taskIds = [...taskIds, ...column.taskIds]
      })
    }
  }

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
    const taskIds = getTasks()
    dispatch(removeProject({ projectId, columnIds, taskIds }))
  }

  return (
    <div>
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
        transformOrigin={{ vertical: -25, horizontal: 300 }}
        open={menuOpen}
        onClose={handleMenuClose}
        disableAutoFocusItem
      >
        <MenuItem>
          <ProjectInput handleDone={handleCreateColumn} placeholder='New Column' />
        </MenuItem>
        <Divider className={classes.divider} />
        <MenuItem>
          <ColorPicker projectId={projectId} />
        </MenuItem>
        <Divider className={classes.divider} />
        <MenuItem>
          <Button onClick={handleDeleteProject} fullWidth startIcon={<DeleteForeverIcon />}>
            Delete Project
          </Button>
        </MenuItem>
      </Menu>
    </div>
  )
}
