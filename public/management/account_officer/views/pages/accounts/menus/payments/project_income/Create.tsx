import React from 'react';
import Header from './components/management_data_page/Header';
import Footer from './components/management_data_page/Footer';
import { useAppDispatch } from '../../../../../../store';
import { store } from './config/store/async_actions/store';
import Input from './components/management_data_page/Input';
import Select from './components/management_data_page/Select';
export interface Props {}

const Create: React.FC<Props> = (props: Props) => {
    const dispatch = useAppDispatch();

    async function handle_submit(e) {
        e.preventDefault();
        const response = await dispatch(store(new FormData(e.target)) as any);
        if (!Object.prototype.hasOwnProperty.call(response, 'error')) {
            e.target.reset();
        }
    }

    return (
        <>
            <div className="page_content">
                <div className="explore_window fixed_size">
                    <Header page_title="Pay Payment"></Header>
                    <div className="content_body custom_scroll">
                        <form
                            onSubmit={(e) => handle_submit(e)}
                            className="mx-auto pt-3"
                        >
                            {/* Project Income  */}
                            <div>
                                <h5 className="mb-4">Add Project Income</h5>
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
                                <div className="form_elements">
                                    <button className="btn btn_1 btn-outline-info">
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <Footer></Footer>
                </div>
            </div>
        </>
    );
};

export default Create;
