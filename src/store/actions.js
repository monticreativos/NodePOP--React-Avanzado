import { getAreAdvertsLoaded, getAdvert } from './selectors'
import {
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT_SUCCESS,
  ADVERTS_LOADED_FAILURE,
  ADVERTS_LOADED_REQUEST,
  ADVERTS_LOADED_SUCCESS,
  ADVERT_CREATED_FAILURE,
  ADVERT_CREATED_SUCCESS,
  ADVERT_LOADED_FAILURE,
  ADVERT_LOADED_SUCCESS,
  ADVERTS_FILTER_REQUEST,
  ADVERTS_FILTER_SUCCESS,
  ADVERTS_FILTER_FAILURE,
  UI_RESET_ERROR,
  ACCESS_TOKEN,
  ADVERT_DELETED_SUCCESS,
  ADVERT_DELETED_FAILURE,
  ADVERT_TAGS,
} from './types'

export const accessToken = () => ({
  type: ACCESS_TOKEN,
})
export const authLoginRequest = () => ({
  type: AUTH_LOGIN_REQUEST,
})

export const advertTagsnRequest = () => ({
  type: ADVERTS_FILTER_REQUEST,
})

export const advertTagsSuccess = (adverts) => ({
  type: ADVERTS_FILTER_SUCCESS,
  payload: adverts,
})

export const advertTagsFailure = (error) => ({
  type: ADVERTS_FILTER_FAILURE,
  payload: error,
  error: true,
})

export const advertTags = (tags) => ({
  type: ADVERT_TAGS,
  payload: tags,
})

export const authLoginSuccess = (token) => ({
  type: AUTH_LOGIN_SUCCESS,
  payload: token,
})

export const authLoginFailure = (error) => ({
  type: AUTH_LOGIN_FAILURE,
  payload: error,
  error: true,
})

export const accessTokenState = async () => {
  return async function (dispatch, _getState) {
    return dispatch(accessToken())
  }
}
export const authLogin = (credentials) => {
  return async function (dispatch, _getState, { api, history }) {
    dispatch(authLoginRequest())
    try {
      const response = await api.auth.login(credentials)
      console.log(response)
      dispatch(authLoginSuccess(response))
      // redirect...
      const from = history.location.state?.from?.pathname || '/adverts'
      console.log(from)
      history.replace(from)
    } catch (error) {
      dispatch(authLoginFailure(error))
    }
  }
}

export const authLogoutSuccess = () => ({
  type: AUTH_LOGOUT_SUCCESS,
})

export const authLogout = () => {
  return function (dispatch, _getState, { api }) {
    return api.auth.logout().then(() => {
      dispatch(authLogoutSuccess())
    })
  }
}

export const advertsLoadedRequest = () => ({
  type: ADVERTS_LOADED_REQUEST,
})

export const advertsLoadedSuccess = (adverts) => ({
  type: ADVERTS_LOADED_SUCCESS,
  payload: adverts,
})

export const advertsLoadedFailure = (error) => ({
  type: ADVERTS_LOADED_FAILURE,
  payload: error,
  error: true,
})

export const advertsLoaded = () => {
  return async function (dispatch, getState, { api }) {
    const advertssLoaded = getAreAdvertsLoaded(getState())
    if (advertssLoaded) return

    dispatch(advertsLoadedRequest())
    try {
      const adverts = await api.adverts.getAdverts()
      // const tags = await api.adverts.getTags()
      // dispatch(advertTags(tags))
      dispatch(advertsLoadedSuccess(adverts))
      return
    } catch (error) {
      dispatch(advertsLoadedFailure(error))
    }
  }
}

// export const advertsLoadedFilter = () => {
//   return async function (dispatch, getState, { api }) {
//     const getFilters = () => storage.get('filters') || defaultFilters
//     const filters = getFilters()
//     dispatch(advertTagsnRequest())
//     try {
//       const adverts = await api.adverts.getAdverts()
//       const advertsFiltered = filterAdverts(adverts, filters)
//       console.log(filters)
//       console.log(advertsFiltered)
//       dispatch(advertTagsSuccess(advertsFiltered))

//       if (advertsFiltered) return
//     } catch (error) {
//       dispatch(advertTagsFailure(error))
//     }
//   }
// }

export const advertLoadedSuccess = (advert) => ({
  type: ADVERT_LOADED_SUCCESS,
  payload: advert,
})

export const advertLoadedFailure = (error) => ({
  type: ADVERT_LOADED_FAILURE,
  payload: error,
  error: true,
})

export const advertLoaded = (advertId) => {
  return async function (dispatch, getState, { api, history }) {
    const advertLoaded = getAdvert(advertId)(getState())
    if (advertLoaded) return

    // dispatch(advertLoadedRequest());
    try {
      const advert = await api.adverts.getAdvert(advertId)
      dispatch(advertLoadedSuccess(advert))
    } catch (error) {
      dispatch(advertLoadedFailure(error))
    }
  }
}

export const tweetCreatedSuccess = (advert) => ({
  type: ADVERT_CREATED_SUCCESS,
  payload: advert,
})

export const tweetCreatedFailure = (error) => ({
  type: ADVERT_CREATED_FAILURE,
  payload: error,
  error: true,
})

export const tweetCreated = (advert) => {
  return async function (dispatch, _getState, { api, history }) {
    // dispatch(tweetCreatedRequest());
    try {
      const { id } = await api.adverts.createAdvert(advert)
      const createdTweet = await api.adverts.getAdvert(id)
      dispatch(tweetCreatedSuccess(createdTweet))
      return createdTweet
    } catch (error) {
      dispatch(tweetCreatedFailure(error))
    }
  }
}

export const tweetDeletedSuccess = (adverts) => ({
  type: ADVERT_DELETED_SUCCESS,
  payload: adverts,
})

export const tweetDeletedFailure = (error) => ({
  type: ADVERT_DELETED_FAILURE,
  payload: error,
  error: true,
})

export const tweetDeleted = (id) => {
  return async function (dispatch, _getState, { api, history }) {
    // dispatch(tweetCreatedRequest());
    try {
      console.log(id)
      const deleted = api.adverts.deleteAdvert(id)
      const adverts = await api.adverts.getAdverts()
      // const tags = await api.adverts.getTags()
      // dispatch(advertTags(tags))
      dispatch(tweetDeletedSuccess(true))
    } catch (error) {
      dispatch(tweetCreatedFailure(error))
    }
  }
}

export const uiResetError = () => ({
  type: UI_RESET_ERROR,
})
