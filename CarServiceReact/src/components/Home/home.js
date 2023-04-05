import React, { useState } from 'react'
import Lottie from 'lottie-react';
import animationCar from '../../lottie/car.json';
import axios from 'axios';

import './home.css'
import ModalCar from './Modal/modalCar'
import ModalDefect from './Modal/modalDefect';
import { Link } from 'react-router-dom';

function Home() {
    const [txtModel, setTxtModel] = useState('');

    const [resultCar, setResultCar] = useState([]);
    const [resultDefect, setResultDefect] = useState([]);

    const [showModalCar, setShowModalCar] = useState(false);
    const [showModalDefect, setShowModalDefect] = useState(false);

    const handleOpenModalCar = () => setShowModalCar(true);
    const handleCloseModalCar = () => setShowModalCar(false);
    const handleCloseModalDefect = () => { setShowModalDefect(false); setShowModalCar(true) };

    async function SearchModel(model) {
        setTxtModel(model.target.value);
        if (model.target.value.length >= 2) {
            try {
                const response = await axios.get(`http://localhost:8000/api/search/${model.target.value}`);
                setResultCar(response.data);
            } catch (error) {
                console.error(error);
            }
        }
    }

    async function ManageDefect(model) {
        setShowModalDefect(true); setShowModalCar(false);
        try {
            const response = await axios.get(`http://localhost:8000/api/defect/${model}`);
            setResultDefect(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    function formatCurrency(value) {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    return (
        <div className="content">
            <header className='header'>
                <p className='txt_header'>Car Service</p>
                <Link className='loginADM' to='/adm/painel'>LOGIN</Link>
            </header>

            <p className='txt_welcome'>Reparação automóvel à sua porta</p>

            <button className='btnSelectCar' onClick={handleOpenModalCar}>Selecione um veículo</button>

            <div className='LottieCar'>
                <Lottie animationData={animationCar} loop={true} autoplay={true} style={{ width: 500 }} />
            </div>

            {showModalCar && (
                <ModalCar onClose={handleCloseModalCar}>
                    <input type='text' value={txtModel} onChange={SearchModel} placeholder='Modelo do veículo...' className='inputModel' />
                    {resultCar !== ''
                        ?
                        resultCar.map((carro) => {
                            return (
                                <div key={carro.ID} onClick={() => ManageDefect(carro.ID)} className='optionCar'>
                                    <p>{carro.FABRICANTE}</p>
                                    <p ><b>{carro.MODELO}</b></p>
                                    <p>{carro.ANO}</p>
                                    <p>{formatCurrency(parseFloat(carro.PRECO))}</p>
                                </div>
                            );
                        })
                        :
                        <p>NÃO ENCONTRAMOS ESSE VEÍCULO</p>
                    }
                </ModalCar>
            )}

            {showModalDefect && (
                <ModalDefect onClose={handleCloseModalDefect}>
                    <p className='txtDefect'>Aqui estão todos os defeitos desse veículo</p>
                    {resultDefect.length > 0
                        ?
                        resultDefect.map((defect) => {
                            return (
                                <div key={defect.ID}>
                                    <p><b>{defect.DESCRICAO_DEFEITO}</b></p>
                                </div>
                            )
                        })
                        :
                        <p>Esse veículo não possui defeitos</p>
                    }
                </ModalDefect>
            )}
        </div>
    );
};

export default Home;