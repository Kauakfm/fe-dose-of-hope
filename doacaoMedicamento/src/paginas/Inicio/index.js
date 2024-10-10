import React from 'react';
import './inicio.css';
import Footer from '../../componentes/Footer';
import HeaderMobile from '../../componentes/HeaderMobile';
import { useState } from 'react';
import medicamento from '../../imagens/medicamentos.jpeg';
import { useNavigate } from 'react-router-dom';

export default function Inicio() {

  const [activeIndex, setActiveIndex] = useState(null);
  const navigate = useNavigate();

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    { question: 'Como faço para doar medicamento?', answer: 'Você pode doar medicamentos indo até o local X...' },
    { question: 'Como faço para entregar o medicamento doado?', answer: 'Você receberá um e-mail com as informações...' },
    { question: 'Posso doar medicamentos vencidos?', answer: 'Não, não aceitamos medicamentos vencidos...' },
    { question: 'Preciso de medicamentos controlados, posso solicitar na lista de espera?', answer: 'Sim, mas será necessário ter receita médica...' },
    { question: 'Posso doar ou receber medicamentos para Pets?', answer: 'Sim, aceitamos medicamentos para Pets...' },
    { question: 'Existe algum custo?', answer: 'Não há nenhum custo envolvido...' },
    { question: 'Como serei avisado sobre a doação?', answer: 'Você receberá um e-mail com as informações...' },
  ];

  function handleToMedicamentos() {
    navigate("/doe-medicamentos/formulario")
  }


  return (
    <div className="inicio-container">
      <HeaderMobile />
      <section className="main-section">
        <div className="content">
          {/* <h3>Medicamentos para Humanos e Pets</h3> */}
          <h1>Doe e receba <b>medicamentos</b></h1>
          <p>Conectando pessoas para compartilhar empatia, doar e receber medicamentos de forma simples.</p>
          <div className="button-group">
            <button className="donate-btn" onClick={handleToMedicamentos}>Quero doar</button>
          </div>
        </div>
        <div className="image-container">
          <img src="https://www.ceder.med.br/_next/image?url=%2Fimg-hero-ceder-light.webp&w=640&q=70" alt="Heart Image" className="main-image" />
        </div>
      </section>

      <section className="info-section">
        <div className="info-item">
          <span className="icon2">🌱</span>
          <p>Nosso objetivo é diminuir o impacto ambiental, reduzindo a incineração e o descarte incorreto.</p>
        </div>
        <div className="info-item">
          <span className="icon2">❤️</span>
          <p>Ajudar a promover a inclusão social a quem precisa facilitando o acesso a medicamentos de qualidade.</p>
        </div>
        <div className="info-item">
          <span className="icon2">💊</span>
          <p>Melhorar o acesso a medicamentos que possam estar em falta nas redes públicas.</p>
        </div>
        <div className="info-item">
          <span className="icon2">🐾</span>
          <p>Disponibilizar acesso ao tratamento veterinário de qualidade através de medicamentos de qualidade.</p>
        </div>
      </section>

      <section className="missao-visao-valores">
        <h2>Sobre nós</h2>
        <p className='pa'>Promovemos a conexão de pessoas compartilhando empatia</p>
        <div className="mvv-container">
          <div className="mvv-item">
            <span className="icon2">💡</span>
            <h3>Missão</h3>
            <p>Promover o compartilhamento de medicamentos humanos e veterinários, reduzindo o impacto ambiental causado pelo descarte inadequado em lixo doméstico.</p>
          </div>
          <div className="mvv-item">
            <span className="icon2">👁️</span>
            <h3>Visão</h3>
            <p>Nos tornarmos a maior plataforma/rede social nacional de compartilhamento de medicamentos humanos e veterinários.</p>
          </div>
          <div className="mvv-item">
            <span className="icon2">❤️</span>
            <h3>Valores</h3>
            <p>Ética. Empatia. Solidariedade. Responsabilidade socioambiental. Democratização do acesso aos medicamentos.</p>
          </div>
        </div>
      </section>

      <div className="faq-container">
        <h2>Perguntas Frequentes</h2>
        <ul className="faq-list">
          {faqs.map((faq, index) => (
            <li key={index} className={`faq-item ${activeIndex === index ? 'active' : ''}`}>
              <div className="faq-question" onClick={() => toggleFAQ(index)}>
                {faq.question}
                <span className="faq-arrow">{activeIndex === index ? '-' : '+'}</span>
              </div>
              <div className="faq-answer">
                {faq.answer}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <Footer />
    </div>
  );
}