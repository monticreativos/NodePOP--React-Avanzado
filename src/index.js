import React from 'react'
import ReactDOM from 'react-dom'
// import { BrowserRouter as Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import { configureClient } from './api/client'
import storage from './utils/storage'
import './index.css'
import App from './components/app'

import configureStore from './store'
import Root from './components/Root'

const accessToken = storage.get('auth')
configureClient({ accessToken })

const history = createBrowserHistory()
const store = configureStore({ auth: !!accessToken }, { history })

ReactDOM.render(
  <React.StrictMode>
    <Root store={store} history={history}>
      <App isInitiallyLogged={!!accessToken} />
    </Root>
  </React.StrictMode>,
  document.getElementById('root'),
)
