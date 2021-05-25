// import react modules
import React, { useState } from 'react'

// import modules
import { useDispatch, useSelector } from 'react-redux'
import { Paper, TextField } from '@material-ui/core'

// import project files
import { useStyles } from './styles'
import { updateTaskDescription } from '../../features/projects/taskSlice'

export default function TaskDescription({ taskId }) {
  const classes = useStyles()
  const dispatch = useDispatch()

  const description = useSelector(
    (state) => state.tasks.find((task) => task.id === taskId).description
  )

  const [text, setText] = useState(description)

  const handleChange = (event) => {
    setText(event.target.value)
  }
  const handleBlur = (event) => {
    dispatch(updateTaskDescription({ taskId, description: event.target.value }))
  }

  return (
    <Paper elevation={6} className={classes.taskModalContent}>
      <TextField
        label='Description'
        multiline
        rowsMax={8}
        value={text}
        onChange={handleChange}
        onBlur={handleBlur}
        fullWidth
        className={classes.taskModalDescription}
      />
    </Paper>
  )
}
