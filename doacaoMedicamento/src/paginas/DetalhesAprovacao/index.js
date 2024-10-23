import React from 'react';
import './detalhesAprovacao.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import api from '../../services/api';
import { toast } from 'react-toastify';
import { AiOutlineWarning } from 'react-icons/ai';
import { BsArrowLeftCircleFill } from 'react-icons/bs';

export default function DetalhesAprovacao() {
    const location = useLocation();
    const [loadingAuth1, setLoadingAuth1] = useState(false);
    const [loadingAuth2, setLoadingAuth2] = useState(false);
    const [observacao, setObservacao] = useState('')
    const [errors, setErrors] = useState({});
    const navigate = useNavigate()

    const { item } = location.state || {};

    const validateFields = () => {
        let isValid = true;
        const newErrors = {};

        if (!observacao) {
            isValid = false;
            newErrors.observacao = 'Observação é obrigatório.';
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleAction = (value) => {
        try {
            if (!validateFields())
                return;

            if (value === 1)
                setLoadingAuth1(true)
            else if (value === 3)
                setLoadingAuth2(true)

            api.post('Produto/ApRpDoacao', { statusCodigo: value, observacao: observacao, produtoDoadoCodigo: item.codigo })
                .then((response) => {
                    console.log(response)
                    if (response.data && response.status === 200) {
                        navigate('/administrativo/aprovar')
                        toast.success(response.data)
                        return;
                    } else if (response.data && response.status === 400) {
                        navigate('/administrativo/aprovar')
                        toast.warn(response.data)
                        return;
                    }
                })
            if (value === 1)
                setLoadingAuth1(false)
            else if (value === 3)
                setLoadingAuth2(false)
        } catch (error) {
            setLoadingAuth1(false)
            setLoadingAuth2(false)
        }
    };

    return (
        <div className="de-container">
            <main className="de-main">
                <h2 className="de-section-title">Informações da Doação</h2>
                <div className="de-form-grid">
                    <div className="de-form-group">
                        <label className="de-label" htmlFor="nome-produto">Nome do Produto:</label>
                        <input className="de-input" type="text" id="nome-produto" value={item.nomeDoItem} readOnly />
                    </div>
                    <div className="de-form-group">
                        <label className="de-label" htmlFor="tipo-item">Tipo de Item:</label>
                        <input className="de-input" type="text" id="tipo-item" value={item.tipoProdutoDescricao} readOnly />
                    </div>
                    <div className="de-form-group">
                        <label className="de-label" htmlFor="uso-controlado">Pd/Ad</label>
                        <input className="de-input" type="text" id="uso-controlado" value={item.tipoCondicaoDescricao} readOnly />
                    </div>
                    <div className="de-form-group">
                        <label className="de-label" htmlFor="lacrado">Necessidade de armazenamento:</label>
                        <input className="de-input" type="text" id="lacrado" value={item.tipoNecessidadeArmazenamentoDescricao} readOnly />
                    </div>
                    <div className="de-form-group">
                        <label className="de-label" htmlFor="forma-farmaceutica">Forma farmacêutica:</label>
                        <input className="de-input" type="text" id="forma-farmaceutica" value={item.formaFarmaceuticaDescricao} readOnly />
                    </div>
                    <div className="de-form-group">
                        <label className="de-label" htmlFor="quantidade">Quantidade Disponível:</label>
                        <input className="de-input" type="text" id="quantidade" value={item.quantidade} readOnly />
                    </div>
                    <div className="de-form-group">
                        <label className="de-label" htmlFor="concentracao">Concentração do medicamento:</label>
                        <input className="de-input" type="text" id="concentracao" value={item.dosagemEscrita} readOnly />
                    </div>
                    <div className="de-form-group">
                        <label className="de-label" htmlFor="validade">Prazo de Validade:</label>
                        <input className="de-input" type="text" id="validade" value={item.validadeEscrita} readOnly />
                    </div>
                </div>
                <div className="de-descricao-detalhada">
                    <div className="de-descricao-box">
                        <h3 className="de-descricao-title">Descrição Detalhada</h3>
                        <p className="de-descricao-content">
                            {item.descricaoDetalhada}
                        </p>
                    </div>
                </div>
                {item.codigoStatus === 2 &&
                    <div className="de-descricao-detalhada">
                        <div className="de-descricao-box">
                            <h3 className="de-descricao-title">Observação (obrigatório para aprovar ou reprovar):</h3>
                            <p className="de-descricao-content">
                                <textarea
                                    className="de-textarea"
                                    id="observacao"
                                    value={observacao}
                                    onChange={(e) => setObservacao(e.target.value)}
                                    placeholder="Digite sua observação aqui..."
                                ></textarea>
                                {errors.observacao && (
                                    <span className="error-message">
                                        <AiOutlineWarning className="error-icon" /> {errors.observacao}
                                    </span>
                                )}
                            </p>
                        </div>
                    </div>}
                <div className="de-photos">
                    <h3 className="de-photos-title">Fotos do Item:</h3>
                    <div className="de-photo-container">
                        {item.urlImages.map((item, index) => (
                            <img className="de-photo" src={item} alt={index} />
                        ))}
                    </div>
                </div>
                <footer style={{ justifyContent: 'flex-end', marginTop: '3%', marginBottom: '0px' }}>

                </footer>
                {item.codigoStatus === 2 ?
                    <div className="de-action-buttons">
                        <div style={{ justifyContent: 'space-between', marginRight: '70%' }}>
                            <button className='medicine-photo-upload-button-voltar' onClick={() => navigate(-1)}><BsArrowLeftCircleFill /> Voltar</button>
                        </div>
                        <button className="de-button de-approve-button" onClick={() => handleAction(1)}>{loadingAuth1 ? <div className="spinner-border-sm spinner-border" role="status"></div> : "Aprovar"}</button>
                        <button className="de-button de-reject-button" onClick={() => handleAction(3)}>{loadingAuth2 ? <div className="spinner-border-sm spinner-border" role="status"></div> : "Reprovar"}</button>
                    </div> :
                    item.codigoStatus === 1 ?
                        <>
                            <div style={{ justifyContent: 'space-between', marginRight: '70%' }}>
                                <button className='medicine-photo-upload-button-voltar' onClick={() => navigate(-1)}><BsArrowLeftCircleFill /> Voltar</button>
                            </div>
                            <div className="de-action-buttons"><button className="btn btn-customEditar">APROVADO</button></div>
                        </> :
                        item.codigoStatus === 3 ?
                            <>
                                <div style={{ justifyContent: 'space-between', marginRight: '70%' }}>
                                    <button className='medicine-photo-upload-button-voltar' onClick={() => navigate(-1)}><BsArrowLeftCircleFill /> Voltar</button>
                                </div>
                                <div className="de-action-buttons"><button className="btn btn-danger">REPROVADO</button></div>
                            </> : 
                            <></>
                }
            </main>
        </div>
    );
}