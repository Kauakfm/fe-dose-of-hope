import React, { useState } from "react";

export default function TesteWebSocket() {
  const [webSocket, setWebSocket] = useState(null);

  // Função para fechar a conexão WebSocket
  const handleFecharWebSocket = () => {
    if (webSocket && webSocket.readyState === window.WebSocket.OPEN) {
      webSocket.send(JSON.stringify({ type: 'close' }));
      webSocket.close();
      setWebSocket(null); 
    }
  };

  // Função para abrir a conexão WebSocket
  const handleAbrirWebSocket = () => {
    var socket = new window.WebSocket('ws://localhost:5297');
    socket.addEventListener('open', (event) => {
      console.log('WebSocket aberto')
      const valorConversa = { chave: '4' };
      socket.send(JSON.stringify(valorConversa))
    });
    socket.addEventListener('message', (event) => {
      const message = JSON.parse(event.data);
      console.log(message)
    });
    socket.addEventListener('close', (event) => {
      console.log("WebSocket fechado");
    });
    socket.addEventListener('error', (event) => {
      console.log("Erro no websocket");
    });

    // Armazenar o objeto WebSocket no estado
    setWebSocket(socket);

    // Função de limpeza para fechar a conexão WebSocket quando o componente for desmontado
    return () => {
      if (socket && socket.readyState === window.WebSocket.OPEN) {
        socket.close();
      }
    };
  };

  return (
    <div>
      <button className='btn btn-primary' onClick={handleAbrirWebSocket}>
        Abrir WebSocket
      </button>
      <button className='btn btn-primary' onClick={handleFecharWebSocket}>
        Fechar WebSocket
      </button>
    </div>
  );
}
