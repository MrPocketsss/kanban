import { createSlice } from '@reduxjs/toolkit'
import cuid from 'cuid'

// helper function to sanitize inputs
function sanitizeText(text) {
  return text
    .trim() // remove any extra spaces
    .replace(/&nbsp;/g, ' ') // replace html spaces
    .replace(/&lt;/g, '<') // replace html less-than
    .replace(/&gt;/g, '>') // replace html greater-than
    .replace(/\n/g, '') // remove line-breaks
}

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {},
  reducers: {
    addChecklist: {
      reducer: (state, { payload: { taskId, checklist } }) => {
        const index = state.findIndex((task) => task.id === taskId)
        state[index].activity.splice(0, 0, {
          content: [`Added list ${checklist.title}`],
          when: Date.now(),
        })
        if (state[index].list) {
          state[index].list.splice(0, 0, checklist)
        } else {
          state[index].list = [checklist]
        }
      },
      prepare: ({ taskId, checklistTitle }) => {
        const id = cuid()
        const title = sanitizeText(checklistTitle)

        return {
          payload: {
            taskId,
            checklist: {
              hideCompleted: false,
              id,
              items: [],
              title,
            },
          },
        }
      },
    },
    addChecklistItem: {
      reducer: (state, { payload: { newItem, listId, taskId } }) => {
        const taskIndex = state.findIndex((task) => task.id === taskId)
        const itemIndex = state[taskIndex].list.findIndex((item) => item.id === listId)

        state[taskIndex].list[itemIndex].items.push(newItem)
        state[taskIndex].activity.slice(0, 0, {
          content: [
            `Added item: ${newItem.title} to list: ${state[taskIndex].list[itemIndex].title}`,
          ],
          when: Date.now(),
        })
      },
      prepare: ({ itemTitle, listId, taskId }) => {
        const id = cuid()
        const title = sanitizeText(itemTitle)

        return {
          payload: {
            newItem: { completed: false, id, title },
            listId,
            taskId,
          },
        }
      },
    },
    addLink: {
      reducer: (state, { payload: { link, taskId } }) => {
        const index = state.findIndex((task) => task.id === taskId)

        state[index].activity.splice(0, 0, {
          content: [`Added link ${link.description}`],
          when: Date.now(),
        })
        if (state[index].links) {
          state[index].links.push(link)
        } else {
          state[index].links = [link]
        }
      },
      prepare: ({ linkDescription, linkURL, taskId }) => {
        return {
          payload: {
            taskId,
            link: {
              id: cuid(),
              description: sanitizeText(linkDescription),
              url: sanitizeText(linkURL),
            },
          },
        }
      },
    },
    createTask: {
      reducer: (state, { payload: { column, project, task } }) => {
        state.push(task)
      },
      prepare: ({ column, project, titleName }) => {
        const id = cuid()
        const title = sanitizeText(titleName)

        return {
          payload: {
            column,
            project,
            task: {
              id,
              title,
              description: '',
              activity: [
                {
                  content: [
                    'Created task at ',
                    {
                      project: project.title,
                      color: { h: project.color.h, s: project.color.s },
                    },
                    ' - ',
                    {
                      column: column.title,
                      color: { h: project.color.h, s: project.color.s },
                    },
                  ],
                  when: Date.now(),
                },
              ],
            },
          },
        }
      },
    },
    hideCompleted(state, { payload: { listIndex, taskId } }) {
      const index = state.findIndex((task) => task.id === taskId)

      state[index].list[listIndex].hideCompleted = !state[index].list[listIndex].hideCompleted
    },
    markListItem(state, { payload: { itemIndex, listIndex, taskId } }) {
      const index = state.findIndex((task) => task.id === taskId)

      state[index].list[listIndex].items[itemIndex].completed =
        !state[index].list[listIndex].items[itemIndex].completed
      state[index].activity.splice(0, 0, {
        content: [
          `Marked ${state[index].list[listIndex].items[itemIndex].title} as ${state[index].list[listIndex].items[itemIndex].completed}`,
        ],
        when: Date.now(),
      })
    },
    removeList(state, { payload: { listIndex, taskId } }) {
      const index = state.findIndex((task) => task.id === taskId)

      state[index].activity.splice(0, 0, {
        content: [`Deleted list: ${state[index].list[listIndex].title}`],
        when: Date.now(),
      })
      state[index].list.splice(listIndex, 1)
    },
    updateTaskDescription(state, { payload: { description, taskId } }) {
      const index = state.findIndex((task) => task.id === taskId)

      state[index].activity.splice(0, 0, {
        content: [`Updated description to: ${description}`],
        when: Date.now(),
      })
      state[index].description = description
    },
    updateTaskTitle(state, { payload: { taskId, newTitle } }) {
      const index = state.findIndex((task) => task.id === taskId)

      state[index].activity.splice(0, 0, {
        content: [`Updated name from ${state[index].title} to ${newTitle}`],
        when: Date.now(),
      })
      state[index].title = newTitle
    },
  },
  extraReducers: {
    'projects/dropAll': (state) => ({}),
    'projects/removeProject': (state, { payload: { taskIds } }) => {
      state.filter((task) => !taskIds.include(task.id))
    },
    'columns/editTaskOrder': (
      state,
      {
        payload: {
          destinationIndex,
          endColumn,
          endProject,
          sourceIndex,
          startColumn,
          startProject,
          taskId,
        },
      }
    ) => {
      let content = ''

      if (startProject.id === endProject.id) {
        if (startColumn.id === endColumn.id) {
          content = [
            'Changed positions from ',
            { position: sourceIndex || '0' },
            ' to ',
            { position: destinationIndex || '0' },
            ' in ',
            {
              project: startProject.title,
              color: { h: startProject.color.h, s: startProject.color.s },
            },
            ' - ',
            {
              column: startColumn.title,
              color: { h: startProject.color.h, s: startProject.color.s },
            },
          ]
        } else {
          content = [
            'Moved from ',
            {
              column: startColumn.title,
              color: { h: startProject.color.h, s: startProject.color.s },
            },
            ' to ',
            {
              column: endColumn.title,
              color: { h: startProject.color.h, s: startProject.color.s },
            },
          ]
        }
      } else {
        content = [
          'Moved from ',
          {
            project: startProject.title,
            color: { h: startProject.color.h, s: startProject.color.s },
          },
          ' - ',
          {
            column: startColumn.title,
            color: { h: startProject.color.h, s: startProject.color.s },
          },
          ' to ',
          { project: endProject.title, color: { h: endProject.color.h, s: endProject.color.s } },
          ' - ',
          {
            column: endColumn.title,
            color: { h: endProject.color.h, s: endProject.color.s },
          },
        ]
      }

      const index = state.findIndex((task) => task.id === taskId)
      state[index].activity.splice(0, 0, { content, when: Date.now() })
    },
  },
})

export const {
  addChecklist,
  addChecklistItem,
  addLink,
  createTask,
  hideCompleted,
  markListItem,
  removeList,
  updateTaskDescription,
  updateTaskTitle,
} = taskSlice.actions
export default taskSlice.reducer
