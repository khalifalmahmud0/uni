import { NonIndexRouteObject } from 'react-router-dom';
import DashboardLayout from '../views/layouts/DashboardLayout';
import T1 from '../views/pages/T1';
import user_branch_staff_routes from '../views/pages/users/config/routes';
import booking from '../views/pages/booking/config/routes';
import project from '../views/pages/project/config/routes';
import accounts from '../views/pages/accounts/config/routes';


import React from 'react';

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
            user_branch_staff_routes,
            booking,
            project,
            accounts
         
        ],
    },
];

export default router;
