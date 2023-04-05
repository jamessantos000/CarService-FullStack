import Lottie from "lottie-react";
import React from "react";
import carPanel from '../../../lottie/car-panel.json';
import defectPanel from '../../../lottie/defect-panel.json';
import './painel.css';
import { Link } from "react-router-dom";

export default function Painel() {
    return (
        <div className="content">
            <header className='header'>
                <p className='txt_header'>Car Service</p>
            </header>

            <p className='txt_welcome'>Qual painel deseja acessar ?</p>

            <div className="panelSelect">
                <div>
                    <span className="txtPanel">Carros</span>
                    <Link to='/adm/carros'><Lottie className="panelOpt" animationData={carPanel} autoplay={false} style={{ width: 300, height: 300 }} /></Link>
                </div>
                <div>
                    <span className="txtPanel">Defeitos</span>
                    <Link to='/adm/defeitos'><Lottie className="panelOpt" animationData={defectPanel} autoplay={false} style={{ width: 300, height: 300 }} /></Link>
                </div>
            </div>
        </div>
    )
}