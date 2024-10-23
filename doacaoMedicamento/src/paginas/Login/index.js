import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { BiUserCircle } from 'react-icons/bi';
import { BsArrowLeftCircleFill } from 'react-icons/bs';
import ComponenteRedefinirSenha from '../../componentes/ComponenteRedefinirSenha';
import { toast } from 'react-toastify';
import { AuthContext } from '../../hooks/Context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setSenha] = useState('')
  const [loadingAuth, setLoadingAuth] = useState(false)
  const [showRedefinirSenha, setShowRedefinirSenha] = useState(false);
  const { handleLogin } = useContext(AuthContext)

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
  }, []);

  const handleEsqueciMinhaSenha = () => {
    setShowRedefinirSenha(true);
  };

  const handleSetarLocalStorage = (response) => {
    api.defaults.headers.authorization = `Bearer ${response.accesstoken}`;
    window.localStorage.setItem('usr_token', response.accesstoken);
    window.localStorage.setItem('usr_refreshToken', response.refreshToken);
  }

  const handleLoginPage = async (event) => {
    event.preventDefault();
    setLoadingAuth(true);
    try {
      const response = await handleLogin(email, password);

      console.log(response)
      if (response.status === 200) {
        handleSetarLocalStorage(response.data)
        navigate('/inicio')

        return;
      }

      if (response.status === 401) {
        const responseErrors = response.data.errorMessages;
        responseErrors.forEach(item => { toast.warn(item) });
        return;
      }

    } catch (error) {
      toast.warn("Ops! Algo deu errado. Por favor, tente novamente. Se o problema persistir, entre em contato com o suporte.");
    } finally {
      setLoadingAuth(false);
      setEmail('')
      setSenha('')
    }
  };


  return (
    <div>
      {showRedefinirSenha ? (
        <ComponenteRedefinirSenha />
      ) : (
        <form onSubmit={handleLoginPage}>
          <div className="body-login">
            <BiUserCircle style={{ fontSize: '50px', marginTop: '-105px', marginBottom: '5px' }} />
            <h3>Bem-vindo(a) de volta!</h3>
            <div className="box-label">
              <div>
                <label>E-mail:</label>
                <input type="email" placeholder="Digite seu e-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div>
                <label>Senha:</label>
                <input type="password" placeholder="Digite sua senha" value={password} onChange={(e) => setSenha(e.target.value)} />
              </div>
              <div className='redirecionar' style={{ display: "flex", justifyContent: "space-between" }}>
                <Link to={`/cadastro`} className='redirecionar'>Não tem uma conta? <span>Registre-se</span></Link>
                <span onClick={handleEsqueciMinhaSenha}>Esqueci minha senha</span>
              </div>
              <button type="submit" className="botaoLogin" disabled={loadingAuth}>
                {loadingAuth ? <div className="spinner-border-sm spinner-border" role="status"></div> : "Entrar"}
              </button>
              <Link to={`/`} className='voltar'><BsArrowLeftCircleFill /> Voltar</Link>
            </div>
          </div>
        </form>
      )}
    </div>

  );
};