const {
    render,
    screen,
    fireEvent,
    within,
    getByRole,
    act,
    cleanup,
} = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'app/redux/store'
import {
    BrowserRouter as Router,
    Navigate,
    Route,
    Routes,
} from 'react-router-dom'
import { SettingsProvider } from 'app/contexts/SettingsContext'
import { MatxTheme } from 'app/components'
import EditLTCPolicy from '../EditLTCPolicy'
import { LTCPolicyAdded } from '../store/LTCPolicySlice'
beforeAll(() => {
    store.dispatch(
        LTCPolicyAdded({
            id: 1,
            policyId: 'policyId',
            coverageId: 'coverageId',
            quoteId: 'quoteId',
        })
    )
})

beforeEach(() => {
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <Navigate to="LTCPolicy/edit/1" replace />
                                }
                            />
                            <Route
                                path="LTCPolicy/edit/:id"
                                element={<EditLTCPolicy />}
                            />
                        </Routes>
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

describe('testing view of LTCPolicyEdit Component', () => {
    test('should render EditLTCPolicy and display the heading Edit Form', async () => {
        const headingNote = screen.getByText(/Edit Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the edit form', async () => {
        const saveLTCPolicyButtonElement = screen.getByRole('button', {
            name: /save/i,
        })
        const policyIdElement = screen.getByLabelText(/PolicyId/i)
        const coverageIdElement = screen.getByLabelText(/CoverageId/i)
        const quoteIdElement = screen.getByLabelText(/QuoteId/i)

        expect(saveLTCPolicyButtonElement).toBeInTheDocument()

        expect(policyIdElement).toBeInTheDocument()
        expect(coverageIdElement).toBeInTheDocument()
        expect(quoteIdElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of LTCPolicy edit form', async () => {
        const policyIdElement = screen.getByLabelText(/PolicyId/i)
        const coverageIdElement = screen.getByLabelText(/CoverageId/i)
        const quoteIdElement = screen.getByLabelText(/QuoteId/i)

        fireEvent.change(policyIdElement, { target: { value: 'policyId' } })
        fireEvent.change(coverageIdElement, { target: { value: 'coverageId' } })
        fireEvent.change(quoteIdElement, { target: { value: 'quoteId' } })

        expect(policyIdElement.value).toBe('policyId')

        expect(coverageIdElement.value).toBe('coverageId')

        expect(quoteIdElement.value).toBe('quoteId')
    })

    test('should return error message when save button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const policyIdElement = screen.getByLabelText(/PolicyId/i)
        const coverageIdElement = screen.getByLabelText(/CoverageId/i)
        const quoteIdElement = screen.getByLabelText(/QuoteId/i)

        fireEvent.change(policyIdElement, { target: { value: '' } })
        fireEvent.change(coverageIdElement, { target: { value: '' } })
        fireEvent.change(quoteIdElement, { target: { value: '' } })
        await act(async () => {
            jest.runOnlyPendingTimers()
        })
        const saveLTCPolicyButtonElement = screen.getByRole('button', {
            name: /save/i,
        })

        await clickAndWait(saveLTCPolicyButtonElement)

        const errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(3)
    })
})
