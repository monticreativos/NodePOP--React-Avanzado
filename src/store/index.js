import { createStore, combineReducers, applyMiddleware } from 'redux'
import * as reducers from './reducers'
import { composeWithDevTools } from '@redux-devtools/extension'
import thunk from 'redux-thunk'

import * as auth from '../components/auth/service'
import * as adverts from '../components/adverts/service'
import {
  AUTH_LOGIN_SUCCESS,
  HISTORY_BACK,
  ADVERT_CREATED_SUCCESS,
} from './types'

const api = { auth, adverts }

function logger(store) {
  return function (next) {
    return function (action) {
      console.log('before action', action, store.getState())
      const result = next(action)
      console.log('after action', action, store.getState())
      return result
    }
  }
}

const timestamp = () => (next) => (action) => {
  const newAction = {
    ...action,
    meta: {
      ...action.meta,
      timestamp: new Date(),
    },
  }
  return next(newAction)
}

const allState = (store) => (next) => (action) => {
  const newAction = {
    ...action,
    meta: {
      ...action.meta,
      state: store.getState(),
    },
  }
  return next(newAction)
}

const failureRedirections = (history, redirections) => (_store) => (next) => (
  action,
) => {
  const result = next(action)
  if (action.error) {
    const redirection = redirections[action.payload.status]
    if (redirection) {
      history.push(redirection)
    }
  }

  return result
}

const successRedirections = (history, redirections) => (_store) => (next) => (
  action,
) => {
  const result = next(action)
  const redirection = redirections[action.type]
  if (redirection) {
    redirection(history, action.payload)
  }

  return result
}

const rootReducer = combineReducers(reducers)

const historyHighOrderReducer = (rootReducer) => {
  return (state, action) => {
    const { history, ...rootState } = state
    if (action.type === HISTORY_BACK) {
      const newHistory = history.slice(0, history.length - 1)
      return {
        ...newHistory[newHistory.length - 1].state,
        history: newHistory,
      }
    }
    const newState = rootReducer(rootState, action)
    return {
      ...newState,
      history: [...(history || []), { action, state: newState }],
    }
  }
}

const configureStore = (preloadedState, { history }) => {
  const middlewares = [
    thunk.withExtraArgument({ api, history }),
    failureRedirections(history, { 401: '/login', 404: '/404' }),
    successRedirections(history, {
      [AUTH_LOGIN_SUCCESS]: (history) => {
        const from = history.location.state?.from?.pathname || '/'
        history.replace(from)
      },
      [ADVERT_CREATED_SUCCESS]: (history, payload) =>
        history.push(`/adverts/${payload.id}`),
    }),
    logger,
    timestamp,
    // allState,
  ]

  const store = createStore(
    historyHighOrderReducer(rootReducer),
    preloadedState,
    composeWithDevTools(applyMiddleware(...middlewares)),
  )

  return store
}

export default configureStore
