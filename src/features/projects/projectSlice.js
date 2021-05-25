import { createSlice } from '@reduxjs/toolkit'
import cuid from 'cuid'

const projectSlice = createSlice({
  name: 'projects',
  initialState: {},
  reducers: {
    dropAll(state) {
      state.list = []
      state.order = []
    },
    createProject: {
      reducer: (state, { payload }) => {
        state.order = [payload.id, ...state.order]
        state.list.push(payload)
      },
      prepare: (projectTitle) => {
        const id = cuid()
        const color = { h: Math.floor(Math.random() * 360), s: '30%' }
        const title = projectTitle
          .trim() // remove any extra spaces
          .replace(/&nbsp;/g, ' ') // replace html spaces
          .replace(/&lt;/g, '<') // replace html less-than
          .replace(/&gt;/g, '>') // replace html greater-than
          .replace(/\n/g, '') // remove line-breaks
        console.log(`id: ${id}, title: ${title}, color: ${color}`)
        return { payload: { id, title, collapsed: false, color, columnIds: [] } }
      },
    },
    editColumnOrder(
      state,
      { payload: { columnId, destinationIndex, endProjectId, sourceIndex, startProjectId } }
    ) {
      const startProjectIndex = state.list.findIndex((project) => project.id === startProjectId)
      const endProjectIndex = state.list.findIndex((project) => project.id === endProjectId)

      if (startProjectId === endProjectId) {
        state.list[startProjectIndex].columnIds.splice(sourceIndex, 1)
        state.list[startProjectIndex].columnIds.splice(destinationIndex, 0, columnId)
      } else {
        state.list[startProjectIndex].columnIds.splice(sourceIndex, 1)
        state.list[endProjectIndex].columnIds.splice(destinationIndex, 0, columnId)
      }
    },
    editProjectOrder(state, { payload: { sourceIndex, destinationIndex, id } }) {
      state.order.splice(sourceIndex, 1)
      state.order.splice(destinationIndex, 0, id)
    },
    editProjectCollapsed(state, { payload: { projectId, isCollapsed } }) {
      state.list.map((project) =>
        project.id === projectId ? { ...project, collapsed: isCollapsed } : project
      )
    },
    removeProject(state, { payload: { projectId } }) {
      state.list.filter((project) => project.id !== projectId)
    },
    updateProjectTitle(state, { payload: { projectId, newTitle } }) {
      const index = state.list.findIndex((project) => project.id === projectId)
      state.list[index].title = newTitle
    },
    updateProjectColor(state, { payload: { projectId, newColor } }) {
      state.list[projectId].color = { ...state.list[projectId].color, h: newColor }
    },
  },
  extraReducers: {
    'columns/removeColumn': (state, { payload: { columnId, projectId } }) => {
      state.list.map((project) =>
        project.id === projectId
          ? { ...project, columnIds: project.columnIds.filter((id) => id !== columnId) }
          : project
      )
    },
    'columns/createColumn': (state, { payload: { projectId, column } }) => {
      state.list.map((project) =>
        project.id === projectId
          ? { ...project, columnIds: [column.id, ...project.columnIds] }
          : project
      )
    },
  },
})

export const {
  dropAll,
  createProject,
  editColumnOrder,
  editProjectCollapsed,
  editProjectOrder,
  removeProject,
  updateProjectColor,
  updateProjectTitle,
} = projectSlice.actions
export default projectSlice.reducer
