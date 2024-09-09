import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../../store';
import { get_insentive_calculation } from './users/config/store/async_actions/get_insentive_calculation';
import { anyObject } from '../../common_types/object';
export interface Props { }

const T1: React.FC<Props> = (props: Props) => {
    const dispatch = useAppDispatch();
    const [balance, setBalance] = useState<anyObject>({});

    useEffect(() => {
        get_data();
    }, []);

    async function get_data() {
        let response = await dispatch(get_insentive_calculation({}) as any);
        // console.log(response);
        setBalance(response.payload.data)
    }

    function get_amount(key) {
        if (balance[key]) {
            return (balance[key]?.toFixed(2)) + " TK";
        }
        return '';
    }

    return <div>
        <div className="row">
            <div className="col-12">
                <div className="card height-equal w-100 equal-height-lg" style={{ minHeight: 463.375 }}>
                    <div className="card-header">
                        <h5>
                            Todays Insentives
                        </h5>
                        <div className="card-header-right">
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="height-scroll custom-scrollbar">
                            <table className="table text-center table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col" colSpan={2} className="">Booking Money</th>
                                        <th scope="col" colSpan={2} className="">Down Payment</th>
                                        <th scope="col" colSpan={2} className="">Installment</th>
                                        <th scope="col" colSpan={2} className="">Reference</th>
                                        <th scope="col" className=""></th>
                                    </tr>
                                    <tr>
                                        <th>Previous</th>
                                        <th>Today</th>

                                        <th>Previous</th>
                                        <th>Today</th>

                                        <th>Previous</th>
                                        <th>Today</th>

                                        <th>Previous</th>
                                        <th>Today</th>

                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="digits">
                                            {get_amount('prev_booking_money')}
                                        </td>
                                        <td className="digits">
                                            {get_amount('today_booking_money')}
                                        </td>

                                        <td className="digits">
                                            {get_amount('prev_down_payment')}
                                        </td>
                                        <td className="digits">
                                            {get_amount('prev_down_payment')}
                                        </td>

                                        <td className="digits">
                                            {get_amount('prev_installment')}
                                        </td>
                                        <td className="digits">
                                            {get_amount('total_installment')}
                                        </td>

                                        <td className="digits">
                                            {get_amount('prev_reference_amount')}
                                        </td>
                                        <td className="digits">
                                            {get_amount('today_reference_amount')}
                                        </td>

                                        <td className="text-right">
                                            {get_amount('total_insentive')}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={8} className="text-right">
                                            ( - ) withdraw
                                        </td>
                                        <td className="text-right">
                                            {get_amount('total_withdraw')}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={8} className="text-right">
                                            Balance
                                        </td>
                                        <td className="text-right">
                                            {get_amount('balance')}
                                        </td>
                                    </tr>
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
