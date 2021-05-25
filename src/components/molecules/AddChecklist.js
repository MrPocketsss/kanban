// import react modules
import React, { useState } from 'react'

// import modules
import { Card, CardContent, CardHeader, Chip, Divider, Menu } from '@material-ui/core'
import ListIcon from '@material-ui/icons/List'

// import project files
import { useStyles } from './styles'
import { CloseIconButton, ProjectInput } from '../atoms'

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

  const handleTitleSubmit = (newTitle) => {
    console.log(newTitle)
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
            <ProjectInput placeholder='Checklist title' submitCallback={handleTitleSubmit} />
          </CardContent>
        </Card>
      </Menu>
    </>
  )
}
