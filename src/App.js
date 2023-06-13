import React, { useState, useEffect, useContext } from 'react'
import listSvg from './assets/img/list.svg'
import axios from 'axios'

import { List, AddList, Task } from './components'

import AuthPage from './components/AuthPage'

import { AuthContext, AuthProvider } from './components/AuthProvider'

function App() {
  const [lists, setLists] = useState(null)
  const [colors, setColors] = useState(null)
  const [activeItem, setActiveItem] = useState(null)
  const [isAllTasksMode, setAllTasksMode] = useState(false)

  useEffect(() => {
    axios.get('http://localhost:3001/lists?_expand=color&_embed=tasks').then(({ data }) => {
      setLists(data)
    })
    axios.get('http://localhost:3001/colors').then(({ data }) => {
      setColors(data)
    })
  }, [])

  const onAddList = (obj, userId) => {
    const newList = [...lists, { ...obj, userId }]
    setLists(newList)

    console.log(newList)
  }

  const onAddTask = (listId, taskObj) => {
    const newList = lists.map(item => {
      if (item.id === listId) {
        item.tasks = [...item.tasks, taskObj]
      }
      return item
    })
    setLists(newList)
  }

  const onEditTask = (listId, taskObj) => {
    const newTaskText = window.prompt('Текст задачи', taskObj.text)

    if (!newTaskText) {
      return
    }

    const newList = lists.map(list => {
      if (list.id === listId) {
        list.tasks = list.tasks.map(task => {
          if (task.id === taskObj.id) {
            task.text = newTaskText
          }
          return task
        })
      }
      return list
    })
    setLists(newList)
    axios
      .patch('http://localhost:3001/tasks/' + taskObj.id, {
        text: newTaskText,
      })
      .catch(() => {
        alert('Не удалось обновить задачу')
      })
  }

  const onRemoveTask = (listId, taskId) => {
    if (window.confirm('Вы действительно хотите удалить задачу?')) {
      const newList = lists.map(item => {
        if (item.id === listId) {
          item.tasks = item.tasks.filter(task => task.id !== taskId)
        }
        return item
      })
      setLists(newList)
      axios.delete('http://localhost:3001/tasks/' + taskId).catch(() => {
        alert('Не удалось удалить задачу')
      })
    }
  }

  const onCompleteTask = (listId, taskId, completed) => {
    const newList = lists.map(list => {
      if (list.id === listId) {
        list.tasks = list.tasks.map(task => {
          if (task.id === taskId) {
            task.completed = completed
          }
          return task
        })
      }
      return list
    })
    setLists(newList)
    axios
      .patch('http://localhost:3001/tasks/' + taskId, {
        completed,
      })
      .catch(() => {
        alert('Не удалось обновить задачу')
      })
  }

  const onEditListTitle = (id, title) => {
    const newList = lists.map(item => {
      if (item.id === id) {
        item.name = title
      }
      return item
    })
    setLists(newList)
  }

  return (
    <AuthProvider>
      <AuthContext.Consumer>
        {({ userId, updateUserId }) => {
          if (!lists) {
            return
          }

          const userLists = lists.filter(list => list.userId === userId)

          return userId ? (
            <>
              <div className='appbar'>
                <div className='logo'>
                  <h3>Мои задачи</h3>
                </div>
                <button className='logout-button' onClick={() => updateUserId(null)}>
                  Выход
                </button>
              </div>
              <div className='container'>
                <div className='planning'>
                  <div className='planning__sidebar'>
                    <List
                      items={[
                        {
                          active: isAllTasksMode,
                          icon: (
                            <img src={listSvg} className='all-tasks-icon' alt='Это иконка списка' />
                          ),
                          name: 'Все задачи',
                        },
                      ]}
                      onClickItem={() => {
                        setAllTasksMode(true)
                        setActiveItem({
                          id: 'all',
                          color: { hex: '#000' },
                          name: 'Все задачи',
                        })
                      }}
                    />
                    {userLists ? (
                      <List
                        isAllTasksMode={isAllTasksMode}
                        items={userLists}
                        onRemove={id => {
                          const newLists = userLists.filter(item => item.id !== id)
                          setLists(newLists)
                        }}
                        onClickItem={item => {
                          setAllTasksMode(false)
                          setActiveItem(item)
                        }}
                        activeItem={activeItem}
                        isRemovable
                      />
                    ) : (
                      'Загрузка...'
                    )}
                    <AddList onAdd={obj => onAddList(obj, userId)} colors={colors} />
                  </div>
                  <div className='planning__tasks'>
                    {userLists && activeItem && (
                      <Task
                        lists={userLists}
                        list={activeItem}
                        isAllTasksMode={isAllTasksMode}
                        onAddTask={onAddTask}
                        onEditTitle={onEditListTitle}
                        onRemoveTask={onRemoveTask}
                        onEditTask={onEditTask}
                        onCompleteTask={onCompleteTask}
                      />
                    )}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <AuthPage />
          )
        }}
      </AuthContext.Consumer>
    </AuthProvider>
  )
}
export default App
