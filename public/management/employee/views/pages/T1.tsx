import React from 'react';
export interface Props { }

const T1: React.FC<Props> = (props: Props) => {
    return <div>
        <div className="row">
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
                                        <th scope="col" className="pt-0">Customer</th>
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
                                                <td>
                                                    Mr. Sharifuddin
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
