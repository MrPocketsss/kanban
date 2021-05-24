// import react libraries
import React from 'react'

// import modules

// import project files
import { TaskList } from '../atoms'

export default function TaskLists({ list, taskId }) {
  return (
    <>
      {list.map((listItem, index) => (
        <TaskList key={index} index={index} list={listItem} taskId={taskId} />
      ))}
    </>
  )
}
