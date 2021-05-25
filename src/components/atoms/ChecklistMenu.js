// import react libraries
import React, { useState } from 'react'

// import modules
import { useDispatch } from 'react-redux'
import { Button, Divider } from '@material-ui/core'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'

// import project files
import { useStyles } from './styles'
import { Menu, ProjectInput } from './index'
import { addChecklistItem, hideCompleted, removeList } from '../../features/projects/taskSlice'

export default function ChecklistMenu({ index, list, taskId }) {
  const classes = useStyles()
  const dispatch = useDispatch()

  //menu functionality
  const handleCreateItem = (itemTitle) => {
    dispatch(addChecklistItem({ itemTitle, listId: list.id, taskId }))
  }
  const handleHideClick = () => {
    dispatch(hideCompleted({ listIndex: index, taskId }))
  }

  const [menuClose, setMenuClose] = useState({ flag: false })
  const handleDeleteClick = () => {
    setMenuClose({ flag: true })
    dispatch(removeList({ listIndex: index, taskId }))
    setMenuClose({ flag: false })
  }

  return (
    <Menu close={menuClose}>
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
    </Menu>
  )
}
