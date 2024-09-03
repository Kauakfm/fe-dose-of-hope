import '../administrativo.css'
import api from '../../../services/api';
import React, { useEffect, useState } from 'react';
import Header from '../../../componentes/Header';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function EditarUsuario() {
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [tipo, setTipo] = useState('')
    const [cpf, setCPF] = useState('')
    const [isCPFValid, setIsCPFValid] = useState(true);
    const [genero, setGenero] = useState('')
    const [telefone, setTelefone] = useState('')
    const { id } = useParams();

    const handleNome = (event) => {
        setNome(event.target.value)
    }
    const handleEmail = (event) => {
        setEmail(event.target.value);
    }
    const handleSenha = (event) => {
        setSenha(event.target.value);
    }
    const handleTipo = (event) => {
        const intValue = event.target.value
        const numero = parseInt(intValue)
        setTipo(numero);
        console.log(numero)
    }
    const handleCpf = (e) => {
        const newCPF = e.target.value;
        setCPF(formatarCPF(newCPF));
        setIsCPFValid(validarCPF(newCPF));
    };
    const formatarCPF = (cpf) => {
        const numeros = cpf.replace(/\D/g, '');

        const regexCPF = /^(\d{3})(\d{3})(\d{3})(\d{2})$/;
        const cpfFormatado = numeros.replace(regexCPF, '$1.$2.$3-$4');

        return cpfFormatado;
    };
    function validarCPF(cpf) {
        cpf = cpf.replace(/\D/g, '');
        if (cpf.length !== 11) {
            return false;
        }
        if (/^(\d)\1{10}$/.test(cpf)) {
            return false;
        }
        let sum = 0;
        for (let i = 0; i < 9; i++) {
            sum += parseInt(cpf.charAt(i)) * (10 - i);
        }
        let rest = sum % 11;
        let digit1 = (rest < 2) ? 0 : 11 - rest;
        sum = 0;
        for (let i = 0; i < 10; i++) {
            sum += parseInt(cpf.charAt(i)) * (11 - i);
        }
        rest = sum % 11;
        let digit2 = (rest < 2) ? 0 : 11 - rest;
        if (parseInt(cpf.charAt(9)) !== digit1 || parseInt(cpf.charAt(10)) !== digit2) {
            return false;
        }
        return true;
    }
    const handleGenero = (event) => {
        const intValue = event.target.value
        const numero = parseInt(intValue)
        setGenero(numero);
        console.log(numero)
    }
    const formatarNumeroTelefone = (numero) => {
        const numeros = numero.replace(/\D/g, '');

        const regexTelefone = /^(\d{2})(\d{5})(\d{4})$/;
        const numeroFormatado = numeros.replace(regexTelefone, '($1)$2-$3');

        return numeroFormatado;
    }
    const handleTelefone = (event) => {
        const input = event.target.value;
        const newValue = input.replace(/[^0-9\-]/g, '');

        setTelefone(formatarNumeroTelefone(newValue));
    };
    const handleObter = async () => {
        try {
            const response = await api.get(`Usuario/obterUser/${id}`);
            const responseData = response.data;
            setNome(responseData.nome)
            setEmail(responseData.email)
            setSenha(responseData.senha)
            setCPF(responseData.cpf)
            setGenero(responseData.generoCodigo)
            setTipo(responseData.tipoUsuarioCodigo)
            setTelefone(responseData.telefone)
        } catch (error) {

        }
    }
    useEffect(() => {
        handleObter();
    }, [])
    const handleEditar = async () => {
        if (nome == "" || nome == null) {
            toast.warn("Digite o nome do usuairo ")
        }
        if (email == "" || email == null) {
            toast.warn("Digite o email do usuario")
        }
        if (senha == "" || senha == null) {
            toast.warn("Digite a senha do usuario")
        }
        if (telefone == "" || telefone == null) {
            toast.warn("Digite o telefone do usuario")
        }
        if (tipo == "0" || tipo === 0) {
            toast.warn("Selecione o tipo de usuario")
        }
        if (!validarCPF(cpf)) {
            toast.warn("CPF inválido. Verifique novamente.");
            return;
        }
        try {
            await api.put(`Usuario/atualizar/${id}`, {
                nome: nome, email: email, senha: senha, telefone: telefone, cpf: cpf, generoCodigo: genero, tipoUsuarioCodigo: tipo
            })
        } catch (error) {

        }
    }
    return (
        <div className="body-administrativo">
            <main>
                <div className='container-dados'>
                    <div className='row'>
                        <div className="col-md-3">
                            <label>Nome Completo:</label>
                            <div className='presencial-input'>
                                <input type="text" placeholder='Digite seu nome' value={nome} onChange={handleNome} />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <label>E-mail:</label>
                            <div className='presencial-input' >
                                <input type="email" placeholder='Digite seu e-mail' value={email} onChange={handleEmail} />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <label>Senha:</label>
                            <div className='presencial-input'>
                                <input type="text" placeholder='Senha' value={senha} onChange={handleSenha} />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <label>Cpf:</label>
                            <div className='presencial-input'>
                                <input type="text" placeholder='Senha' value={cpf} onChange={handleCpf} />
                            </div>
                        </div>

                        <div className="col-md-3">
                            <label>Genero:</label>
                            <div className='presencial-input'>
                                <select className='presencial-input' value={genero} onChange={handleGenero}>
                                    <option value="0">Selecionar</option>
                                    <option value="1">Masculino</option>
                                    <option value="2">Feminino</option>
                                    <option value="3">Não Binário</option>
                                    <option value="4">Outros</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <label>Tipo</label>
                            <div className='presencial-input'>
                                <select className='presencial-input' value={tipo} onChange={handleTipo}>
                                    <option value="0">Selecione</option>
                                    <option value="1">Administrador</option>
                                    <option value="2">Usuario comum</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <label>Telefone:</label>
                            <div className='presencial-input'>
                                <input type="text" placeholder='Senha' maxLength={12} value={telefone} onChange={handleTelefone} />
                            </div>
                        </div>

                        <div className="row">
                            <button className="btn btn-success" onClick={handleEditar}>Salvar</button>
                        </div>
                    </div>
                </div>
            </main >
        </div >
    )
}