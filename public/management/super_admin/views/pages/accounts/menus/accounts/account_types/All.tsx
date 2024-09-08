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
import TableRowAction from './components/all_data_page/TableRowAction';
import SelectItem from './components/all_data_page/SelectItem';
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
                'id, title,description,openning_date, status',
            ),
        );
        dispatch(all({}));
    }, []);

    function quick_view(data: anyObject = {}) {
        dispatch(storeSlice.actions.set_item(data));
        dispatch(storeSlice.actions.set_show_quick_view_canvas(true));
    }

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
                                        <th />
                                        <th>
                                            <SelectAll />
                                        </th>
                                        <TableHeading
                                            label={`ID`}
                                            col_name={`id`}
                                            sort={true}
                                        />
                                        <TableHeading
                                            label={`title`}
                                            col_name={`title`}
                                            sort={true}
                                        />
                                        <TableHeading
                                            label={`Description`}
                                            col_name={`description`}
                                            sort={true}
                                        />
                                        <TableHeading
                                            label={`Opening Date`}
                                            col_name={`opening_date`}
                                            sort={true}
                                        />
                                        <TableHeading
                                            label={`Income`}
                                            col_name={`income`}
                                            sort={true}
                                        />
                                        <TableHeading
                                            label={`Expense`}
                                            col_name={`expense`}
                                            sort={true}
                                        />
                                        <TableHeading
                                            label={`Balance`}
                                            col_name={`balance`}
                                            sort={true}
                                        />
                                    </tr>
                                </thead>
                                <tbody id="all_list">
                                    {(state.all as any)?.data?.map(
                                        (i: { [key: string]: any }) => {
                                            return (
                                                <tr
                                                    key={i.id}
                                                    className={`table_rows table_row_${i.id}`}
                                                >
                                                    <td>
                                                        <TableRowAction
                                                            item={i}
                                                        />
                                                    </td>
                                                    <td>
                                                        <SelectItem item={i} />
                                                    </td>
                                                    <td>{i.id}</td>
                                                    <td>{i.title}</td>
                                                    <td>{i.description}</td>
                                                    <td>{new Date(i.openning_date).toDateString()}</td>
                                                    <td>{i.total_income || 0}/-</td>
                                                    <td>{i.total_expense || 0}/-</td>
                                                    <td>
                                                        {i.total_income - i.total_expense}/-
                                                    </td>
                                                </tr>
                                            );
                                        },
                                    )}

                                </tbody>
                                <tfoot>
                                    <tr style={{ backgroundColor: '#20232a' }}>
                                        <td colSpan={6}></td>
                                        <td>total: {(state.all as any)?.total_income}/-</td>
                                        <td>total: {(state.all as any)?.total_expense}/-</td>
                                        <td>total: {(state.all as any)?.total_income - (state.all as any)?.total_expense}/-</td>
                                    </tr>
                                </tfoot>
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
