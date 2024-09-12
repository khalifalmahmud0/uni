import React, { useEffect, useState } from 'react';
import { makePayment, verifyPayment } from "shurjopay-js";
import { anyObject } from '../../../mo/common_types/object';
import { commnStoreInitialState } from '../../store/slices/common_slice';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import axios from 'axios';
import moment from 'moment/moment';
export interface Props { }

const T1: React.FC<Props> = (props: Props) => {
    const state: typeof commnStoreInitialState = useSelector(
        (state: RootState) => state['common_store'],
    );
    const [paymentStage, setPaymentStage] = useState<string>("idle");
    const [paymentInfo, setPaymentInfo] = useState<anyObject>({});
    const [paymentAmount, setPaymentAmount] = useState<number>(1000);
    const [paymentTypes, setPaymentTpyes] = useState<anyObject>({
        booking_money: 1,
        down_payment: 1,
        installment: 1,
    });

    async function make_payment() {
        let payment_type = '';
        let payment_type_el = document.getElementById('payment_type') as HTMLSelectElement | null;
        if (payment_type_el) {
            payment_type = payment_type_el.value;
        }

        if (!payment_type) {
            return window.alert('select payment type');
        }

        try {
            let project_info = (state.auth_user as any).user?.project_customer_information?.project_info;
            let customer_inofrmations = (state.auth_user as any).customer_informations;
            let user = (state.auth_user as any).user;
            setPaymentStage('processing');

            // let order_id = project_info.uid + payment_type + user.id + ((state.auth_user as any).installment_no + 1);
            let install_no = (state.auth_user as any).installment_no + 1;
            let order_id = user.id + install_no + "";
            let ipres = await fetch("https://checkip.amazonaws.com");
            let ip = await ipres.text();
            let date = moment().format('YYY-MM-DD');

            const make_payment_details = await makePayment(order_id, {
                prefix: 'UFX',
                store_id: '949',
                // store_id: '1',
                return_url: location.origin + '/customer#/payment-response',
                cancel_url: location.origin + '/customer#/payment-response',
                amount: paymentAmount,
                order_id: order_id,
                currency: 'BDT',
                customer_name: user?.name,
                customer_address: customer_inofrmations?.current_address_english || 'dhaka',
                customer_phone: customer_inofrmations?.mobile || '01646356898',
                customer_city: 'dhaka',
                customer_email: user?.email || 'uni@payme.com',
                customer_post_code: "2154",
                client_ip: ip,
                value1: JSON.stringify({
                    user_id: user.id,
                    project_id: project_info.id,
                    payment_type: payment_type,
                    account_category_id: paymentTypes[payment_type],
                    date: date,
                    install_no: install_no,
                    amount_in_text: (window as any).convertAmount(paymentAmount).en + " TK only",
                }),
                value2: "",
                value3: "",
            });
            setPaymentStage('take_payment');
            setPaymentInfo(make_payment_details as any);
            console.log(make_payment_details);
        } catch (error) {
            setPaymentStage("idle")
        }
    }

    function read_state() {
        if (paymentStage == 'idle') {
            return <div className="d-grid gap-2">
                <div className="text-left mb-2">
                    <label htmlFor="">
                        Payment Type
                    </label>
                    <select name="payment_type" id="payment_type" className="form-control">
                        <option value="">--select--</option>
                        <option value="booking_money">Booking Money</option>
                        <option value="down_payment">Down Payment</option>
                        <option value="installment">Installment</option>
                    </select>
                </div>
                <div className="text-left mb-2">
                    <label htmlFor="" >
                        Payment Amount
                    </label>
                    <input type="number"
                        className="form-control"
                        defaultValue={paymentAmount}
                        onChange={(e) => setPaymentAmount(+(e.target as HTMLInputElement).value)}
                        placeholder="enter amount"
                        id="payment_amount" />
                </div>
                <button onClick={make_payment} className='btn btn-lg btn-info'>
                    Click here to pay your due amounts
                </button>
            </div>
        } else if (paymentStage == 'processing') {
            return <button className='btn btn-lg btn-warning'>
                Payment is processing
            </button>
        }
        else if (paymentStage == 'take_payment') {
            return <a href={paymentInfo.checkout_url} className='btn btn-lg btn-warning'>
                Click &amp; Complete Payment of ( {paymentInfo.amount} ) TK
            </a>
        }
    }

    return <div className="container-lg">
        <div className="row">
            <div className="col-12 text-center">
                <div className="card w-100 mt-3">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-xl-8 col-lg-10">
                                {read_state()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="row">
            <div className="col-lg-6 col-xl-4">
                <div className="card bg-dark my-4 w-100">
                    <div className="card-body">
                        <div className="stat-widget-dashboard">
                            <div className="d-flex">
                                <img className="flex-shrink-0 me-3" src="https://admin.pixelstrap.com/universal/assets/images/dashboard-icons/document.png" alt="Generic placeholder image" />
                                <div className="text-end">
                                    <h4 className="mt-0 counter font-primary">
                                        {(state.auth_user as any).payable}
                                    </h4>
                                    <span>Total Payable</span>
                                </div>
                            </div>
                            <div className="dashboard-chart-container">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-lg-6 col-xl-4">
                <div className="card bg-dark my-4 w-100">
                    <div className="card-body">
                        <div className="stat-widget-dashboard">
                            <div className="d-flex">
                                <img className="flex-shrink-0 me-3" src="https://admin.pixelstrap.com/universal/assets/images/dashboard-icons/document.png" alt="Generic placeholder image" />
                                <div className="text-end">
                                    <h4 className="mt-0 counter font-primary">
                                        {(state.auth_user as any).paid} TK
                                    </h4>
                                    <span>Total Paid</span>
                                </div>
                            </div>
                            <div className="dashboard-chart-container">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-lg-6 col-xl-4">
                <div className="card bg-dark w-100 my-4">
                    <div className="card-body">
                        <div className="stat-widget-dashboard">
                            <div className="d-flex">
                                <img className="flex-shrink-0 me-3" src="https://admin.pixelstrap.com/universal/assets/images/dashboard-icons/document.png" alt="Generic placeholder image" />
                                <div className="text-end">
                                    <h4 className="mt-0 counter font-primary">
                                        {
                                            (state.auth_user as any).payable -
                                            (state.auth_user as any).paid
                                        }
                                        TK
                                    </h4>
                                    <span>Due</span>
                                </div>
                            </div>
                            <div className="dashboard-chart-container">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <div className="row">
            <div className="col-lg-6  col-xl-4">
                <div className="card bg-dark my-4 w-100">
                    <div className="card-body">
                        <div className="stat-widget-dashboard">
                            <div className="d-flex">
                                <img className="flex-shrink-0 me-3" src="https://admin.pixelstrap.com/universal/assets/images/dashboard-icons/document.png" alt="Generic placeholder image" />
                                <div className="text-end">
                                    <h4 className="mt-0 counter font-primary">
                                        {(state.auth_user as any).total_booking_money}
                                    </h4>
                                    <span>Total Booking Money</span>
                                </div>
                            </div>
                            <div className="dashboard-chart-container">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-lg-6  col-xl-4">
                <div className="card bg-dark my-4 w-100">
                    <div className="card-body">
                        <div className="stat-widget-dashboard">
                            <div className="d-flex">
                                <img className="flex-shrink-0 me-3" src="https://admin.pixelstrap.com/universal/assets/images/dashboard-icons/document.png" alt="Generic placeholder image" />
                                <div className="text-end">
                                    <h4 className="mt-0 counter font-primary">
                                        {(state.auth_user as any).total_down_payment} TK
                                    </h4>
                                    <span>Total Down Payment</span>
                                </div>
                            </div>
                            <div className="dashboard-chart-container">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-lg-6  col-xl-4">
                <div className="card bg-dark w-100 my-4">
                    <div className="card-body">
                        <div className="stat-widget-dashboard">
                            <div className="d-flex">
                                <img className="flex-shrink-0 me-3" src="https://admin.pixelstrap.com/universal/assets/images/dashboard-icons/document.png" alt="Generic placeholder image" />
                                <div className="text-end">
                                    <h4 className="mt-0 counter font-primary">
                                        {(state.auth_user as any).total_installment}
                                        TK
                                    </h4>
                                    <span>Installment</span>
                                </div>
                            </div>
                            <div className="dashboard-chart-container">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>;
};

export default T1;
