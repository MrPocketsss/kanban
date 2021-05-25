// import react libraries
import React from 'react'

// import modules
import { ListItem } from '@material-ui/core'

// import project files

export default function ListItemLink(props) {
  const handleRoute = () => {
    let externalURL = ''
    if (props.href.includes('http')) {
      externalURL = props.href
    } else {
      externalURL = `http://${props.href}`
    }
    window.open(externalURL, '_blank')
  }

  return <ListItem button onClick={handleRoute} {...props} />
}
