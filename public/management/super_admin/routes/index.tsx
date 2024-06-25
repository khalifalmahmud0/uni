import { NonIndexRouteObject } from 'react-router-dom';
import DashboardLayout from '../views/layouts/DashboardLayout';
import T1 from '../views/pages/T1';
import user_branch_staff_routes from '../views/pages/users/config/routes';
import booking from '../views/pages/booking/config/routes';
import project from '../views/pages/project/config/routes';
import accounts from '../views/pages/accounts/config/routes';
import account_types from '../views/pages/accounts/menus/accounts/account_types/config/routes';
import account_categories from '../views/pages/accounts/menus/accounts/account_categories/config/routes';
import account_numbers from '../views/pages/accounts/menus/accounts/account_numbers/config/routes';
import project_income from '../views/pages/accounts/menus/payments/project_income/config/routes';
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
            accounts,
            account_types,
            account_categories,
            account_numbers,
            project_income
        ],
    },
];

export default router;
