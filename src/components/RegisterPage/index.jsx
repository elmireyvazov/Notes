import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../AuthProvider'
import axios from 'axios'

// Стили - копия AuthPage.scss
// import './RegisterPage.scss'

const RegisterPage = ({ setRegister }) => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [passwordRepeat, setPasswordRepeat] = useState('')
  const [users, setUsers] = useState([])

  const { updateUserId } = useContext(AuthContext)

  useEffect(() => {
    axios.get('http://localhost:3001/users').then(({ data }) => {
      setUsers(data)
    })
  }, [])

  const handleSubmit = e => {
    e.preventDefault()

    const foundUser = users.find(user => user.name === name)

    if (foundUser) {
      return
    }

    if (password !== passwordRepeat) {
      return
    }

    axios
      .post('http://localhost:3001/users', {
        id: Math.round(Math.random() * 10000),
        name,
        password,
      })
      .then(() => {
        setRegister(false)
      })
  }

  return (
    <div className='auth-overlay'>
      <div className='auth-content'>
        <h3>Регистрация</h3>
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
          <input
            type='password'
            placeholder='Повторите пароль'
            value={passwordRepeat}
            onChange={e => setPasswordRepeat(e.target.value)}
          />
          <button type='submit' onClick={handleSubmit}>
            Создать аккаунт
          </button>
          <p className='to-other-page'>
            Уже есть аккаунт? <span onClick={() => setRegister(false)}>Войти</span>
          </p>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage
