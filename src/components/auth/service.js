// import client, { configureClient, resetClient } from '../../api/client';
// import storage from '../../utils/storage';

// const authPath = '/auth';

// export const login = ({ remember, ...credentials }) => {
//   return client
//     .post(`${authPath}/login`, credentials)
//     .then(({ accessToken }) => {
//       configureClient({ accessToken });
//       return accessToken;
//     })
//     .then(accessToken => {
//       storage.remove('auth');
//       if (remember) {
//         storage.set('auth', accessToken);
//       }
//     });
// };

// export const logout = () => {
//   return Promise.resolve().then(resetClient).then(storage.clear);
// };

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
