import { createAsyncThunk } from '@reduxjs/toolkit'
import { showSuccess } from 'app/services/notification/store/notification.actions'
import axios from '../../../../axios'

const endPoint = 'LTCPolicy'

export const fetchLTCPolicy = createAsyncThunk(
    'LTCPolicy/fetchLTCPolicy',
    async () => {
        const response = await axios.get(`/${endPoint}`)
        const LTCPolicy = await response.data
        return LTCPolicy
    }
)

export const addLTCPolicy = createAsyncThunk(
    'LTCPolicy/addLTCPolicy',
    async (data, thunkAPI) => {
        const response = await axios.post(`/${endPoint}`, data)
        const LTCPolicy = await response.data
        thunkAPI.dispatch(showSuccess('LTCPolicy added successfully'))
        return LTCPolicy
    }
)

export const editLTCPolicy = createAsyncThunk(
    'LTCPolicy/editLTCPolicy',
    async (data, thunkAPI) => {
        const response = await axios.put(`/${endPoint}/${data.id}`, data)
        const LTCPolicy = await response.data
        thunkAPI.dispatch(showSuccess('LTCPolicy updated successfully'))
        return LTCPolicy
    }
)

export const deleteLTCPolicy = createAsyncThunk(
    'LTCPolicy/deleteLTCPolicy',
    async (data, thunkAPI) => {
        const response = await axios.delete(`/${endPoint}/${data.id}`)
        const status = await response.status
        if (status === 200) {
            thunkAPI.dispatch(
                showSuccess('Selected LTCPolicy deleted successfully.')
            )
            return data.id
        }
    }
)
