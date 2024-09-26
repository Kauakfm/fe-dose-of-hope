// import './header.css';
// import { Link, useLocation } from 'react-router-dom';
// import React, { useState, useEffect, useRef, useContext, Fragment } from 'react';
// import { CiLogout, CiSettings } from "react-icons/ci";
// import { BiMenu } from "react-icons/bi";
// import { UserContext } from '../../hooks/Context/UserContext';
// import { IoMdHome } from "react-icons/io";
// import { BiSolidDonateHeart } from "react-icons/bi";
// import { GiRemedy } from "react-icons/gi";
// import { IoChatbubbles } from "react-icons/io5";
// import { RiAdminFill } from "react-icons/ri";
// import DoseLogo from '../../imagens/doselogo.png';

// export default function Header() {
//     const location = useLocation();
//     const [dropdownOpen, setDropdownOpen] = useState(false);
//     const [dropdownOpenImagem, setDropdownOpenImagem] = useState(false);
//     const [menuOpen, setMenuOpen] = useState(false);
//     const dropdownRef = useRef(null);
//     const menuRef = useRef(null);
//     const contaRef = useRef(null);
//     const { user } = useContext(UserContext);

//     useEffect(() => {
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => document.removeEventListener("mousedown", handleClickOutside);
//     }, []);

//     const handleClickOutside = (event) => {
//         if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//             setDropdownOpen(false);
//             setDropdownOpenImagem(false);
//         }
//         if (menuRef.current && !menuRef.current.contains(event.target) && !event.target.closest('.hamburguer')) {
//             setMenuOpen(false);
//         }
//         if (contaRef.current && !contaRef.current.contains(event.target)) {
//             setDropdownOpenImagem(false);
//         }
//     };

//     const toggleDropdown = () => {
//         setDropdownOpen(prev => !prev);
//         setDropdownOpenImagem(false);
//     };

//     const toggleDropdownImage = () => {
//         setDropdownOpenImagem(prev => !prev);
//         setDropdownOpen(false);
//     };

//     const toggleMenu = () => {
//         setMenuOpen(prev => !prev);
//         document.body.classList.toggle('menu-open', !menuOpen);
//     };

//     const [isOpen, setIsOpen] = useState(false);

//     const toggleDropdown2 = () => {
//         setIsOpen(!isOpen);
//     };

//     const hasPermission = (permission) => {
//         const permissions = localStorage.getItem("role");
//         return permissions?.includes(permission);
//     };

//     return (
//         <div className='header'>
//             <div className='hamburguer' onClick={toggleMenu}>
//                 <BiMenu size={30} />
//             </div>
//             <Link to={`/inicio`}><img src={DoseLogo} alt='logo' className='logo' /></Link>
//             {menuOpen && (
//                 <div ref={menuRef} className={`side-menu ${menuOpen ? 'open' : ''}`}>
//                     <div className="custom-dropdown-header">
//                         <ul>
//                             <li>{hasPermission('VIEW_INICIO') && (
//                                 <Fragment>
//                                     <IoMdHome style={{ marginRight: '5px', fontSize: '30px' }} />
//                                     <Link to={`/inicio`} className={location.pathname === '/inicio' ? "active" : ""}>
//                                         Início
//                                     </Link>
//                                 </Fragment>
//                             )}</li>
//                             <li>{hasPermission('VIEW_CONTRIBUIR') && (
//                                 <Fragment>
//                                     <BiSolidDonateHeart style={{ marginRight: '5px', fontSize: '30px' }} />
//                                     <Link to={`/contribuir`} className={location.pathname === '/contribuir' ? "active" : ""}>
//                                         Contribuir
//                                     </Link>
//                                 </Fragment>
//                             )}</li>
//                             <li>{hasPermission('VIEW_DOACAO') && (
//                                 <Fragment>
//                                     <GiRemedy style={{ marginRight: '5px', fontSize: '30px' }} />
//                                     <Link to={`/doacao`} className={location.pathname === '/doacao' ? "active" : ""}>
//                                         Doações
//                                     </Link>
//                                 </Fragment>
//                             )}</li>
//                             <li>{hasPermission('VIEW_CHAT') && (
//                                 <Fragment>
//                                     <IoChatbubbles style={{ marginRight: '5px', fontSize: '30px' }} />
//                                     <Link to={`/chat`} className={location.pathname === '/chat' ? "active" : ""}>
//                                         Bate-Papo
//                                     </Link>
//                                 </Fragment>
//                             )}</li>
//                             <li className={`${isOpen ? 'open' : ''}`} onClick={toggleDropdown2}>
//                                 <RiAdminFill style={{ marginRight: '5px', fontSize: '30px' }} />
//                                 <span className="custom-dropdown-title">Administrativo</span>
//                                 <span className="custom-arrow">{isOpen ? '▼' : '▶'}</span>

//                                 {isOpen && (
//                                     <div className="custom-dropdown-body">
//                                         <ul>
//                                             <li><Link to={`/administrativo/aprovar`}>Aprovar Medicamento</Link></li>
//                                             <li><Link to={`/administrativo/usuarios`}>Usuários</Link></li>
//                                         </ul>
//                                     </div>
//                                 )}
//                             </li>

//                         </ul>
//                     </div>
//                 </div>

//             )}

//             <div id='header-web' className='header-web'>
//                 <div ref={contaRef}>
//                     <span>{user.nome}</span>
//                     <img src={user.avatar} className='img' alt='Dashboard' onClick={toggleDropdownImage} />
//                     {dropdownOpenImagem && (
//                         <div className='dropdown-menu'>
//                             <div className='menu-conta'>
//                                 <ul>
//                                     <li><Link to='/conta'><CiSettings style={{ color: 'purple', fontSize: '25px', marginRight: '20px' }} />Minha Conta</Link></li>
//                                     <li><Link to='/login'><CiLogout style={{ color: 'purple', fontSize: '25px', marginRight: '20px' }} />Sair</Link></li>
//                                 </ul>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     )
// }


import "./header.css";
import React, { useState, useEffect, useRef, useContext, Fragment } from 'react';
import { UserContext } from '../../hooks/Context/UserContext';
import { Link, useLocation } from 'react-router-dom';
import { IoMdHome } from "react-icons/io";


export default function YouTubeSidebar({ OnByMenu }) {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const dropdownRef = useRef(null);
    const menuRef = useRef(null);
    const contaRef = useRef(null);
    const { user } = useContext(UserContext);


    const hasPermission = (permission) => {
        const permissions = localStorage.getItem("role");
        return permissions?.includes(permission);
    };

    useEffect(() => {
        setIsOpen(OnByMenu);
    }, [OnByMenu])

    return (
        <div className="youtube-sidebar-container">
            <aside className={`sidebar ${isOpen ? "open" : ""}`}>
                <div className="sidebar-header">
                    <img
                        src="/placeholder.svg?height=30&width=90&text=YouTube"
                        alt="YouTube Logo"
                        className="logo"
                    />
                    <button className="close-button" onClick={OnByMenu}>
                        <span className="sr-only">Close sidebar</span>
                    </button>
                </div>

                <nav className="sidebar-nav">
                    <button className="nav-button">
                        {hasPermission('VIEW_INICIO') && (
                            <Fragment>
                                <IoMdHome style={{ marginRight: '5px', fontSize: '30px' }} />
                                <Link to={`/inicio`} className={location.pathname === '/inicio' ? "active" : ""}>
                                    Início
                                </Link>
                            </Fragment>
                        )}
                    </button>
                    <button className="nav-button">
                        Shorts
                    </button>
                    <button className="nav-button">
                        Inscrições
                    </button>
                    <button className="nav-button">
                        YouTube Music
                    </button>

                    <hr className="divider" />

                    <button className="nav-button">
                        Seu canal
                    </button>
                    <button className="nav-button">
                        Histórico
                    </button>
                    <button className="nav-button">
                        Seus vídeos
                    </button>
                    <button className="nav-button">
                        Assistir mais tarde
                    </button>
                    <button className="nav-button">
                        Vídeos com "Gostei"
                    </button>

                    <hr className="divider" />

                    <h3 className="subscriptions-header">Inscrições</h3>
                    {["MrBeast", "BlackoutZ", "Cortes do blacko...", "Rocketseat", "Rafa & Luiz", "Patriota", "Ciência Todo Dia"].map((channel) => (
                        <button key={channel} className="nav-button">
                            {channel}
                        </button>
                    ))}
                </nav>
            </aside>
        </div>
    );
}