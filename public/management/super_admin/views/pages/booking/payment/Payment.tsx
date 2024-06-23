import React from 'react';
import Header from '../../project/components/management_data_page/Header';
import Footer from '../../project/components/management_data_page/Footer';
import { useAppDispatch } from '../../../../store';
import { store } from '../../project/config/store/async_actions/store';
import Input from '../../project/components/management_data_page/Input';
import Select from '../../users/components/management_data_page/Select';

export interface Props {}

const Payment: React.FC<Props> = (props: Props) => {
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
                            {/* Project Information  */}
                            <div>
                                <h5 className="mb-4">Personal Informations</h5>
                                <div className="form_auto_fit">
                                    {[
                                        {
                                            name: 'project id',
                                            placeholder: 'Project ID',
                                            type: 'text',
                                            label: 'Project ID',
                                        },
                                        {
                                            name: 'user_id',
                                            placeholder: 'User ID',
                                            type: 'text',
                                            label: 'User ID',
                                        },
                                        {
                                            name: 'reference_user_id',
                                            placeholder:
                                                'Reference User ID',
                                            type: 'text',
                                            label: 'Reference User ID',
                                        },
                                        {
                                            name: 'amount',
                                            placeholder:
                                                'Amount',
                                            type: 'text',
                                            label: 'Amount',
                                        },
                                        {
                                            name: 'date',
                                            placeholder:
                                                'Date',
                                            type: 'date',
                                            label: 'Date',
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
                                     <div className="form-group form-vertical">
                                        <Select
                                            label="Payment Type"
                                            name="payment_type"
                                            values={[
                                                { text: 'Booking Money', value: 'bm' },
                                                { text: 'Down Payments', value: 'dp' },
                                                { text: 'Installments', value: 'install' },
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

export default Payment;
