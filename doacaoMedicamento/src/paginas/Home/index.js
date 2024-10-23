import './home.css'
import React, { useEffect, useState } from 'react'
import HeaderInicio from '../../componentes/HeaderHome'
import { Link } from 'react-router-dom'
import Footer from '../../componentes/Footer'
import { useNavigate } from 'react-router-dom'

export default function Home() {
    const navigate = useNavigate()
    const codeString = `{`;
    const codeString2 = `}`;

    useEffect(() => {
        localStorage.clear();
    }, []);
    return (
        <div className="home">
            <HeaderInicio />
            <div id='inicio' className='backgroundHome'>
                <div className='backgroundImage' />
                <h1><span>Doe</span> e ajude pessoas</h1>
                <p className='paragrafo'>Doar é uma prática que ajuda a suprir as necessidades, renovando a esperança e contribuindo para um mundo melhor.</p>
                <h3>Faça parte dessa ação!</h3>
                {/* <Link to={`/contribuir`}><button>Contribua com qualquer valor</button></Link> */}
            </div>

            <div id='quem-somos'>
                <h2>Nosso legado é construído não pelo que acumulamos para nós mesmos, mas pelo que compartilhamos com os outros, deixando marcas eternas nas vidas que tocamos.</h2>
                <h1>QUEM SOMOS</h1>
                <h3>A Dose de Esperança surgiu da paixão de um grupo dedicado de estudantes, todos nós apaixonados por tecnologia e determinados a fazer a diferença em nossas comunidades. Enquanto estamos no segundo ano do ensino médio, nos especializamos em informática e encontramos uma maneira inovadora de utilizar nossas habilidades para ajudar aqueles que mais precisam.
                    Somos movidos pelo desejo de transformar vidas e criar um impacto positivo em nossa sociedade. Nosso projeto nasceu da percepção das necessidades urgentes enfrentadas por pessoas carentes, especialmente quando se trata de acesso a medicamentos, suplementos e itens de primeiros socorros essenciais para o bem-estar. Foi então que decidimos agir e desenvolvemos um site dedicado a facilitar a doação de medicamentos usados, suprimentos de saúde e muito mais.</h3>
            </div>

            <div id='nosso-proposito'>
                <p className='codeString'>
                    {codeString}<br />
                    <span>"nossa_paixao": "Ajudar pessoas",</span><br />
                    <span>"nossa_missao": "Salvar vidas"</span><br />
                    {codeString2}
                </p>
                <div>
                    <h1>NOSSO PROPÓSITO</h1>
                    <h3>Acreditamos no poder transformador da educação e da tecnologia. Desenvolvemos um inovador site chamado Dose de Esperança, que facilita a doação de medicamentos usados, suplementos e itens de primeiros socorros em bom estado. Nosso objetivo é criar uma plataforma inclusiva que permita às pessoas doar com facilidade, proporcionando a oportunidade de ajudar aqueles que enfrentam dificuldades em acessar esses recursos vitais. Estamos comprometidos em construir uma comunidade solidária, onde a compaixão e a tecnologia se unem para fazer a diferença.</h3>
                </div>
            </div>
            <div className="empathy-container">
                <div className="empathy-header">
                    <h1>#Compartilhe empatia</h1>
                </div>
                <div className="empathy-content">
                    <p>Crie agora a sua conta e comece a doar esperança através de seus medicamentos.</p>
                    <button className="create-account-button" onClick={() => navigate('/cadastro')}>Criar conta</button>
                </div>
            </div>
            <Footer />
        </div>
    )
}