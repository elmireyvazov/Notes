import React, { useContext } from 'react'
import axios from 'axios'

import penSvg from '../../assets/img/pen.svg'

import './Tasks.scss'
import AddTaskForm from './AddTaskForm'
import Task from './Task'
import { AuthContext } from '../AuthProvider'

const Tasks = ({
  list,
  lists,
  onEditTitle,
  onAddTask,
  onRemoveTask,
  onEditTask,
  onCompleteTask,
  withoutEmpty,
  isAllTasksMode,
}) => {
  const editTitle = () => {
    const newTitle = window.prompt('Название списка', list.name)
    if (newTitle) {
      onEditTitle(list.id, newTitle)
      axios
        .patch('http://localhost:3001/lists/' + list.id, {
          name: newTitle,
        })
        .catch(() => {
          alert('Не удалось обновить название списка')
        })
    }
  }

  const renderList = list => {
    return list.tasks.map(task => (
      <Task
        key={task.id}
        list={list}
        onEdit={onEditTask}
        onRemove={onRemoveTask}
        onComplete={onCompleteTask}
        {...task}
      />
    ))
  }

  return (
    <div className='tasks'>
      <h2 style={{ color: list.color.hex }} className='tasks__title'>
        {list.name}
        <img onClick={editTitle} src={penSvg} alt='Pen icon' />
      </h2>

      <div className='tasks__items'>
        {!withoutEmpty && list.tasks && !list.tasks.length && <h2>Задачи отсутствуют</h2>}
        {isAllTasksMode
          ? lists.map(innerList => (
              <>
                <h3 style={{ color: innerList.color.hex }} className='tasks__inner-title'>
                  {innerList.name}
                </h3>
                {renderList(innerList)}
              </>
            ))
          : renderList(list)}
        {!isAllTasksMode && <AddTaskForm key={list.id} list={list} onAddTask={onAddTask} />}
      </div>
    </div>
  )
}

export default Tasks
