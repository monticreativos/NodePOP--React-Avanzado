import { Link } from 'react-router-dom'
import Button from '../common/Button'

import { authLogout } from '../../../store/actions'
import { useDispatch, useSelector } from 'react-redux'
import { getIsLogged } from '../../../store/selectors'

function AuthButton({ className }) {
  const isLogged = useSelector(getIsLogged)
  const dispatch = useDispatch()

  const handleLogoutClick = async () => {
    dispatch(authLogout())
  }

  return isLogged ? (
    <Button className={className} onClick={handleLogoutClick}>
      Logout
    </Button>
  ) : (
    <Button as={Link} to="/login" variant="primary" className={className}>
      Login
    </Button>
  )
}

export default AuthButton
