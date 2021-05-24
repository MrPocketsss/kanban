// import react libraries
import React from 'react'

// import modules
import { useDispatch } from 'react-redux'
import { Card, CardHeader, CardContent, Checkbox, Typography } from '@material-ui/core'
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn'

// import project files
import { useStyles } from './styles'
import { ChecklistMenu } from './index'
import { markListItem } from '../../features/projects/taskSlice'

export default function TaskList({ index, list, taskId }) {
  const classes = useStyles()
  const dispatch = useDispatch()

  const handleCheckbox = (event) => {
    const itemIndex = list.items.findIndex((element) => element.id === event.target.id)

    // only call update if there is something to update
    if (event.target.checked !== list.items[itemIndex]) {
      dispatch(markListItem({ itemIndex, listIndex: index, taskId }))
    }
  }

  return (
    <Card elevation={6} className={classes.taskModalContent}>
      <CardHeader
        action={<ChecklistMenu index={index} list={list} taskId={taskId} />}
        avatar={<AssignmentTurnedInIcon />}
        title={<Typography variant='h5'>{list.title}</Typography>}
      />
      <CardContent>
        {list.items.map((item, index) => {
          // we skip the item if its completed, and we don't want to show completed items
          if (list.hideCompleted === true && item.completed === true) return null
          // otherwise we show the item
          return (
            <div key={index}>
              <Checkbox
                color='default'
                checked={item.completed}
                id={item.id}
                onChange={handleCheckbox}
              />
              <Typography variant='body1' display='inline'>
                {item.title}
              </Typography>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
