// src/components/AvatarSelector.js

import React, { useState } from 'react';
import './avatarselector.scss';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import useTranslations from '../../translations/useTranslations';
import { IoClose } from 'react-icons/io5';
import { CgSpinner } from 'react-icons/cg';
import api from '../../services/api';

const AvatarSelector = ({ isOpen, closeModal, handleSaveAvatar }) => {
  const translations = useTranslations();
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [loading, setLoading] = useState(false);

  const customStyles = {
    content: {
      top: '50%',
      bottom: 'auto',
      left: '50%',
      right: 'auto',
      padding: '0',
      backgroundColor: 'transparent',
      transform: 'translate(-50%, -50%)',
    },
  };

  const avatars = [
    { id: '1', url: 'https://api.dicebear.com/8.x/bottts-neutral/svg?seed=Max' },
    { id: '2', url: 'https://api.dicebear.com/8.x/bottts-neutral/svg?seed=Rascal' },
    { id: '3', url: 'https://api.dicebear.com/8.x/bottts-neutral/svg?seed=Pepper' },
    { id: '4', url: 'https://api.dicebear.com/8.x/bottts-neutral/svg?seed=Gracie' },
    { id: '5', url: 'https://api.dicebear.com/8.x/bottts-neutral/svg?seed=Charlie' },
    { id: '6', url: 'https://api.dicebear.com/8.x/bottts-neutral/svg?seed=Jack' },
    { id: '7', url: 'https://api.dicebear.com/8.x/bottts-neutral/svg?seed=Princess' },
    { id: '8', url: 'https://api.dicebear.com/8.x/bottts-neutral/svg?seed=Bella' },
    { id: '9', url: 'https://api.dicebear.com/8.x/bottts-neutral/svg?seed=Cookie' },
    { id: '10', url: 'https://api.dicebear.com/8.x/bottts-neutral/svg?seed=Sugar' },
    { id: '11', url: 'https://api.dicebear.com/8.x/bottts-neutral/svg?seed=Boots' },
    { id: '12', url: 'https://api.dicebear.com/8.x/bottts-neutral/svg?seed=Milo' },
    { id: '13', url: 'https://api.dicebear.com/8.x/bottts-neutral/svg?seed=Tinkerbell' },
    { id: '14', url: 'https://api.dicebear.com/8.x/bottts-neutral/svg?seed=Sadie' },
    { id: '15', url: 'https://api.dicebear.com/8.x/bottts-neutral/svg?seed=Miss%20kitty' },
  ];

  const saveAvatar = async () => {
    setLoading(true);
    try {
      await api.put(`Usuario/AtualizarAvatarUsuario/`, { foto: selectedAvatar });
      toast.success(translations.avatarUpdated);
      handleSaveAvatar(selectedAvatar);
      closeModal();
    } catch (error) {
      toast.error(translations.errorUpdatingAvatar);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal style={customStyles} isOpen={isOpen} onRequestClose={closeModal}>
      <div className="modal-avatars">
        <h2>{translations.selectYourAvatar}</h2>
        <IoClose className="close" onClick={closeModal} />
        <div className="avatars">
          {avatars.map((avatar) => (
            <img
              key={avatar.id}
              src={avatar.url}
              alt={`Avatar ${avatar.id}`}
              className={selectedAvatar === avatar.url ? 'selected' : ''}
              onClick={() => setSelectedAvatar(avatar.url)}
            />
          ))}
        </div>
        <div className="button">
          <button type="button" disabled={!selectedAvatar} onClick={saveAvatar}>
            {loading ? <CgSpinner className="spinner-button" /> : translations.save}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AvatarSelector;
