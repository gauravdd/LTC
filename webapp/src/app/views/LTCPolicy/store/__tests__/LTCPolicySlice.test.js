import store from 'app/redux/store'
import {
    lTCPolicyAdded,
    lTCPolicyDeleted,
    lTCPolicyUpdated,
} from '../lTCPolicySlice'

describe('testing lTCPolicy redux store reducers', () => {
    test('add lTCPolicy to store test', () => {
        let state = store.getState().lTCPolicy
        expect(state.entities).toHaveLength(0)
        const initialInput = {
            id: 1,
            policyId: 'policyId',
            coverageId: 'coverageId',
            quoteId: 'quoteId',
        }
        store.dispatch(lTCPolicyAdded(initialInput))
        state = store.getState().lTCPolicy
        expect(state.entities).toHaveLength(1)
    })

    test('update lTCPolicy from store should change the length of the entities array in redux store', () => {
        const initialInput = {
            id: 2,
            policyId: 'policyId',
            coverageId: 'coverageId',
            quoteId: 'quoteId',
        }
        store.dispatch(lTCPolicyAdded(initialInput))
        let state = store.getState().lTCPolicy
        expect(state.entities).toHaveLength(2)

        const updatedInput = {
            id: initialInput.id,
            policyId: 'policyId1',
            coverageId: 'coverageId1',
            quoteId: 'quoteId1',
        }
        store.dispatch(lTCPolicyUpdated(updatedInput))
        state = store.getState().lTCPolicy
        let changedLTCPolicy = state.entities.find((p) => p.id === 2)
        expect(changedLTCPolicy).toStrictEqual(updatedInput)
    })

    test('delete lTCPolicy from store should reduce the length of the entities array in redux store', () => {
        const initialInput = {
            id: 3,
            policyId: 'policyId',
            coverageId: 'coverageId',
            quoteId: 'quoteId',
        }
        store.dispatch(lTCPolicyAdded(initialInput))
        let state = store.getState().lTCPolicy
        expect(state.entities).toHaveLength(3)

        store.dispatch(
            lTCPolicyDeleted({
                id: initialInput.id,
            })
        )
        state = store.getState().lTCPolicy
        expect(state.entities).toHaveLength(2)
    })
})
