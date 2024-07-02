import React from 'react';
import Header from './components/management_data_page/Header';
import Footer from './components/management_data_page/Footer';
import setup from './config/setup';
import { useAppDispatch } from '../../../../../store';
import { store } from './config/store/async_actions/store';
import DropDown from './components/dropdown/DropDown';
import Input from './components/management_data_page/Input';
import Select from './components/management_data_page/Select';
import InputImage from './components/management_data_page/InputImage';
export interface Props { }

const Create: React.FC<Props> = (props: Props) => {
    const dispatch = useAppDispatch();

    async function handle_submit(e) {
        e.preventDefault();
        const response = await dispatch(store(new FormData(e.target)) as any);
        if (!Object.prototype.hasOwnProperty.call(response, 'error')) {
            e.target.reset();
        }
    }

    return (
        <>
            <div className="page_content">
                <div className="explore_window fixed_size">
                    <Header page_title={setup.create_page_title}></Header>
                    <div className="content_body custom_scroll">
                        <form
                            onSubmit={(e) => handle_submit(e)}
                            className="mx-auto pt-3"
                        >
                            <div>
                                <h5 className="mb-4">
                                    Select Project
                                </h5>
                                <div className="form_auto_fit">
                                    <div className="form-group form-vertical">
                                        <Select
                                            label="Project"
                                            name="project"
                                            values={[
                                                { text: 'Dooreen tower', value: 'ed' },
                                                { text: 'Paltan tower', value: 'gm' },
                                            ]}
                                        />
                                    </div>
                                    <div className="form-group form-vertical">
                                        <Select
                                            label="Employee"
                                            name="project"
                                            values={[
                                                { text: 'Mr kasem', value: 'ed' },
                                                { text: 'Mr selim', value: 'gm' },
                                            ]}
                                        />
                                    </div>
                                    {[
                                        'time',
                                    ].map((i) => (
                                        <div className="form-group form-vertical">
                                            <Input name={i} />
                                        </div>
                                    ))}

                                    <div className="form-group form-vertical">
                                        <Input name="description" />
                                    </div>
                                </div>
                            </div>

                            <div className="form-group form-vertical">
                                <label></label>
                                <div className="form_elements">
                                    <button className="btn btn_1 btn-outline-info">
                                        submit
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <Footer></Footer>
                </div>
            </div>
        </>
    );
};

export default Create;
