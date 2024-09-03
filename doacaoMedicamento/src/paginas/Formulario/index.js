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

    const renderizarCampos = (tipoItem) => {
        if (tipoItem == "1") {
            return (
                <div>
                    <label>Nome do medicamento*</label>
                    <input type="text" placeholder="Nome comercial ou princípio ativo" value={nomeComercial} onChange={handleNome} />
                    <section>
                        <div>
                            <label>Concentração do medicamento*</label>
                            <Select className="custom-select" value={optionsDosagem.find((option) => option.value === dosagemSelecionada)} onChange={handleDosagem} options={optionsDosagem} placeholder="Selecione uma dosagem" isSearchable />
                        </div>
                        <div>
                            <label>Forma farmacêutica</label>
                            <select value={formaSelecionada} onChange={handleForma}>
                                <option key={0} value={0}>Selecione uma opção</option>
                                {forma.map(op => (
                                    <option key={op.codigo} value={op.codigo}>{op.descricao}</option>
                                ))}
                            </select>
                        </div>
                    </section>
                    <section>
                        <div>
                            <label>Quantidade disponível*</label>
                            <input type="number" placeholder="N° de unidades" value={quantidadeDisponivel} onChange={handlequantidade} />
                        </div>
                        <div>
                            <label>Prazo de validade*</label>
                            <input type="date" placeholder="mm/aa" value={validade} onChange={handleValidade} />
                        </div>
                    </section>
                </div>
            );
        } else if (tipoItem === "2") {
            return (
                <div>
                    <label>Nome do suplemento*</label>
                    <input type="text" placeholder="Nome do suplemento" value={nomeComercial} onChange={handleNome} />
                    <label>Quantidade disponível*</label>
                    <input type="number" placeholder="N° de unidades" value={quantidadeDisponivel} onChange={handlequantidade} />
                    <label>Prazo de validade*</label>
                    <input type="date" placeholder="mm/aa" value={validade} onChange={handleValidade} />
                </div>
            );
        } else if (tipoItem === "3") {
            return (
                <div>
                    <label>Nome do item de primeiros socorros*</label>
                    <input type="text" placeholder="Nome do item" value={nomeComercial} onChange={handleNome} />
                    <label>Quantidade disponível*</label>
                    <input type="number" placeholder="N° de unidades" value={quantidadeDisponivel} onChange={handlequantidade} />
                    <label>Prazo de validade*</label>
                    <input type="date" placeholder="mm/aa" value={validade} onChange={handleValidade} />
                </div>
            );
        } else if (tipoItem === "4") {
            return (
                <div>
                    <label>Nome do item*</label>
                    <input type="text" placeholder="Nome do item" value={nomeComercial} onChange={handleNome} />
                    <label>Quantidade disponível*</label>
                    <input type="number" placeholder="N° de unidades" value={quantidadeDisponivel} onChange={handlequantidade} />
                    <label>Prazo de validade*</label>
                    <input type="date" placeholder="mm/aa" value={validade} onChange={handleValidade} />
                </div>
            );
        }
        return null;
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
    
    const handleDoar = async () => {
        try {
            if (tipoItem == "0" || tipoItem == "" || tipoItem == null) {
                toast.warn("Selecione um item para realizar a doação");
                return;
            }

            if (tipoItem == "1" && (nomeComercial == "" || nomeComercial == null)) {
                toast.warn("Digite o nome do medicamento");
                return;
            }

            if (tipoItem == "1" && (dosagemSelecionada === 0 || dosagem == null || dosagemSelecionada == "0")) {
                toast.warn("Por favor, escolha a dosagem do medicamento.");
                return;
            }

            if (tipoItem == "1" && (formaSelecionada === 0 || forma == null || formaSelecionada == "0")) {
                toast.warn("Por favor, escolha a forma farmacêutica.");
                return;
            }

            if (tipoItem == "1" && (quantidadeDisponivel == 0 || quantidadeDisponivel == "")) {
                toast.warn("Por favor, digite a quantidade de medicamentos.");
                return;
            }

            if (tipoItem == "1" && (validade == null || validade == "")) {
                toast.warn("Por favor, digite a validade do medicamento.");
                return;
            }

            if (tipoItem == "2" && (nomeComercial == "" || nomeComercial == null)) {
                toast.warn("Por favor, digite o nome do medicamento");
                return;
            }

            if (tipoItem == "2" && (quantidadeDisponivel == 0 || quantidadeDisponivel == "")) {
                toast.warn("Por favor, digite a quantidade de medicamentos.");
                return;
            }

            if (tipoItem == "2" && (validade == null || validade == "")) {
                toast.warn("Por favor, digite a validade do medicamento.");
                return;
            }

            if (tipoItem == "3" && (nomeComercial == "" || nomeComercial == null)) {
                toast.warn("Por favor, digite o nome do medicamento");
                return;
            }

            if (tipoItem == "3" && (quantidadeDisponivel == 0 || quantidadeDisponivel == "")) {
                toast.warn("Por favor, digite a quantidade de medicamentos.");
                return;
            }

            if (tipoItem == "3" && (validade == null || validade == "")) {
                toast.warn("Digite a validade do medicamento.");
                return;
            }

            if (tipoItem == "4" && (nomeComercial == "" || nomeComercial == null)) {
                toast.warn("Digite o nome do medicamento");
                return;
            }

            if (tipoItem == "4" && (quantidadeDisponivel == 0 || quantidadeDisponivel == "")) {
                toast.warn("Digite a quantidade de medicamentos.");
                return;
            }

            if (tipoItem == "4" && (validade == null || validade == "")) {
                toast.warn("Digite a validade do medicamento.");
                return;
            }
            if (!isCheckboxChecked) {
                toast.warn("Você deve concordar com os termos para continuar.");
                return;
            }
            setLoadingAuth(true);
            const resposne = await api.post(url, {
                tipoProdutoCodigo: tipoItem, status: false, nome: nomeComercial, dosagem: dosagemSelecionada, forma: formaSelecionada, qntd: quantidadeDisponivel, validade: validade
            })
            if (resposne.data.mensagem === "doação realizada com sucesso") {
                setLoadingAuth(false);
                setTipoItem('')
                setNomeComercial('')
                setDosagem([])
                setForma('')
                setFormaSelecionada()
                setDosagemSelecionada()
                setQuantidadeDisponivel()
                setValidade()
                toast.success("Doação realizada com sucesso! Por favor, verifique a caixa de entrada do seu e-mail.")
            }
        } catch (error) {

        }
    }

    return (
        <div>
            <div className="body-formulario">
                <h1>Quero doar <span>qualidade de vida</span></h1>
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
                    </div>
                    {renderizarCampos(tipoItem)} {/* Chame a função renderizarCampos com tipoItem como argumento */}

                    <section>
                        <div>
                            <label></label>
                        </div>
                    </section>
                </div>
                <label className="check">
                    <input type="checkbox" onChange={(e) => setIsCheckboxChecked(e.target.checked)} />Confirmo que os medicamentos citados foram armazenados corretamente e estão dentro do prazo de validade.
                </label>
                {<button className="confirmar" onClick={handleDoar} disabled={loadingAuth}>
                    {loadingAuth ? <div className="spinner-border-sm spinner-border" role="status"></div> : "Confirmar minha doação"}
                </button>}

            </div>
            {renderizarCampos()}
            <Footer />
        </div>
    )
}