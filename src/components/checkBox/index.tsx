import React, { ChangeEvent } from 'react';
import Icon from 'components/icon';

interface ICheckBox {
    id: string;
    label: string;
    isChecked: boolean;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const CheckBox: React.FC<ICheckBox> = ({ id, label, isChecked, onChange }) => {
    return (
        <div className="checkbox-container">
            <input className="inp-cbx " id={id} type="checkbox" checked={isChecked} onChange={onChange} />
            <label className="cbx flex xl:gap-[0.4vw] lg:gap-[0.6vw] md:gap-[1vw] sm:gap-[1.4vw] gap-[2vw] items-center" htmlFor={id}>
                <span className="all-center">
                    <Icon size={14} icon="checkmark" color="#fff" />
                </span>
                <span className="xl:text-[0.8vw] lg:text-[1.4vw] md:text-[1.6vw] text-[2vw]">{label}</span>
            </label>
        </div>
    );
};

export default CheckBox;
