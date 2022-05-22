import T from 'prop-types'
import { connect } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import { getIsLogged } from '../../../store/selectors'

const RequireAuth = ({ isLogged, children }) => {
  const location = useLocation()

  if (!isLogged) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

RequireAuth.propTypes = {
  isLogged: T.bool,
  children: T.node,
}

const mapStateToProps = (state) => {
  return {
    isLogged: getIsLogged(state),
  }
}

const ConectedRequireAuth = connect(
  mapStateToProps,
  //  mapDispatchToProps,
)(RequireAuth)

export default ConectedRequireAuth
