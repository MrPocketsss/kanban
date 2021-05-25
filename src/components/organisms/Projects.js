// import react modules
import React, { useEffect, useState } from 'react'

// import modules
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { useDispatch, useSelector } from 'react-redux'
import { Card, CardHeader, Collapse, IconButton, Paper } from '@material-ui/core'
import clsx from 'clsx'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

// import project files
import { useStyles } from './styles'
import { editProjectCollapsed, updateProjectTitle } from '../../features/projects/projectSlice'
import { EditableText } from '../atoms'
import { ProjectMenu } from '../molecules'
import Column from './Column'

export default function Projects({ darkMode, projectId, index }) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const project = useSelector((state) => state.projects.list[projectId])

  // state to control the project card styling
  const [cardStyle, setCardStyle] = useState({
    backgroundColor: `hsl(${project.color.h}, ${project.color.s}, ${
      darkMode === 'dark' ? '30%' : '60%'
    })`,
  })

  useEffect(() => {
    setCardStyle({
      backgroundColor: `hsl(${project.color.h}, ${project.color.s}, ${
        darkMode === 'dark' ? '30%' : '60%'
      })`,
    })
  }, [darkMode, project])

  // handle the collapsing card content of the project
  const [collapsed, setCollapsed] = useState(project.collapsed)
  const handleExpandClick = () => {
    setCollapsed(!collapsed)
    dispatch(editProjectCollapsed({ projectId, isCollapsed: !collapsed }))
  }
  // handle the change of the project title
  const handleTitleUpdate = (newTitle) => {
    dispatch(updateProjectTitle({ projectId, newTitle }))
  }
  const handleToggleCollapse = () => {
    setCollapsed(false)
    dispatch(editProjectCollapsed({ projectId, isCollapsed: false }))
  }

  return (
    <Draggable draggableId={projectId} index={index}>
      {(provided) => (
        <div
          className={classes.projectRoot}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card elevation={8} style={cardStyle}>
            <CardHeader
              action={<ProjectMenu projectId={projectId} toggleCollapsed={handleToggleCollapse} />}
              avatar={
                <IconButton
                  className={clsx(classes.expand, { [classes.expandOpen]: !collapsed })}
                  onClick={handleExpandClick}
                  aria-expanded={!collapsed}
                  aria-label='show more'
                >
                  <ExpandMoreIcon />
                </IconButton>
              }
              title={<EditableText startText={project.title} submitCallback={handleTitleUpdate} />}
            />
            <Collapse in={!collapsed} timeout='auto' unmountOnExit className={classes.collapse}>
              <Droppable droppableId={projectId} direction='horizontal' type='column'>
                {(provided, snapshot) => (
                  <Paper
                    elevation={3}
                    className={classes.projectContainer}
                    style={cardStyle}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {project.columnIds.map((id, index) => (
                      <Column
                        key={id}
                        color={project.color}
                        columnId={id}
                        darkMode={darkMode}
                        index={index}
                        projectId={projectId}
                      />
                    ))}
                    {provided.placeholder}
                  </Paper>
                )}
              </Droppable>
            </Collapse>
          </Card>
        </div>
      )}
    </Draggable>
  )
}
