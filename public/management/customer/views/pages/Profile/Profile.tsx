import React from 'react';
import Input from './components/Input';
export interface Props { }

const Profile: React.FC<Props> = (props: Props) => {
    return <div className="page_content">
        <div className="row">
            <div className="col-12">
                <div className="card w-100 mt-4">
                    <div className="card-header">
                        <h3>Update Profile</h3>
                    </div>
                    <div className="card-body">
                        <form action="">
                            <div className="form-group form-vertical">
                                <Input
                                    name={'name'}
                                    label="Name"
                                />
                            </div>
                            <div className="form-group form-vertical">
                                <Input
                                    name={'email'}
                                    label="Email"
                                />
                            </div>
                            <div className="form-group form-vertical">
                                <Input
                                    name={'phone_number'}
                                    label="Phone Number"
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

export default Profile;
