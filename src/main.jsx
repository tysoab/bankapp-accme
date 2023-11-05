import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RegisterContextProvider } from './store/login-context'
import { Provider } from 'react-redux'
import store from './store/main.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <RegisterContextProvider>
    <App />
  </RegisterContextProvider>
  </Provider>
)
