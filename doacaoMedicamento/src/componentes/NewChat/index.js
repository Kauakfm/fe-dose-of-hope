import React, { useState, useEffect, useRef, useContext } from 'react';
import { MdOutlineMessage } from 'react-icons/md';
import { IoLockClosedOutline } from "react-icons/io5";
import * as signalR from '@microsoft/signalr';
import { RotasSignalR } from '../../Auth/permissions';
import { UserContext } from '../../hooks/Context/UserContext';
import { decrypt } from '../../utils/utils';

export default function NewChat({ Visible, MessageList, CodConversa, destinatarioCodigo, usuarioChatAtivo }) {
    const [visible, setVisible] = useState(Visible);
    const [message, setMessage] = useState('');
    const [messageLst, setMessageLst] = useState([]);
    const [connectionFora, setConnectionFora] = useState(null);
    const { user } = useContext(UserContext);
    const codigoUsuarioLogado = decrypt(user.codigo);

    const bottomRef = useRef();
    const messageRef = useRef();

    const handleSendMessage = () => {
        if (!message.trim()) return;

        if (connectionFora) {
            connectionFora.invoke("SendMessage", parseInt(CodConversa), parseInt(codigoUsuarioLogado), parseInt(destinatarioCodigo), message)
                .then(() => {
                })
                .catch(err => {
                    console.error('Erro ao enviar mensagem no metodo SendMessage:', err);
                });
        }
        setMessage('');
        scrollDown();
    };

    const scrollDown = () => {
        bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        setMessageLst(MessageList);
    }, [MessageList]);

    useEffect(() => {
        if (visible) {
            const connection = new signalR.HubConnectionBuilder()
                .withUrl(RotasSignalR[2])
                .build();

            connection.start()
                .then(() => {
                    return connection.invoke('JoinConversation', parseInt(CodConversa));
                }).catch(err => console.error('Erro no Join', err));

            connection.on('ReceiveMessage', (message) => {
                setMessageLst((prev) => [...prev, message]);
            });

            setConnectionFora(connection);

            return () => {
                connection.stop().catch(err => console.error('Error parando o SignalR', err));
            };
        }
    }, [CodConversa]);

    return (
        <>
            {!visible && (
                <div className='layout-text'>
                    <MdOutlineMessage style={{ fontSize: "40px" }} />
                    <h1>Chat ao vivo</h1>
                    <p>Conectando Corações Generosos: Onde Doadores Dialogam, Inspiram e Transformam Vidas!</p>
                    <IoLockClosedOutline style={{ fontSize: "15px", marginLeft: "-49%" }} />
                    <div className='layout2'>
                        <p>Protegido com criptografia de ponta a ponta</p>
                    </div>
                </div>
            )}
            {visible && (
                <div className='layout'>
                    <div className='chat-container'>
                        <div className='chat-header'>
                            <h2>{user.destinatarioNome}</h2>
                        </div>
                        <div className='chat-header'>
                            <h2>{usuarioChatAtivo}</h2>
                        </div>
                        <div className='chat-body'>
                            {messageLst.map((msg, index) => (
                                <div className='message-container' key={index}>
                                    {parseInt(codigoUsuarioLogado) === msg.usuarioCodigo ?
                                        <div className='message-text'>{msg.mensagem}  <div className='msg-horaMinuto'>{msg.horaMinuto}</div></div>
                                        :
                                        <div className='message-text-destinatario'>{msg.mensagem}  <div className='msg-horaMinuto'>{msg.horaMinuto}</div></div>
                                    }
                                </div>
                            ))}
                            <div ref={bottomRef} />
                        </div>
                        <div className='chat-footer'>
                            <input ref={messageRef} value={message} onChange={(e) => setMessage(e.target.value)} placeholder='Digite sua mensagem' />
                            <button onClick={handleSendMessage}>Enviar</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}