// import react modules
import React, { useState } from 'react'

// import modules
import { useDispatch } from 'react-redux'
import { Card, CardContent, CardHeader, Chip, Divider, Menu } from '@material-ui/core'
import ListIcon from '@material-ui/icons/List'

// import project files
import { useStyles } from './styles'
import { addChecklist } from '../../features/projects/taskSlice'
import { CloseIconButton, ProjectInput } from '../atoms'

export default function AddChecklist({ taskId }) {
  const classes = useStyles()
  const dispatch = useDispatch()

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

  const handleCreateList = (checklistTitle) => {
    dispatch(addChecklist({ checklistTitle, taskId }))
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
        <Card className={classes.actionMenuItem}>
          <CardHeader action={<CloseIconButton />} title='Add checklist' />
          <Divider />
          <CardContent>
            <ProjectInput placeholder='Checklist title' handleDone={handleCreateList} />
          </CardContent>
        </Card>
      </Menu>
    </>
  )
}
