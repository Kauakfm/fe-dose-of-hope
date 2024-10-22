import React, { useEffect, useState } from "react";
import Table2 from "../../../componentes/Table2";
import api from "../../../services/api";
import Header from "../../../componentes/Header";
import { formatarData } from "../../../utils/utils";
import Columns from "../../../componentes/Table2/Columns";
import './aprovar.css';
import Logo from '../../../imagens/doselogo2.png'

export default function Aprovar() {
    const [data, setData] = useState([]);
    const [visibleColumns, setVisibleColumns] = useState(["nomeUsuario", "tipoProdutoDescricao", "nome", "validade"]);
    const [isModalVisible, setIsModalVisible] = useState(false); // Estado para controlar a visibilidade do modal
    const [selectedItem, setSelectedItem] = useState(null); // Estado para armazenar o item selecionado

    useEffect(() => {
        const handleObterDoacoes = async () => {
            try {
                const response = await api.get('Produto');
                if (response.status === 200) {
                    const json = response.data.produtos;
                    console.log(json);
                    setData(json.map(e => ({
                        ...e,
                        validade: formatarData(e.validade)
                    })));
                }
            } catch (error) {
                console.error("Erro ao obter doações:", error);
            }
        };

        handleObterDoacoes();
    }, []);

    const handleEdit = (item) => {
        console.log("Edit", item.codigo);
        setSelectedItem(item);
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    const handleAction = () => {
        console.log("Aprovar/Reprovar:", selectedItem);
        handleCloseModal();
    };

    const actionButtons = [
        { label: "Aprovar", action: handleEdit, className: "btn btn-customEditar" },
    ];

    return (
        <div className="body-administrativo">
            <main>
                <div className="table-container">
                    <Table2 botoesDeAcao={actionButtons} dados={data} colunasVisiveis={visibleColumns} numeroDePagina={20}>
                        <Columns header={"nomeUsuario"} title={"Nome usuário"} />
                        <Columns header={"tipoProdutoDescricao"} title={"Tipo produto descrição"} />
                        <Columns header={"nome"} title={"Nome remédio"} />
                        <Columns header={"validade"} title={"Validade"} />
                    </Table2>
                </div>

                {isModalVisible && (
                    <div className="modal-incricao-presencial modal fade show" style={{ display: 'block' }} id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content" style={{ backgroundColor: 'transparent', padding: '20px', marginTop: '-20%', border: 'none'}}>
                                <div className="modal-body">
                                    <img className="logo3" src={Logo} alt="LogoDose" style={{ width: '50%', marginBottom: '10%' }} />
                                    <h5 style={{ textAlign: "center" }}>Preencha os campos para aprovar/reprovar!</h5>
                                    <form style={{ display: "flex", flexDirection: "column", width: "20vw" }}>
                                        <div className="mb-7" style={{ display: "flex", flexDirection: "column", width: "20vw", alignItems: "start" }}>
                                            <label className="col-form-label">Aprovar / Reprovar:</label>
                                            <select className="form-control">
                                                <option value="0">Nenhuma opção selecionada</option>
                                                <option value="1">Aprovar</option>
                                                <option value="3">Reprovar</option>
                                            </select>
                                        </div>
                                        <div className="mb-7" style={{ display: "flex", flexDirection: "column", width: "20vw", alignItems: "start" }}>
                                            <label className="col-form-label">Observação:</label>
                                            <input type="text" className="form-control" />
                                        </div>
                                    </form>
                                    <div style={{ marginTop: "20px" }}>
                                        <button type="button" className="btn btn-danger" onClick={handleCloseModal} style={{ marginRight: "8px" }}>Sair</button>
                                        <button type="button" className="btn btn-success" onClick={handleAction} style={{ marginLeft: "8px" }}>Acionar</button>
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
