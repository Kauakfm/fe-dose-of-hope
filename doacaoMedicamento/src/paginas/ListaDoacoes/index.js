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
import React, { useState } from 'react'
import './listaMedicamento.css'
import Radio from '../../componentes/Radio'

const mockDonations = [
  {
    id: 1,
    itemType: 'Medicamento',
    itemName: 'Paracetamol',
    pharmaceuticalForm: 'Comprimido',
    adPed: 'Adulto',
    dosage: '500mg',
    quantity: 100,
    expirationDate: '2024-12-31',
    storageRequirements: 'Temperatura ambiente',
    description: 'Analgésico e antitérmico de uso comum',
    images: ['https://ascoferj.com.br/wp-content/uploads/2023/02/AdobeStock_377142156_Preview_Editorial_Use_Only.jpeg', 'https://www.cirurgicabezerra.com.br/wp-content/uploads/2022/12/BEZ-08122022-temperatura-medicamento-post-blog-imagem.jpg', '/placeholder.svg?height=300&width=400']
  },
  {
    id: 2,
    itemType: 'Equipamento',
    itemName: 'Termômetro Digital',
    pharmaceuticalForm: 'N/A',
    adPed: 'Ambos',
    dosage: 'N/A',
    quantity: 10,
    expirationDate: 'N/A',
    storageRequirements: 'Local seco',
    description: 'Termômetro digital de alta precisão',
    images: ['https://www.cirurgicabezerra.com.br/wp-content/uploads/2022/12/BEZ-08122022-temperatura-medicamento-post-blog-imagem.jpg', 'https://ascoferj.com.br/wp-content/uploads/2023/02/AdobeStock_377142156_Preview_Editorial_Use_Only.jpeg']
  },
]

export default function DonationList() {
  const [currentImageIndex, setCurrentImageIndex] = useState({})

  const nextImage = (donationId) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [donationId]: ((prev[donationId] || 0) + 1) % mockDonations.find(d => d.id === donationId).images.length
    }))
  }

  const prevImage = (donationId) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [donationId]: ((prev[donationId] || 0) - 1 + mockDonations.find(d => d.id === donationId).images.length) % mockDonations.find(d => d.id === donationId).images.length
    }))
  }

  return (
    <div className="galaxy-container">
      <div className='lista-doacoes-titulo'>
        <h1>Lista De</h1>
        <h1><span>Doações</span></h1>
      </div>
      <div className="stardust-grid">
        {mockDonations.map(donation => (
          <div key={donation.id} className="comet-card">
            <div className="asteroid-content">
              <div className="blackhole-image-container">
                <img
                  src={donation.images[currentImageIndex[donation.id] || 0]}
                  alt={`${donation.itemName} - Imagem ${currentImageIndex[donation.id] || 1}`}
                  className="supernova-image"
                />
                <Radio />
                {donation.images.length > 1 && (
                  <div className="wormhole-navigation">
                    <button onClick={() => prevImage(donation.id)} className="quasar-button quasar-prev">
                      &#8249;
                    </button>
                    <button onClick={() => nextImage(donation.id)} className="quasar-button quasar-next">
                      &#8250;
                    </button>
                  </div>
                  
                )}
              </div>
              <div className="pulsar-details">
                <h2 className="nova-title">{donation.itemName}</h2>
                <div className="constellation-grid">
                  <div className="star-info">
                    <p className="meteor-label">Tipo de Item:</p>
                    <p className="comet-data">{donation.itemType}</p>
                  </div>
                  <div className="star-info">
                    <p className="meteor-label">Forma Farmacêutica:</p>
                    <p className="comet-data">{donation.pharmaceuticalForm}</p>
                  </div>
                  <div className="star-info">
                    <p className="meteor-label">Ad/Ped:</p>
                    <p className="comet-data">{donation.adPed}</p>
                  </div>
                  <div className="star-info">
                    <p className="meteor-label">Dosagem:</p>
                    <p className="comet-data">{donation.dosage}</p>
                  </div>
                  <div className="star-info">
                    <p className="meteor-label">Quantidade:</p>
                    <p className="comet-data">{donation.quantity}</p>
                  </div>
                  <div className="star-info">
                    <p className="meteor-label">Data de Validade:</p>
                    <p className="comet-data">{donation.expirationDate}</p>
                  </div>
                  <div className="star-info">
                    <p className="meteor-label">Armazenamento:</p>
                    <p className="comet-data">{donation.storageRequirements}</p>
                  </div>
                </div>
                <div className="galaxy-description">
                  <p className="meteor-label">Descrição:</p>
                  <p className="comet-data">{donation.description}</p>
                </div>
              </div>
            </div>
          </div>))}   
      </div >
    </div >
  )
}
