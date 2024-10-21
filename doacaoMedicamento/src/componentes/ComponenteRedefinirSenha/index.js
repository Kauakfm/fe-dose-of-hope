import React, { useRef, useState } from 'react';
import '../../paginas/Login/login.css';
import { Link, useNavigate } from 'react-router-dom';
import { BsArrowLeftCircleFill } from 'react-icons/bs'
import { BiUserCircle } from 'react-icons/bi';
import api from "../../services/api"
import './redefinirSenha.css';

export default function ComponenteRedefinirSenha() {
    const [email, setEmail] = useState('');
    const [loadingAuth, setLoadingAuth] = useState(false)
    const ref = useRef(null);
    const url = 'Cadastro/EnviarEmailDeRedefinirSenha/'
    const navigate = useNavigate();


    const handleChange = (event) => {
        setEmail(event.target.value);
    };

    const handleRecuperar = async () => {
        setLoadingAuth(true);
        await api.post(url, { email: email }).then((response) => {
            if (response.status === 204) {
                ref.current.click();
                setLoadingAuth(false)
            }
            else {
                setLoadingAuth(false)
                throw new Error('Erro de solicitação: ' + response);
            }
        })
    }

    const handleVoltar = () => {
        window.location.href = '/login';   
    };
    return (
        <div>
            <div className="body-senha">
                <BiUserCircle style={{ fontSize: '50px', marginTop: '-105px', marginBottom: '5px' }} />
                <h3>Redefinir senha!</h3>
                <p className='p-redefinir'>Digite seu e-mail que <b>enviaremos</b><br />  um link para definir uma nova senha.</p>
                <div className="box-senha">
                    <div>
                        <label>E-mail:</label>
                        <input type="email" placeholder="Digite seu e-mail" value={email} onChange={handleChange} />
                    </div>
                    <button type="submit" className="botaoLogin2" disabled={loadingAuth} onClick={handleRecuperar}>
                        {loadingAuth ? <div className="spinner-border-sm spinner-border" role="status" ></div> : "Redefinir"}
                    </button>
                    <BsArrowLeftCircleFill /><span onClick={handleVoltar}> voltar</span>
                </div>
            </div>
            <div className='modal-redefinir-senha'>
                <button hidden ref={ref} type="button" class="botao-azul botao-cadastro" data-bs-toggle="modal" data-bs-target="#exampleModal">Cadastrar</button>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-body">
                                <h6>E-mail de redefinição de senha enviado!</h6>
                                <p>Em breve, você vai receber um e-mail para redefinir sua senha. Se não conseguir encontrar o e-mail, lembre-se de procurar na pasta de spam ou lixo eletrônico.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}