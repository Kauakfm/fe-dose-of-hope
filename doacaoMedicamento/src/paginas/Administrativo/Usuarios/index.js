import '../administrativo.css'
import api from '../../../services/api';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Columns from '../../../componentes/Table2/Columns';
import Table2 from "../../../componentes/Table2";

export default function Usuarios() {
    const [dados, setDados] = useState([])
    const [visibleColumns, setVisibleColumns] = useState(["nome", "email", "senha", "cpf"]);
    const navigate = useNavigate();

    const handleUser = async () => {
        try {
            const response = await api.get('Usuario');
            if (response.status === 200) {
                setDados(response.data.usuarios)
            }
        } catch (error) {
            console.log("Erro ao obter todos os usuários: ", error)
        }
    }
    useEffect(() => {
        handleUser();
    }, [])

    const handleEdit = (item) => {
        navigate(`/editarUsuario/${item.codigo}`);
    };

    const actionButtons = [
        { label: "Editar", action: handleEdit, className: "btn btn-primary" }
    ];
    return (
        <div className="body-administrativo">
            <main>
                <Table2 botoesDeAcao={actionButtons} dados={dados} colunasVisiveis={visibleColumns} numeroDePagina={20} >
                    <Columns header={"nome"} title={"Nome usuário"} />
                    <Columns header={"email"} title={"Email"} />
                    <Columns header={"senha"} title={"Senha"} />
                    <Columns header={"cpf"} title={"CPF"} />
                </Table2>
            </main>
        </div>
    )
}

