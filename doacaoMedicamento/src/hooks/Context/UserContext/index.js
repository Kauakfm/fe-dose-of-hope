import React, { createContext, useEffect, useState } from "react";
import api from "../../../services/api";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({ nome: '', avatar: '', codigo: '' })

    useEffect(() => {
        const handleBuscar = async () => {
            if (user.nome === '' && user.avatar === '' && user.codigo === '') {
                const response = await api.get('Usuario/BuscarPorCodigo');
                const responseData = response.data;
                setUser({ nome: responseData.nome, avatar: responseData.foto, codigo: responseData.codigo })
            }
        }
        handleBuscar()
    }, [])

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}