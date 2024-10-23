import './headermobile.css';
import { Link, useLocation } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import { FiMenu } from 'react-icons/fi';
import { RiCloseLine } from 'react-icons/ri';

export default function HeaderMobile() {  
    // const location = useLocation();  
    // const [dropdownOpen, setDropdownOpen] = useState(false);  
    // const dropdownRef = useRef(null);  

    // useEffect(() => {  
    //     function handleClickOutside(event) {  
    //         if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {  
    //             setDropdownOpen(false);  
    //         }  
    //     }  

    //     document.addEventListener("mousedown", handleClickOutside);  
    //     return () => {  
    //         document.removeEventListener("mousedown", handleClickOutside);  
    //     };  
    // }, []);  

    // const toggleDropdown = () => {  
    //     setDropdownOpen(!dropdownOpen);  
    // };  

    // const closeDropdown = () => {  
    //     setDropdownOpen(false);  
    // };  

    return (  
        <div>  
            {/* <FiMenu id='header-mobile' onClick={toggleDropdown} fontSize={25} />  
            <div ref={dropdownRef} className={`dropdown-overlay ${dropdownOpen ? 'open slide-in' : ''}`}>  
                <div><RiCloseLine onClick={closeDropdown} /></div>  
                <Link to={`/inicio`}>Início</Link>  
                <Link to={`/contribuir`}>Contribuir</Link>  
                <Link to={`/doacao`}>Doações</Link>  
                <Link to={`/chat`}>Chat</Link> 
                <Link to='/conta'>Minha Conta</Link>
                <div className="btn-adm dropdown">  
                    
                    <ul className="dropdown-menu">  
                        <li><Link to={`/administrativo/aprovar`} className="dropdown-item">Aprovar medicamento</Link></li>  
                        <li><Link to={`/administrativo/usuarios`} className="dropdown-item">Usuários</Link></li>  
                    </ul>  
                </div>  
                <Link className="btn-doar" to={`/login`}>Sair</Link>  
            </div>   */}
        </div>  
    );  
}  