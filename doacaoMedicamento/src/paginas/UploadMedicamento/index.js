import React, { useState, useCallback } from 'react'
import { Upload, X } from 'lucide-react'
import Radio from '../../componentes/Radio'
import './uploadMedicamento.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { BsArrowLeftCircleFill } from 'react-icons/bs';
import { toast } from 'react-toastify'

export default function MedicinePhotoUpload() {
    const [photos, setPhotos] = useState([])
    const [loadingAuth, setLoadingAuth] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const objMed = location.state?.medicamento

    const handleFileChange = useCallback((event) => {
        if (event.target.files) {
            const newPhotos = Array.from(event.target.files).map(file => URL.createObjectURL(file))
            setPhotos(prevPhotos => [...prevPhotos, ...newPhotos])
        }
    }, [])

    const removePhoto = useCallback((index) => {
        setPhotos(prevPhotos => prevPhotos.filter((_, i) => i !== index))
    }, [])

    const handleConfirmarInformacoes = () => {
        if (photos.length <= 0)
            return toast.warn('Adicione imagens do medicamento!')

        const objPhotos = createObjectPhotos(photos)
        const jsonPhotos = JSON.stringify(objPhotos)
        sessionStorage.setItem('formularioMedicamentoPhotos', jsonPhotos);

        navigate('/doe-medicamentos/formulario/detalhesDoacao')
    }

    function createObjectPhotos(photo){
        return {
            photo
        }
    }

    const handleVoltarParaPreenchaFormulario = () => navigate('/doe-medicamentos/formulario')

    return (
        <div className="medicine-photo-upload">
            <div className='medicine-photo-upload-titulo'>
                <h1>Carregar Foto </h1>
                <h1><span>Dos Medicamentos</span></h1>
            </div>
            <h6><Radio currentStep={1} /></h6>
            <div className="upload-area">
                <label htmlFor="photo-upload" className="upload-button">
                    <Upload />
                    <span>Adicionar Fotos</span>
                </label>
                <input
                    type="file"
                    id="photo-upload"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                />
            </div>
            <div className="photo-grid">
                {photos.map((photo, index) => (
                    <div key={index} className="photo-item">
                        <img src={photo} alt={`Remédio ${index + 1}`} />
                        <button onClick={() => removePhoto(index)} className="remove-button">
                            <X />
                        </button>
                    </div>
                ))}
            </div>
            <div className='medicine-photo-upload-conteudo-button'>
                {<button className="medicine-photo-upload-button" disabled={loadingAuth} onClick={handleConfirmarInformacoes}>
                    {loadingAuth ? <div className="spinner-border-sm spinner-border" role="status"></div> : "Ir para confirmar as informações"}
                </button>}
            </div>
            <button className='medicine-photo-upload-button-voltar' onClick={handleVoltarParaPreenchaFormulario}><BsArrowLeftCircleFill /> Voltar</button>
        </div>
    )
}