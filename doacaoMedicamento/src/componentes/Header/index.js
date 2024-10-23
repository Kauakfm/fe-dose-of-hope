import "./header.css";
import React, { useState, useEffect, Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IoMdHome } from "react-icons/io";
import { BiSolidDonateHeart } from "react-icons/bi";
import { GiRemedy } from "react-icons/gi";
import { IoChatbubbles } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { GiMedicines } from "react-icons/gi";
import { BiMenu } from "react-icons/bi";


export default function YouTubeSidebar({ OnByMenu, OnByMenuSet }) {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const hasPermission = (permission) => {
        const permissions = localStorage.getItem("role");
        return permissions?.includes(permission);
    };

    useEffect(() => {
        setIsOpen(OnByMenu);
    }, [OnByMenu]);

    const toggleSidebar = () => {
        if (!isOpen)
            OnByMenuSet(true);
        else
            OnByMenuSet(false);
    };

    return (
        <div className={`youtube-sidebar-container ${isOpen ? "overlay-open" : ""}`}>
            <aside className={`sidebar ${isOpen ? "open" : ""}`}>
                <button className="close-button" onClick={toggleSidebar}>
                    {/* <BiMenu style={{ fontSize: '24px', color: '#FFF' }} /> */}
                </button>
                <nav className="sidebar-nav">
                    <button className="nav-button">
                        {hasPermission('VIEW_INICIO') && (
                            <Fragment>
                                <IoMdHome style={{ marginRight: '10px', fontSize: '20px' }} color="#FFF" />
                                <Link to={`/inicio`} className={location.pathname === '/inicio' ? "active" : ""}>
                                    Início
                                </Link>
                            </Fragment>
                        )}
                    </button>
                    <button className="nav-button">
                        {hasPermission('VIEW_CONTRIBUIR') && (
                            <Fragment>
                                <BiSolidDonateHeart style={{ marginRight: '10px', fontSize: '20px' }} color="#FFF" />
                                <Link to={`/contribuir`} className={location.pathname === '/contribuir' ? "active" : ""}>
                                    Contribuir
                                </Link>
                            </Fragment>
                        )}
                    </button>
                    <button className="nav-button">
                        {hasPermission('VIEW_DOACAO') && (
                            <Fragment>
                                <GiRemedy style={{ marginRight: '10px', fontSize: '20px' }} color="#FFF" />
                                <Link to={`/doacao`} className={location.pathname === '/doacao' ? "active" : ""}>
                                    Doações
                                </Link>
                            </Fragment>
                        )}
                    </button>
                    <button className="nav-button">
                        {hasPermission('VIEW_CHAT') && (
                            <Fragment>
                                <IoChatbubbles style={{ marginRight: '10px', fontSize: '20px' }} color="#FFF" />
                                <Link to={`/chat`} className={location.pathname === '/chat' ? "active" : ""}>
                                    Bate-Papo
                                </Link>
                            </Fragment>
                        )}
                    </button>
                    <button className="nav-button">
                        <Fragment>
                            <GiMedicines style={{ marginRight: '10px', fontSize: '20px' }} color="#FFF" />
                            <Link to={"/doe-medicamentos/formulario/listaDoacoes"} className={location.pathname === '/doe-medicamentos/formulario/listaDoacoes' ? "active" : ""}>
                                Lista de doações
                            </Link>
                        </Fragment>
                    </button>
                    {hasPermission('VIEW_ADMINISTRATIVO') && (
                        <Fragment>
                            <hr className="divider" />
                            <h3 className="subscriptions-header">Administrativo</h3>
                            <Link className="nav-button" to={`/administrativo/aprovar`} >
                                <FaCheckCircle style={{ marginRight: '10px', fontSize: '20px' }} color="#FFF" />
                                Aprovar Medicamento
                            </Link>
                            <Link className="nav-button" to={`/administrativo/usuarios`}>
                                <FaUser style={{ marginRight: '10px', fontSize: '20px' }} color="#FFF" />
                                Usuários
                            </Link>
                        </Fragment>
                    )}
                </nav>
            </aside>
            <button className="menu-button" >
                <BiMenu className="icon" style={{ color: '#FFF' }} onClick={toggleSidebar} />
            </button>
        </div>
    );
}
