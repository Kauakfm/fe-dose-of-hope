import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './cadastro.css';
import { toast } from 'react-toastify';
import api from '../../services/api';
import { AiOutlineUsergroupAdd, AiOutlineWarning } from 'react-icons/ai';
import { FiCheckCircle } from 'react-icons/fi';
import { BsArrowLeftCircleFill } from 'react-icons/bs';
import { validarCPF } from '../../utils/utils';
import tabUsuario from '../../Models/tabUsuario';
import InputMask from 'react-input-mask';
import Logo from '../../imagens/doselogo2.png'

export default function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [cpf, setCpf] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [errors, setErrors] = useState({});
  const ref = useRef(null);
  const navigate = useNavigate();

  const url = 'Usuario';

  const validateFields = () => {
    let isValid = true;
    const newErrors = {};

    if (!nome) {
      isValid = false;
      newErrors.nome = 'Nome é obrigatório.';
    }
    if (!email) {
      isValid = false;
      newErrors.email = 'Email é obrigatório.';
    }
    if (!senha) {
      isValid = false;
      newErrors.senha = 'Senha é obrigatório.';
    }
    if (!dataNascimento) {
      isValid = false;
      newErrors.dataNascimento = 'Data de nascimento é obrigatório.';
    }

    if (!validarCPF(cpf)) {
      isValid = false;
      newErrors.cpf = 'CPF inválido.';
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleCadastro = async () => {
    if (!validateFields()) {
      toast.warn('Por favor, preencha os campos antes de continuar.');
      return;
    }

    if (!validarCPF(cpf)) {
      toast.warn('CPF inválido. Verifique novamente.');
      return;
    }
    setLoadingAuth(true);
    try {
      const objUsuario = new tabUsuario(nome, email, senha, cpf, dataNascimento);
      const response = await api.post(url, objUsuario);

      if (response.status === 201) {
        toast.success('Cadastro realizado com sucesso.');
        ref.current.click();
      }

      if (response.status === 400) {
        const responseErrors = response.data.errorMessages;
        responseErrors.forEach((item) => {
          toast.warn(item);
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingAuth(false);
    }
  };

  const handleModalClose = () => {
    navigate('/');
    toast.success('Seu cadastro foi realizado com sucesso.');
    return;
  };

  return (
    <div>
      <div className="body-cadastro">
        <AiOutlineUsergroupAdd style={{ fontSize: '50px', marginTop: '-3px', marginBottom: '10px' }} />
        <h3>Faça seu <b>cadastro</b></h3>
        <p className="paragrafo2">
          <FiCheckCircle style={{ marginRight: '10px' }} />
          Faça seu <b>cadastro</b> para aproveitar todos os <b>benefícios exclusivos</b> que nossa plataforma oferece.
        </p>
        <div className="box-campos">
          <p className="p">*Todos os campos devem ser preenchidos.</p>
          <div>
            <label>Nome completo*</label>
            <input
              type="text"
              placeholder="Seu nome completo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              className={errors.nome ? 'error' : ''}
            />
            {errors.nome && (
              <span className="error-message">
                <AiOutlineWarning className="error-icon" /> {errors.nome}
              </span>
            )}
          </div>
          <div>
            <label>E-mail*</label>
            <input
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={errors.email ? 'error' : ''}
            />
            {errors.email && (
              <span className="error-message">
                <AiOutlineWarning className="error-icon" /> {errors.email}
              </span>
            )}
          </div>
          <div>
            <label>Senha*</label>
            <input
              type="password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className={errors.senha ? 'error' : ''}
            />
            {errors.senha && (
              <span className="error-message">
                <AiOutlineWarning className="error-icon" /> {errors.senha}
              </span>
            )}
          </div> <br />
          <section>
            <div>
              <label>CPF*</label>
              <InputMask
                mask="999.999.999-99"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                placeholder="Digite seu CPF"
                className={errors.cpf ? 'error' : ''}
              />
              {errors.cpf && (
                <span className="error-message">
                  <AiOutlineWarning className="error-icon" /> {errors.cpf}
                </span>
              )}
            </div>
            <div className="divDate">
              <label>Data de nascimento*</label>
              <input
                type="date"
                value={dataNascimento}
                onChange={(e) => setDataNascimento(e.target.value)}
                className={`input ${errors.dataNascimento ? 'error' : ''}`}
              />
              {errors.dataNascimento && (
                <span className="error-message">
                  <AiOutlineWarning className="error-icon" /> {errors.dataNascimento}
                </span>
              )}
            </div>
          </section>
          <label className="check2">
            <input type="checkbox" />Certifico que li, compreendi e estou plenamente ciente dos termos e condições do acordo estabelecido.
          </label>
          <button className="botaoLogin" onClick={handleCadastro} disabled={loadingAuth}>
            {loadingAuth ? <div className="spinner-border-sm spinner-border" role="status"></div> : 'Enviar'}
          </button>
          <Link to={`/`} className="voltar"><BsArrowLeftCircleFill /> Voltar</Link>
        </div>
      </div>
      <div className="modal-incricao-presencial modal-parabens">
        <button hidden ref={ref} type="button" className="botao-inscricao" data-bs-toggle="modal" data-bs-target="#exampleModal1">Modal</button>
        <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" onClick={handleModalClose}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-body">
              <div style={{ color: 'white' }} className="modal-body">
                <img className="logo3" src={Logo} alt="LogoDose" style={{ width: '50%', marginBottom: '10%' }} />
                <h2>Parabéns! Seu cadastro foi realizado com sucesso!</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
