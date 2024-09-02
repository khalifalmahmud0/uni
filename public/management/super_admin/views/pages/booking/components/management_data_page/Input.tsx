import React from 'react';
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
    return (
        <>
            <label htmlFor={name}>
                {label ? label : name.replaceAll('_', ' ')}
            </label>
            <div className="form_elements">
                {
                    type != 'file' &&
                    (<input
                        type={type ? type : 'text'}
                        placeholder={
                            placeholder ? placeholder : name.replaceAll('_', ' ')
                        }
                        name={name}
                        id={name}
                        defaultValue={value}
                    />)
                }
                {
                    type == 'file' &&
                    (<input
                        type='file'
                        name={name}
                        id={name}
                    />)
                }
            </div>
        </>
    );
};

export default Input;
