import React, { useEffect, useState } from "react";
import Select from 'react-select';
import { FiCheckCircle } from 'react-icons/fi';
import './formulario.css';
import { Link, useNavigate } from 'react-router-dom';
import Header from "../../componentes/Header";
import Footer from "../../componentes/Footer";
import { async } from "q";
import { toast } from 'react-toastify';
import api from '../../services/api';

export default function Formulario() {
    const [tipoItem, setTipoItem] = useState("");
    const [nomeComercial, setNomeComercial] = useState('');
    const [dosagem, setDosagem] = useState([])
    const [forma, setForma] = useState('')
    const [formaSelecionada, setFormaSelecionada] = useState(0);
    const [dosagemSelecionada, setDosagemSelecionada] = useState(0);
    const [quantidadeDisponivel, setQuantidadeDisponivel] = useState('')
    const [validade, setValidade] = useState('')
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
    const navigate = useNavigate();

    const url = 'Doacao/';
    const handleChange = (e) => {
        const selectedValue = e.target.value;
        setTipoItem(selectedValue);
    };
    const handleNome = (e) => {
        setNomeComercial(e.target.value);
    }
    const handleDosagem = (selectedOption) => {
        if (selectedOption && selectedOption.value) {
            setDosagemSelecionada(selectedOption.value);
        }
    }
    const handleForma = (e) => {
        setFormaSelecionada(e.target.value);
        console.log(e.target.value);
    }
    const handlequantidade = (e) => {
        setQuantidadeDisponivel(e.target.value);
    }
    const handleValidade = (e) => {
        setValidade(e.target.value);
    }
    const handleCheckboxChange = (e) => {
        setIsCheckboxChecked(e.target.checked);

        if (!e.target.checked) {
            toast.warn("Você concorda que os medicamentos citados estão dentro da validade.");
        }
    };
    const handleObter = async () => {
        try {
            const response = await api.get(`Doacao/obter`);
            const responseData = response.data;
            setDosagem(responseData.dosagens)
            setForma(responseData.formasMedicamento)

        } catch (error) {


        }
    }
    const optionsDosagem = dosagem.map(op => ({
        value: op.codigo,
        label: op.descricao,
    }));

    return (
        <div>
            <div className="body-formulario">
                <h1>Formulário de Doação de <span><br />Medicamentos e Itens</span></h1>
                <p className="paragrafoF">Veja como é fácil registrar a sua doação de remédios:</p>
                <div className="checks">
                    <p className="checkp"><FiCheckCircle />Informe abaixo quais <strong>medicamentos dentro da validade</strong> você irá doar.</p>
                    <p className="checkp"><FiCheckCircle />Aguarde o nosso contato com detalhes sobre como entregar sua doação em nossos <strong>postos de coleta, em São Paulo - SP</strong>.</p>
                </div>
                <h6>Etapa 1 de 1</h6>
                <h3>Produto para doação</h3>
                <div className="box-campo">
                    <p>Tenha o item para doação em mãos para informar os dados corretamente. </p>
                    <div>
                        <label>Tipo de item*</label>
                        <select value={tipoItem} onChange={handleChange} className="selecao">
                            <option value="0">Selecione uma opção</option>
                            <option value="1">Medicamento</option>
                            <option value="2">Suplemento</option>
                            <option value="3">Item primeiro socorros</option>
                            <option value="4">Outros</option>
                        </select>
                        <label>Nome do Item*</label>
                        <input type="text" ></input>

                        <label>Descrição Detalhada*</label>
                        <textarea className="textarea" placeholder="Descreva o item, incluindo características como marca, modelo, e outras informações "></textarea>

                        <section>
                            <div>
                                <label>Forma do Item*</label>
                                <select value={tipoItem} onChange={handleChange} className="selecao">
                                    <option value="0">Selecione uma opção</option>
                                    <option value="1">Líquido</option>
                                    <option value="2">Capsula</option>
                                    <option value="3">Comprimido</option>
                                    <option value="4">Pomada</option>
                                    <option value="4">Outros</option>
                                </select>
                            </div>

                            <div>
                                <label>Dosagem*</label>
                                <input type="text" placeholder="Informe a dosagem ou concentração, se aplicável."></input>
                            </div>
                        </section>

                        <label>Data de Validade* (se aplicável)</label>
                        <input type="date" className="input" />

                        <section>
                            <div>
                                <label>Quantidade*</label>
                                <input type="number" />
                            </div>
                            <div>
                                <label>Necessidade de Armazenamento*</label>
                                <select >
                                    <option value="">Selecione...</option>
                                    <option value="temperatura ambiente">Temperatura Ambiente</option>
                                    <option value="refrigerado">Refrigerado</option>
                                    <option value="congelado">Congelado</option>
                                </select>
                            </div>
                        </section>

                        <section>
                            <div>
                                <label>Foto do Item*</label>
                                <input type="file" accept="image/*" />
                            </div>

                            <div>
                                <label>Condição do Item*</label>
                                <select >
                                    <option value="">Selecione...</option>
                                    <option value="novo">Novo</option>
                                    <option value="usado">Usado</option>
                                </select>
                            </div>
                        </section>
                    </div>
                </div>
                <label className="check">
                    <input type="checkbox" onChange={(e) => setIsCheckboxChecked(e.target.checked)} />Confirmo que os medicamentos citados foram armazenados corretamente e estão dentro do prazo de validade.
                </label>
                {<button className="confirmar" disabled={loadingAuth}>
                    {loadingAuth ? <div className="spinner-border-sm spinner-border" role="status"></div> : "Confirmar minha doação"}
                </button>}

            </div>
            <Footer />
        </div>
    )
}