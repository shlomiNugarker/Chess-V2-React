import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../features/auth/asyncActions'
import { useAppDispatch } from '../hooks/useAppDispatch'

export const SignIn = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [cred, setCred] = useState({
    username: '',
    password: '',
  })

  const handleChange = async (ev: React.ChangeEvent<HTMLInputElement>) => {
    const field = ev.target.name
    let value =
      ev.target.type === 'number' ? +ev.target.value || '' : ev.target.value
    setCred((prevCred) => ({ ...prevCred, [field]: value }))
  }

  const cleanFields = () => setCred(() => ({ username: '', password: '' }))

  const submit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    if (!cred.username && cred.password.length < 4) return
    dispatch(login(cred)).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') navigate('/')
    })
    cleanFields()
  }
  return (
    <div className="sign-in-page">
      <div className="container">
        <form onSubmit={submit} action="">
          <div>
            <h1>Sign in</h1>
          </div>
          <div>
            <label htmlFor="username">
              <p>User name </p>
              <input
                onChange={handleChange}
                placeholder="User name"
                name="username"
                type="text"
                id="username"
                value={cred.username}
              />
            </label>
          </div>
          <div>
            <label htmlFor="password">
              <p>Password</p>
              <input
                onChange={(ev) => handleChange(ev)}
                type="password"
                placeholder="Password"
                name="password"
                id="password"
                value={cred.password}
              />
            </label>
          </div>
          <div>
            <button type="submit">Login</button>
          </div>
        </form>

        <div className="bottom-btns">
          <Link to={'/sign-up'}>Sign up</Link>
          <Link to={'/sign-up'}>Reset password</Link>
          <Link to={'/sign-up'}>Login by email</Link>
        </div>
      </div>
    </div>
  )
}
