import React from 'react';
export interface Props { }

const AllCustomer: React.FC<Props> = (props: Props) => {
    return <div className="page_content">
        <div className="row">
            <div className="col-12">
                <div className="card w-100 mt-4">
                    <div className="card-header">
                        <h5>
                            Customers
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
                                        <th scope="col" className="pt-0">Name</th>
                                        <th scope="col" className="pt-0">Date</th>
                                        <th scope="col" className="pt-0">Total Paid</th>
                                        <th scope="col" className="pt-0">Total Revenue</th>
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
                                                    Abdullah al Mahmood
                                                </td>
                                                <td className="digits">
                                                    {new Date().toDateString()}
                                                </td>
                                                <td className="digits">{el} TK</td>
                                                <td className="digits">{el - 500} TK</td>
                                                <td>
                                                    <button className="btn btn-info">
                                                        Payment Histories
                                                    </button>
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

export default AllCustomer;
