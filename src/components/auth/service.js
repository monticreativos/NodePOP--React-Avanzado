

import client, {
  removeAuthorizationHeader,
  setAuthorizationHeader,
} from '../../api/client'
import storage from '../../utils/storage'

export const login = async ({ remember, ...credentials }) => {
  const response = await client.post('api/auth/login', credentials)
  console.log(response)
  setAuthorizationHeader(response.accessToken)
  if (remember) {
    storage.set('auth', response.accessToken)
  }

  return response
}

export const logout = () => {
  return Promise.resolve().then(() => {
    removeAuthorizationHeader()
    storage.remove('auth')
  })
}
