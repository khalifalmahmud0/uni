import React from 'react';
import setup from './setup.js';
import Layout from '../Layout.js';
import All from '../All.js';
import Create from '../Create.js';
import Details from '../Details.js';
import Edit from '../Edit.js';
import History from '../History.js';
import Payment from '../sub-menus/payment/Payment.js';
import AccountType from '../sub-menus/account/types/All.js';
import AccountNumbers from '../sub-menus/account/numbers/All.js';
import AccountCategories from '../sub-menus/account/categories/All.js';

// export { default as DashboardCounterAll} from "./All.jsx";

export default {
    path: setup.route_prefix,
    element: <Layout />,
    children: [
        {
            path: '',
            element: <All />,
        },
        {
            path: 'history',
            element: <History />,
        },
        {
            path: 'create',
            element: <Create />,
        },
        {
            path: 'edit/:id',
            element: <Edit />,
        },
        {
            path: 'details/:id',
            element: <Details />,
        },
        {
            path: 'payment',
            element: <Payment />,
        },
        {
            path: 'type',
            element: <AccountType />,
        },
        {
            path: 'number',
            element: <AccountNumbers />,
        },
        {
            path: 'category',
            element: <AccountCategories />,
        },
    ],
};
