import T from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { authLogin, uiResetError } from '../../../store/actions'

import useForm from '../../../hooks/useForm'

const validEmail = ({ email }) => email
const validPassword = ({ password }) => password

function LoginForm({ onSubmit }) {
  const dispatch = useDispatch()
  const {
    formValue: credentials,
    handleChange,
    // handleSubmit,
    validate,
  } = useForm({
    email: '',
    password: '',
    remember: false,
  })
  const { email, password, remember } = credentials

  const handleSubmit = async (event) => {
    // event.preventDefault()
    dispatch(authLogin(credentials))
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" value={email} onChange={handleChange} />
      <input
        type="password"
        name="password"
        value={password}
        onChange={handleChange}
      />
      <input
        type="checkbox"
        name="remember"
        checked={remember}
        onChange={handleChange}
      />
      <button disabled={!validate(validEmail, validPassword)}>Login</button>
    </form>
  )
}

LoginForm.propTypes = {
  onSubmit: T.func.isRequired,
}

export default LoginForm
