// import react libraries
import React, { useCallback, useState } from 'react'

// import modules
import { useDispatch } from 'react-redux'
import { Button, ClickAwayListener, Divider, IconButton, Paper } from '@material-ui/core'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import MoreIcon from '@material-ui/icons/MoreVert'

// import project files
import { useStyles } from './styles'
import { ProjectInput } from './index'
import { addChecklistItem, hideCompleted, removeList } from '../../features/projects/taskSlice'
import useEventListener from '../../hooks/useEventListener'

export default function ChecklistMenu({ index, list, taskId }) {
  const classes = useStyles()
  const dispatch = useDispatch()

  //menu functionality
  const [menuOpen, setMenuOpen] = useState(false)
  const handleMenuOpen = () => {
    setMenuOpen(true)
  }
  const handleMenuClose = () => {
    setMenuOpen(false)
  }
  const handleKeyboardLeave = useCallback((event) => {
    if (event.key === 'Escape') setMenuOpen(false)
  }, [])
  useEventListener('keydown', handleKeyboardLeave)

  const handleCreateItem = (itemTitle) => {
    dispatch(addChecklistItem({ itemTitle, listId: list.id, taskId }))
  }
  const handleHideClick = () => {
    dispatch(hideCompleted({ listIndex: index, taskId }))
  }
  const handleDeleteClick = () => {
    dispatch(removeList({ listIndex: index, taskId }))
  }

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
          <Paper className={classes.menuBody} elevation={8}>
            <ProjectInput handleDone={handleCreateItem} placeholder='New Checklist Item' />
            <Divider className={classes.divider} />
            {list.items.length > 0 ? (
              <>
                <Button onClick={handleHideClick} fullWidth>
                  Hide done items
                </Button>
                <Divider className={classes.divider} />
              </>
            ) : null}
            <Button onClick={handleDeleteClick} fullWidth startIcon={<DeleteForeverIcon />}>
              Delete Checklist
            </Button>
          </Paper>
        </ClickAwayListener>
      ) : null}
    </div>
  )
}
