import React, { useState } from 'react';
import { makePayment, verifyPayment } from "shurjopay-js";
import { anyObject } from '../../../mo/common_types/object';
export interface Props { }

const T1: React.FC<Props> = (props: Props) => {
    const [paymentStage, setPaymentStage] = useState<string>("idle");
    const [paymentInfo, setPaymentInfo] = useState<anyObject>({});
    const [paymentAmount, setPaymentAmount] = useState<number>(1000);

    async function make_payment() {

        try {
            setPaymentStage('processing');
            const make_payment_details = await makePayment('1001', {
                prefix: 'uniflex',
                store_id: '1',
                return_url: location.origin + '/customer#/payment-response',
                cancel_url: location.origin + '/customer#/payment-response',
                amount: paymentAmount,
                order_id: "1001",
                currency: 'BDT',
                customer_name: 'shefat',
                customer_address: 'paltan',
                customer_phone: '+8801234569874',
                customer_city: 'dhaka',
                customer_email: 'a@g.com',
                customer_post_code: "2154",
                client_ip: "12.12.23.25",
            });
            setPaymentStage('take_payment');
            setPaymentInfo(make_payment_details);
            console.log(make_payment_details);
        } catch (error) {
            setPaymentStage("idle")
        }

    }

    async function verify_payment() {
        let payment = await verifyPayment('uniflex66dee6111158c');
        console.log(payment);
        payment = await verifyPayment('uniflex66dee785cbfd4');
        console.log(payment);
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

    return <div className="container">
        <div className="row">
            <div className="col-12 text-center">
                <div className="card w-100 mt-3">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-xl-6 col-lg-8">
                                {read_state()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-md-4">
                <div className="card bg-dark my-4 w-100">
                    <div className="card-body">
                        <div className="stat-widget-dashboard">
                            <div className="d-flex">
                                <img className="flex-shrink-0 me-3" src="https://admin.pixelstrap.com/universal/assets/images/dashboard-icons/document.png" alt="Generic placeholder image" />
                                <div className="text-end">
                                    <h4 className="mt-0 counter font-primary">5</h4>
                                    <span>Total Payable</span>
                                </div>
                            </div>
                            <div className="dashboard-chart-container">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-md-4">
                <div className="card bg-dark my-4 w-100">
                    <div className="card-body">
                        <div className="stat-widget-dashboard">
                            <div className="d-flex">
                                <img className="flex-shrink-0 me-3" src="https://admin.pixelstrap.com/universal/assets/images/dashboard-icons/document.png" alt="Generic placeholder image" />
                                <div className="text-end">
                                    <h4 className="mt-0 counter font-primary">
                                        50,23,524 TK
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

            <div className="col-md-4">
                <div className="card bg-dark w-100 my-4">
                    <div className="card-body">
                        <div className="stat-widget-dashboard">
                            <div className="d-flex">
                                <img className="flex-shrink-0 me-3" src="https://admin.pixelstrap.com/universal/assets/images/dashboard-icons/document.png" alt="Generic placeholder image" />
                                <div className="text-end">
                                    <h4 className="mt-0 counter font-primary">
                                        50,524 TK
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
            <div className="col-xl-6 col-lg-12">
                <div className="card height-equal equal-height-lg" style={{ minHeight: 463.375 }}>
                    <div className="card-header">
                        <h5>
                            Payment Histories
                        </h5>
                        <div className="card-header-right">
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="user-status height-scroll custom-scrollbar">
                            <table className="table table-bordernone">
                                <thead>
                                    <tr>
                                        <th scope="col" className="pt-0">Project</th>
                                        <th scope="col" className="pt-0">Date</th>
                                        <th scope="col" className="pt-0">Amount</th>
                                        <th scope="col" className="pt-0">Status</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        [40000, 55000, 24000, 60000].map(el => {

                                            return (<tr>
                                                <td>
                                                    Basundara river view
                                                </td>
                                                <td className="digits">
                                                    {new Date().toDateString()}
                                                </td>
                                                <td className="digits">{el} TK</td>
                                                <td className="font-secondary">Pending</td>
                                                <td>
                                                    <a href="/print-invoice" target="_blank" className="btn btn-info">
                                                        Print
                                                    </a>
                                                </td>
                                            </tr>)

                                        })
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>;
};

export default T1;
