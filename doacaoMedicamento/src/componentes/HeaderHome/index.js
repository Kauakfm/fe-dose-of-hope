import './headerhome.css';  
import { Link, useLocation } from 'react-router-dom';  
import React, { useState, useEffect, useRef } from 'react';  
import { FiMenu } from 'react-icons/fi';  
import { RiCloseLine } from 'react-icons/ri';  
import Logo from '../../imagens/doselogo2.png';  

export default function Header() {  
    const location = useLocation();  
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
    return (  
        <div className='headerHome'>  
            <Link to={`/`}>  
                <img className='logo2' src={Logo} alt='LogoDose' />  
            </Link>  
            <div id='header-web' className='container-header'>  
                <a href='#inicio'>Início</a>  
                <a href='#quem-somos'>Quem Somos</a>  
                <a href='#nosso-proposito'>Nosso Proposito</a>  
            </div>  
            <div className='div-btn'>  
                <Link className="btn-doar" to={`/login`}>Entrar</Link>  
                <Link className="btn-doar2" to={`/cadastro`}>Cadastrar-se</Link>  
            </div>  

            <FiMenu id='header-mobileee' onClick={toggleDropdown} fontSize={105} />
            <div ref={dropdownRef} className={`dropdown-overlay ${dropdownOpen ? 'open slide-in' : ''}`}>
                <div><RiCloseLine onClick={closeDropdown} /></div>
                <Link to={`/inicio`}>Início</Link>
                <a href='#quem-somos'>Quem Somos</a>
                <a href='#nosso-proposito'>Nosso Proposito</a>
                <Link className="btn-doar" to={`/login`}>Entrar</Link>
                <Link className="btn-doar" to={`/cadastro`}>Cadastrar-se</Link>
            </div>
        </div>  
    );  
}  