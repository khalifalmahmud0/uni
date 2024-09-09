import React from 'react';
import { NonIndexRouteObject } from 'react-router-dom';
import DashboardLayout from '../views/layouts/DashboardLayout';
import T1 from '../views/pages/T1';
import user_branch_staff_routes from '../views/pages/users/config/routes';

import Payment from "../views/pages/Payment/Payment";
import PaymentHistory from "../views/pages/Payment/PaymentHistory";
import Profile from "../views/pages/Profile/Profile";

import AllCustomer from "../views/pages/Customer/AllCustomer";
import BusinessModel from "../views/pages/BusinessModel/BusinessModel";

interface RouteTypes extends NonIndexRouteObject {}
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
                path: 'customers',
                element: <AllCustomer />,
            },
            {
                path: 'payment',
                element: <Payment />,
            },
            {
                path: 'payment-histories',
                element: <PaymentHistory />,
            },
            {
                path: 'profile',
                element: <Profile />,
            },
            {
                path: 'business-model',
                element: <BusinessModel />,
            },
            user_branch_staff_routes,
            
        ],
    },
];

export default router;
