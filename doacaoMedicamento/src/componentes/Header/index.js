import './header.css';
import { Link, useLocation } from 'react-router-dom';
import React, { useState, useEffect, useRef, useContext } from 'react';
import { CiLogout } from "react-icons/ci";
import { CiSettings } from "react-icons/ci";
import { UserContext } from '../../hooks/Context/UserContext';


export default function Header() {
    const location = useLocation();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropdownOpenImagem, setDropdownOpenImagem] = useState(false);
    const dropdownRef = useRef(null);
    const { user } = useContext(UserContext);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownOpen(false);
        }
    };

    const toggleDropdown = () => {
        setDropdownOpen(prev => !prev);
        setDropdownOpenImagem(false);
    };

    const toggleDropdownImage = () => {
        setDropdownOpenImagem(prev => !prev);
        setDropdownOpen(false);
    };

    const hasPermission = (permission) => {
        const permissions = localStorage.getItem("role");
        return permissions?.includes(permission);
    };

    return (
        <div className='header'>
            <Link to={`/inicio`}><h1>Dose de Esperança</h1></Link>
            <div id='header-web' className='header-web'>
                {hasPermission('VIEW_INICIO') && (
                    <Link to={`/inicio`} className={location.pathname === '/inicio'}>
                        Início
                    </Link>
                )}
                {hasPermission('VIEW_CONTRIBUIR') && (
                    <Link to={`/contribuir`} className={location.pathname === '/contribuir'}>
                        Contribuir
                    </Link>
                )}
                {hasPermission('VIEW_DOACAO') && (
                    <Link to={`/doacao`} className={location.pathname === '/doacao'}>
                        Doações
                    </Link>
                )}
                {hasPermission('VIEW_CHAT') && (
                    <Link to={`/chat`} className={location.pathname === '/chat'}>
                        Chat
                    </Link>
                )}
                {hasPermission('VIEW_ADMINISTRATIVO') && (
                    <div id='header-web' className="btn-adm dropdown">
                        <div className='div-dashboard' onClick={toggleDropdown}>
                            <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Administrativo
                            </button>
                            <ul className="dropdown-menu">
                                <li><Link to={`/administrativo/aprovar`} >Aprovar medicamento</Link></li>
                                <li><Link to={`/administrativo/usuarios`} >Usuarios</Link></li>
                                <li>Aprovar CPF</li>
                            </ul>
                        </div>
                    </div>
                )}
                <div>
                    <span>{user.nome}</span>
                    <img src={user.avatar} className='img' alt='Dashboard' onClick={toggleDropdownImage} />
                    {dropdownOpenImagem && (
                        <div className='dropdown-menu'>
                            <div className='menu-conta'>
                                <ul>
                                    <li><Link to='/conta'><CiSettings style={{ color: 'purple', fontSize: '25px', marginRight: '20px' }} />Minha Conta</Link></li>
                                    <li><Link to='/login'><CiLogout style={{ color: 'purple', fontSize: '25px', marginRight: '20px' }} />Sair</Link></li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}