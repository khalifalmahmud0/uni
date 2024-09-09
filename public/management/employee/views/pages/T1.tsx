import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../../store';
import { get_insentive_calculation } from './users/config/store/async_actions/get_insentive_calculation';
import { anyObject } from '../../common_types/object';
export interface Props { }

const T1: React.FC<Props> = (props: Props) => {
    const dispatch = useAppDispatch();
    const [balance, setBalance] = useState<anyObject>({});

    useEffect(() => {
        let response = dispatch(get_insentive_calculation({}) as any);
        console.log(response.payload.data);
        
    }, [])
    
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
                                    {
                                        [40000].map(el => {

                                            return (
                                                <tr>
                                                    <td className="digits">{el} TK</td>
                                                    <td className="digits">{el} TK</td>

                                                    <td className="digits">{el} TK</td>
                                                    <td className="digits">{el} TK</td>

                                                    <td className="digits">{el} TK</td>
                                                    <td className="digits">{el} TK</td>

                                                    <td className="digits">{el} TK</td>
                                                    <td className="digits">{el} TK</td>

                                                    <td>

                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="row d-none">
            <div className="col-md-4">
                <div className="card bg-dark my-4 w-100">
                    <div className="card-body">
                        <div className="stat-widget-dashboard">
                            <div className="d-flex">
                                <img className="flex-shrink-0 me-3" src="https://admin.pixelstrap.com/universal/assets/images/dashboard-icons/document.png" alt="Generic placeholder image" />
                                <div className="text-end">
                                    <h4 className="mt-0 counter font-primary">
                                        12
                                    </h4>
                                    <span>Total Customers</span>
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
                                        50,23,524 TK
                                    </h4>
                                    <span>Total Paid By Customers</span>
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
                                        5,50,524 TK
                                    </h4>
                                    <span>Revenue</span>
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
