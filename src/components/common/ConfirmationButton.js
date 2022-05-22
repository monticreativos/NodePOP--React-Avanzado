import React from 'react'
import T from 'prop-types'
import { Link } from 'react-router-dom'
import { Navigate, useParams, useNavigate } from 'react-router-dom'

import { authLogout, tweetDeleted } from '../../store/actions'
import { useDispatch, useSelector } from 'react-redux'
import { getIsLogged } from '../../store/selectors'

// function ConfirmationButton({ confirmation, onConfirm, ...props }) {
function ConfirmationButton({ confirmation, classname, onConfirm }) {
  const { advertId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [confirmationVisible, setConfirmationVisible] = React.useState(false)

  const showConfirmation = () => setConfirmationVisible(true)
  const hideConfirmation = () => setConfirmationVisible(false)

  const handleClick = showConfirmation

  const handleCancelClick = hideConfirmation

  const isLogged = useSelector(getIsLogged)
  // const dispatch = useDispatch()
  const handleConfirmClick = () => {
    dispatch(tweetDeleted(advertId)).then(() => navigate(`/adverts/`))
    // return <Navigate to="/adverts" />
    // return onConfirm(advertId)
  }
  // return <Navigate to="/login" />

  const handleLogoutClick = async () => {
    handleCancelClick()
    dispatch(authLogout())
  }

  // return isLogged ? (
  //   <Button className={className} onClick={handleLogoutClick}>
  //     Logout
  //   </Button>
  // ) : (
  //   <Button as={Link} to="/login" variant="primary" className={className}>
  //     Login
  //   </Button>
  // );
  return isLogged ? (
    <>
      <button onClick={handleClick} className="btn">
        delete
      </button>

      {confirmationVisible && (
        <div>
          {confirmation}
          <button
            as={Link}
            to="/login"
            variant="primary"
            className={classname}
            onClick={handleConfirmClick}
          >
            Ok
          </button>
          <button onClick={handleLogoutClick}>Cancel</button>
        </div>
      )}
    </>
  ) : (
    <>
      <button as={Link} to="/login" variant="primary" className={classname} />
    </>
  )
}

ConfirmationButton.propTypes = {
  confirmation: T.node,
  onConfirm: T.func.isRequired,
}

ConfirmationButton.defaultProps = {
  confirmation: null,
}

export default ConfirmationButton
