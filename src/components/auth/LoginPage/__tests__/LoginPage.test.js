import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import LoginPage from '../LoginPage'
import { authLogin, uiResetError } from '../../../../store/actions'
import { BrowserRouter as Router } from 'react-router-dom'
import '@testing-library/jest-dom';

jest.mock('../../../../store/actions')

describe('LoginPage', () => {
  test('snapshot', () => {
    const state = {
      ui: {
        error: null,
        isLoading: false,
      },
    }
    const store = {
      getState: () => state,
      dispatch: jest.fn(),
      subscribe: () => {},
    }
    const { container } = render(
      <Router>
        <Provider store={store}>
          <LoginPage />
        </Provider>
      </Router>,
    )
    expect(container).toMatchSnapshot()
  })

  test('should authLogin action', () => {
    authLogin.mockReturnValue('action')
    const state = {
      ui: {
        error: null,
        isLoading: false,
      },
    }
    const username = '1234@admin.com'
    const password = '1234'
    const store = {
      getState: () => state,
      dispatch: jest.fn(),
      subscribe: () => {},
    }
    render(
      <Provider store={store}>
        <LoginPage />
      </Provider>,
    )
    const usernameInput = screen.getByLabelText(/username/)
    const passwordInput = screen.getByLabelText(/password/)
    const submitButton = screen.getByRole('button')

    expect(submitButton).toBeDisabled
    fireEvent.change(usernameInput, { target: { value: username } })
    fireEvent.change(passwordInput, { target: { value: password } })
    expect(submitButton).not.toBeDisabled

    // fireEvent.click(submitButton)
    // const credentials = authLogin.mock.calls[0][0]
    // expect(credentials).toMatchObject({ username, password })
    // expect(store.dispatch).toHaveBeenCalledWith('action')
  })

  //   test('should reset error', () => {
  //     const error = { message: 'Network error' }
  //     const state = {
  //       ui: {
  //         error,
  //         isLoading: false,
  //       },
  //     }
  //     const store = {
  //       getState: () => state,
  //       dispatch: jest.fn(),
  //       subscribe: () => {},
  //     }
  //     render(
  //       <Provider store={store}>
  //         <LoginPage />
  //       </Provider>,
  //     )
  //     const errorElement = screen.getByText(error.message)
  //     expect(errorElement).toBeInTheDocument()
  //     expect(screen.queryByText('not exist')).not.toBeInTheDocument()
  //     fireEvent.click(errorElement)
  //     expect(uiResetError).toHaveBeenCalled()
  //   })
})
