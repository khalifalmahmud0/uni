import React, { useEffect, useState } from 'react';
import Header from './components/management_data_page/Header';
import Footer from './components/management_data_page/Footer';
import setup from './config/setup';
import { useAppDispatch, RootState } from '../../../store';
import { store } from './config/store/async_actions/store';
import DropDown from './components/dropdown/DropDown';
import { Link, useParams } from 'react-router-dom';
import ProjectDropDown from '../project/components/dropdown/DropDown';
import UserDropDown from '../users/components/dropdown/DropDown';
import Input from './components/management_data_page/Input';
import Select from './components/management_data_page/Select';
import InputImage from './components/management_data_page/InputImage';
import { useSelector } from 'react-redux';
import { initialState } from './config/store/inital_state';
import { details } from './config/store/async_actions/details';
import storeSlice from './config/store';
import { update } from './config/store/async_actions/update';
import { anyObject } from '../../../common_types/object';
export interface Props { }

const Create: React.FC<Props> = (props: Props) => {
    const state: typeof initialState = useSelector(
        (state: RootState) => state[setup.module_name],
    );
    const [moInfo, setMoInfo] = useState<anyObject>({});
    const dispatch = useAppDispatch();
    const params = useParams();

    useEffect(() => {
        dispatch(storeSlice.actions.set_item({}));
        dispatch(details({ id: params.id }) as any);
    }, []);

    useEffect(() => {
        if (state.item?.reference_info) {
            dispatch(
                storeSlice.actions.set_selected([state.item.reference_info]),
            );
        }
    }, [state.item]);

    async function handle_submit(e) {
        e.preventDefault();
        const response = await dispatch(update(new FormData(e.target)) as any);
    }

    function get_value(key) {
        let customer_information = {};
        try {
            customer_information = JSON.parse(state.item?.details.customer_informations);
        } catch (error) {
            console.error(error);
        }

        try {
            if (state.item[key]) {
                return state.item[key];
            }
            else if (state.item?.customer[key]) {
                return state.item?.customer[key];
            }
            else if (customer_information[key]) {
                return customer_information[key];
            };
        } catch (error) {
            console.error(key, error, state.item);
            return '';
        }
        return '';
    }

    function get_relation(key): anyObject[] | [] {
        try {
            if (state.item[key]) return [state.item[key]];
        } catch (error) {
            return [];
        }
        return [];
    }

    return (
        <>
            <div className="page_content">
                <div className="explore_window fixed_size">
                    <Header page_title={setup.edit_page_title}></Header>
                    {Object.keys(state.item).length && (
                        <div className="content_body custom_scroll">
                            <form
                                onSubmit={(e) => handle_submit(e)}
                                className="mx-auto pt-3"
                            >
                                <input type="hidden" name="id" defaultValue={state.item.id} />
                                {/* Booking type  */}
                                <div>
                                    <div className="form_auto_fit">
                                        <div className="form-group form-vertical">
                                            <Select
                                                label="Booking Type"
                                                name="booking_type"
                                                value={get_value('booking_type')}
                                                values={[
                                                    { text: '--select--', value: '' },
                                                    { text: 'FLAT', value: 'flat' },
                                                    { text: 'PLOT', value: 'plot' },
                                                ]}
                                            />
                                        </div>
                                        <div className="form-group form-vertical">
                                            <label>Project</label>
                                            <ProjectDropDown default_value={get_relation('project')} multiple={false} name={"project_id"} />
                                        </div>
                                        <div className="form-group form-vertical">
                                            <label>Reference</label>
                                            <UserDropDown default_value={get_relation('reference')} multiple={false} name={"reference_user_id"} />
                                        </div>
                                        <div className="form-group form-vertical">
                                            <label>MO</label>
                                            <UserDropDown default_value={get_relation('mo')} multiple={false} name={"mo_id"} get_selected_data={(data) => {
                                                // console.log(data);
                                                data.selectedList.length &&
                                                    setMoInfo(data.selectedList[0]);
                                            }} />
                                        </div>
                                        <div className="form-group form-vertical">
                                            <label>AGM</label>
                                            <div className="form-control">
                                                {moInfo.agm_info?.uid} -
                                                {moInfo.agm_info?.name}
                                            </div>
                                            <input type="hidden" name="agm_id" value={`[${moInfo.agm}]`} />
                                            {/* <UserDropDown multiple={false} name={"agm_id"} /> */}
                                        </div>
                                        <div className="form-group form-vertical">
                                            <label>GM</label>
                                            <div className="form-control">
                                                {moInfo.gm_info?.uid} -
                                                {moInfo.gm_info?.name}
                                            </div>
                                            <input type="hidden" name="gm_id" value={`[${moInfo.gm}]`} />
                                            {/* <UserDropDown multiple={false} name={"gm_id"} /> */}
                                        </div>
                                        <div className="form-group form-vertical">
                                            <label>ED</label>
                                            <div className="form-control">
                                                {moInfo.ed_info?.uid} -
                                                {moInfo.ed_info?.name}
                                            </div>
                                            <input type="hidden" name="ed_id" value={`[${moInfo.ed}]`} />
                                            {/* <UserDropDown multiple={false} name={"ed_id"} /> */}
                                        </div>
                                    </div>
                                </div>
                                {/* Personal Information  */}
                                <div>
                                    <h5 className="mb-4">Personal Informations</h5>
                                    <div className="form_auto_fit">
                                        {[
                                            {
                                                name: 'customer_id',
                                                placeholder: 'Customer ID',
                                                type: 'text',
                                                label: 'Customer ID',
                                            },
                                            {
                                                name: 'customer_password',
                                                placeholder: 'Customer Login Password',
                                                label: 'Customer Login Password',
                                                type: 'text',
                                            },

                                            {
                                                name: 'application_date',
                                                placeholder:
                                                    'Enter application date',
                                                type: 'date',
                                                label: 'Application Date',
                                            },
                                            {
                                                name: 'applicant_name_bengali',
                                                placeholder:
                                                    "Enter applicant's name in Bengali",
                                                type: 'text',
                                                label: "Applicant's Name (Bengali)",
                                            },
                                            {
                                                name: 'applicant_name_english',
                                                placeholder:
                                                    "Enter applicant's name in English",
                                                type: 'text',
                                                label: "Applicant's Name (English)",
                                            },
                                            {
                                                name: 'father_name_bengali',
                                                placeholder:
                                                    "Enter father's name in Bengali",
                                                type: 'text',
                                                label: "Father's Name (Bengali)",
                                            },
                                            {
                                                name: 'father_name_english',
                                                placeholder:
                                                    "Enter father's name in English",
                                                type: 'text',
                                                label: "Father's Name (English)",
                                            },
                                            {
                                                name: 'mother_name_bengali',
                                                placeholder:
                                                    "Enter mother's name in Bengali",
                                                type: 'text',
                                                label: "Mother's Name (Bengali)",
                                            },
                                            {
                                                name: 'mother_name_english',
                                                placeholder:
                                                    "Enter mother's name in English",
                                                type: 'text',
                                                label: "Mother's Name (English)",
                                            },
                                            {
                                                name: 'husband_wife_name_bengali',
                                                placeholder:
                                                    "Enter husband/wife's name in Bengali",
                                                type: 'text',
                                                label: "Husband/Wife's Name (Bengali)",
                                            },
                                            {
                                                name: 'husband_wife_name_english',
                                                placeholder:
                                                    "Enter husband/wife's name in English",
                                                type: 'text',
                                                label: "Husband/Wife's Name (English)",
                                            },
                                            {
                                                name: 'email',
                                                placeholder: 'Enter email',
                                                type: 'email',
                                                label: 'Email',
                                            },
                                            {
                                                name: 'current_address_bengali',
                                                placeholder:
                                                    'Enter current address in Bengali',
                                                type: 'text',
                                                label: 'Current Address (Bengali)',
                                            },
                                            {
                                                name: 'current_address_english',
                                                placeholder:
                                                    'Enter current address in English',
                                                type: 'text',
                                                label: 'Current Address (English)',
                                            },
                                            {
                                                name: 'permanent_address_bengali',
                                                placeholder:
                                                    'Enter permanent address in Bengali',
                                                type: 'text',
                                                label: 'Permanent Address (Bengali)',
                                            },
                                            {
                                                name: 'permanent_address_english',
                                                placeholder:
                                                    'Enter permanent address in English',
                                                type: 'text',
                                                label: 'Permanent Address (English)',
                                            },
                                            {
                                                name: 'date_of_birth',
                                                placeholder: 'Enter date of birth',
                                                type: 'date',
                                                label: 'Date of Birth',
                                            },
                                            {
                                                name: 'mobile',
                                                placeholder: 'Enter mobile number',
                                                type: 'tel',
                                                label: 'Mobile',
                                            },
                                            {
                                                name: 'national_id_passport_no',
                                                placeholder:
                                                    'Enter national ID No. / Passport No.',
                                                type: 'text',
                                                label: 'National ID No. / Passport No.',
                                            },
                                            {
                                                name: 'emergency_mobile_no',
                                                placeholder:
                                                    'Enter emergency mobile number',
                                                type: 'tel',
                                                label: 'Emergency Mobile No.',
                                            },
                                            {
                                                name: 'nationality',
                                                placeholder: 'Enter nationality',
                                                type: 'text',
                                                label: 'Nationality',
                                            },
                                            {
                                                name: 'religion',
                                                placeholder: 'Enter religion',
                                                type: 'text',
                                                label: 'Religion',
                                            },
                                            {
                                                name: 'tin_no',
                                                placeholder: 'Enter TIN No.',
                                                type: 'text',
                                                label: 'TIN No.',
                                            },
                                            {
                                                name: 'profession',
                                                placeholder: 'Enter profession',
                                                type: 'text',
                                                label: 'Profession',
                                            },
                                            {
                                                name: 'customer_image',
                                                placeholder: 'Customer photo',
                                                type: 'file',
                                                label: 'Customer photo',
                                                value_key: 'image'
                                            },
                                        ].map((field: anyObject) => (
                                            <div
                                                className="form-group form-vertical"
                                                key={field.name}
                                            >
                                                <Input
                                                    name={field.name}
                                                    placeholder={field.placeholder}
                                                    type={field.type}
                                                    label={field.label}
                                                    value={get_value(field.value_key || field.name)}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                {/* Nominee's Information  */}
                                <div>
                                    <h5 className="mb-4">Nominee's Information</h5>
                                    {/* 1st  */}
                                    <div className="form_auto_fit">
                                        {[
                                            {
                                                name: 'nominee_name_1',
                                                placeholder:
                                                    "Enter nominee's name (1st)",
                                                type: 'text',
                                                label: "Nominee's Name (1st)",
                                            },
                                            {
                                                name: 'relationship_with_applicant_1',
                                                placeholder:
                                                    'Enter relationship with applicant (1st)',
                                                type: 'text',
                                                label: 'Relationship with Applicant (1st)',
                                            },
                                            {
                                                name: 'nominee_telephone_no_1',
                                                placeholder:
                                                    "Enter nominee's telephone no. (1st)",
                                                type: 'tel',
                                                label: "Nominee's Telephone No. (1st)",
                                            },
                                            {
                                                name: 'nominee_share_1',
                                                placeholder:
                                                    "Enter nominee's share (1st)",
                                                type: 'text',
                                                label: "Nominee's Share (1st)",
                                            },
                                            {
                                                name: 'nominee_photo_1',
                                                placeholder:
                                                    "Upload nominee's photo (1st)",
                                                type: 'file',
                                                label: "Nominee's Photo (1st)",
                                            },
                                        ].map((field: anyObject) => (
                                            <div
                                                className="form-group form-vertical"
                                                key={field.name}
                                            >
                                                <Input
                                                    name={field.name}
                                                    placeholder={field.placeholder}
                                                    type={field.type}
                                                    label={field.label}
                                                    value={get_value(field.name)}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    {/* 2nd  */}
                                    <div className="form_auto_fit">
                                        {[
                                            {
                                                name: 'nominee_name_2',
                                                placeholder:
                                                    "Enter nominee's name (2nd)",
                                                type: 'text',
                                                label: "Nominee's Name (2nd)",
                                            },
                                            {
                                                name: 'relationship_with_applicant_2',
                                                placeholder:
                                                    'Enter relationship with applicant (2nd)',
                                                type: 'text',
                                                label: 'Relationship with Applicant (2nd)',
                                            },
                                            {
                                                name: 'nominee_telephone_no_2',
                                                placeholder:
                                                    "Enter nominee's telephone no. (2nd)",
                                                type: 'tel',
                                                label: "Nominee's Telephone No. (2nd)",
                                            },
                                            {
                                                name: 'nominee_share_2',
                                                placeholder:
                                                    "Enter nominee's share (2nd)",
                                                type: 'text',
                                                label: "Nominee's Share (2nd)",
                                            },
                                            {
                                                name: 'nominee_photo_2',
                                                placeholder:
                                                    "Upload nominee's photo (2nd)",
                                                type: 'file',
                                                label: "Nominee's Photo (2nd)",
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
                                                    value={get_value(field.name)}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                {/* Property Details  */}
                                <div>
                                    <h5 className="mb-4">Property Details</h5>
                                    <div className="form_auto_fit">
                                        {[
                                            // {
                                            //     name: 'property_location',
                                            //     placeholder:
                                            //         'Enter plot location',
                                            //     type: 'text',
                                            //     label: 'Property Location',
                                            // },
                                            {
                                                name: 'file_id_no',
                                                placeholder: 'Enter file / ID no.',
                                                type: 'text',
                                                label: 'File / ID No.',
                                            },
                                            {
                                                name: 'property_no',
                                                placeholder: 'Enter plot/flat no.',
                                                type: 'text',
                                                label: 'Property No.',
                                            },
                                            {
                                                name: 'road_no',
                                                placeholder: 'Enter road no.',
                                                type: 'text',
                                                label: 'Road No.',
                                            },
                                            {
                                                name: 'block_no',
                                                placeholder: 'Enter block no.',
                                                type: 'text',
                                                label: 'Block No.',
                                            },
                                            {
                                                name: 'sector_no',
                                                placeholder: 'Enter sector no.',
                                                type: 'text',
                                                label: 'Sector No.',
                                            },
                                            // {
                                            //     name: 'property_type',
                                            //     placeholder: 'Enter plot type',
                                            //     type: 'text',
                                            //     label: 'Property Type',
                                            // },
                                            {
                                                name: 'size_of_property_katha',
                                                placeholder:
                                                    'Size Of Plot/Flat (Katha)',
                                                type: 'number',
                                                label: 'Size Of Property (Katha)',
                                            },
                                            {
                                                name: 'size_of_property_land_percentage',
                                                placeholder:
                                                    'Size Of Property Land (Percentage)',
                                                type: 'number',
                                                label: 'Size Of Property Land (Percentage)',
                                            },
                                            {
                                                name: 'property_price_digit',
                                                placeholder:
                                                    'Enter property price (digit)',
                                                type: 'number',
                                                label: 'Property Price (Digit)',
                                                readonly: true,
                                                callback: function (e, value) {
                                                    let el = document.querySelector('#property_price_text') as HTMLInputElement | null;
                                                    let el2 = document.querySelector('#property_price_text_bangla') as HTMLInputElement | null;
                                                    if (el && el2) {
                                                        el.value = (window as any).convertAmount(value).en + ` taka only`;
                                                        el2.value = (window as any).convertAmount(value).bn + ` টাকা মাত্র`;
                                                    }
                                                }
                                            },
                                            {
                                                name: 'property_price_text',
                                                placeholder:
                                                    'Enter property price (text)',
                                                type: 'text',
                                                label: 'Property Price (Text)',
                                                readonly: true,
                                            },
                                            {
                                                name: 'property_price_text_bangla',
                                                placeholder:
                                                    'Enter property price (bangla text)',
                                                type: 'text',
                                                label: 'Property Price (Bangla Text)',
                                                readonly: true,
                                            },
                                            // {
                                            //     name: 'payment_type',
                                            //     placeholder: 'Enter payment type',
                                            //     type: 'text',
                                            //     label: 'Payment Type (Booking/Down/Full)',
                                            // },
                                            {
                                                name: 'payment_digit',
                                                placeholder:
                                                    'Enter payment (digit)',
                                                type: 'number',
                                                label: 'Payment (Digit)',
                                                readonly: true,
                                                callback: function (e, value) {
                                                    let el = document.querySelector('#payment_text') as HTMLInputElement | null;
                                                    let el2 = document.querySelector('#payment_text_bangla') as HTMLInputElement | null;
                                                    if (el && el2) {
                                                        el.value = (window as any).convertAmount(value).en + ` taka only`;
                                                        el2.value = (window as any).convertAmount(value).bn + ` টাকা মাত্র`;
                                                    }
                                                }
                                            },
                                            {
                                                name: 'payment_text',
                                                placeholder: 'Enter payment (text)',
                                                type: 'text',
                                                label: 'Payment (Text)',
                                                readonly: true,
                                            },
                                            {
                                                name: 'payment_text_bangla',
                                                placeholder: 'Enter payment (bangla text)',
                                                type: 'text',
                                                label: 'Payment ( Bangla Text)',
                                                readonly: true,
                                            },
                                            // {
                                            //     name: 'check_cash_po_dd_no',
                                            //     placeholder:
                                            //         'Enter check / cash / P.O. / D.D. no.',
                                            //     type: 'text',
                                            //     label: 'Check / Cash / P.O. / D.D. No.',
                                            // },
                                            {
                                                name: 'branch',
                                                placeholder: 'Enter branch',
                                                type: 'text',
                                                label: 'Branch',
                                            },
                                            {
                                                name: 'bank',
                                                placeholder: 'Enter bank',
                                                type: 'text',
                                                label: 'Bank',
                                            },
                                            {
                                                name: 'date',
                                                placeholder: 'Enter date',
                                                type: 'date',
                                                label: 'Date',
                                            },
                                            {
                                                name: 'swift_code_routing_no',
                                                placeholder:
                                                    'Enter swift code / routing no.',
                                                type: 'text',
                                                label: 'Swift Code / Routing No.',
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
                                                    value={get_value(field.name)}
                                                    callback={field.callback}
                                                    readonly={field.readonly}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                {/* Proof Of Payment  */}
                                <div>
                                    <h5 className="mb-4">Proof Of Payment</h5>
                                    <div className="form_auto_fit">
                                        <div className="form-group form-vertical">
                                            <Select
                                                label="Payment Method"
                                                value={get_value('payment_method')}
                                                name="payment_method"
                                                values={[
                                                    {
                                                        text: '--select--',
                                                        value: '',
                                                    },
                                                    {
                                                        text: 'BOOKING MONEY',
                                                        value: 'booking_money',
                                                    },
                                                    {
                                                        text: 'DOWNPAYMENT',
                                                        value: 'down_payment',
                                                    },
                                                    {
                                                        text: 'INSTALLMENT',
                                                        value: 'installment',
                                                    }
                                                ]}
                                            />
                                        </div>
                                        <div className="form-group form-vertical">
                                            <Select
                                                label="Payment By"
                                                value={get_value('check_cash_po_dd_no')}
                                                name="check_cash_po_dd_no"
                                                values={[
                                                    {
                                                        text: '--select--',
                                                        value: '',
                                                    },
                                                    {
                                                        text: 'Check',
                                                        value: 'check',
                                                    },
                                                    {
                                                        text: 'Cash',
                                                        value: 'cash',
                                                    },
                                                    {
                                                        text: 'P.O',
                                                        value: 'p.o',
                                                    },
                                                    {
                                                        text: 'D.D',
                                                        value: 'd.d',
                                                    },
                                                ]}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group form-vertical">
                                        <Select
                                            label="Are you a loan recipient?"
                                            name="r_u_a_loan_recipient"
                                            value={get_value('r_u_a_loan_recipient')}
                                            values={[
                                                { text: '--select--', value: '' },
                                                { text: 'YES', value: 'yes' },
                                                { text: 'NO', value: 'no' },
                                            ]}
                                        />
                                    </div>
                                    <div className="form_auto_fit">
                                        {[
                                            {
                                                name: 'payment_date',
                                                placeholder: 'Select date',
                                                type: 'date',
                                                label: 'Payment Date',
                                            },
                                            {
                                                name: 'total_share',
                                                placeholder: 'Total Share',
                                                type: 'text',
                                                label: 'Total Share',
                                            },
                                            {
                                                name: 'have_to_pay_amount',
                                                placeholder: 'Have to pay amount',
                                                type: 'text',
                                                label: 'Have to pay amount',
                                                callback: function (e, value) {
                                                    let el = document.querySelector('#have_to_pay_amount_text') as HTMLInputElement | null;
                                                    if (el) {
                                                        el.value = (window as any).convertAmount(value).en + ` taka only`;
                                                    }
                                                }
                                            },
                                            {
                                                name: 'have_to_pay_amount_text',
                                                placeholder: 'Have to pay amount in text',
                                                type: 'text',
                                                label: 'Have to pay amount in text',
                                            },
                                            {
                                                name: 'witness_name_1',
                                                placeholder:
                                                    "Enter witness's name (1st)",
                                                type: 'text',
                                                label: "Witness's Name (1st)",
                                            },
                                            {
                                                name: 'witness_mobile_number_1',
                                                placeholder:
                                                    "Enter witness's mobile number (1st)",
                                                type: 'tel',
                                                label: "Witness's Mobile Number (1st)",
                                            },
                                            {
                                                name: 'witness_address_1',
                                                placeholder:
                                                    "Enter witness's address (1st)",
                                                type: 'text',
                                                label: "Witness's Address (1st)",
                                            },
                                            {
                                                name: 'witness_name_2',
                                                placeholder:
                                                    "Enter witness's name (2nd)",
                                                type: 'text',
                                                label: "Witness's Name (2nd)",
                                            },
                                            {
                                                name: 'witness_mobile_number_2',
                                                placeholder:
                                                    "Enter witness's mobile number (2nd)",
                                                type: 'tel',
                                                label: "Witness's Mobile Number (2nd)",
                                            },
                                            {
                                                name: 'witness_address_2',
                                                placeholder:
                                                    "Enter witness's address (2nd)",
                                                type: 'text',
                                                label: "Witness's Address (2nd)",
                                                readonly: false,
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
                                                    value={get_value(field.name)}
                                                    callback={field.callback}
                                                    readonly={field.readonly}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                {/* Office Space Requirements Only  */}
                                <div>
                                    <h5 className="mb-4">
                                        Office Space Requirements Only
                                    </h5>
                                    <div className="form_auto_fit">
                                        {[
                                            {
                                                name: 'office_only_booking_others',
                                                placeholder: 'Others',
                                                type: 'text',
                                                label: 'Others',
                                            },
                                            {
                                                name: 'office_only_money_receipt_no',
                                                placeholder:
                                                    'Enter money receipt no.',
                                                type: 'text',
                                                label: 'Money Receipt No.',
                                                readonly: true,
                                            },
                                            {
                                                name: 'office_only_booking_chart_making',
                                                placeholder:
                                                    'Enter booking chart making',
                                                type: 'text',
                                                label: 'Booking Chart Making',
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
                                                    value={get_value(field.name)}
                                                    readonly={field.readonly}
                                                />
                                            </div>
                                        ))}
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
                    )}
                    <Footer>
                        <li>
                            <a className="outline btn-outline-warning"
                                target="_blank"
                                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                                    e.preventDefault();
                                    localStorage.setItem('booking', JSON.stringify(state.item))
                                    window.open(e.currentTarget.href, '_blank')
                                }}
                                href={"/print-invoice?" + state.item.id}>
                                <span className="material-symbols-outlined fill">print</span>
                                <div className="text">Print</div>
                            </a>
                        </li>

                    </Footer>
                </div>
            </div>
        </>
    );
};

export default Create;
