import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
// import setup from './config/setup';
import { RootState, useAppDispatch } from '../../../../../store';
import { all } from './config/store/async_actions/all';
import setup from './config/setup';
import { initialState } from './config/store/inital_state';
import Header from './components/all_data_page/Header';
import TableFooter from './components/all_data_page/TableFooter';
import Paginate from '../../../../components/Paginate';
import Filter from './components/canvas/Filter';
import QuickView from './components/canvas/QuickView';
import storeSlice from './config/store';
import { anyObject } from '../../../../../common_types/object';
import SelectAll from './components/all_data_page/SelectIAll';
import TableHeading from './components/all_data_page/TableHeading';

export interface Props { }

const All: React.FC<Props> = (props: Props) => {
    const state: typeof initialState = useSelector(
        (state: RootState) => state[setup.module_name],
    );

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(
            storeSlice.actions.set_select_fields(
                'id, name, email, image, status',
            ),
        );
        dispatch(all({}));
    }, []);

    function quick_view(data: anyObject = {}) {
        dispatch(storeSlice.actions.set_item(data));
        dispatch(storeSlice.actions.set_show_quick_view_canvas(true));
    }
    interface data {
        [key: string]: any;
    }
    const datas: data[] = [
        {
            id: 1,
            customer: 'Mr Jayed Khan',
            payable: 4005000,
            paid: 4005000,
            due: 4005000,
        },
        {
            id: 2,
            customer: 'Sufiya Kamal',
            payable: 4005000,
            paid: 505650,
            due: 40000,
        },
    ];

    return (
        <div className="page_content">
            <div className="explore_window fixed_size">
                <Header></Header>

                <div className="content_body">
                    <div className="data_list">
                        <div className="table_responsive custom_scroll">
                            <table>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Serial</th>
                                        <th>Customer</th>
                                        <th>Payable</th>
                                        <th>Paid</th>
                                        <th>Due</th>
                                    </tr>
                                </thead>
                                <tbody id="all_list">
                                    {datas?.map((i: { [key: string]: any }) => {
                                        return (
                                            <tr>
                                                <td></td>
                                                <td>{i.id}</td>
                                                <td>{i.customer}</td>
                                                <td>{i.payable} tk</td>
                                                <td>{i.paid} tk</td>
                                                <td>{i.due} tk</td>
                                            </tr>
                                        );
                                    })}
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td>Total:</td>
                                        <td>4056200</td>
                                        <td>9900343</td>
                                        <td>1809600 tk</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <Paginate
                            set_url={storeSlice.actions.set_url}
                            set_paginate={storeSlice.actions.set_paginate}
                            set_page={storeSlice.actions.set_page}
                            all={all}
                            data={state.all as any}
                            selected_paginate={state.paginate}
                        ></Paginate>
                    </div>
                </div>
                <TableFooter></TableFooter>
            </div>

            <Filter></Filter>
            <QuickView></QuickView>
        </div>
    );
};

export default All;
