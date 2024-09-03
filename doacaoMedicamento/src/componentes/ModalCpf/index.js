import React, { useState } from "react"
import { toast } from "react-toastify"
import Modal from 'react-modal'
import useTranslations from '../../translations/useTranslations'
import './modalcpf.scss';

import { IoClose } from "react-icons/io5"
import { CgSpinner } from "react-icons/cg"
import { LuUserSquare2 } from "react-icons/lu";


export default function ModalCpf({ isOpen, closeModal }){
  const translations = useTranslations()
  const [selectedAvatar, setSelectedAvatar] = useState(null)
  const [loading, setLoading] = useState(false)

  const customStyles = {
    content: {
      top: '50%',
      bottom: 'auto',
      left: '50%',
      right: 'auto',
      padding: '0',
      backgroundColor: 'transparent',
      transform: 'translate(-50%, -50%)'
    }
  }

  return (
    <Modal style={customStyles} isOpen={isOpen} onRequestClose={closeModal}>
      <div className="modal-avatars">
        <h2>Altere seu CPF</h2>
        <IoClose className="close" onClick={closeModal}/>
        <div className="form">
        <LuUserSquare2 style={{color: 'purple', fontSize: '24px', marginRight: '10px'}}/>
        <span>408.065.418-90</span>
            <p>Por segurança, vamos analisar o pedido de alteração de CPF.</p>
            

            <label>Novo CPF</label>
            <input type="text" placeholder="Para qual CPF você gostaria de alterar?"/>
            <label>Senha</label>
            <input type="password" placeholder="Para confirmar, digite sua senha"/>
            <label>Motivo da alteração</label>
            <input type="text" placeholder="Descreva por que você precisa fazer esta alteração"/>
        </div>
        <div className="button">
          <button type="button" disabled={!selectedAvatar}>
            {loading ? <div className="spinner-button"><CgSpinner/></div> : <>{translations.save}</>}
          </button>
        </div>
      </div>
    </Modal>
  );
}