// import react libraries
import React from 'react'

// import modules
import {
  Card,
  CardHeader,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@material-ui/core'
import LinkIcon from '@material-ui/icons/Link'

// import project files
import { useStyles } from './styles'
import { ListItemLink } from '../atoms'

export default function TaskLinks({ links, taskId }) {
  const classes = useStyles()

  return (
    <Card elevation={6} className={classes.taskModalContent}>
      <CardHeader avatar={<LinkIcon />} title={<Typography variant='h5'>Links</Typography>} />
      <CardContent>
        <List component='nav' aria-label='list of links'>
          {links.map((link, index) => (
            <ListItem key={index}>
              <ListItemLink href={link.url}>
                <ListItemText primary={link.description} />
              </ListItemLink>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  )
}
