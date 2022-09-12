const {
    render,
    screen,
    fireEvent,
    within,
    waitFor,
    getByRole,
    act,
    cleanup,
} = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'app/redux/store'
import { BrowserRouter as Router } from 'react-router-dom'
import { SettingsProvider } from 'app/contexts/SettingsContext'
import { MatxTheme } from 'app/components'
import axios from '../../../../axios'
import MockAdapter from 'axios-mock-adapter'
import AddLTCPolicy from '../AddLTCPolicy'

beforeEach(() => {
    const endPoint = 'LTCPolicy'
    const getStudentListResponse = [
        {
            id: 1,
            policyId: 'policyId',
            coverageId: 'coverageId',
            quoteId: 'quoteId',
        },
    ]
    const mock = new MockAdapter(axios)
    mock.onGet(`/${endPoint}`).reply(200, getStudentListResponse)
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <AddLTCPolicy />
                    </Router>
                </MatxTheme>
            </SettingsProvider>
        </Provider>
    )
})

const clickAndWait = async (element) => {
    await act(async () => {
        fireEvent.click(element)
    })

    await act(async () => {
        jest.runOnlyPendingTimers()
    })
}

afterEach(cleanup)

describe('testing view LTCPolicyAdd Component', () => {
    test('should render AddLTCPolicy and to display Add Form title', async () => {
        const headingNote = screen.getByText(/Add Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the add form', async () => {
        const addLTCPolicyButtonElement = screen.getByRole('button', {
            name: /Add/i,
        })

        const policyIdElement = screen.getByLabelText(/PolicyId/i)
        const coverageIdElement = screen.getByLabelText(/CoverageId/i)
        const quoteIdElement = screen.getByLabelText(/QuoteId/i)

        expect(addLTCPolicyButtonElement).toBeInTheDocument()

        expect(policyIdElement).toBeInTheDocument()
        expect(coverageIdElement).toBeInTheDocument()
        expect(quoteIdElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of LTCPolicy add form', async () => {
        const policyIdElement = screen.getByLabelText(/PolicyId/i)
        const coverageIdElement = screen.getByLabelText(/CoverageId/i)
        const quoteIdElement = screen.getByLabelText(/QuoteId/i)

        fireEvent.change(policyIdElement, { target: { value: 'policyId' } })
        fireEvent.change(coverageIdElement, { target: { value: 'coverageId' } })
        fireEvent.change(quoteIdElement, { target: { value: 'quoteId' } })
    })

    test('should return error message when add LTCPolicy button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const addLTCPolicyButtonElement = screen.getByRole('button', {
            name: /Add/i,
        })

        await clickAndWait(addLTCPolicyButtonElement)

        let errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(3)
    })
})
