import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Button from '../common/Button'
import FormField from '../common/FormField'
import T from 'prop-types'
import { getIsLogged } from '../../../store/selectors'
import { Navigate } from 'react-router-dom'

import './LoginPage.css'
import { useDispatch, useSelector } from 'react-redux'
import { authLogin, uiResetError } from '../../../store/actions'
import { getUi } from '../../../store/selectors'

function useRenders() {

  const count = useRef(1)
  const isLogged = useSelector(getIsLogged)
  console.log(isLogged)

  useEffect(() => {
    count.current++
  })

  if (isLogged) {
    return <Navigate to="/adverts" replace />
  }

  return count.current
}

function LoginPage() {
  const renders = useRenders()
  const ref = useRef(null)
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    remember: false,
  })
  const dispatch = useDispatch()
  const { isLoading, error } = useSelector(getUi)

  useEffect(() => {
    console.log(ref.current)
    ref.current.focus()
  }, [])

  const { email, password, remember } = credentials

  const handleChange = useCallback(
    ({ target: { value, name, type, checked } }) => {
      setCredentials((credentials) => ({
        ...credentials,
        [name]: type === 'checkbox' ? checked : value,
      }))
    },
    [],
  )

  const resetError = () => dispatch(uiResetError())

  const handleSubmit = async (event) => {
    event.preventDefault()
    dispatch(authLogin(credentials))
  }

  const buttonDisabled = useMemo(() => {
    console.log('calculando...')
    return !email || !password || isLoading
  }, [email, password, isLoading])

  return (
    <div className="loginPage">
      {renders}
      <h1 className="loginPage-title">Log in to Nodepop</h1>
      <form className="loginForm" onSubmit={handleSubmit}>
        <FormField
          type="text"
          name="email"
          label="phone, email or username"
          className="loginForm-field"
          value={email}
          onChange={handleChange}
          // ref={ref}
        />
        <FormField
          type="password"
          name="password"
          label="password"
          className="loginForm-field"
          value={password}
          onChange={handleChange}
          ref={ref}
        />
        <input
          type="checkbox"
          name="remember"
          checked={remember}
          value="remember"
          onChange={handleChange}
        />
        <select value="2" onChange={(event) => console.log(event)}>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
        </select>
        <input
          type="file"
          onChange={(event) => console.log(event.target.files[0])}
        />

        <Button
          className="loginForm-submit"
          type="submit"
          variant="primary"
          disabled={buttonDisabled}
        >
          Log in
        </Button>
      </form>
      {error && (
        <div onClick={resetError} className="loginPage-error">
          {error.message}
        </div>
      )}
    </div>
  )
}

LoginPage.propTypes = {
  onLogin: T.func,
}

export default LoginPage
