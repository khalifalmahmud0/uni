import React from 'react';
import setup from './setup.tsx';
import Layout from '../Layout.tsx';
import All from '../All.tsx';
import Create from '../Create.tsx';
import Details from '../Details.tsx';
import Edit from '../Edit.tsx';
import History from '../History.tsx';
import Clients from '../Clients.tsx';

// export { default as DashboardCounterAll} from "./All.tsxx";

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
            path: 'clients',
            element: <Client />,
        },
        {
            path: 'edit/:id',
            element: <Edit />,
        },
        {
            path: 'details/:id',
            element: <Details />,
        },
    ],
};
