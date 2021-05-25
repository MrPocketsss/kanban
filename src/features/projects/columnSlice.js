import { createSlice } from '@reduxjs/toolkit'
import cuid from 'cuid'

const columnSlice = createSlice({
  name: 'columns',
  initialState: {},
  reducers: {
    createColumn: {
      reducer: (state, { payload: { column } }) => {
        state.push(column)
      },
      prepare: ({ titleName, projectId }) => {
        const id = cuid()
        const title = titleName
          .trim() // remove any extra spaces
          .replace(/&nbsp;/g, ' ') // replace html spaces
          .replace(/&lt;/g, '<') // replace html less-than
          .replace(/&gt;/g, '>') // replace html greater-than
          .replace(/\n/g, '') // remove line-breaks

        return { payload: { column: { id, title, taskIds: [] }, projectId } }
      },
    },
    editTaskOrder(
      state,
      { payload: { destinationIndex, endColumn, sourceIndex, startColumn, taskId } }
    ) {
      const startIndex = state.findIndex((column) => column.id === startColumn.id)
      const endIndex = state.findIndex((column) => column.id === endColumn.id)

      if (startColumn.id === endColumn.id) {
        state[startIndex].taskIds.splice(sourceIndex, 1)
        state[startIndex].taskIds.splice(destinationIndex, 0, taskId)
      } else {
        state[startIndex].taskIds.splice(sourceIndex, 1)
        state[endIndex].taskIds.splice(destinationIndex, 0, taskId)
      }
    },
    removeColumn(state, { payload: { columnId } }) {
      state.filter((column) => column.id !== columnId)
    },
    updateColumnTitle(state, { payload: { columnId, newTitle } }) {
      const index = state.findIndex((column) => column.id === columnId)
      state[index].title = newTitle
    },
  },
  extraReducers: {
    'projects/dropAll': (state) => ({}),
    'projects/removeProject': (state, { payload: { columnIds } }) => {
      state.filter((column) => !columnIds.include(column.id))
    },
    'tasks/createTask': (state, { payload: { column, task } }) => {
      const index = state.findIndex((element) => element.id === column.id)
      state[index].taskIds.splice(0, 0, task.id)
    },
  },
})

export const { createColumn, editTaskOrder, removeColumn, updateColumnTitle } = columnSlice.actions
export default columnSlice.reducer
