import React from 'react';
import './inicio.css';
import Footer from '../../componentes/Footer';
import Pessoa from '../../imagens/pessoa.png';
import Item from '../../imagens/item.png';
import Saude from '../../imagens/upup.png';


export default function Inicio() {
  
  return (
    <div>
      <div className='divInicio'>
        <h2 className='comoAjuda'>Como a sua doação nos <b>ajuda</b></h2>
        <img src={Pessoa} alt='' className='pessoaImg' />
        <img src={Item} alt='' className='itemImg' />
        <img src={Saude} alt='' className='saudeImg' />

        <h3 className='acolhimento'>Acolhimento </h3>
        <p className='pAcolhimento'>Acolhimento das pessoas em situação de rua, usuários de drogas e crianças em situação de risco.</p>

        <h3 className='atendimento'>Atendimento</h3>
        <p className='pAtendimento'>Triagem e atendimento médico humanizado adulto e pediátrico, respeitando os princípios da equidade.</p>
        <h3 className='tratamento'>Tratamentos</h3>
        <p className='pMedicamentos'>Medicamentos, aferição da pressão arterial e testes rápidos - glicemia, hepatites B e C, HIV, sífilis e covid-19.</p>
      </div>
      <h1 className='obg'>Obrigado por acreditar em nós.<b><br /> Juntos faremos a diferença!</b></h1>
      <Footer />
    </div>
  )
}