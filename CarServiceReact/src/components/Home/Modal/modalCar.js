import React from "react";
import './modalCar.css';

const ModalCar = ({ onClose, children }) => {
    return (
        <div className='modal'>
            <div className='modalContent'>
                <span className='closeModal' onClick={onClose}>&times;</span>
                {children}
            </div>
        </div>
    );
};

export default ModalCar;