import React from "react";
import './contribuir.css';
import Pix from '../../imagens/pix.png';
import qrCode from '../../imagens/qrcode.jpg';
import { BiDonateHeart } from 'react-icons/bi';
import Visa from '../../imagens/visa.png';
import MasterCard from '../../imagens/mastercard.png';
import Elo from '../../imagens/elo.png';
import Hipercard from '../../imagens/hipercard.png';
import { FiAlertCircle } from 'react-icons/fi'
import pagSeguro from '../../imagens/pagseguro.png'
import Footer from '../../componentes/Footer';



export default function Contribuir() {
  return (
    <div>
      <div className='body-pagamento-doar'>
        <BiDonateHeart style={{ fontSize: '45px', marginTop: '150px', marginBottom: '10px' }} />
        <h3>Escolha como você quer doar</h3>
        <p className='p1'>Para <b>ajudar</b> com qualquer valor é fácil:</p>
        <div className="accordion" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                <div>
                  <p>Pix</p>
                  <img src={Pix} className='pix' />
                </div>
              </button>
            </h2>
            <div id="collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
              <div className="accordion-body">
                <img src={qrCode} />
                <div>
                  <p>Chave pix: <span>CNPJ: 50.874.861/0001-77</span></p>
                  <p>Após efetuar a doação, por gentileza, envie-nos o comprovante pelo WhatsApp 11 5198-7389 . Dessa forma, poderemos conhecê-lo(a) melhor e registrar sua contribuição em nossos registros.</p>
                  <p>Muito obrigado</p>
                </div>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                <div className='disabled'>
                  <p>Boleto</p>
                  <FiAlertCircle style={{ marginLeft: '10px' }} />
                  <span>Indisponível no momento</span>
                </div>
              </button>
            </h2>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                <div>
                  <p>Cartão de crédito</p>
                </div>
                <div className='cartoes-credito'>
                  <img src={Visa} />
                  <img src={MasterCard} />
                  <img src={Elo} />
                  <img src={Hipercard} />
                </div>
              </button>
            </h2>
            <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
              <div className="accordion-body">
                <div className='credito-formulario'>
                  <h3>Informe os dados do seu cartão de crédito </h3>
                  <div className='row formulario-pagamento'>
                    <div className='col-md-8'>
                      <input type="text" placeholder="Nome completo" />
                    </div>
                    <div className='col-md-4'>
                      <div className='pagamento-doar-valor'>
                        R$
                        <input type="text" min="1" maxlength="13" placeholder='Valor' />
                      </div>
                    </div>
                    <div className='col-md-5'>
                      <input type="text" placeholder="Número do Cartão" />
                    </div>
                    <div className='col-md-4'>
                      <input type="text" placeholder="Data de Validade" maxlength="5" />
                    </div>
                    <div className='col-md-3'>
                      <input type="text" maxlength="3" placeholder="CVV" />
                    </div>
                    <div className='col-md-4'>
                      <input type="text" placeholder="CEP" maxLength={9} />
                    </div>
                    <div className='col-md-4'>
                      <input type="text" placeholder="Nº residencial" maxLength={9} />
                    </div>
                    <div className='col-md-4'>
                      <select>
                        <option>Tipo de doador</option>
                        <option >Pessoa Física</option>
                        <option >Pessoa Jurídica</option>
                      </select>
                    </div>
                    <div className='col-md-4'>
                      <input type="text" placeholder="CPF" />
                    </div>
                    <div className='col-md-4'>
                      <input type="tel" placeholder="Telefone" />
                    </div>
                    <div className='col-md-4'>
                      <select >
                        <option >Gênero</option>
                        <option >Feminino</option>
                        <option >Masculino</option>
                      </select>
                    </div>
                    <div className='col-md-5'>
                      <input type='text' placeholder='Data de Nascimento' maxLength={10} />
                    </div>
                    <div className='col-md-7'>
                      <input type="email" placeholder='E-mail' />
                    </div>
                    <div className='col-md-12'>
                      <img src={pagSeguro} style={{ margin: "2% 0" }} />
                    </div>
                    <button type="submit">Enviar</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
