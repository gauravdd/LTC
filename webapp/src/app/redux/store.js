import { configureStore } from '@reduxjs/toolkit'
import LTCPolicyReducer from '../views/LTCPolicy/store/LTCPolicySlice'
import { createLogger } from 'redux-logger'
import notificationReducer from '../services/notification/store/notificationSlice'
let middlewares = []
if (process.env.NODE_ENV === `development`) {
    const logger = createLogger({
        collapsed: (getState, action, logEntry) => !logEntry.error,
    })
    middlewares.push(logger)
}
export default configureStore({
    reducer: {
        notification: notificationReducer,
        LTCPolicy: LTCPolicyReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(middlewares),
    devTools: process.env.NODE_ENV !== 'production',
})
