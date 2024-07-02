import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
// import setup from './config/setup';
import { RootState, useAppDispatch } from '../../../../../../store';
import { all } from './config/store/async_actions/all';
import setup from './config/setup';
import { initialState } from './config/store/inital_state';
import Header from './components/all_data_page/Header';
import TableFooter from './components/all_data_page/TableFooter';
import Paginate from '../../../../../components/Paginate';
import Filter from './components/canvas/Filter';
import QuickView from './components/canvas/QuickView';
import storeSlice from './config/store';
import { anyObject } from '../../../../../../common_types/object';
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
            date: '10 Feb, 2024',
            amount_in_text: 'Three thousand taka only',
            purpose: 'hostel rent',
            credit: '',
            debit: '3000',
            balance: '-3000',
            name: 'Shahin',
        },
        {
            id: 2,
            date: '14 Feb, 2024',
            amount_in_text: 'Ten thousand taka only',
            purpose: 'admission bill',
            credit: '3000',
            debit: '',
            balance: '',
            name: 'Tamim',
        },
        {
            id: 3,
            date: '15 Feb, 2024',
            amount_in_text: 'Five thousand taka only',
            purpose: 'transport bill',
            credit: '3000',
            debit: '',
            balance: '3000',
            name: 'Ramim',
        },
        {
            id: 4,
            date: '23 Feb, 2024',
            amount_in_text: 'Threee thousand taka only',
            purpose: 'Tution fee',
            credit: '3000',
            debit: '',
            balance: '6000',
            name: 'Ramim',
        },
        {
            id: 5,
            date: '23 Feb, 2024',
            amount_in_text: 'Fifteen thousand taka only',
            purpose: 'Tution fee',
            credit: '15000',
            debit: '',
            balance: '21000',
            name: 'Riaz',
        },
        {
            id: 6,
            date: '23 Feb, 2024',
            amount_in_text: 'Twenty thousand taka only',
            purpose: 'Tution fee',
            credit: '20000',
            debit: '',
            balance: '41000',
            name: 'Areeba',
        },
        {
            id: 7,
            date: '23 Feb, 2024',
            amount_in_text: 'Twenty thousand taka only',
            purpose: 'Sallary',
            credit: '',
            debit: '20000',
            balance: '21000',
            name: 'Employee1',
        },
        {
            id: 8,
            date: '23 Feb, 2024',
            amount_in_text: 'Ten thousand taka only',
            purpose: 'Sallary',
            credit: '',
            debit: '10000',
            balance: '11000',
            name: 'Employee2',
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
                                        <th>Purpose</th>
                                        <th>Name</th>
                                        <th>Date</th>
                                        <th>Amount in Text</th>
                                        <th>Debit</th>
                                        <th>Credit</th>
                                        <th>Balance</th>
                                    </tr>
                                </thead>
                                <tbody id="all_list">
                                    {datas?.map((i: { [key: string]: any }) => {
                                        return (
                                            <tr>
                                                <td></td>
                                                <td>{i.id}</td>
                                                <td>{i.purpose}</td>
                                                <td>{i.name}</td>
                                                <td>{i.date}</td>
                                                <td>{i.amount_in_text}</td>
                                                <td>{i.debit} tk</td>
                                                <td>{i.credit} tk</td>
                                                <td>{i.balance} tk</td>
                                            </tr>
                                        );
                                    })}
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>Total:</td>
                                        <td>dbt : 33000 tk</td>
                                        <td>Cr : 44000 tk</td>
                                        <td>Bal : 11000 tk</td>
                                    </tr>
                                </tbody>
                            </table>
                            <h1> In Progress .. </h1>
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
