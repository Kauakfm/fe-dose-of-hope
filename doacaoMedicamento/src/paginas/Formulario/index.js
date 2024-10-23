import React, { useState, useEffect } from "react";
import { FiCheckCircle } from 'react-icons/fi';
import './formulario.css';
import { useNavigate, useLocation } from 'react-router-dom';
import Footer from "../../componentes/Footer";
import Radio from "../../componentes/Radio";
import { createFormDataMedicamentos, mapTipoItem, mapFormaItem, mapCondicaoItem, mapNecessidadeArmazenamento } from "../../Auth/permissions";
import { object } from "zod";
import { toast } from "react-toastify";

export default function Formulario() {
    const [tipoItem, setTipoItem] = useState('0')
    const [formaItem, setFormaItem] = useState('0')
    const [dosagem, setDosagem] = useState('')
    const [dataValidade, setDataValidade] = useState('')
    const [nomeItem, setNomeItem] = useState('')
    const [condicaoItem, setCondicaoItem] = useState('')
    const [quantidade, setQuantidade] = useState(0)
    const [necessidadeArmazenamento, setNecessidadeArmazenamento] = useState(0)
    const [descricaoDetalhada, setDescricaoDetalhada] = useState('')
    const [isCheckBoxChecked, setIsCheckBoxChecked] = useState(false)
    const [loadingAuth, setLoadingAuth] = useState(false)
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const location = useLocation()

    const handleFormPreenchido = () => {
        if (!validateFields())
            return

        if (!isCheckBoxChecked)
            return toast.warn('Preencha o campo de confirmação indicando que o medicamento não está vencido!');

        const objMed = createFormDataMedicamentos(
            tipoItem,
            nomeItem,
            formaItem,
            condicaoItem,
            dosagem,
            quantidade,
            dataValidade,
            necessidadeArmazenamento,
            descricaoDetalhada
        );

        objMed.tipoItemText = mapTipoItem(tipoItem);
        objMed.formaItemText = mapFormaItem(formaItem);
        objMed.condicaoItemText = mapCondicaoItem(condicaoItem);
        objMed.necessidadeArmazenamentoText = mapNecessidadeArmazenamento(necessidadeArmazenamento);

        const objMedSerizalizado = JSON.stringify(objMed)
        sessionStorage.setItem('formularioMedicamento', objMedSerizalizado);

        navigate('uploadMedicamento')
    }


    useEffect(() => {
        const dadosSalvos = sessionStorage.getItem('formularioMedicamento');
        if (dadosSalvos) {
            const dados = JSON.parse(dadosSalvos);
            setTipoItem(dados.tipoItem || '');
            setNomeItem(dados.nomeItem || '');
            setFormaItem(dados.formaItem || 0);
            setCondicaoItem(dados.condicaoItem || '');
            setDosagem(dados.dosagem || '');
            setQuantidade(dados.quantidade || 0);
            setDataValidade(dados.dataValidade || '');
            setNecessidadeArmazenamento(dados.necessidadeArmazenamento || 0);
            setDescricaoDetalhada(dados.descricaoDetalhada || '');
        }
    }, []);

    const validateFields = () => {
        let isValid = true;
        const newErrors = {};

        if (tipoItem === '0' || !tipoItem) {
            isValid = false;
            newErrors.tipoItem = "Selecione o tipo de item.";
        }

        if (!nomeItem) {
            isValid = false;
            newErrors.nomeItem = "Nome do item é obrigatório.";
        }

        if (!quantidade || quantidade <= 0) {
            isValid = false;
            newErrors.quantidade = "Quantidade é obrigatória.";
        }

        if (!formaItem || formaItem === '0') {
            isValid = false;
            newErrors.formaItem = "Selecione a forma farmacêutica.";
        }

        if (!condicaoItem) {
            isValid = false;
            newErrors.condicaoItem = "Selecione se o item é para adulto ou pediátrico.";
        }

        if (!dataValidade) {
            isValid = false;
            newErrors.dataValidade = "Data de validade é obrigatória.";
        }

        if (dataValidade) {
            const dataAtual = new Date();
            const [ano, mes] = dataValidade ? dataValidade.split('-') : [];
            const dataDigitada = new Date(ano, mes - 1);

            if (dataDigitada < new Date(dataAtual.getFullYear(), dataAtual.getMonth())) {
                isValid = false;
                newErrors.dataValidade = "A data de validade não pode ser anterior ao mês atual.";
            }
        }

        if (!dosagem) {
            isValid = false;
            newErrors.dosagem = "Dosagem é obrigatória.";
        }

        if (!necessidadeArmazenamento) {
            isValid = false;
            newErrors.necessidadeArmazenamento = "Necessidade de armazenamento é obrigatória.";
        }

        if (!descricaoDetalhada) {
            isValid = false;
            newErrors.descricaoDetalhada = "Descrição detalhada é obrigatória.";
        }

        setErrors(newErrors);
        return isValid;
    };

    const ValidarDosagem = (valor) => {
        const dosagemValida = /^\d+(\.\d+)?(mg|g|ml)$/;

        if (dosagemValida.test(valor))
            console.log('Valido => ', valor)
        else
            console.error('Invalido => ', valor)
    }

    const handleValidaDosagemBlur = (e) => {
        const valor = e.target.value;
        ValidarDosagem(valor);
    };

    return (
        <div>
            <div className="body-formulario">
                <h1>Formulário de Doação de <span><br />Medicamentos e Itens</span></h1>
                <p className="paragrafoF">Veja como é fácil registrar a sua doação de remédios:</p>
                <div className="checks">
                    <p className="checkp"><FiCheckCircle />Informe abaixo quais <strong>medicamentos dentro da validade</strong> você irá doar.</p>
                    <p className="checkp"><FiCheckCircle />Aguarde o nosso contato com detalhes sobre como entregar sua doação em nossos <strong>postos de coleta, em São Paulo - SP</strong>.</p>
                </div>
                <h3>Produto para doação</h3>
                <h6><Radio currentStep={0} /></h6>
                <div className="box-campo">
                    <p>Tenha o item para doação em mãos para informar os dados corretamente. </p>
                    <div>
                        <div className="body-formulario-row">
                            <div className="body-formulario-colunas">
                                <label>Tipo de item*</label>
                                <select value={tipoItem} onChange={(e) => setTipoItem(e.target.value)} className="selecao">
                                    <option value="0">Selecione uma opção</option>
                                    <option value="1">Medicamento</option>
                                    <option value="2">Suplemento</option>
                                    <option value="3">Item primeiro socorros</option>
                                    <option value="4">Outros</option>
                                </select>
                                {errors.tipoItem && <span style={{ color: '#FE6E78' }}>{errors.tipoItem}</span>}
                            </div>
                            <div className="body-formulario-colunas">
                                <label>Nome do Item*</label>
                                <input type="text" placeholder={'Digite o nome do item'} value={nomeItem} onChange={(e) => setNomeItem(e.target.value)}></input>
                                {errors.nomeItem && <span style={{ color: '#FE6E78' }}>{errors.nomeItem}</span>}
                            </div>
                        </div>
                        <div className="body-formulario-row">
                            <div className="body-formulario-colunas">
                                <label>Forma Farmacêutica: </label>
                                <select value={formaItem} onChange={(e) => setFormaItem(e.target.value)} className="selecao">
                                    <option value="0">Selecione uma opção</option>
                                    <option value="1">Drágeas</option>
                                    <option value="2">Líquido</option>
                                    <option value="3">Gotas</option>
                                    <option value="4">Xarope</option>
                                    <option value="5">Creme</option>
                                    <option value="6">Pomada</option>
                                    <option value="7">Supositório</option>
                                    <option value="8">Spray</option>
                                    <option value="9">Óvulo</option>
                                    <option value="10">Aerossóis</option>
                                    <option value="11">Colírios</option>
                                    <option value="11">Suspensão Oral</option>
                                    <option value="12">Otológicos</option>
                                </select>
                                {errors.formaItem && <span style={{ color: '#FE6E78' }}>{errors.formaItem}</span>}
                            </div>
                            <div className="body-formulario-colunas">
                                <label>Ad/Ped</label>
                                <select value={condicaoItem} onChange={(e) => setCondicaoItem(e.target.value)}>
                                    <option value="0">Selecione...</option>
                                    <option value="1">Adulto</option>
                                    <option value="2">Pediátrico</option>
                                </select>
                                {errors.condicaoItem && <span style={{ color: '#FE6E78' }}>{errors.condicaoItem}</span>}
                            </div>
                        </div>
                        <div className="body-formulario-row">
                            <div className="body-formulario-colunas">
                                <label>Dosagem*</label>
                                <input type="text" placeholder="Informe a dosagem ou concentração, se aplicável." value={dosagem} onChange={(e) => setDosagem(e.target.value)} onBlur={handleValidaDosagemBlur} />
                                {errors.dosagem && <span style={{ color: '#FE6E78' }}>{errors.dosagem}</span>}
                            </div>
                            <div className="body-formulario-colunas">
                                <label>Quantidade*</label>
                                <input type="number" placeholder="Informe a quantidade" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} />
                                {errors.quantidade && <span style={{ color: '#FE6E78' }}>{errors.quantidade}</span>}
                            </div>
                        </div>
                        <div className="body-formulario-row">
                            <div className="body-formulario-colunas">
                                <label>Data de Validade* (se aplicável)</label>
                                <input type="month" className="input" placeholder="MM/YYYY" value={dataValidade} onChange={(e) => setDataValidade(e.target.value)} />
                                {errors.dataValidade && <span style={{ color: '#FE6E78' }}>{errors.dataValidade}</span>}
                            </div>
                            <div className="body-formulario-colunas">
                                <label>Necessidade de Armazenamento*</label>
                                <select value={necessidadeArmazenamento} onChange={(e) => setNecessidadeArmazenamento(e.target.value)}>
                                    <option value="0">Selecione...</option>
                                    <option value="1">Temperatura Ambiente</option>
                                    <option value="2">Refrigerado</option>
                                    <option value="3">Congelado</option>
                                </select>
                                {errors.necessidadeArmazenamento && <span style={{ color: '#FE6E78' }}>{errors.necessidadeArmazenamento}</span>}
                            </div>
                        </div>
                        <label>Descrição Detalhada*</label>
                        <textarea className="textarea" placeholder="Descreva o item, incluindo características como marca, modelo, e outras informações " value={descricaoDetalhada} onChange={(e) => setDescricaoDetalhada(e.target.value)}></textarea>
                        {errors.descricaoDetalhada && <span style={{ color: '#FE6E78' }}>{errors.descricaoDetalhada}</span>}
                    </div>
                </div>
                <label className="check">
                    <input type="checkbox" onChange={(e) => setIsCheckBoxChecked(e.target.checked)} />Confirmo que os medicamentos citados foram armazenados corretamente e estão dentro do prazo de validade.
                </label>
                {<button className="confirmar" disabled={loadingAuth} onClick={handleFormPreenchido}>
                    {loadingAuth ? <div className="spinner-border-sm spinner-border" role="status"></div> : "Confirmar minha doação"}
                </button>}

            </div>
            <Footer />
        </div >
    )
}