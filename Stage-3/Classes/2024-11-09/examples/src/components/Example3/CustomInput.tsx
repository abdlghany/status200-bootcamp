import {ChangeEvent} from 'react'

interface InputProps {
    placeholder: string;
    value: any;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type: string
}

const CustomInput= ({ placeholder, value, onChange, type }: InputProps)=> {
    return(
        <>
            <input type={type} value={value} className="ms-3 d-inline input-group-text" 
                    placeholder={placeholder} onChange={onChange} />
        </>
    )
}

export default CustomInput;