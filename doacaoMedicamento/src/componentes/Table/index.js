import React, { useState } from "react";

export default function Table({ data }) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const body = data.body;
    const colunas = data.columns;

    let filters = {};
    let columns = colunas.map((col, index) => {
        if (!col.disableFilter) {
            filters[Object.keys(body[0])[index]] = "";
        }
        return { ...col, index };
    });

    const [filtros, setFiltros] = useState(filters);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const itemsFiltrados = body.filter(item => {
        return columns.every(column => {
            if (column.isButton || column.disableFilter)
                return true;
            return String(item[Object.keys(item)[column.index]]).toLowerCase()
            .includes(String(filtros[Object.keys(body[0])[column.index]]).toLowerCase());
        });
    });

    const currentItems = itemsFiltrados.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFiltros({ ...filtros, [name]: value });
    };

    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        {columns.map((col, index) => (
                            <th key={index}>
                                {!col.disableFilter && (
                                    <input
                                        type="text"
                                        placeholder={`Pesquisar ${col.label}`}
                                        name={Object.keys(body[0])[col.index]}
                                        value={filtros[Object.keys(body[0])[col.index]]}
                                        onChange={handleInputChange}
                                    />
                                )}
                                {col.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((item, rowIndex) => (
                        <tr key={rowIndex}>
                            {columns.map((col, colIndex) => (
                                <td key={colIndex}>
                                    {col.isButton ? (
                                        <button onClick={() => col.onClick(item)}>{col.label}</button>
                                    ) : (
                                        item[Object.keys(item)[col.index]]
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                {Array.from({ length: Math.ceil(itemsFiltrados.length / itemsPerPage) }, (_, index) => (
                    <button key={index} onClick={() => paginate(index + 1)}>
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}
