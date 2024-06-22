import React, { useState } from 'react';
import Header from './components/management_data_page/Header';
import Footer from './components/management_data_page/Footer';
import setup from './config/setup';
import { useAppDispatch } from '../../../store';
import { store } from './config/store/async_actions/store';
import DropDown from './components/dropdown/DropDown';
import Input from './components/management_data_page/Input';
import Select from './components/management_data_page/Select';
import InputImage from './components/management_data_page/InputImage';

export interface Props {}

const Create: React.FC<Props> = (props: Props) => {
    const dispatch = useAppDispatch();

    const [entries, setEntries] = useState([
        { id: Date.now(), file: '', url: '', description: '' },
    ]);

    async function handle_submit(e) {
        e.preventDefault();
        const response = await dispatch(store(new FormData(e.target)) as any);
        if (!Object.prototype.hasOwnProperty.call(response, 'error')) {
            e.target.reset();
        }
    }

    const addEntry = () => {
        setEntries([
            ...entries,
            { id: Date.now(), file: '', url: '', description: '' },
        ]);
    };

    const removeEntry = (id) => {
        setEntries(entries.filter((entry) => entry.id !== id));
    };

    const handleChange = (id, field, value) => {
        setEntries(
            entries.map((entry) =>
                entry.id === id ? { ...entry, [field]: value } : entry,
            ),
        );
    };

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
                            {/* Project Information  */}
                            <div>
                                <h5 className="mb-4">Personal Informations</h5>
                                <div className="form_auto_fit">
                                    {[
                                        {
                                            name: 'project_name',
                                            placeholder: 'Enter project name',
                                            type: 'text',
                                            label: 'Name',
                                        },
                                        {
                                            name: 'project_location',
                                            placeholder: 'Enter Location',
                                            type: 'text',
                                            label: 'Location',
                                        },
                                        {
                                            name: 'project_per_share_cost',
                                            placeholder:
                                                'Enter Project Per Share Cost',
                                            type: 'text',
                                            label: 'Per Share Cost',
                                        },
                                    ].map((field) => (
                                        <div
                                            className="form-group form-vertical"
                                            key={field.name}
                                        >
                                            <Input
                                                name={field.name}
                                                placeholder={field.placeholder}
                                                type={field.type}
                                                label={field.label}
                                            />
                                        </div>
                                    ))}
                                </div>
                                <div className="form-group form-vertical">
                                    <label htmlFor="description">
                                        Description:
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        rows={10}
                                        cols={170}
                                    />
                                </div>
                            </div>

                            <div>
                                <h5 className="mb-4">Documents</h5>
                                {entries.map((entry, index) => (
                                    <div>
                                         <div>
                                        {/* Button  */}
                                            {entries.length > 1 && (
                                                <i style={{"float":"right","cursor":"pointer"}} onClick={() =>
                                                    removeEntry(entry.id)
                                                } className="fa fa-trash" aria-hidden="true"></i>
                                            
                                        )}
                                    </div>
                                    <div
                                        key={entry.id}
                                        className="repeater-group form_auto_fit"
                                    >
                                        {/* File  */}
                                        <div
                                            className="form-group form-vertical"
                                            key={`file-${entry.id}`}
                                        >
                                            <Input
                                                name={`file-${entry.id}`}
                                                placeholder="Upload File"
                                                type="file"
                                                label="Upload File"
                                                onChange={(e) =>
                                                    handleChange(
                                                        entry.id,
                                                        'file',
                                                        e?.target?.files?.[0],
                                                    )
                                                }
                                            />
                                        </div>
                                        {/* URL  */}
                                        <div
                                            className="form-group form-vertical"
                                            key={`file-${entry.id}`}
                                        >
                                            <Input
                                                label="Upload File"
                                                type="text"
                                                name={`url-${entry.id}`}
                                                placeholder="Enter URL"
                                                value={entry.url}
                                                onChange={(e) =>
                                                    handleChange(
                                                        entry.id,
                                                        'url',
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </div>
                                        {/* Description  */}
                                        <div
                                            className="form-group form-vertical"
                                            key={`description-${entry.id}`}
                                        >
                                            <Input
                                                name={`description-${entry.id}`}
                                                placeholder="Enter Description"
                                                type="text"
                                                label="Description"
                                            />
                                        </div>
                                        
                                    </div>
                                   </div>
                                ))}

                                {/* Add Another  */}
                                
                              <i style={{"float":"right","cursor":"pointer"}} onClick={addEntry} className="fa fa-plus" aria-hidden="true"></i>
                            </div>

                            <div className="form-group form-vertical">
                                <div className="form_elements">
                                    <button className="btn btn_1 btn-outline-info">
                                        Submit
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
