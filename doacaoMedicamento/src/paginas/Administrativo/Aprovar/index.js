import React, { useEffect, useState } from "react";
import Table2 from "../../../componentes/Table2";
import api from "../../../services/api";
import Header from "../../../componentes/Header";
import { formatarData } from "../../../utils/utils";
import Columns from "../../../componentes/Table2/Columns";
import './aprovar.css'
import { style } from "@mui/system";

export default function Aprovar() {
    const [data, setData] = useState([]);
    const [visibleColumns, setVisibleColumns] = useState(["nomeUsuario", "tipoProdutoDescricao", "nome", "validade"]);

    useEffect(() => {
        const handleObterDoacoes = async () => {
            try {
                const response = await api.get('Produto');
                if (response.status === 200) {
                    const json = response.data.produtos;
                    console.log(json)
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
    };

    const handleDelete = (item) => {
        console.log("Delete", item);
    };

    const actionButtons = [
        { label: "Editar", action: handleEdit, className: "btn btn-customEditar" },
        { label: "Excluir", action: handleDelete, className: "btn btn-customDelete" }
    ];

    return (
        <div className="body-administrativo">
            <main>
                <div className="table-container">
                    <Table2 botoesDeAcao={actionButtons} dados={data} colunasVisiveis={visibleColumns} numeroDePagina={20} >
                        <Columns header={"nomeUsuario"} title={"Nome usuário"} />
                        <Columns header={"tipoProdutoDescricao"} title={"Tipo produto descrição"} />
                        <Columns header={"nome"} title={"Nome remédio"} />
                        <Columns header={"validade"} title={"Validade"} />
                    </Table2>
                </div>
            </main>
        </div>
    );
}