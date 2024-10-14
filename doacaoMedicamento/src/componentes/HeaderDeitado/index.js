import './headerDeitado.css';
import { Link } from 'react-router-dom';
import React, { useState, useEffect, useRef, useContext } from 'react';
import { CiLogout } from "react-icons/ci";
import { CiSettings } from "react-icons/ci";
import { UserContext } from '../../hooks/Context/UserContext';
import Logo from '../../imagens/doselogo2.png'
import { BiMenu } from "react-icons/bi";
import Header from '../Header';
import { Outlet } from 'react-router-dom'


export default function HeaderDeitado() {
    const [dropdownOpenImagem, setDropdownOpenImagem] = useState(false);
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const { user } = useContext(UserContext);
    const dropdownRef = useRef(null);

    const toggleDropdownImage = () => {
        setDropdownOpenImagem(prev => !prev);
    };

    const toggleSidebar = () => {
        if (!isSidebarOpen)
            setSidebarOpen(true);
        else
            setSidebarOpen(false);
    }

    const truncateName = (name) => {
        if (name.length > 15) {
            return name.substring(0, 15) + '...';
        }
        return name;
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target))
                setDropdownOpenImagem(false)
        };

        if (dropdownOpenImagem)
            document.addEventListener('mousedown', handleClickOutside)
        else
            document.removeEventListener('mousedown', handleClickOutside)

        return () => document.removeEventListener('mousedown', handleClickOutside)

    }, [dropdownOpenImagem]);

    return (
        <>
            <div id='header-web' className='header'>
                <button variant="ghost" size="icon" className="menu-button" onClick={toggleSidebar}>
                    <BiMenu className="icon" style={{ color: '#FFF' }} />
                </button>
                <img className='logo' src={Logo} alt='LogoDose' />
                <div className='header-avatar'>
                    <span>{user.nome}</span>
                    <img src={user.avatar} className='img' alt='Dashboard' onClick={toggleDropdownImage} />
                    {dropdownOpenImagem && (
                        <div ref={dropdownRef} className='dropdown-menu'>
                            <div className='dropdown-avatar-menu'>
                                <img className='dropdown-avatar-image' src={user.avatar} alt='Dashboard' onClick={toggleDropdownImage} />
                                <span className='dropdown-perfil-nome'>{truncateName(user.nome)}</span>
                                <button className='dropdown-perfil-button'>VER PERFIL</button>
                            </div>
                            <div className='dropdown-conteudo-header'>
                                <CiSettings style={{ color: '#8257E5', fontSize: '35px' }} />
                                <Link style={{ fontSize: '15px' }} to='/conta'>
                                    Minha Conta
                                </Link>
                            </div>
                            <div className='dropdown-sair'>
                                <CiLogout style={{ color: '#FE6E78', fontSize: '35px' }} />
                                <Link to='/login' style={{ color: '#FE6E78', fontSize: '15px' }}>
                                    Sair
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Header OnByMenu={isSidebarOpen} OnByMenuSet={setSidebarOpen} />
            <main className={`main-content ${isSidebarOpen ? "shifted" : ""}`}>
                <Outlet />
            </main>
        </>
    )
}