import axios from 'axios'

// Creacion de la peticion y nombramos la URL
const client = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
})

// Añadimos a la cabecera de la peticion creada el token
export const setAuthorizationHeader = (token) => {
  client.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

// Eliminamos de la cabecera de la peticion creada el token
export const removeAuthorizationHeader = () => {
  delete client.defaults.headers.common['Authorization']
}

// Intereceptamos el peticion y controlamos los errores
client.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (!error.response) {
      return Promise.reject({ message: error.message })
    }
    return Promise.reject({
      message: error.response.statusText,
      statusCode: error.response.status,
      ...error.response.data,
    })
  },
)

// Cremos la funcion para añadir a la peticion la cabecera con token
export const configureClient = ({ accessToken }) => {
  if (accessToken) {
    setAuthorizationHeader(accessToken)
  }
}

// Cremos la funcion para eliminar de la peticion la cabecera con token
export const resetClient = () => {
  removeAuthorizationHeader()
}

export default client
