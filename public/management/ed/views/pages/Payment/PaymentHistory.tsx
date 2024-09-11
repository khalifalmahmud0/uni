import React from 'react';
import Input from './components/Input';
export interface Props { }

const PaymentHistory: React.FC<Props> = (props: Props) => {
    return <div className="page_content">
        <div className="row">
            <div className="col-12">
                <div className="card w-100 mt-4">
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
                                        <th scope="col" className="pt-0">Customer</th>
                                        <th scope="col" className="pt-0">Date</th>
                                        <th scope="col" className="pt-0">Amount</th>
                                        <th scope="col" className="pt-0">Revenue</th>
                                        <th scope="col" className="pt-0"></th>
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
                                                <td>
                                                    Abdullah Al Mahmood
                                                </td>
                                                <td className="digits">
                                                    {new Date().toDateString()}
                                                </td>
                                                <td className="digits">{el} TK</td>
                                                <td className="digits">{el} TK</td>
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

export default PaymentHistory;
