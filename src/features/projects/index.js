// import react libraries
import React from 'react'

// import modules
import { makeStyles } from '@material-ui/core/styles'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { useDispatch, useSelector } from 'react-redux'
import { Paper } from '@material-ui/core'

// import project files
import { editColumnOrder, editProjectOrder } from './projectSlice'
import { editTaskOrder } from './columnSlice'
import Project from './pages/Project'

const useStyles = makeStyles((theme) => ({
  page: {
    position: 'absolute',
    top: 64,
    left: 0,
    width: '100vw',
    height: 'calc(100vh - 64px)',
    overflow: 'hidden',
  },
  dropZone: {
    margin: theme.spacing(2),
    overflowX: 'hidden',
    maxHeight: 'calc(100vh - 96px)',
    '&::-webkit-scrollbar': {
      width: '12px',
      height: '12px',
    },
    '&::-webkit-scrollbar-track': {
      borderRadius: '12px',
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.3)',
      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.3)',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.3)',
      borderRadius: '12px',
    },
  },
}))

export default function Projects(props) {
  const { darkMode } = props
  const classes = useStyles()
  const dispatch = useDispatch()
  const projects = useSelector((state) => state.projects.list)
  const projectOrder = useSelector((state) => state.projects.order)

  // handler for drag-and-drop
  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result

    // if there is no destination, abort
    if (!destination) return

    // if the source and destination are the same, no need to do anything
    if (destination.droppableId === source.droppableId && destination.index === source.index) return

    // if you're dragging projects
    if (type === 'project') {
      dispatch(
        editProjectOrder({ source: source.index, destination: destination.index, id: draggableId })
      )
    }
    // if you're dragging columns
    if (type === 'column') {
      const startProject = projects[source.droppableId]
      const endProject = projects[destination.droppableId]

      dispatch(
        editColumnOrder({
          columnId: draggableId,
          destination: destination.index,
          endProjectId: endProject.id,
          source: source.index,
          startProjectId: startProject.id,
        })
      )
    }

    // if you're dragging tasks
    if (type === 'task') {
      dispatch(
        editTaskOrder({
          startColumnId: source.droppableId,
          endColumnId: destination.droppableId,
          source: source.index,
          destination: destination.index,
          taskId: draggableId,
        })
      )
    }
  }

  return (
    <div className={classes.page}>
      <Paper className={classes.dropZone}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId='all-projects' direction='vertical' type='project'>
            {(provided) => (
              <Paper
                elevation={3}
                style={{
                  minHeight:
                    projectOrder.length > 0
                      ? `${80 * projectOrder.length + 15 + projectOrder.length}px`
                      : '168px',
                  padding: '1px 0px',
                }}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {projectOrder.map((id, index) => (
                  <Project key={id} projectId={id} index={index} darkMode={darkMode} />
                ))}

                {provided.placeholder}
              </Paper>
            )}
          </Droppable>
        </DragDropContext>
      </Paper>
    </div>
  )
}
