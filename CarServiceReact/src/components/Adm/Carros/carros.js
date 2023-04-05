import React, { useEffect, useState } from "react";
import axios from "axios";
import './carros.css';
import ModalEditCar from "../Modal/modal";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

export default function Carros() {
    const [page, setPage] = useState(1)
    const [resultCar, setResultCar] = useState([])
    const [editModal, setEditModal] = useState(false)
    const [newCarModal, setNewCarModal] = useState(false)
    const [selectedID, setSelectedID] = useState(null)
    const [selectedIndex, setIndexEdit] = useState(null)
    const [searchCar, setSearchCar] = useState('')

    const [modelo, setModelo] = useState('')
    const [fabricante, setFabricante] = useState('')
    const [ano, setAno] = useState('')
    const [preco, setPreco] = useState('')

    const CloseModal = () => { setEditModal(false); setModelo(''); setFabricante(''); setAno(''); setPreco('') };
    const CloseModalNew = () => { setNewCarModal(false); setModelo(''); setFabricante(''); setAno(''); setPreco('') };

    function getCars() {
        try {
            axios.get(`http://localhost:8000/api/adm/cars/${page}`)
                .then(response => {
                    setResultCar(response.data);
                });
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getCars()
    }, [page])

    async function DelCar(carIndex) {
        const newCars = { ...resultCar, data: resultCar.data.filter(obj => obj.ID !== carIndex) };
        setResultCar(newCars)
        try {
            axios.delete(`http://localhost:8000/api/adm/cars/${carIndex}`);
        } catch (error) {
            console.error(error);
        }
    }

    function EditCar(carIndex, carID) {
        setIndexEdit(carIndex)
        setSelectedID(carID)
        setEditModal(true)
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

    function formatCurrency(value) {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    async function SearchModel(model) {
        setSearchCar(model.target.value);
        if (model.target.value.length >= 2) {
            try {
                await axios.get(`http://localhost:8000/api/search/${model.target.value}`)
                    .then(response => {
                        if (response.data.length !== 0) {
                            setResultCar({ data: response.data });
                        }
                    });
            } catch (error) {
                console.error(error);
            }
        } if (model.target.value.length === 0) {
            getCars()
        }
    }

    async function UpdateCar(id) {
        const updated = {modelo: modelo, fabricante: fabricante, ano: ano, preco: preco};
        try {
            await axios.put(`http://localhost:8000/api/adm/cars/${id}`, {update: updated})
                .then(response => {
                    setEditModal(false);
                    alert('REGISTRO ATUALIZADO !');
                });
        } catch (error) {
            console.error(error);
        }
    }

    async function AddCar() {
        const newCar = {modelo: modelo, fabricante: fabricante, ano: ano, preco: preco};
        try {
            await axios.post(`http://localhost:8000/api/adm/cars`, {dataNew: newCar})
                .then(response => {
                    CloseModalNew()
                    alert('VEÍCULO CADASTRADO !');
                });
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="content">
            <header className='header'>
                <p className='txt_header'>Car Service</p>
            </header>

            <div className="Model2" style={{ display: 'flex', alignItems: "center" }}>
                <input className="inputModel" type="text" value={searchCar} onChange={SearchModel} placeholder="Pesquise por fabricante/modelo..." />
                <button className="btnAddCar" onClick={() => setNewCarModal(true)}>CADASTRAR</button>
            </div>

            <div>
                {resultCar == 0 ?
                    <p>VAZIO</p>
                    :
                    resultCar['data'].map((carro, index) => {
                        return (
                            <div key={carro.ID} className="carrosPainel">
                                <p className="lineCarPainel">{carro.MODELO}</p>
                                <p className="lineCarPainel">{carro.FABRICANTE}</p>
                                <p className="lineCarPainel">{carro.ANO}</p>
                                <p className="lineCarPainel">{formatCurrency(parseFloat(carro.PRECO))}</p>
                                <span onClick={() => EditCar(index, carro.ID)}><AiOutlineEdit color="#000" size={25} className="icoActionCar" /></span>
                                <span onClick={() => DelCar(carro.ID)}><AiOutlineDelete color="#000" size={25} className="icoActionCar" /></span>
                            </div>
                        )
                    })
                }

                {resultCar['prev_page_url'] !== null &&
                    <AiOutlineArrowLeft color="#000" size={30} className="icoPage" onClick={() => controlPagination('prev')} />
                }

                {resultCar['next_page_url'] !== null &&
                    <AiOutlineArrowRight color="#000" size={30} className="icoPage" onClick={() => controlPagination('next')} />
                }

                {editModal && (
                    <ModalEditCar onClose={CloseModal}>
                        <input type="text" className="editCarInp" placeholder={resultCar.data[selectedIndex].MODELO} onChange={(e) => setModelo(e.target.value)} value={modelo} />
                        <input type="text" className="editCarInp" placeholder={resultCar.data[selectedIndex].FABRICANTE} onChange={(e) => setFabricante(e.target.value)} value={fabricante} />
                        <input type="text" className="editCarInp" placeholder={resultCar.data[selectedIndex].ANO} onChange={(e) => setAno(e.target.value)} value={ano} />
                        <input type="text" className="editCarInp" placeholder={resultCar.data[selectedIndex].PRECO} onChange={(e) => setPreco(e.target.value)} value={preco} />
                        <button className="btnSaveEdit" onClick={() => UpdateCar(selectedID)}>SALVAR</button>
                    </ModalEditCar>
                )}

                {newCarModal && (
                    <ModalEditCar onClose={CloseModalNew}>
                        <input type="text" className="editCarInp" placeholder="Modelo" onChange={(e) => setModelo(e.target.value)} value={modelo} />
                        <input type="text" className="editCarInp" placeholder="Fabricante" onChange={(e) => setFabricante(e.target.value)} value={fabricante} />
                        <input type="text" className="editCarInp" placeholder="Ano" onChange={(e) => setAno(e.target.value)} value={ano} />
                        <input type="text" className="editCarInp" placeholder="Preço" onChange={(e) => setPreco(e.target.value)} value={preco} />
                        <button className="btnSaveEdit" onClick={() => AddCar()} >SALVAR</button>
                    </ModalEditCar>
                )}

            </div>
        </div>
    )
}