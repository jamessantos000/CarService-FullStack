import React from "react";
import './modal.css';

const ModalEditCar = ({ onClose, children }) => {
    return (
        <div className='modal'>
            <div className='modalContentADMEdit'>
                <span className='closeModalADMEdit' onClick={onClose}>&times;</span>
                {children}
            </div>
        </div>
    );
};

export default ModalEditCar;