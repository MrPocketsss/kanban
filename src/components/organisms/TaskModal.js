// import react modules
import React, { useEffect, useState } from 'react'

// import modules
import { useDispatch, useSelector } from 'react-redux'
import { Card, CardContent, CardHeader, Grid, Paper, Typography } from '@material-ui/core'
import AssignmentIcon from '@material-ui/icons/Assignment'

// import project files
import { updateTaskTitle } from '../../features/projects/taskSlice'
import { useStyles } from './styles'
import { CloseIconButton, EditableText, TaskActivity, TaskDescription } from '../atoms'
import { AddChecklist, AddDeadline, AddLink } from '../molecules'

export default function TaskModal({ columnId, darkMode, task }) {
  const classes = useStyles()
  const dispatch = useDispatch()

  const columnName = useSelector((state) => state.columns[columnId].title)
  const projects = useSelector((state) => state.projects.list)
  const [projectName, setProjectName] = useState(null)

  // continues to generate the current project's name for a given task any
  // time the column or project updates
  useEffect(() => {
    const projectsArray = Object.entries(projects)
    const name = projectsArray.filter((project) => project[1].columnIds.includes(columnId))[0][1]
      .title
    setProjectName(name)
  }, [columnId, projects])

  const handleTaskTitleUpdate = (newTitle) => {
    dispatch(updateTaskTitle({ taskId: task.id, newTitle }))
  }

  return (
    <Card className={classes.modalContainer}>
      <CardHeader
        action={<CloseIconButton />}
        avatar={<AssignmentIcon />}
        title={<EditableText startText={task.title} submitCallback={handleTaskTitleUpdate} />}
        subheader={`From ${projectName} - ${columnName}`}
      />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={9} className={classes.taskModalContainer}>
            <TaskDescription taskId={task.id} />
            <TaskActivity activities={task.activity} darkMode={darkMode} />
          </Grid>
          <Grid item xs>
            <Paper elevation={6} className={classes.taskModalContainer}>
              <Typography variant='h5' gutterBottom>
                Add to Task
              </Typography>
              <div className={classes.actionList}>
                <AddChecklist taskId={task.id} />
                <AddDeadline taskId={task.id} />
                <AddLink taskId={task.id} />
              </div>
            </Paper>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
