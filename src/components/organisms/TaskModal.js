// import react modules
import React from 'react'

// import modules
import { useDispatch, useSelector } from 'react-redux'
import { Card, CardContent, CardHeader, Grid, Paper, Typography } from '@material-ui/core'
import AssignmentIcon from '@material-ui/icons/Assignment'

// import project files
import { updateTaskTitle } from '../../features/projects/taskSlice'
import { useStyles } from './styles'
import { CloseIconButton, EditableText, TaskActivity, TaskDescription } from '../atoms'
import { AddChecklist, AddDeadline, AddLink, TaskLinks, TaskLists } from '../molecules'

export default function TaskModal({ close, columnId, darkMode, task }) {
  const classes = useStyles()
  const dispatch = useDispatch()

  const columnName = useSelector(
    (state) => state.columns.find((column) => column.id === columnId).title
  )
  const projectName = useSelector(
    (state) => state.projects.list.find((project) => project.columnIds.includes(columnId)).title
  )

  const handleTaskTitleUpdate = (newTitle) => {
    dispatch(updateTaskTitle({ taskId: task.id, newTitle }))
  }

  return (
    <Card className={classes.modalContainer}>
      <CardHeader
        action={<CloseIconButton handleClick={close} />}
        avatar={<AssignmentIcon />}
        title={<EditableText startText={task.title} submitCallback={handleTaskTitleUpdate} />}
        subheader={`From ${projectName} - ${columnName}`}
      />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={9} className={classes.taskModalContainer}>
            <TaskDescription taskId={task.id} />
            {task.list ? <TaskLists list={task.list} taskId={task.id} /> : null}
            {task.links ? <TaskLinks links={task.links} taskId={task.id} /> : null}
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
