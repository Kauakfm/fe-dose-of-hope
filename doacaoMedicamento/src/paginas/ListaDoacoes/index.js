// import React from "react"
// import Radio from "../../componentes/Radio"
// import './listaMedicamento.css'

// export default function ListaDoacoes() {
//   const doacoes = [
//     { id: 1, nome: 'Paracetamol', aprovado: 2 },
//     { id: 2, nome: 'Dipirona', aprovado: 3 },
//     { id: 3, nome: 'Ibuprofeno', aprovado: 3 },
//     { id: 4, nome: 'Amoxicilina', aprovado: 2 },
//   ]

//   return (
//     <div className="lista-doacoes">
//       <div className='lista-doacoes-titulo'>
//         <h1>Lista De</h1>
//         <h1><span>Doações</span></h1>
//       </div>
//       <ul>
//         {doacoes.map((doacao) => (
//           <div className="lista-doacoes-caixa">
//             <li key={doacao.id}>
//               <h2>{doacao.nome}</h2>
//               <Radio currentStep={doacao.aprovado} />
//               <p className="status">
//                 Status: {doacao.aprovado === 3 ? 'Remédio aprovado' : 'Aguarde aprovação'}
//               </p>
//             </li>
//           </div>
//         ))}
//       </ul>
//     </div >
//   )
// }
import React, { useState, useEffect } from 'react'
import './listaMedicamento.css'
import api from '../../services/api'
import Spinner from '../../componentes/Spinner'
import Radio from '../../componentes/Radio'


export default function DonationList() {
  const [currentImageIndex, setCurrentImageIndex] = useState({})
  const [lstDoacoes, setLstDoacoes] = useState([])
  const [loadingAuth, setLoadingAuth] = useState(false);


  const nextImage = (donationId) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [donationId]: ((prev[donationId] || 0) + 1) % lstDoacoes.find(d => d.codigo === donationId).urlImages.length
    }))
  }

  const prevImage = (donationId) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [donationId]: ((prev[donationId] || 0) - 1 + lstDoacoes.find(d => d.codigo === donationId).urlImages.length) % lstDoacoes.find(d => d.codigo === donationId).urlImages.length
    }))
  }

  useEffect(() => {
    setLoadingAuth(true);
    api.get('/Produto/ListarTodasDoacoes')
      .then((response) => {
        console.log(response)
        if (response.status === 200) {
          setLstDoacoes(response.data.produtos);
          console.log('Produtos => ', response.data.produtos);
        }
      })
      .catch((error) => {
        console.error(error);
      }).finally(() => {
        setLoadingAuth(false);
      });
  }, []);

  useEffect(() => {
    lstDoacoes.forEach((donation) => {
      const currentIndex = currentImageIndex[donation.codigo] || 0;
      const nextIndex = (currentIndex + 1) % donation.urlImages.length;
      const prevIndex = (currentIndex - 1 + donation.urlImages.length) % donation.urlImages.length;

      const nextImage = new Image();
      nextImage.src = donation.urlImages[nextIndex];

      const prevImage = new Image();
      prevImage.src = donation.urlImages[prevIndex];
    });
  }, [currentImageIndex, lstDoacoes]);

  return (
    <div className="galaxy-container">
      <div className='lista-doacoes-titulo'>
        <h1>Lista De</h1>
        <h1><span>Doações</span></h1>
      </div>
      {loadingAuth ?
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="spinner-grow" role="status" style={{ color: '#8257E5' }}></div>
        </div>
        :
        <div className="stardust-grid">
          {lstDoacoes.map((donation) => (
            <div key={donation.codigo} className="comet-card">
              <div className="asteroid-content">
                <div className="blackhole-image-container">
                  {donation.urlImages.length > 0 ?
                    <img
                      src={donation.urlImages[currentImageIndex[donation.codigo] || 0]}
                      alt={`${donation.nomeDoItem} - Imagem ${currentImageIndex[donation.codigo] || 1}`}
                      className="supernova-image"
                    /> :
                    <img
                      src="/placeholder.svg"
                      alt="Sem imagem disponível"
                      className="supernova-image"
                    />}
                    <Radio />
                  {donation.urlImages.length > 1 && (
                    <div className="wormhole-navigation">
                      <button onClick={() => prevImage(donation.codigo)} className="quasar-button quasar-prev">
                        &#8249;
                      </button>
                      <button onClick={() => nextImage(donation.codigo)} className="quasar-button quasar-next">
                        &#8250;
                      </button>
                    </div>
                  )}
                </div>
                <div className="pulsar-details">
                  <h2 className="nova-title">{donation.nomeDoItem}</h2>
                  <div className="constellation-grid">
                    <div className="star-info">
                      <p className="meteor-label">Tipo de Item:</p>
                      <p className="comet-data">{donation.tipoProdutoDescricao}</p>
                    </div>
                    <div className="star-info">
                      <p className="meteor-label">Forma Farmacêutica:</p>
                      <p className="comet-data">{donation.formaFarmaceuticaDescricao}</p>
                    </div>
                    <div className="star-info">
                      <p className="meteor-label">Ad/Ped:</p>
                      <p className="comet-data"></p>
                    </div>
                    <div className="star-info">
                      <p className="meteor-label">Dosagem:</p>
                      <p className="comet-data">{donation.dosagemEscrita}</p>
                    </div>
                    <div className="star-info">
                      <p className="meteor-label">Quantidade:</p>
                      <p className="comet-data">{donation.quantidade}</p>
                    </div>
                    <div className="star-info">
                      <p className="meteor-label">Data de Validade:</p>
                      <p className="comet-data">{donation.validadeEscrita}</p>
                    </div>
                    <div className="star-info">
                      <p className="meteor-label">Armazenamento:</p>
                      <p className="comet-data">{donation.tipoNecessidadeArmazenamentoDescricao}</p>
                    </div>
                  </div>
                  <div className="galaxy-description">
                    <p className="meteor-label">Descrição:</p>
                    <p className="comet-data">{donation.descricaoDetalhada}</p>
                  </div>
                </div>
              </div>
            </div>))}
        </div >}
    </div >
  )
}
