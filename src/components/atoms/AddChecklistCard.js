// import react modules
import React from 'react'

// import modules
import { useDispatch } from 'react-redux'
import { Card, CardContent, CardHeader, Divider } from '@material-ui/core'

// import project files
import { useStyles } from './styles'
import { CloseIconButton, ProjectInput } from './index'
import { addChecklist } from '../../features/projects/taskSlice'

export default function AddChecklistCard({ close, taskId }) {
  const classes = useStyles()
  const dispatch = useDispatch()

  const handleCreateList = (checklistTitle) => {
    dispatch(addChecklist({ checklistTitle, taskId }))
  }

  return (
    <Card className={classes.actionMenuItem}>
      <CardHeader action={<CloseIconButton handleClick={close} />} title='Add checklist' />
      <Divider />
      <CardContent>
        <ProjectInput placeholder='Checklist title' handleDone={handleCreateList} />
      </CardContent>
    </Card>
  )
}
