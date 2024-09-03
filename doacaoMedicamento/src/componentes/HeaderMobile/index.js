import './headermobile.css';
import { Link, useLocation } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import { FiMenu } from 'react-icons/fi';
import { RiCloseLine } from 'react-icons/ri';

export default function HeaderMobile() {

    const location = useLocation();
    const [currentScreen, setCurrentScreen] = useState('');
    const handleScreenChange = (screenName) => {
        setCurrentScreen(screenName);
    };
    const [niveisacesso, setNiveisacesso] = useState(["", "", ""])
    const tipoUser = window.localStorage.getItem('usr_tipo')

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };
    const closeDropdown = () => {
        setDropdownOpen(false);
    };
    const handlenotawait = () => {
        setNiveisacesso(tipoUser == 1 ? ["ativo", "ativo", "ativo", "ativo", "ativo"]
            : tipoUser == 2 ? ["ativo", "ativo", "ativo", "", "ativo"]
                : ["", "", ""])
    }
    useEffect(() => {
        handlenotawait()
    }, [])

    return (
        <div>
            < FiMenu id='header-mobile' onClick={toggleDropdown} fontSize={25} />
            <div ref={dropdownRef} className={`dropdown-overlay ${dropdownOpen ? 'open slide-in' : ''}`}>
                <div><RiCloseLine onClick={closeDropdown} /></div>
                {niveisacesso[0] == "ativo" ? <Link to={`/inicio`}>Início</Link> : ""}
                {niveisacesso[1] == "ativo" ? <Link to={`/contribuir`}>Contribuir</Link> : ""}
                {niveisacesso[2] == "ativo" ? <Link to={`/doacao`}>Doações</Link> : ""}
                {niveisacesso[3] === 'ativo' ?
                    <div className="btn-adm dropdown">
                        <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Administrativo
                        </button>
                        <ul className="dropdown-menu">
                            <li><Link to={`/administrativo/aprovar`} className="dropdown-item">Aprovar medicamento</Link></li>
                            <li><Link to={`/administrativo/usuarios`} className="dropdown-item">Usuarios</Link></li>
                        </ul>
                    </div>
                    : ""}
                <Link className="btn-sair" to={`/login`}>Sair</Link>
            </div>
        </div >

    )
}