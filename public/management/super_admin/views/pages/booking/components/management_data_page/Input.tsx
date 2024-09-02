import React from 'react';
import { anyObject } from '../../../../../common_types/object';
import InputImage from './InputImage';
export interface Props {
    label?: string;
    name: string;
    placeholder?: string;
    type?: string;
    value?: string;
}

const Input: React.FC<Props> = ({
    label,
    name,
    placeholder,
    type,
    value,
}: Props) => {
    function convertToValidNumber(input) {
        try {
            const extractedNumber = input.match(/-?\d+(\.\d+)?/g);
            return extractedNumber ? parseFloat(extractedNumber.join('')) : '';
        } catch (error) {
            // console.error(error);
            return 0;
        }
    }

    function format_value(type, value) {
        if (type == 'date') {
            try {
                return new Date(value).toISOString().substring(0, 10)
            } catch (error) {
                // console.error(error);
                return new Date().toISOString().substring(0, 10)
            }
        }
        else if (type == 'number') {
            return convertToValidNumber(value);
        }
        else {
            return value;
        }
    }
    return (
        <>
            {
                type != 'file' && (
                    <div>
                        <label htmlFor={name}>
                            {label ? label : name.replaceAll('_', ' ')}
                        </label>
                        <div className="form_elements">
                            <input
                                type={type ? type : 'text'}
                                placeholder={
                                    placeholder ? placeholder : name.replaceAll('_', ' ')
                                }
                                name={name}
                                id={name}
                                defaultValue={format_value(type, value)}
                            />
                        </div>
                    </div>
                )
            }
            {
                type == 'file' &&
                (
                    <InputImage
                        name={name}
                        label={label ? label : name.replaceAll('_', ' ')}
                        preview_url={value}
                    />
                )
            }
        </>
    );
};

export default Input;
