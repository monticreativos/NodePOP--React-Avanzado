import { auth } from '../reducers'
import { AUTH_LOGOUT_SUCCESS } from '../types'

import '@testing-library/jest-dom';

describe('auth', () => {
  it('should manage AUTH_LOGOUT_SUCCESS action', () => {
    const action = {
      type: AUTH_LOGOUT_SUCCESS,
    }
    const initialState = true
    const result = auth(initialState, action)
    expect(result).toBe(false)
  })
  it('should manage any action', () => {
    const action = {
      type: 'ANY',
    }
    const initialState = true
    const result = auth(initialState, action)
    expect(result).toBe(initialState)
  })
})
