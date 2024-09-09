import React, { useEffect, useState } from 'react';
import { makePayment, verifyPayment } from "shurjopay-js";
import { anyObject } from '../../../../mo/common_types/object';
import { useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';
export interface Props { }

const T1: React.FC<Props> = (props: Props) => {
    const [paymentInfo, setPaymentInfo] = useState<anyObject>({});
    const [params] = useSearchParams();

    useEffect(() => {
        let order_id = params.get('order_id');
        verify_payment(order_id);
    }, [])

    async function verify_payment(order_id) {
        let payment = await verifyPayment(order_id);
        if (payment.length) {
            setPaymentInfo(payment[0]);
            console.log(payment[0]);
            if(payment[0].bank_status == "Success"){
                axios.post('/api/v1/account/logs/store-gateway-payment-on-success',{
                    ...payment[0],
                })
            }
        }
    }

    return <div className="container">
        <div className="row">
            <div className="col-12 text-center">
                <div className="card w-100 mt-3">
                    <div className="card-body">
                        {
                            paymentInfo &&
                            <div>
                                {
                                    paymentInfo.bank_status == "Success" ?
                                    <h1 className="text-success">
                                        {paymentInfo.bank_status}
                                    </h1>
                                    :
                                    <h1 className="text-danger">
                                        {paymentInfo.bank_status}
                                    </h1>
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
