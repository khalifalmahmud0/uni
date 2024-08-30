import React from 'react';
import Input from './components/Input';
export interface Props { }

const Payment: React.FC<Props> = (props: Props) => {
    return <div className="page_content">
        <div className="row">
            <div className="col-12">
                <div className="card w-100 mt-4">
                    <div className="card-header">
                        <h3>Payment</h3>
                    </div>
                    <div className="card-body">
                        <form action="">
                            <div className="form-group form-vertical">
                                <Input
                                    name={'amount'}
                                    label="Amount"
                                />
                            </div>
                            
                            <div className="form-group form-vertical">
                                <button className="btn btn-info">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    </div>;
};

export default Payment;
