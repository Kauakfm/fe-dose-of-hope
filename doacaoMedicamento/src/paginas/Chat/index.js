import React, { useState, useEffect, useContext } from 'react';
import NewChat from '../../componentes/NewChat';
import api from '../../services/api';
import ModalDoacoes from '../../componentes/ModalDoacao';
import { formatarNome, decrypt } from '../../utils/utils';
import './chat.css';
import { UserContext } from '../../hooks/Context/UserContext';
import Spinner from '../../componentes/Spinner';
import { LiaSearchSolid } from "react-icons/lia";

export default function HomeChat() {
  const [object, setObject] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [conversaCodigo, setConversaCodigo] = useState(0);
  const [messageList, setMessageList] = useState([]);
  const [codDestinatario, setCodigoDestinatario] = useState(0);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);
  const codigoUsuarioLogado = decrypt(user.codigo);
  const [searchText, setSearchText] = useState('');
  const [usuarioChatAtivo, setusuarioChatAtivo] = useState('');

  useEffect(() => {
    const handleObterDoacoes = async () => {
      try {
        const response = await api.get('BatePapo');
        const responseData = response.data;
        const objetosMapeados = responseData.map(objeto => ({
          ...objeto,
          nome: formatarNome(objeto.nome)
        }));
        setObject(objetosMapeados);
      } catch (error) {
        console.error("Erro ao obter doações:", error);
      }
    };
    handleObterDoacoes();
  }, []);

  const handleUserSelection = (codigoDestinatario) => {
    const destinatarioSelecionado = object.find(e => e.codigo === codigoDestinatario);
    if (destinatarioSelecionado) {
      setusuarioChatAtivo(destinatarioSelecionado.nome);
    }
    handleCriaConversaEBuscaConversa(codigoDestinatario);
  };

  const handleCriaConversaEBuscaConversa = async (codigoDestinatario) => {
    try {
      setLoading(true);
      setCodigoDestinatario(codigoDestinatario);
      const response = await api.get(`BatePapo/${codigoUsuarioLogado}/${codigoDestinatario}`);
      setMessageList(response.data.lstConversas);
      setConversaCodigo(response.data.codigoConversa);
      setIsVisible(true);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao criar ou buscar conversa:", error);
    }
  };

  const filteredObject = object.filter(e =>
    e.nome.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <div className='dashboard-chat-primeirobloco'>
      <div className='div-chat'>
        <h1>Lista de doadores</h1>
        <div className='search-container'>
          <LiaSearchSolid className='search-icon' />
          <input type='search' placeholder='Pesquisar ou começar uma nova conversa' className='search' value={searchText} onChange={handleSearchChange} />
        </div>
        <div className='dashboard-rede-flatList'>
          {filteredObject.map(e => (
            <div className='rede' key={e.codigo}>
              <img src={e.avatar} alt='avatar' />
              <div className='info-container' onClick={() => handleUserSelection(e.codigo)}>
                <p>{e.nome}</p>
              </div>
              <button className='botaoDoacao' data-bs-toggle="modal" data-bs-target={`#modal${e.codigo}`}>
                Ver doações
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className='layout'>
        {loading ? (
          <Spinner />
        ) : (
          isVisible ? (
            <NewChat
              Visible={isVisible}
              MessageList={messageList}
              CodConversa={conversaCodigo}
              destinatarioCodigo={codDestinatario}
              usuarioChatAtivo={usuarioChatAtivo}
            />
          ) : (
            <NewChat Visible={isVisible} />
          )
        )}
      </div>

      {object.map(e => (
        <ModalDoacoes key={`modal${e.codigo}`} e={e} />
      ))}
    </div>
  );
}