import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../componentes/Header'
import './layoutWithHeader.css'
import { useState } from 'react'
import { BiMenu } from "react-icons/bi";
import HeaderMobile from '../componentes/HeaderMobile';


export default function LayoutWithHeader() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    return (
        <div className="layout-container">
            <button variant="ghost" size="icon" className="menu-button" onClick={toggleSidebar}>
                <BiMenu className="icon" />
            </button>

            <Header OnByMenu={isSidebarOpen} />
            <HeaderMobile />

            <main className={`main-content ${isSidebarOpen ? "shifted" : ""}`}>
                <Outlet />
            </main>
        </div>
    )
}