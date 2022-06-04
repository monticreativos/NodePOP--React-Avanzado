import {
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT_SUCCESS,
  ADVERT_CREATED_SUCCESS,
  ADVERTS_LOADED_SUCCESS,
  ADVERTS_LOADED_FAILURE,
  UI_RESET_ERROR,
  ADVERT_LOADED_SUCCESS,
  ADVERT_LOADED_REQUEST,
  ADVERT_LOADED_FAILURE,
  ADVERT_CREATED_REQUEST,
  ADVERTS_LOADED_REQUEST,
  ADVERT_CREATED_FAILURE,
  ADVERTS_FILTER_REQUEST,
  ADVERTS_FILTER_SUCCESS,
  ADVERTS_FILTER_FAILURE,
  ACCESS_TOKEN,
  ADVERT_TAGS,
  ADVERT_DELETED_SUCCESS,
  ADVERT_DELETED_FAILURE,
  TAGS_LOADED,
} from './types'

export const defaultState = {
  auth: false,
  adverts: {
    loaded: false,
    data: [],
  },
  tags: [],
  ui: {
    isLoading: false,
    error: null,
  },
}

export const auth = (state = defaultState, action) => {
  switch (action.type) {
    case AUTH_LOGIN_SUCCESS:
      console.log(action.payload)

      return { ...state, auth: true, token: action.payload }
    case AUTH_LOGOUT_SUCCESS:
      return false
    case ACCESS_TOKEN:
      return state.auth.token
    default:
      return state
  }
}

export const adverts = (state = defaultState.adverts, action) => {

  switch (action.type) {
    case ADVERTS_LOADED_SUCCESS:
      return { loaded: true, data: action.payload }
    case ADVERT_LOADED_SUCCESS:
      return { ...state, data: [...state.data, action.payload] }
    case ADVERT_CREATED_SUCCESS:
      return { ...state, data: [action.payload, ...state.data] }
    case ADVERT_TAGS:
      return { ...state, tags: action.payload }
    case ADVERTS_FILTER_SUCCESS:
      return { ...state, data: [action.payload] }
    case ADVERT_DELETED_SUCCESS:
      return {
        ...state,
        data: state.data.filter(advert => advert.id !== action.payload),
      };
    default:
      return state
  }
}

export const ui = (state = defaultState.ui, action) => {
  switch (action.type) {
    case AUTH_LOGIN_REQUEST:
    case ADVERTS_LOADED_REQUEST:
    case ADVERT_LOADED_REQUEST:
    case ADVERTS_FILTER_REQUEST:
    case ADVERT_CREATED_REQUEST:
      return { ...state, isLoading: true, error: null }
    case AUTH_LOGIN_SUCCESS:
    case ADVERTS_LOADED_SUCCESS:
    case ADVERT_LOADED_SUCCESS:
    case ADVERT_CREATED_SUCCESS:
      return { ...state, isLoading: false }
    case AUTH_LOGIN_FAILURE:
    case ADVERTS_LOADED_FAILURE:
    case ADVERT_LOADED_FAILURE:
    case ADVERTS_FILTER_FAILURE:
    case ADVERT_CREATED_FAILURE:
    case ADVERT_DELETED_FAILURE:
      return { ...state, isLoading: false, error: action.payload }
    case UI_RESET_ERROR:
      return { ...state, error: null }
    default:
      return state
  }
}
export const tags = (state = defaultState.tags, action) =>
  action.type === TAGS_LOADED ? action.payload : state;

