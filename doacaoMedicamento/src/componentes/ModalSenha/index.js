import React, { useState } from "react"
import { toast } from "react-toastify"
import Modal from 'react-modal'
import useTranslations from '../../translations/useTranslations'
import './modalsenha.scss';

import { IoClose } from "react-icons/io5"
import { CgSpinner } from "react-icons/cg"

export default function ModalSenha({ isOpen, closeModal }){
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
        <h2>Altere sua senha</h2>
        <IoClose className="close" onClick={closeModal}/>
        <div className="form">

            <label>Senha atual</label>
            <input type="password" placeholder="Digite sua senha atual"/>

            <label>Nova senha</label>
            <input type="password" placeholder="Digite sua nova senha"/>
            <label>Confirmar a nova senha</label>
            <input type="password" placeholder="Confirme a nova senha"/>
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