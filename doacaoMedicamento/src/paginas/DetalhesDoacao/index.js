import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Radio from '../../componentes/Radio'
import { BsArrowLeftCircleFill } from 'react-icons/bs';
import './detalhesDoacao.css'

export default function DetalhesDoacao() {
    const [tipoItem, setTipoItem] = useState('')
    const [formaItem, setFormaItem] = useState('')
    const [dosagem, setDosagem] = useState('')
    const [dataValidade, setDataValidade] = useState('')
    const [nomeItem, setNomeItem] = useState('')
    const [condicaoItem, setCondicaoItem] = useState('')
    const [quantidade, setQuantidade] = useState(0)
    const [necessidadeArmazenamento, setNecessidadeArmazenamento] = useState(0)
    const [descricaoDetalhada, setDescricaoDetalhada] = useState('')
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [photos, setPhotos] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const dadosSalvos = sessionStorage.getItem('formularioMedicamento');
        const photosSession = sessionStorage.getItem('formularioMedicamentoPhotos')

        if (dadosSalvos) {
            const dados = JSON.parse(dadosSalvos);
            setTipoItem(dados.tipoItem || '');
            setNomeItem(dados.nomeItem || '');
            setFormaItem(dados.formaItem || 0);
            setCondicaoItem(dados.condicaoItem || '');
            setDosagem(dados.dosagem || '');
            setQuantidade(dados.quantidade || 0);
            setDataValidade(dados.dataValidade || '');
            setNecessidadeArmazenamento(dados.necessidadeArmazenamento || 0);
            setDescricaoDetalhada(dados.descricaoDetalhada || '');
        }

        if (photosSession)
            setPhotos(JSON.parse(photosSession).photo)

    }, []);

    const handleConfirmaMedicamento = () => {
        setLoadingAuth(true)
        setTimeout(() => {
            navigate('/doe-medicamentos/formulario/listaDoacoes')
            setLoadingAuth(false)
            sessionStorage.clear()
        }, 5000);
    }

    const handleVoltarParaUplodFoto = () => navigate('/doe-medicamentos/formulario/uploadMedicamento')

    return (
        <div className="confirmation-screen">
            <div className='confirmation-screen-titulo'>
                <h1>Aguarde</h1>
                <h1><span>Aprovação</span></h1>
            </div>
            <Radio currentStep={2} />
            <div className="content">
                <section className="form-data">
                    <h2>Informações do Medicamento</h2>
                    <div className="data-grid">
                        <div className="data-item">
                            <strong>Tipo de Item:</strong>  {tipoItem}
                        </div>
                        <div className="data-item">
                            <strong>Nome do Item:</strong>  {nomeItem}
                        </div>
                        <div className="data-item">
                            <strong>Forma do Item:</strong>  {formaItem}
                        </div>
                        <div className="data-item">
                            <strong>Condição do Item:</strong>  {condicaoItem}
                        </div>
                        <div className="data-item">
                            <strong>Dosagem:</strong>  {dosagem}
                        </div>
                        <div className="data-item">
                            <strong>Quantidade:</strong>  {quantidade}
                        </div>
                        <div className="data-item">
                            <strong>Data de Validade:</strong>  {dataValidade}
                        </div>
                        <div className="data-item">
                            <strong>Necessidade de Armazenamento:</strong>  {necessidadeArmazenamento}
                        </div>
                    </div>
                    <div className="data-item full-width">
                        <strong>Descrição Detalhada:</strong>  {descricaoDetalhada}
                    </div>
                </section>

                <section className="photos">
                    <h2>Fotos do Medicamento</h2>
                    <div className="photo-grid">
                        {photos.map((photo, index) => (
                            <img key={index} src={photo} alt={`Medicamento ${index + 1}`} />
                        ))}
                    </div>
                </section>
            </div>

            {<button className="confirm-button" disabled={loadingAuth} onClick={handleConfirmaMedicamento}>
                {loadingAuth ? <div className="spinner-border-sm spinner-border" role="status"></div> : "Confirmar Informações"}
            </button>}

            <button className='medicine-photo-upload-button-voltar' onClick={handleVoltarParaUplodFoto}><BsArrowLeftCircleFill /> Voltar</button>
        </div>
    )
}