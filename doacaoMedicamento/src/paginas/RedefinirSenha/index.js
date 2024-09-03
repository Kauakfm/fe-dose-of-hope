import React, { useRef, useState } from 'react';
import '../../paginas/Login/login.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { BsArrowLeftCircleFill } from 'react-icons/bs'
import { BiUserCircle } from 'react-icons/bi';
import api from "../../services/api"

export default function RedefinirSenha() {
    const [senha, setSenha] = useState();
    const [senha2, setSenha2] = useState();
    const { id } = useParams();
    const navigate = useNavigate();
    const url = 'Cadastro/EsqueciSenha/'

    const handleSenha = (event) => {
        setSenha(event.target.value);
    };

    const handleSenha2 = (event) => {
        setSenha2(event.target.value);
    };


    const handleRedefinirSenha = async () => {
        if (senha !== senha2)
            return;

        await api.post(url + id, { senha: senha }).then((response) => {
            if (response.status === 204) {
                navigate("/login")
            }
            else {
                throw new Error('Erro de solicitação: ' + response);
            }
        })
    }

    return (
        <div>
                <div className="body-login">
                    <BiUserCircle style={{ fontSize: '50px', marginTop: '-105px', marginBottom: '5px' }} />
                    <h3>Nova senha!</h3>
                    <div className="box-label">
                        <div>
                            <label>Senha:</label>
                            <input type="password" placeholder="Digite sua senha" onChange={handleSenha} />
                        </div>
                        <div>
                            <label>Confirmar a senha:</label>
                            <input type="password" placeholder="Confirme sua senha" onChange={handleSenha2} />
                        </div>
                        <button className="botaoLogin"onClick={handleRedefinirSenha}>Criar nova senha</button> 
                    </div>
                </div>
        </div>
    )
}