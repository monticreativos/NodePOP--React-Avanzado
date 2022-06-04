import React from 'react'
import T from 'prop-types'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'

import { authLogout, advertDeleted } from '../../store/actions'
import { useDispatch, useSelector } from 'react-redux'
import { getIsLogged } from '../../store/selectors'

function ConfirmationButton({ confirmation, classname }) {
  const { advertId } = useParams()
  const dispatch = useDispatch()

  const [confirmationVisible, setConfirmationVisible] = React.useState(false)

  const showConfirmation = () => setConfirmationVisible(true)
  const hideConfirmation = () => setConfirmationVisible(false)

  const handleClick = showConfirmation

  const handleCancelClick = hideConfirmation

  const isLogged = useSelector(getIsLogged)

  const handleConfirmClick = () => {
    dispatch(advertDeleted(advertId))
  }

  const handleLogoutClick = async () => {
    handleCancelClick()
    dispatch(authLogout())
  }

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
}

ConfirmationButton.defaultProps = {
  confirmation: null,
}

export default ConfirmationButton
