import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../AuthProvider'
import axios from 'axios'

import './AuthPage.scss'

const AuthPage = () => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [users, setUsers] = useState([])

  const { updateUserId } = useContext(AuthContext)

  useEffect(() => {
    axios.get('http://localhost:3001/users').then(({ data }) => {
      setUsers(data)
    })
  }, [])

  const handleSubmit = e => {
    e.preventDefault()

    const foundUser = users.find(user => user.name === name && user.password === password)

    if (foundUser) {
      updateUserId(foundUser.id)
    }
  }

  return (
    <div className='auth-overlay'>
      <div className='auth-content'>
        <h3>Вход в приложение</h3>
        <form>
          <input
            type='text'
            placeholder='Имя'
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            type='password'
            placeholder='Пароль'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button type='submit' onClick={handleSubmit}>
            Войти
          </button>
        </form>
      </div>
    </div>
  )
}

export default AuthPage
