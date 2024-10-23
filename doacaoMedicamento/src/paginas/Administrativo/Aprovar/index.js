import React, { useEffect, useState } from "react";
import Table2 from "../../../componentes/Table2";
import api from "../../../services/api";
import { formatDate } from "../../../utils/utils";
import Columns from "../../../componentes/Table2/Columns";
import './aprovar.css';
import Logo from '../../../imagens/doselogo2.png'
import { toast } from "react-toastify";
import { AiOutlineWarning } from 'react-icons/ai';
import { useNavigate } from "react-router-dom";


export default function Aprovar() {
    const [data, setData] = useState([]);
    const [visibleColumns, setVisibleColumns] = useState(["nomeUsuario", "tipoProdutoDescricao", "nome", "validade"]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [approveOrFail, setApproveOrFail] = useState(0)
    const [observacao, setObservacao] = useState('')
    const [errors, setErrors] = useState({});
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loadingAuthTelaInteira, setloadingAuthTelaInteira] = useState(false);
    const navigate = useNavigate()


    const handleObterDoacoes = async () => {
        try {
            setloadingAuthTelaInteira(true)
            const response = await api.get('Produto');
            if (response.status === 200) {
                const json = response.data.produtos;
                console.log(json);
                setData(json.map(e => ({
                    ...e,
                    validade: formatDate(e.validade)
                })));
            }
        } catch (error) {
            console.error("Erro ao obter doações:", error);
        }
        finally {
            setloadingAuthTelaInteira(false)
        }
    };

    useEffect(() => {
        handleObterDoacoes();
    }, []);

    const handleEdit = (item) => {
        console.log(item)
        setSelectedItem(item);
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
        setErrors({})
        setApproveOrFail(0)
        setObservacao('')
    };

    const validateFields = () => {
        let isValid = true;
        const newErrors = {};
        console.log(approveOrFail)
        if (approveOrFail === 0) {
            isValid = false;
            newErrors.approve = 'Selecione uma opção';
        }
        if (!observacao) {
            isValid = false;
            newErrors.observacao = 'Observação é obrigatório.';
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleAction = () => {
        try {
            setLoadingAuth(true)

            if (!validateFields())
                return;

            api.post('Produto/ApRpDoacao', { statusCodigo: approveOrFail, observacao: observacao, produtoDoadoCodigo: selectedItem.codigo })
                .then((response) => {
                    console.log(response)
                    if (response.data && response.status === 200) {
                        toast.success(response.data)
                        handleCloseModal();
                        handleObterDoacoes()
                        return;
                    } else if (response.data && response.status === 400) {
                        toast.warn(response.data)
                        handleCloseModal();
                        handleObterDoacoes()
                        return;
                    }
                })
            setLoadingAuth(false)
        } catch (error) {
            handleCloseModal();
            handleObterDoacoes()
            setLoadingAuth(false)
        }
    };

    const actionButtons = [
        {
            label: (item) => item.codigoStatus === 1 ? "VER INFORMAÇÕES" : item.codigoStatus === 2 ? "VER INFORMAÇÕES" : item.codigoStatus === 3 ? "VER INFORMAÇÕES" : "Erro contate o administrador",
            action: (item) => {
                if (item.codigoStatus === 1 || item.codigoStatus === 2 || item.codigoStatus === 3)
                    navigate('/administrativo/detalhesAprovar', { state: { item } });
            },
            className: (item) => item.codigoStatus === 1 ? "btn btn-customEditar" : item.codigoStatus === 2 ? "btn btn-warning" : item.codigoStatus === 3 ? "btn btn-danger" : "btn btn-dark"
        }
    ];

    return (
        <div className="body-administrativo">
            <main>
                {loadingAuthTelaInteira ?
                    <div className="d-flex justify-content-center align-items-center vh-100">
                        <div className="spinner-grow" role="status" style={{ color: '#8257E5' }}></div>
                    </div>
                    :
                    <div className="table-container">
                        <Table2 botoesDeAcao={actionButtons} dados={data} colunasVisiveis={visibleColumns} numeroDePagina={20}>
                            <Columns header={"nomeDoItem"} title={"Nome Do Produto"} />
                            <Columns header={"tipoProdutoDescricao"} title={"Tipo Produto"} />
                            <Columns header={"quantidade"} title={"Quantidade"} />
                            <Columns header={"validadeEscrita"} title={"Validade"} />
                        </Table2>
                    </div>
                }

                {isModalVisible && (
                    <div className="modal-incricao-presencial modal fade show" style={{ display: 'block' }} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel">
                        <div className="modal-dialog">
                            <div className="modal-content" style={{ backgroundColor: 'transparent', padding: '20px', marginTop: '-20%', border: 'none' }}>
                                <div className="modal-body">
                                    <img className="logo3" src={Logo} alt="LogoDose" style={{ width: '50%', marginBottom: '10%' }} />
                                    <h5 style={{ textAlign: "center" }}>Preencha os campos para aprovar/reprovar!</h5>
                                    <form style={{ display: "flex", flexDirection: "column", width: "20vw" }}>
                                        <div className="mb-7" style={{ display: "flex", flexDirection: "column", width: "20vw", alignItems: "start" }}>
                                            <label className="col-form-label">Aprovar / Reprovar:</label>
                                            <select className="form-control" value={approveOrFail} onChange={(e) => setApproveOrFail(e.target.value)}>
                                                <option value="0">Nenhuma opção selecionada</option>
                                                <option value="1">Aprovar</option>
                                                <option value="3">Reprovar</option>
                                            </select>
                                            {errors.approve && (
                                                <span className="error-message">
                                                    <AiOutlineWarning className="error-icon" /> {errors.approve}
                                                </span>
                                            )}
                                        </div>
                                        <div className="mb-7" style={{ display: "flex", flexDirection: "column", width: "20vw", alignItems: "start" }}>
                                            <label className="col-form-label">Observação:</label>
                                            <input type="text" className="form-control" value={observacao} onChange={(e) => setObservacao(e.target.value)} />
                                            {errors.observacao && (
                                                <span className="error-message">
                                                    <AiOutlineWarning className="error-icon" /> {errors.observacao}
                                                </span>
                                            )}
                                        </div>
                                    </form>
                                    <div style={{ marginTop: "20px" }}>
                                        <button type="button" className="btn btn-danger" onClick={handleCloseModal} style={{ marginRight: "8px" }}>Sair</button>
                                        <button type="button" className="btn btn-success" onClick={handleAction} style={{ marginLeft: "8px" }}>
                                            {loadingAuth ? <div className="spinner-border-sm spinner-border" role="status"></div> : 'Alterar'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
