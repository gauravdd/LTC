const { render, screen, cleanup } = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'app/redux/store'
import { BrowserRouter as Router } from 'react-router-dom'
import { SettingsProvider } from 'app/contexts/SettingsContext'
import { MatxTheme } from 'app/components'
import LTCPolicyList from '../LTCPolicyList'
import axios from '../../../../axios'
import MockAdapter from 'axios-mock-adapter'

afterEach(cleanup)

test('should render LTCPolicy rows when api response has data', async () => {
    const endPoint = 'lTCPolicy'
    const getLTCPolicyListResponse = [
        {
            id: 1,
            policyId: 'policyId1',
            coverageId: 'coverageId1',
            quoteId: 'quoteId1',
        },
    ]
    const mock = new MockAdapter(axios)
    mock.onGet(`/${endPoint}`).reply(200, getLTCPolicyListResponse)
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <LTCPolicyList />
                    </Router>
                </MatxTheme>
            </SettingsProvider>
        </Provider>
    )
    const lTCPolicyPolicyIdCell = await screen.findByText(/policyId1/i)

    expect(lTCPolicyPolicyIdCell).toHaveTextContent(/policyId1/i)
    mock.reset()
})
