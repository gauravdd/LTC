import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'

const LTCPolicyList = Loadable(lazy(() => import('./LTCPolicyList')))
const EditLTCPolicy = Loadable(lazy(() => import('./EditLTCPolicy')))
const AddLTCPolicy = Loadable(lazy(() => import('./AddLTCPolicy')))

const LTCPolicyRoutes = [
    {
        path: '/LTCPolicy',
        element: <LTCPolicyList />,
    },
    {
        path: '/LTCPolicy/edit/:id',
        element: <EditLTCPolicy />,
    },
    {
        path: '/LTCPolicy/add',
        element: <AddLTCPolicy />,
    },
]

export default LTCPolicyRoutes
