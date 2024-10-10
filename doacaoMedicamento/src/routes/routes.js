import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../paginas/Home';
import Login from '../paginas/Login';
import RedefinirSenha from '../paginas/RedefinirSenha';
import Cadastro from '../paginas/Cadastro';
import Contribuir from '../paginas/Contribuir';
import Formulario from '../paginas/Formulario';
import Doacao from '../paginas/Doacao';
import Inicio from '../paginas/Inicio';
import Aprovar from '../paginas/Administrativo/Aprovar'
import Usuarios from '../paginas/Administrativo/Usuarios'
import Editar from '../paginas/Administrativo/EditarUsuario';
import Chat from '../paginas/Chat/';
import TesteWebSocket from '../paginas/TesteWebSocket/'
//import NewChat from '../paginas/Chat/NewChat';
import MinhaConta from '../paginas/MinhaConta';
import AprovarCpf from '../paginas/Administrativo/AprovarCpf';
import UploadMedicamento from '../paginas/UploadMedicamento/';
import DetalhesDoacao from '../paginas/DetalhesDoacao/';
import ListaDoacoes from '../paginas/ListaDoacoes/';
import ProtectedRoute from '../Auth/ProtectedRoutes';
import Unauthorized from '../componentes/Unauthorized';
import { Outlet } from 'react-router-dom';
import { UserProvider } from '../hooks/Context/UserContext';
import LayoutWithHeader from './layoutWithHeader';
import HeaderDeitado from '../componentes/HeaderDeitado';

export default function RoutesApp() {
    // function LayoutWithHeader() {
    //     return (
    //         <>
    //         </>
    //     );
    // }

    function RoutesUser() {
        return (
            <>
                <UserProvider>
                    <Outlet />
                </UserProvider>
            </>
        )
    }
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/redefinir/:id" element={<RedefinirSenha />} />
                <Route path="/cadastro" element={<Cadastro />} />

                <Route element={<RoutesUser />}>
                    <Route element={<LayoutWithHeader />}>
                        <Route path="/inicio" element={
                            <ProtectedRoute requiredPermissions={['VIEW_INICIO']} >
                                <Inicio />
                            </ProtectedRoute>} />

                        <Route path="/contribuir" element={
                            <ProtectedRoute requiredPermissions={['VIEW_CONTRIBUIR']}>
                                <Contribuir />
                            </ProtectedRoute>} />

                        <Route path="/doacao" element={
                            <ProtectedRoute>
                                <Doacao />
                            </ProtectedRoute>
                        } />

                        <Route path="/doe-medicamentos/formulario" element={
                            <ProtectedRoute requiredPermissions={['VIEW_DOACAO']}>
                                <Formulario />
                            </ProtectedRoute>} />

                        <Route path="/doe-medicamentos/formulario/uploadMedicamento" element={
                            <ProtectedRoute requiredPermissions={['VIEW_DOACAO']}>
                                <UploadMedicamento />
                            </ProtectedRoute>} />

                        <Route path="/doe-medicamentos/formulario/detalhesDoacao" element={
                            <ProtectedRoute requiredPermissions={['VIEW_DOACAO']}>
                                <DetalhesDoacao />
                            </ProtectedRoute>} />

                        <Route path="/doe-medicamentos/formulario/listaDoacoes" element={
                            <ProtectedRoute requiredPermissions={['VIEW_DOACAO']}>
                                <ListaDoacoes />
                            </ProtectedRoute>} />

                        <Route path="/administrativo/aprovar" element={<Aprovar />} />
                        <Route path="/administrativo/usuarios" element={<Usuarios />} />
                        <Route path="editarUsuario/:id" element={<Editar />} />
                        <Route path="/administrativo/cpf" element={<AprovarCpf />} />


                        <Route path="/chat" element={
                            <ProtectedRoute requiredPermissions={['VIEW_CHAT']}>
                                <Chat />
                            </ProtectedRoute>} />

                        <Route path='/conta' element={
                            <ProtectedRoute>
                                <MinhaConta />
                            </ProtectedRoute>} />
                        <Route path='/teste' element={<TesteWebSocket />} />
                        <Route path='/unauthorized' element={<Unauthorized />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}