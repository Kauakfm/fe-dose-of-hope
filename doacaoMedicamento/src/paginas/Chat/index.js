import React, { useState, useEffect, useContext } from 'react';
import NewChat from '../../componentes/NewChat';
import api from '../../services/api';
import ModalDoacoes from '../../componentes/ModalDoacao';
import { formatarNome, decrypt } from '../../utils/utils';
import './chat.css';
import { UserContext } from '../../hooks/Context/UserContext';
import Spinner from '../../componentes/Spinner';

export default function HomeChat() {
  const [object, setObject] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [conversaCodigo, setConversaCodigo] = useState(0);
  const [messageList, setMessageList] = useState([]);
  const [codDestinatario, setCodigoDestinatario] = useState(0);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext)
  const codigoUsuarioLogado = decrypt(user.codigo)

  useEffect(() => {
    const handleObterDoacoes = async () => {
      try {
        const response = await api.get('BatePapo');
        const responseData = response.data;
        console.log(responseData)
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
    handleCriaConversaEBuscaConversa(codigoDestinatario);
  };

  const handleCriaConversaEBuscaConversa = async (codigoDestinatario) => {
    try {
      setLoading(true);
      setCodigoDestinatario(codigoDestinatario);
      api.get(`BatePapo/${codigoUsuarioLogado}/${codigoDestinatario}`).then((response) => {
        setMessageList(response.data.lstConversas);
        setConversaCodigo(response.data.codigoConversa);
        setIsVisible(true);
        setLoading(false);
      })
    } catch (error) {
      console.error("Erro ao criar ou buscar conversa:", error);
    }
  };

  return (
    <div>
      <div className='dashboard-rede blocos-dashboard'>
        <div className='div-chat'>
          <h1>Lista de doadores</h1>
          {object.map(e => (
            <div className='rede' key={e.codigo}>
              <img src={e.avatar} alt='avatar' />
              <div className='info-container' onClick={() => handleUserSelection(e.codigo)}>
                <p>{e.nome}</p>
                <button className='botaoDoacao' data-bs-toggle="modal" data-bs-target={`#modal${e.codigo}`}>
                  Ver doações
                </button>
              </div>
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