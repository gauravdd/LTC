import { createSlice } from '@reduxjs/toolkit'
import { fetchLTCPolicy } from './LTCPolicy.action'
import { addLTCPolicy } from './LTCPolicy.action'
import { editLTCPolicy } from './LTCPolicy.action'
import { deleteLTCPolicy } from './LTCPolicy.action'

const fetchLTCPolicyExtraReducer = {
    [fetchLTCPolicy.pending]: (state, action) => {
        state.loading = true
    },
    [fetchLTCPolicy.fulfilled]: (state, action) => {
        state.entities = [...action.payload]
        state.loading = false
    },
    [fetchLTCPolicy.rejected]: (state, action) => {
        state.loading = false
    },
}

const addLTCPolicyExtraReducer = {
    [addLTCPolicy.pending]: (state, action) => {
        state.loading = true
    },
    [addLTCPolicy.fulfilled]: (state, action) => {
        state.entities.push(action.payload)
        state.loading = false
    },
    [addLTCPolicy.rejected]: (state, action) => {
        state.loading = false
    },
}

const editLTCPolicyExtraReducer = {
    [editLTCPolicy.pending]: (state, action) => {
        state.loading = true
    },
    [editLTCPolicy.fulfilled]: (state, action) => {
        const { id, policyId, coverageId, quoteId } = action.payload
        const existingLTCPolicy = state.entities.find(
            (LTCPolicy) => LTCPolicy.id.toString() === id.toString()
        )
        if (existingLTCPolicy) {
            existingLTCPolicy.policyId = policyId
            existingLTCPolicy.coverageId = coverageId
            existingLTCPolicy.quoteId = quoteId
        }
        state.loading = false
    },
    [editLTCPolicy.rejected]: (state, action) => {
        state.loading = false
    },
}

const deleteLTCPolicyExtraReducer = {
    [deleteLTCPolicy.pending]: (state, action) => {
        state.loading = true
    },
    [deleteLTCPolicy.fulfilled]: (state, action) => {
        const id = action.payload
        const existingLTCPolicy = state.entities.find(
            (LTCPolicy) => LTCPolicy.id.toString() === id.toString()
        )
        if (existingLTCPolicy) {
            state.entities = state.entities.filter(
                (LTCPolicy) => LTCPolicy.id !== id
            )
        }
        state.loading = false
    },
    [deleteLTCPolicy.rejected]: (state, action) => {
        state.loading = false
    },
}
const LTCPolicySlice = createSlice({
    name: 'LTCPolicy',
    initialState: {
        entities: [],
        loading: false,
    },
    reducers: {
        LTCPolicyAdded(state, action) {
            state.entities.push(action.payload)
        },
        LTCPolicyUpdated(state, action) {
            const { id, policyId, coverageId, quoteId } = action.payload
            const existingLTCPolicy = state.entities.find(
                (LTCPolicy) => LTCPolicy.id.toString() === id.toString()
            )
            if (existingLTCPolicy) {
                existingLTCPolicy.policyId = policyId
                existingLTCPolicy.coverageId = coverageId
                existingLTCPolicy.quoteId = quoteId
            }
        },
        LTCPolicyDeleted(state, action) {
            const { id } = action.payload
            const existingLTCPolicy = state.entities.find(
                (LTCPolicy) => LTCPolicy.id.toString() === id.toString()
            )
            if (existingLTCPolicy) {
                state.entities = state.entities.filter(
                    (LTCPolicy) => LTCPolicy.id !== id
                )
            }
        },
    },
    extraReducers: {
        ...fetchLTCPolicyExtraReducer,
        ...addLTCPolicyExtraReducer,
        ...editLTCPolicyExtraReducer,
        ...deleteLTCPolicyExtraReducer,
    },
})

export const { LTCPolicyAdded, LTCPolicyUpdated, LTCPolicyDeleted } =
    LTCPolicySlice.actions

export default LTCPolicySlice.reducer
