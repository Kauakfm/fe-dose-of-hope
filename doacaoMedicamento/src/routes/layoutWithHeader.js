import React from 'react';
import './layoutWithHeader.css'
import HeaderMobile from '../componentes/HeaderMobile';
import HeaderDeitado from '../componentes/HeaderDeitado';

export default function LayoutWithHeader() {

    return (
        <div className="layout-container">
            <HeaderDeitado />
            <HeaderMobile />
        </div>
    )
}