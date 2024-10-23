import React, { useState, useEffect } from 'react';
import './table3.css';

export default function Table3({ botoesDeAcao = [], dados = [], colunasVisiveis = [], numeroDePagina, children }) {
    const [filtros, setFiltros] = useState({});
    const [colunas, setColunas] = useState([]);
    const [dadosFiltrados, setDadosFiltrados] = useState(dados);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [itensPorPagina, setItensPorPagina] = useState(numeroDePagina);
    const [ordenacao, setOrdenacao] = useState({ coluna: '', direcao: 'asc' });
    const [mostrarLegenda, setMostrarLegenda] = useState(false);
  
    useEffect(() => {
      const cols = React.Children.toArray(children)
        .filter(x => x.type.name === 'Columns')
        .map(item => item.props);
      setColunas(cols);
    }, [children]);
  
    useEffect(() => {
      const aplicarFiltrosEOrdenacao = () => {
        let resultado = dados.filter(item =>
          colunasVisiveis.every(coluna =>
            String(item[coluna] || "").toLowerCase().includes(String(filtros[coluna] || "").toLowerCase())
          )
        );
  
        if (ordenacao.coluna) {
          resultado.sort((a, b) => {
            if (a[ordenacao.coluna] < b[ordenacao.coluna]) return ordenacao.direcao === 'asc' ? -1 : 1;
            if (a[ordenacao.coluna] > b[ordenacao.coluna]) return ordenacao.direcao === 'asc' ? 1 : -1;
            return 0;
          });
        }
  
        setDadosFiltrados(resultado);
        setPaginaAtual(1);
      };
  
      aplicarFiltrosEOrdenacao();
    }, [filtros, dados, colunasVisiveis, ordenacao]);
  
    const handleAlterarFiltro = (e, nomeDaColuna) => {
      const { value } = e.target;
      setFiltros(filtrosAntigos => ({
        ...filtrosAntigos,
        [nomeDaColuna]: value
      }));
    };
  
    const handleOrdenar = (coluna) => {
      setOrdenacao(prev => ({
        coluna,
        direcao: prev.coluna === coluna && prev.direcao === 'asc' ? 'desc' : 'asc'
      }));
    };
  
    const indiceDoUltimoItem = paginaAtual * itensPorPagina;
    const indiceDoPrimeiroItem = indiceDoUltimoItem - itensPorPagina;
    const itensAtuais = dadosFiltrados.slice(indiceDoPrimeiroItem, indiceDoUltimoItem);
  
    const totalPaginas = Math.ceil(dadosFiltrados.length / itensPorPagina);
  
    const handleAlterarPagina = (numeroDaPagina) => {
      setPaginaAtual(numeroDaPagina);
    };
  
  
    return (
      <div className="table2">
        <div className="table2__header">
          <h2 className="table2__title">Tabela de Medicamentos</h2>
          <button 
            className="table2__legend-toggle"
            onClick={() => setMostrarLegenda(!mostrarLegenda)}
          >
            {mostrarLegenda ? 'Ocultar Legenda' : 'Mostrar Legenda'}
          </button>
        </div>
  
        {mostrarLegenda && (
          <div className="table2__legend">
            <h3 className="table2__legend-title">Legenda:</h3>
            <div className="table2__legend-section">
              <ul className="table2__legend-list">
                <li><span className="table2__legend-color table2__status-approved"></span>Verde: Aprovado</li>
                <li><span className="table2__legend-color table2__status-pending"></span>Amarelo: Pendente</li>
                <li><span className="table2__legend-color table2__status-rejected"></span>Vermelho: Reprovado</li>
              </ul>
            </div>
          </div>
        )}
  
        <div className="table2__container">
          <table className="table2__table">
            <thead>
              <tr>
                {colunas.map((coluna, index) => (
                  <th key={index} className="table2__th">
                    <div className="table2__th-content">
                      <span>{coluna.title}</span>
                      <button 
                        className="table2__sort-button"
                        onClick={() => handleOrdenar(coluna.header)}
                      >
                        {ordenacao.coluna === coluna.header ? (ordenacao.direcao === 'asc' ? '↑' : '↓') : '↕'}
                      </button>
                    </div>
                    <input
                      type="text"
                      className="table2__filter-input"
                      placeholder={`Filtrar ${coluna.title}`}
                      value={filtros[coluna.header] || ""}
                      onChange={(e) => handleAlterarFiltro(e, coluna.header)}
                    />
                  </th>
                ))}
                {botoesDeAcao.length > 0 && <th className="table2__th">Ações</th>}
              </tr>
            </thead>
            <tbody>
              {itensAtuais.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? 'table2__tr-even' : 'table2__tr-odd'}>
                  {colunas.map((coluna, colIndex) => (
                    <td key={colIndex} className="table2__td">
                      {item[coluna.header]}
                    </td>
                  ))}
                  {botoesDeAcao.length > 0 && (
                    <td className="table2__td">
                      {botoesDeAcao.map((botao, btnIndex) => (
                        <button
                          key={btnIndex}
                          className={`table2__action-button ${
                            typeof botao.className === "function" ? botao.className(item) : botao.className
                          }`}
                          onClick={() => botao.action(item)}
                        >
                          {typeof botao.label === "function" ? botao.label(item) : botao.label}
                        </button>
                      ))}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  
        <div className="table2__footer">
          <div className="table2__items-per-page">
            <span>Itens por página: </span>
            <select 
              value={itensPorPagina} 
              onChange={(e) => setItensPorPagina(Number(e.target.value))}
              className="table2__select"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>
          <div className="table2__pagination">
            <button
              onClick={() => handleAlterarPagina(1)}
              disabled={paginaAtual === 1}
              className="table2__pagination-button"
            >
              {'<<'}
            </button>
            <button
              onClick={() => handleAlterarPagina(Math.max(paginaAtual - 1, 1))}
              disabled={paginaAtual === 1}
              className="table2__pagination-button"
            >
              {'<'}
            </button>
            <span className="table2__page-info">Página {paginaAtual} de {totalPaginas}</span>
            <button
              onClick={() => handleAlterarPagina(Math.min(paginaAtual + 1, totalPaginas))}
              disabled={paginaAtual === totalPaginas}
              className="table2__pagination-button"
            >
              {'>'}
            </button>
            <button
              onClick={() => handleAlterarPagina(totalPaginas)}
              disabled={paginaAtual === totalPaginas}
              className="table2__pagination-button"
            >
              {'>>'}
            </button>
          </div>
        </div>
      </div>
    );
  }