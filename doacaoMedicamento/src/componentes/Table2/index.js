import React, { useState, useEffect } from "react";
import Columns from "./Columns";
import './table2.css'

export default function Tabela2({ botoesDeAcao = [], dados = [], colunasVisiveis = [], numeroDePagina, children }) {
    const [filtros, setFiltros] = useState({});
    const [colunas, serColunas] = useState(React.Children.toArray(children).filter(x => x.type === Columns).map(item => item.props))
    const [dadosFiltrados, setDadosFiltrados] = useState(dados);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [itensPorPagina] = useState(numeroDePagina);

    useEffect(() => {
        const aplicarFiltros = () => {
            const novosDadosFiltrados = dados.filter(item =>
                colunasVisiveis.every(coluna =>
                    String(item[coluna] || "").toLowerCase().includes(String(filtros[coluna] || "").toLowerCase())
                )
            );
            setDadosFiltrados(novosDadosFiltrados);
            setPaginaAtual(1);
        };

        aplicarFiltros();
    }, [filtros, dados, colunasVisiveis]);

    const handleAlterarFiltro = (e, nomeDaColuna) => {
        const { value } = e.target;
        setFiltros(filtrosAntigos => ({
            ...filtrosAntigos,
            [nomeDaColuna]: value
        }));
    };

    const indiceDoUltimoItem = paginaAtual * itensPorPagina;
    const indiceDoPrimeiroItem = indiceDoUltimoItem - itensPorPagina;
    const itensAtuais = dadosFiltrados.slice(indiceDoPrimeiroItem, indiceDoUltimoItem);

    const handleAlterarPagina = (numeroDaPagina) => {
        setPaginaAtual(numeroDaPagina);
    };

    const totalPaginas = Math.ceil(dadosFiltrados.length / itensPorPagina);

    return (
        <div>
            <table className="tabela">
                <thead>
                    <tr>
                        {colunas.map((coluna, index) => (
                            <th key={index}>
                                {coluna.title}
                                <br />
                                <div className="input-compacto-container">
                                    <input
                                        type="text"
                                        style={{backgroundColor: "transparent", color: "#FFF" }}
                                        placeholder={`Filtrar ${coluna.title}`}
                                        value={filtros[coluna.header] || ""}
                                        onChange={(e) => handleAlterarFiltro(e, coluna.header)}
                                    />
                                </div>
                            </th>
                        ))}
                        {botoesDeAcao.length > 0 && <th>Ações</th>}
                    </tr>
                </thead>
                <tbody>
                    {itensAtuais.map((item, index) => (
                        <tr key={index}>
                            {colunas.map((coluna, colIndex) => (
                                <td key={colIndex}>{item[coluna.header]}</td>
                            ))}
                            {botoesDeAcao.length > 0 && (
                                <td>
                                    {botoesDeAcao.map((botao, btnIndex) => (
                                        <button
                                            key={btnIndex}
                                            className={botao.className || "btn"}
                                            onClick={() => botao.action(item)}
                                        >
                                            {botao.label}
                                        </button>
                                    ))}
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="tabela2-paginacao">
                {Array.from({ length: totalPaginas }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handleAlterarPagina(index + 1)}
                        className={`tabela2-botao-pagina ${paginaAtual === index + 1 ? 'ativo' : ''}`}
                        aria-label={`Página ${index + 1}`}
                        aria-current={paginaAtual === index + 1 ? 'page' : undefined}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}
