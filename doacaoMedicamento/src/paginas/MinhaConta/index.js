import React, { useState, useEffect, useContext } from 'react';
import './account.scss';
import api from '../../services/api';
import useTranslations from '../../translations/useTranslations';
import z from 'zod';
import { toast } from 'react-toastify';
import AvatarSelector from '../../componentes/AvatarSelector';
import useUserData from '../../hooks/UseUserData/index';
import LanguageSelector from '../../componentes/LanguageSelector';
import ModalSenha from '../../componentes/ModalSenha';
import ModalCpf from '../../componentes/ModalCpf';
import tabUsuarioUpdate from '../../Models/tabUsuarioUpdate';
import { UserContext } from '../../hooks/Context/UserContext';

export default function MinhaConta() {
    const translations = useTranslations();
    const { userData, setUserData, fetchUserData } = useUserData();
    const [disabled, setDisabled] = useState(true);
    const [isOpenModalAvatar, setIsOpenModalAvatar] = useState(false);
    const [isOpenModalSenha, setIsOpenModalSenha] = useState(false);
    const [isOpenModalCpf, setIsOpenModalCpf] = useState(false);
    const [errors, setErrors] = useState({});
    const { user ,setUser } = useContext(UserContext)


    const userSchema = z.object({
        nome: z.string().refine((a) => a.trim() !== '', { message: translations.errorFillName }),
        email: z.string().email({ message: translations.errorFillEmail }).refine((a) => a.trim() !== '', { message: translations.errorFillEmail }),
        birthday: z.string().date(translations.errorFillDataNascimento),
        telephone: z.string()
    }).required()

    const ValidacaoAntiga = () => {
        const safeParse = userSchema.safeParse({
            nome: userData.name,
            email: userData.email,
            birthday: userData.birthday,
            telephone: userData.telephone
        })
        if (!safeParse.success) {
            toast.warn(safeParse.error.issues[0].message);
            return;
        }
    }

    const validateFields = () => {
        let isValid = true;
        const newErrors = {};

        if (!userData.name) {
            isValid = false;
            newErrors.nome = "Nome é obrigatório.";
        }
        if (!userData.email) {
            isValid = false;
            newErrors.email = "Email é obrigatório.";
        }
        if (!userData.birthday) {
            isValid = false;
            newErrors.dataNascimento = "Data de nascimento é obrigatório.";
        }

        setErrors(newErrors);
        return isValid;
    };

    useEffect(() => {
        fetchUserData();
    }, [fetchUserData]);

    const handleSaveAvatar = (avatarUrl) => { 
        setUserData((e) => ({ ...e, avatar: avatarUrl }));
        setUser({...user, avatar: avatarUrl})
        setIsOpenModalAvatar(false);
    };

    const handleEdit = () => {
        setDisabled(false);
    };

    const handleSaveUserData = async () => {
        if (!validateFields()) {
            toast.warn('Por favor, preencha os campos antes de editar.');
            return;
        }
        try {
            const objUsuarioUpdate = new tabUsuarioUpdate(userData.name, userData.email, userData.birthday);
            const response = await api.put(`Usuario/AtualizarPerfilUsuario`, objUsuarioUpdate)
            if (response.status === 204) {
                setUser({...user, nome: userData.name});
                toast.success(translations.successEdit);
            }

        } catch (error) {
            toast.error(translations.erroContat);
        }
        setDisabled(true);
    };

    return (
        <div className='div-minhaConta'>
            <div className='account'>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div>
                        <label>{translations.avatar}</label>
                        <img src={userData.avatar || 'https://api.dicebear.com/8.x/bottts-neutral/svg?seed=Max'} alt='Avatar' />
                        <button type='button' onClick={() => setIsOpenModalAvatar(true)} className='btn'>
                            <span>{translations.editAvatar}</span>
                        </button>
                    </div>
                    <div className='div-form'>
                        <div className='div-form-label'>
                            <label>{translations.name}</label>
                            <input type='text' value={userData.name} disabled={disabled} onChange={(e) => setUserData({ ...userData, name: e.target.value })} />
                            {errors.nome && <span style={{ color: 'red' }}>{errors.nome}</span>}
                        </div>
                        <div className='div-form-label'>
                            <label>{translations.email}</label>
                            <input type='email' value={userData.email} disabled={disabled} onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
                            {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
                        </div>
                        <div className='div-form-label'>
                            <label>{translations.password}</label>
                            <input type='password' value="********" disabled={disabled} />
                            <button onClick={() => setIsOpenModalSenha(true)} className='buttonn'>Alterar senha</button>
                        </div>
                    </div>
                    <div className='div-form'>
                        <div className='div-form-label'>
                            <label>{translations.dateOfBirth}</label>
                            <input type='date' value={userData.birthday} disabled={disabled} onChange={(e) => setUserData({ ...userData, birthday: e.target.value })} />
                            {errors.dataNascimento && <span style={{ color: 'red' }}>{errors.dataNascimento}</span>}
                        </div>

                        <div className='div-form-label'>
                            <label>{translations.cpf}</label>
                            <input type='text' value={userData.cpf} disabled={disabled} onChange={(e) => setUserData({ ...userData, cpf: e.target.value })} />
                            <button onClick={() => setIsOpenModalCpf(true)} className='buttonn'>Alterar CPF</button>
                        </div>
                    </div>
                    {disabled ?
                        <button type='button' onClick={handleEdit} className='button'>{translations.edit}</button>
                        :
                        <button type='button' onClick={handleSaveUserData} className='button'>{translations.save}</button>
                    }
                </form>
                <LanguageSelector />
                <AvatarSelector isOpen={isOpenModalAvatar} closeModal={() => setIsOpenModalAvatar(false)} handleSaveAvatar={handleSaveAvatar} />
                <ModalSenha isOpen={isOpenModalSenha} closeModal={() => setIsOpenModalSenha(false)} />
                <ModalCpf isOpen={isOpenModalCpf} closeModal={() => setIsOpenModalCpf(false)} />
            </div>
        </div>
    );
}
