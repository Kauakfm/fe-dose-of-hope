import React from "react"
import Radio from "../../componentes/Radio"
import './listaMedicamento.css'

export default function ListaDoacoes() {
  const doacoes = [
    { id: 1, nome: 'Paracetamol', aprovado: 2 },
    { id: 2, nome: 'Dipirona', aprovado: 3 },
    { id: 3, nome: 'Ibuprofeno', aprovado: 3 },
    { id: 4, nome: 'Amoxicilina', aprovado: 2 },
  ]

  return (
    <div className="lista-doacoes">
      <div className='lista-doacoes-titulo'>
        <h1>Lista De</h1>
        <h1><span>Doações</span></h1>
      </div>
      <ul>
        {doacoes.map((doacao) => (
          <div className="lista-doacoes-caixa">
            <li key={doacao.id}>
              <h2>{doacao.nome}</h2>
              <Radio currentStep={doacao.aprovado} />
              <p className="status">
                Status: {doacao.aprovado === 3 ? 'Remédio aprovado' : 'Aguarde aprovação'}
              </p>
            </li>
          </div>
        ))}
      </ul>
    </div >
  )
}