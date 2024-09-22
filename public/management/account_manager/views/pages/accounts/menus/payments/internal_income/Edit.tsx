import React, { useEffect } from 'react';
import Header from './components/management_data_page/Header';
import Footer from './components/management_data_page/Footer';
import { useSelector } from 'react-redux';
import setup from './config/setup';
import { RootState, useAppDispatch } from '../../../../../../store';
import { details } from './config/store/async_actions/details';
import { initialState } from './config/store/inital_state';
import { Link, useParams } from 'react-router-dom';
import storeSlice from './config/store';
import { update } from './config/store/async_actions/update';
import Input from './components/management_data_page/Input';
import Select from './components/management_data_page/Select';
import { anyObject } from '../../../../../../common_types/object';
export interface Props {}

const Edit: React.FC<Props> = (props: Props) => {
    const state: typeof initialState = useSelector(
        (state: RootState) => state[setup.module_name],
    );

    const dispatch = useAppDispatch();
    const params = useParams();

    useEffect(() => {
        dispatch(storeSlice.actions.set_item({}));
        dispatch(details({ id: params.id }) as any);
    }, []);

    useEffect(() => {
        if (state.item?.reference_info) {
            dispatch(
                storeSlice.actions.set_selected([state.item.reference_info]),
            );
        }
    }, [state.item]);

    async function handle_submit(e) {
        e.preventDefault();
        const response = await dispatch(update(new FormData(e.target)) as any);
    }

    function get_value(key) {
        try {
            if (state.item[key]) return state.item[key];
            if (state.item?.info[key]) return state.item?.info[key];
        } catch (error) {
            return '';
        }
        return '';
    }
    function get_reference(): anyObject[] | [] {
        try {
            if (state.item.reference_info) return [state.item.reference_info];
        } catch (error) {
            return [];
        }
        return [];
    }

    return (
        <>
            <div className="page_content">
                <div className="explore_window fixed_size">
                    <Header page_title={setup.edit_page_title}></Header>

                    {Object.keys(state.item).length && (
                        <div className="content_body custom_scroll">
                            <form
                                onSubmit={(e) => handle_submit(e)}
                                className="mx-auto pt-3"
                            >
                                <input
                                    type="hidden"
                                    name="id"
                                    defaultValue={state.item.id}
                                />

                            {/* Project Income  */}
                            <div>
                                <h5 className="mb-4">Edit Internal Income</h5>
                                <div className="form_auto_fit">
                                    {/* Project  */}
                                    <div className="form-group form-vertical">
                                        <Select
                                            label="Project"
                                            name="project"
                                            values={[
                                                {
                                                    text: 'Project 1',
                                                    value: '01',
                                                },
                                                {
                                                    text: 'Project 2',
                                                    value: '02',
                                                },
                                                {
                                                    text: 'Project 3',
                                                    value: '03',
                                                },
                                                {
                                                    text: 'Project 4',
                                                    value: '04',
                                                },
                                                {
                                                    text: 'Project 5',
                                                    value: '05',
                                                },
                                            ]}
                                        />
                                    </div>
                                     {/* User  */}
                                    <div className="form-group form-vertical">
                                        <Select
                                            label="User"
                                            name="user"
                                            values={[
                                                {
                                                    text: 'User 1',
                                                    value: '01',
                                                },
                                                {
                                                    text: 'User 2',
                                                    value: '02',
                                                },
                                                {
                                                    text: 'User 3',
                                                    value: '03',
                                                },
                                                {
                                                    text: 'User 4',
                                                    value: '04',
                                                },
                                                {
                                                    text: 'User 5',
                                                    value: '05',
                                                },
                                            ]}
                                        />
                                    </div>
                                    {/* Date, Amount, Amount in Text */}
                                      {[
                                     {
                                            name: 'date',
                                            placeholder: 'Date',
                                            type: 'date',
                                            label: 'Date',
                                        },
                                        {
                                            name: 'amount',
                                            placeholder: 'Amount',
                                            type: 'text',
                                            label: 'Amount',
                                        },
                                         {
                                            name: 'amount_in_text',
                                            placeholder: 'Amount In Text',
                                            type: 'text',
                                            label: 'Amount In Text',
                                        },
                                       
                                    ].map((field) => (
                                        <div
                                            className="form-group form-vertical"
                                            key={field.name}
                                        >
                                            <Input
                                                name={field.name}
                                                placeholder={field.placeholder}
                                                type={field.type}
                                                label={field.label}
                                            />
                                        </div>
                                    ))}
                                     {/* Category  */}
                                    <div className="form-group form-vertical">
                                        <Select
                                            label="Category"
                                            name="account_category"
                                            values={[
                                                {
                                                    text: 'Booking Money',
                                                    value: 'bm',
                                                },
                                                {
                                                    text: 'Down Payments',
                                                    value: 'dp',
                                                },
                                                {
                                                    text: 'Installments',
                                                    value: 'install',
                                                },
                                            ]}
                                        />
                                    </div>
                                    {/* Account  */}
                                    <div className="form-group form-vertical">
                                        <Select
                                            label="Account"
                                            name="account"
                                            values={[
                                                {
                                                    text: 'Bank',
                                                    value: '01',
                                                },
                                                {
                                                    text: 'Bkash',
                                                    value: '02',
                                                },
                                                {
                                                    text: 'Nagad',
                                                    value: '03',
                                                },
                                                {
                                                    text: 'Rocket',
                                                    value: '04',
                                                },
                                                {
                                                    text: 'Cash',
                                                    value: '05',
                                                },
                                            ]}
                                        />
                                    </div>
                                     {/* Account Number  */}
                                    <div className="form-group form-vertical">
                                        <Select
                                            label="Account Number"
                                            name="account_number"
                                            values={[
                                                {
                                                    text: '001122334455',
                                                    value: '01',
                                                },
                                                {
                                                    text: '3355338899',
                                                    value: '02',
                                                },
                                                {
                                                    text: '0066443211',
                                                    value: '03',
                                                },
                                                {
                                                    text: '543432342432',
                                                    value: '04',
                                                },
                                                {
                                                    text: '345345345',
                                                    value: '05',
                                                },
                                            ]}
                                        />
                                    </div>
                                     {/* Type */}
                                    <div className="form-group form-vertical">
                                        <Select
                                            label="Type"
                                            name="type"
                                            values={[
                                                {
                                                    text: 'Income',
                                                    value: '01',
                                                },
                                                {
                                                    text: 'Expenses',
                                                    value: '02',
                                                },
                                            ]}
                                        />
                                    </div>
                                   
                                </div>
                            </div>

                                <div className="form-group form-vertical">
                                    <label></label>
                                    <div className="form_elements">
                                        <button className="btn btn-outline-info">
                                            submit
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    )}

                    <Footer>
                        {state?.item?.id && (
                            <li>
                                <Link
                                    to={`/${setup.route_prefix}/details/${state.item?.id}`}
                                    className="outline"
                                >
                                    <span className="material-symbols-outlined fill">
                                        visibility
                                    </span>
                                    <div className="text">Details</div>
                                </Link>
                            </li>
                        )}
                    </Footer>
                </div>
            </div>
        </>
    );
};

export default Edit;
