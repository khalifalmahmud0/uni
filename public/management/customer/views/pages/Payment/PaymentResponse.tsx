import React, { useEffect, useState } from 'react';
import { makePayment, verifyPayment } from "shurjopay-js";
import { anyObject } from '../../../../mo/common_types/object';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';
export interface Props { }

const T1: React.FC<Props> = (props: Props) => {
    const [paymentInfo, setPaymentInfo] = useState<anyObject>({});
    const [invoiceInfo, setInvoiceInfo] = useState<anyObject>({});
    const [isProcessing, setIsProcessing] = useState<boolean>(true);
    const [params] = useSearchParams();

    useEffect(() => {
        let order_id = params.get('order_id');
        verify_payment(order_id);
    }, [])

    async function verify_payment(order_id) {
        let payment = await verifyPayment(order_id) as any;
        if (payment.length) {
            setPaymentInfo(payment[0]);
            console.log(payment[0]);
            if (payment[0].sp_massage == "Success") {
                axios.post('/api/v1/account/logs/store-gateway-payment-on-success', {
                    ...payment[0],
                })
                    .then(res => {
                        try {
                            let payment = res.data.data.payment;
                            localStorage.setItem('booking', JSON.stringify(payment))
                            setInvoiceInfo(payment);
                            setIsProcessing(false);
                        } catch (error) {

                        }
                    })
            }else{
                setIsProcessing(false);
            }
        }
    }

    function print_invoice() {
        window.open("/print-customer-payment-invoice?id=" + invoiceInfo?.id, '_blank');
    }

    return <div className="container">
        <div className="row">
            <div className="col-12 text-center">
                <div className="card w-100 mt-3">
                    <div className="card-body">
                        {
                            (paymentInfo && !isProcessing) &&
                            <div>
                                {
                                    paymentInfo.sp_massage == "Success" ?
                                        <div>
                                            <h1 className="text-success">
                                                {paymentInfo.sp_massage}
                                            </h1>
                                            <button onClick={print_invoice} className="btn btn-info" type='button'>
                                                Print Invoice
                                            </button>
                                        </div>
                                        :
                                        <div>
                                            <h1 className="text-danger">
                                                transaction failed
                                            </h1>
                                            <Link to={'/'} className="btn btn-warning">
                                                Please Try Again
                                            </Link>
                                        </div>
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>;
};

export default T1;
