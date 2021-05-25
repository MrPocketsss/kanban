// import react libraries
import React from 'react'

// import modules
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { useDispatch, useSelector } from 'react-redux'
import { Card, CardContent, CardHeader, Divider, Paper } from '@material-ui/core'

// import project files
import { useStyles } from './styles'
import { EditableText, ProjectInput } from '../atoms'
import { ColumnMenu } from '../molecules'
import { updateColumnTitle } from '../../features/projects/columnSlice'
import { createTask } from '../../features/projects/taskSlice'
import Task from './Task'

export default function Column({ color, columnId, darkMode, index, projectId }) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const column = useSelector((state) => state.columns.find((column) => column.id === columnId))
  const project = useSelector((state) =>
    state.projects.list.find((project) => project.id === projectId)
  )

  // sets the card style for the column
  const getProjectStyle = () => ({
    backgroundColor: `hsl(${color.h}, ${color.s}, 40%)`,
  })

  // handles when the column title is updated
  const handleTitleUpdate = (newTitle) => {
    dispatch(updateColumnTitle({ columnId, newTitle }))
  }

  // handles the creation of a new task in this column
  const handleCreateTask = (newTitle) => {
    dispatch(createTask({ column, project, titleName: newTitle }))
  }

  return (
    <Draggable draggableId={columnId} index={index}>
      {(provided) => (
        <div
          className={classes.columnRoot}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card elevation={8} style={getProjectStyle()}>
            <CardHeader
              action={<ColumnMenu columnId={columnId} projectId={projectId} />}
              title={<EditableText startText={column.title} submitCallback={handleTitleUpdate} />}
            />
            <Divider />
            <ProjectInput handleDone={handleCreateTask} placeholder='New Task' />
            <CardContent>
              <Droppable droppableId={columnId} direction='vertical' type='task'>
                {(provided, snapshot) => (
                  <Paper
                    className={classes.taskContainer}
                    elevation={3}
                    ref={provided.innerRef}
                    style={getProjectStyle()}
                    {...provided.droppableProps}
                  >
                    {column.taskIds.map((id, index) => (
                      <Task
                        color={color}
                        columnId={columnId}
                        darkMode={darkMode}
                        index={index}
                        key={id}
                        taskId={id}
                      />
                    ))}
                    {provided.placeholder}
                  </Paper>
                )}
              </Droppable>
            </CardContent>
          </Card>
        </div>
      )}
    </Draggable>
  )
}
