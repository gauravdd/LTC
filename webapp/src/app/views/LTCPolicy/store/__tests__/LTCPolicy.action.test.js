import axios from '../../../../../axios'
import MockAdapter from 'axios-mock-adapter'
import store from 'app/redux/store'
import {
    fetchLTCPolicy,
    addLTCPolicy,
    editLTCPolicy,
    deleteLTCPolicy,
} from '../lTCPolicy.action'

const getLTCPolicyListResponse = [
    {
        id: 1,
        policyId: 'policyId',
        coverageId: 'coverageId',
        quoteId: 'quoteId',
    },
]

const addLTCPolicyListResponse = (data) => {
    return { id: 2, ...data }
}
const editLTCPolicyListResponse = (data) => {
    return data
}

describe('should test LTCPolicy redux tooklit asyncThunk api action and redux store updation', () => {
    const mock = new MockAdapter(axios)
    const endPoint = 'lTCPolicy'
    test('Should be able to fetch the lTCPolicy list and update lTCPolicy redux store', async () => {
        mock.onGet(`/${endPoint}`).reply(200, getLTCPolicyListResponse)
        const result = await store.dispatch(fetchLTCPolicy())
        const lTCPolicyList = result.payload
        expect(result.type).toBe('lTCPolicy/fetchLTCPolicy/fulfilled')
        expect(lTCPolicyList).toEqual(getLTCPolicyListResponse)

        const state = store.getState().lTCPolicy
        expect(state.entities).toEqual(lTCPolicyList)
    })

    test('Should be able to add new lTCPolicy to list and make post api and update lTCPolicy redux store', async () => {
        const body = {
            policyId: 'policyId',
            coverageId: 'coverageId',
            quoteId: 'quoteId',
        }
        mock.onPost(`/${endPoint}`, body).reply(
            201,
            addLTCPolicyListResponse(body)
        )
        const result = await store.dispatch(addLTCPolicy(body))
        const lTCPolicyItem = result.payload
        expect(result.type).toBe('lTCPolicy/addLTCPolicy/fulfilled')
        expect(lTCPolicyItem).toEqual(addLTCPolicyListResponse(body))

        const state = store.getState().lTCPolicy
        expect(state.entities).toContainEqual(addLTCPolicyListResponse(body))
    })

    test('Should be able to edit lTCPolicy in list and make put api call and update lTCPolicy redux store', async () => {
        const body = {
            id: 1,
            policyId: 'policyId',
            coverageId: 'coverageId',
            quoteId: 'quoteId',
        }
        mock.onPut(`/${endPoint}/${body.id}`, body).reply(
            201,
            editLTCPolicyListResponse(body)
        )
        const result = await store.dispatch(editLTCPolicy(body))
        const lTCPolicyItem = result.payload
        expect(result.type).toBe('lTCPolicy/editLTCPolicy/fulfilled')
        expect(lTCPolicyItem).toEqual(editLTCPolicyListResponse(body))

        const state = store.getState().lTCPolicy
        let changedLTCPolicy = state.entities.find((p) => p.id === body.id)
        expect(changedLTCPolicy.name).toEqual(body.name)
    })

    test('Should be able to delete lTCPolicy in list and update lTCPolicy redux store', async () => {
        const input = {
            id: 2,
        }
        mock.onDelete(`/${endPoint}/${input.id}`, input).reply(200)
        let state = store.getState().lTCPolicy
        const initialLength = state.entities.length
        const result = await store.dispatch(deleteLTCPolicy(input))
        const deletId = result.payload
        expect(result.type).toBe('lTCPolicy/deleteLTCPolicy/fulfilled')
        expect(deletId).toEqual(input.id)

        state = store.getState().lTCPolicy
        const updateLength = initialLength - 1
        expect(state.entities.length).toEqual(updateLength)
    })
})
