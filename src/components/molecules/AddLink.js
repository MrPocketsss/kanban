// import react modules
import React, { useState } from 'react'

// import modules
import { useDispatch } from 'react-redux'
import { Button, Card, CardContent, CardHeader, Chip, Divider, Menu } from '@material-ui/core'
import LinkIcon from '@material-ui/icons/Link'

// import project files
import { useStyles } from './styles'
import { CloseIconButton, ProjectInput } from '../atoms'
import { addLink } from '../../features/projects/taskSlice'

export default function AddChecklist({ taskId }) {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [anchorElement, setAnchorElement] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [linkDescription, setLinkDescription] = useState('')
  const [linkURL, setLinkURL] = useState('')
  const [clearText, setClearText] = useState(false)

  const handleMenuOpen = (event) => {
    setAnchorElement(event.currentTarget)
    setMenuOpen(true)
  }
  const handleMenuClose = () => {
    setAnchorElement(null)
    setMenuOpen(false)
  }

  const handleDescriptionUpdate = (newDescription) => {
    setLinkDescription(newDescription)
  }
  const handleURLUpdate = (newURL) => {
    setLinkURL(newURL)
  }
  const handleSubmit = () => {
    if (linkDescription.length > 1 && linkURL.length > 1) {
      console.log('true')
      setClearText(true)
      dispatch(addLink({ linkDescription, linkURL, taskId }))
      setClearText(false)
    }
  }

  return (
    <>
      <Chip avatar={<LinkIcon />} label='Link' onClick={handleMenuOpen} />
      <Menu
        id='checklist-menu'
        anchorEl={anchorElement}
        classes={{ list: classes.menuList }}
        keepMounted
        open={menuOpen}
        onClose={handleMenuClose}
        transformOrigin={{ vertical: -95, horizontal: 130 }}
      >
        <Card className={classes.actionMenuItem}>
          <CardHeader action={<CloseIconButton />} title='Add Link' />
          <Divider />
          <CardContent>
            <ProjectInput
              placeholder='Description'
              clear={clearText}
              handleChange={handleDescriptionUpdate}
            />
            <div style={{ height: '1rem' }}></div>
            <ProjectInput placeholder='URL' clear={clearText} handleChange={handleURLUpdate} />
            <Button
              onClick={handleSubmit}
              variant='contained'
              color='primary'
              style={{ marginTop: '1rem' }}
            >
              Add
            </Button>
          </CardContent>
        </Card>
      </Menu>
    </>
  )
}
