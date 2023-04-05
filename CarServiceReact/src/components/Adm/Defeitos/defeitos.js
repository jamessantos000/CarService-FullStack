import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from 'react-select';
import './defeitos.css';
import ModalEditDefect from "../Modal/modalDef";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

export default function Defeitos() {
    const [page, setPage] = useState(1)
    const [ResultDef, setResultDef] = useState([])
    const [txtSearchDef, setTxtSearchDef] = useState('')
    const [showNewDefMod, setShowNewDefMod] = useState(false)

    const [optionsCar, setOptionsCar] = useState([])
    const [carSelected, setCarSelected] = useState(null)
    const [txtDefeito, setTxtDefeito] = useState('')

    function getDef() {
        try {
            axios.get(`http://localhost:8000/api/adm/defect/${page}`)
                .then(response => {
                    setResultDef(response.data);
                });
            axios.get(`http://localhost:8000/api/adm/busca/cars/unique`)
                .then(response => {
                    setOptionsCar(response.data);
                });
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getDef()
    }, [page])

    const ChangeCloseNewModel = () => setShowNewDefMod(false)

    function toggleDropdown(optinSelected) {
        setCarSelected(optinSelected)
    }

    async function SearchDef(def) {
        setTxtSearchDef(def.target.value);
        if (def.target.value.length >= 2) {
            try {
                await axios.get(`http://localhost:8000/api/adm/defect/search/${def.target.value}`)
                    .then(response => {
                        if (response.data.length !== 0) {
                            setResultDef({ data: response.data });
                        } else {
                            console.log(response.data);
                        }
                    });
            } catch (error) {
                console.error(error);
            }
        } if (def.target.value.length === 0) {
            getDef()
        }
    }

    function controlPagination(ctrPage) {
        switch (ctrPage) {
            case 'prev':
                setPage(page - 1)
                break;
            case 'next':
                setPage(page + 1)
                break;
            default:
                setPage(1)
        }
    }

    async function DelDef(DefIndex, DefID) {
        const newDefs = { ...ResultDef, data: ResultDef.data.filter((obj, index) => index !== DefIndex) }
        setResultDef(newDefs)
        try {
            axios.delete(`http://localhost:8000/api/adm/def/del/${DefID}`);
        } catch (error) {
            console.error(error);
        }
    }

    async function CadNewDef() {
        const newDef = { carro: carSelected.value, defeito: txtDefeito }
        try {
            axios.post(`http://localhost:8000/api/adm/new/def`, { dataNew: newDef })
                .then(response => {
                    ChangeCloseNewModel()
                    alert('DEFEITO CADASTRADO !');
                });
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="content">
            <header className='header'>
                <p className='txt_header'>Car Service</p>
            </header>

            <div className="Model2" style={{ display: 'flex', alignItems: "center" }}>
                <input className="inputModel" type="text" value={txtSearchDef} onChange={SearchDef} placeholder="Pesquise por defeito fabricante/modelo..." />
                <button className="btnAddCar" onClick={() => setShowNewDefMod(true)} >CADASTRAR</button>
            </div>

            {showNewDefMod && (
                <ModalEditDefect onClose={ChangeCloseNewModel}>
                    <Select
                        options={optionsCar}
                        onChange={toggleDropdown}
                        placeholder='Selecione um veículo' />
                    <input type="text" className="inputModel inp2" placeholder="Descreva o defeito..." value={txtDefeito} onChange={(e) => setTxtDefeito(e.target.value)} />
                    <button className="btnAddCar inp2" onClick={() => CadNewDef()}>SALVAR</button>
                </ModalEditDefect>
            )}

            {ResultDef == 0 ?
                <p>VAZIO</p>
                :
                ResultDef['data'].map((problema, index) => {
                    return (
                        <div key={index} className="carrosPainel">
                            <p className="lineCarPainel">{problema.MODELO}</p>
                            <p className="lineCarPainel">{problema.DESCRICAO_DEFEITO}</p>
                            <span><AiOutlineEdit color="#000" size={25} className="icoActionCar" /></span>
                            <span onClick={() => DelDef(index, problema.ID)}><AiOutlineDelete color="#000" size={25} className="icoActionCar" /></span>
                        </div>
                    )
                })
            }

            {ResultDef['prev_page_url'] !== null &&
                <AiOutlineArrowLeft color="#000" size={30} className="icoPage" onClick={() => controlPagination('prev')} />
            }

            {ResultDef['next_page_url'] !== null &&
                <AiOutlineArrowRight color="#000" size={30} className="icoPage" onClick={() => controlPagination('next')} />
            }

        </div>
    )
}