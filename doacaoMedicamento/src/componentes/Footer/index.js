import React from "react";
import './footer.css';
import Wpp from '../../imagens/wpp.png';
import Email from '../../imagens/email.png';
import Insta from '../../imagens/insta.png';


export default function Footer(){
    return(
        <div className="footer">
            <main>
                <div>
                    <h1 className="title">Dose de Esperança</h1>
                    <p className="paragrafo">Criado por estudantes de Tecnologia, a Dose de Esperança leva atendimento médico humanizado e recorrente às populações mais vulneráveis da sociedade.</p>
                </div>
                <div className="ondeEstamos">
                    <h1>Onde estamos</h1>
                    <p>Barueri - SP</p>
                    
                </div>
                <div className="contato">
                    <h1>Contato</h1>
                   <img src={Wpp}/> <p>Whatsapp</p>
                   <img src={Email}/> <p>dosedeesperanca@gmail.com</p>
                   <img src={Insta}/> <p>Instagram</p>
                </div>
            </main>
            <section>
                <p>Copyright©2023, Dose de Esperança. Todos os direitos reservados</p>
            </section>
        </div>
    )
}