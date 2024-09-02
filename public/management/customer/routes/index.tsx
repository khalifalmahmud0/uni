import React from 'react';
import { NonIndexRouteObject } from 'react-router-dom';
import DashboardLayout from '../views/layouts/DashboardLayout';
import T1 from '../views/pages/T1';
import user_branch_staff_routes from '../views/pages/users/config/routes';

import Profile from '../views/pages/Profile/Profile';

import Payment from '../views/pages/Payment/Payment';
import PaymentHistory from '../views/pages/Payment/PaymentHistory';


interface RouteTypes extends NonIndexRouteObject { }
const router: RouteTypes[] = [
    {
        path: '/',
        element: <DashboardLayout />,
        children: [
            {
                path: '',
                element: <T1 />,
            },
            {
                path: 'profile',
                element: <Profile />,
            },
            {
                path: 'payment',
                element: <Payment />,
            },
            {
                path: 'payment-histories',
                element: <PaymentHistory />,
            },
            user_branch_staff_routes,

        ],
    },
];

export default router;
