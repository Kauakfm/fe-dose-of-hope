import { useState, useRef } from 'react'
import './doacao.css'
import { useNavigate } from 'react-router-dom';
import medicamentos from '../../imagens/medicamentos.jpeg';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { LuAlertCircle } from 'react-icons/lu';
import Footer from "../../componentes/Footer";
import farmacia from '../../imagens/farmacia.jpg';
import { FiCheckCircle } from 'react-icons/fi';

export default function Doacao() {
    const navigate = useNavigate();

    function handleToMedicamentos() {
        navigate("/doe-medicamentos/formulario")
    }

    const newsArticles = [
        {
            title: "A importância do descarte correto de remédios",
            description: "Sabe aquele medicamento que te salva nos seus piores momentos, quando você...",
            date: "04/06/2024",
            image: "https://www.ceder.med.br/_next/image?url=https%3A%2F%2Fcdn-images-1.medium.com%2Fmax%2F700%2F1*2FGT119BEqqhzKVcg_xc9A.png&w=640&q=75",
        },
        {
            title: "A grave falta de remédios nas farmácias em 2023",
            description: "A princípio, não é novidade que dês do início da pandemia a procura por...",
            date: "04/06/2024",
            image: "https://www.ceder.med.br/_next/image?url=https%3A%2F%2Fcdn-images-1.medium.com%2Fmax%2F700%2F1*LYFtKb4_xqybLO78-PKt9Q.png&w=640&q=75",
        },
        {
            title: "Doação de remédios, a verdadeira importância",
            description: "De antemão, venho lhe dizer que este é um artigo que literalmente pode (e vai)...",
            date: "04/06/2024",
            image: "https://www.ceder.med.br/_next/image?url=https%3A%2F%2Fcdn-images-1.medium.com%2Fmax%2F720%2F1*9W_9mJvALTlkB5dgyCUYIw.jpeg&w=640&q=75",
        },
    ];

    return (
        <div>
            <div className="divPrincipal">
                <div>
                    <h1 className="doe">Doe <b>medicamentos</b></h1>
                    <p>Aqueles medicamentos que estão parados na sua prateleira podem ser úteis para nós.
                        Aceitamos doações com gratidão.</p>
                    <div className='div-botao'>
                        <button className="botaoDoar" onClick={handleToMedicamentos}>Quero doar qualidade de vida</button>
                    </div>
                </div>
            </div>
            <div className="news-container">
                <h2>Notícias</h2>
                <div className="news-grid">
                    {newsArticles.map((article, index) => (
                        <div className="news-card" key={index}>
                            <img src={article.image} alt={article.title} />
                            <h3>{article.title}</h3>
                            <p>{article.description}</p>
                            <span>{article.date}</span>
                            <a href="#" className="read-more">Leia mais</a>
                        </div>
                    ))}
                </div>
            </div>

            {/* <div className='qualidade-de-vida-conteuto-texto'>
                <div className='qualidade-de-vida-doacao-texto'>
                    <h1 className="qualRemedioH1"><b>Quais remédios</b> você pode doar?</h1> <br /><br />
                    <p className="paragrafoRemedio">Não existem restrições. Todas as doações de medicamentos e Equipamentos de Proteção Individual dentro do prazo de validade e armazenados corretamente são bem-vindas. Estamos agradecidos por qualquer ajuda oferecida para apoiar aqueles que precisam.</p>
                </div>
                {/* <div className="containerAnimado">
                    <div className="box">
                        <img src={medicamentos} className="fotoRemedio" alt='' />
                    </div>
                </div> 
            </div> */}

            <div className="divOk">

                {/* <h1 className="title"><b>Medicamentos impróprios</b> <br />para doação</h1>
                <ul className="uele">
                    <li> <AiOutlineCloseCircle style={{ marginRight: '20px', color: '#FF6961', fontSize: '20px' }} />Remédios fora do prazo de validade.</li>
                    <li> <AiOutlineCloseCircle style={{ marginRight: '20px', color: '#FF6961', fontSize: '20px' }} />Quando não for possível verificar a validade.</li>
                    <li> <AiOutlineCloseCircle style={{ marginRight: '20px', color: '#FF6961', fontSize: '20px' }} />Remédios que não foram armazenados de forma correta.</li>
                    <li> <AiOutlineCloseCircle style={{ marginRight: '20px', color: '#FF6961', fontSize: '20px' }} />Remédios fora da cartela de comprimidos.</li>
                </ul>
                <div className="divNaoOk">
                    <h1 className="title2">Descarte correto de <br /><b>medicamentos</b></h1>
                    <ul className="uele2">
                        <li> <LuAlertCircle style={{ marginRight: '20px', color: '#FFD700', fontSize: '20px' }} />Remédios vencidos não podem ser jogados no lixo comum.</li>
                        <li> <LuAlertCircle style={{ marginRight: '20px', color: '#FFD700', fontSize: '20px' }} />Encontre farmácias locais que aceitam remédios vencidos.</li>
                        <li> <LuAlertCircle style={{ marginRight: '20px', color: '#FFD700', fontSize: '20px' }} />Contate a Vigilância Sanitária da sua região.</li>
                        <li> <LuAlertCircle style={{ marginRight: '20px', color: '#FFD700', fontSize: '20px' }} />Confira no site da Anvisa algum ponto de descarte.</li>
                    </ul>
                </div> */}
                {/* <div className="armazeneRemedios">
                    <h1 className="title"><b>Armazene corretamente</b> <br /> seus medicamentos</h1>
                    <p>Você sabe como guardar remédios de forma correta? <br/>Leia as dicas abaixo:</p>
                    <ul className="uele">
                        <li> <AiOutlineCheckCircle style={{ marginRight: '15px', color: '#009000', fontSize: '20px' }} />Armazene em locais frescos e secos.</li>
                        <li> <AiOutlineCheckCircle style={{ marginRight: '15px', color: '#009000', fontSize: '20px' }} />Mantenha longe do alcance de crianças e pets.</li>
                        <li> <AiOutlineCheckCircle style={{ marginRight: '15px', color: '#009000', fontSize: '20px' }} />Não guarde junto de produtos de limpeza ou alimentos.</li>
                        <li> <AiOutlineCheckCircle style={{ marginRight: '15px', color: '#009000', fontSize: '20px' }} />Preserve as embalagens originais para checar a validade.</li>
                        <li> <AiOutlineCheckCircle style={{ marginRight: '15px', color: '#009000', fontSize: '20px' }} />Siga a orientação médica para remédios termolábeis.</li>
                    </ul>
                    {/* <div className="containerAnimado3">
                        <div className="box3">
                            <img src={farmacia} className="fotoRemedio3" alt='' />
                        </div>
                    </div> 
                </div> */}
                <div className="divSaibaOqDoar">
                    <h1 className="h1OqueDoar">O que <b>doar?</b></h1>

                    <ul>
                        <li><b>Medicamentos Básicos:</b> Inclua medicamentos comuns para resfriados, febres, dores, etc. <FiCheckCircle style={{ fontSize: '25px', marginLeft: '10px' }} /></li>
                        <li><b>Medicamentos Específicos:</b> Como aqueles para condições crônicas como diabetes, pressão alta, etc. <FiCheckCircle style={{ fontSize: '25px', marginLeft: '10px' }} /></li>
                        <li><b>Suplementos:</b> Inclua vitaminas e suplementos nutricionais. <FiCheckCircle style={{ fontSize: '25px', marginLeft: '10px' }} /></li>
                        <li><b>Material de Primeiros Socorros:</b> Curativos, pomadas e produtos para cuidados de feridas. <FiCheckCircle style={{ fontSize: '25px', marginLeft: '10px' }} /></li>
                    </ul>
                </div>
            </div>
            <Footer />
        </div >
    )
}

