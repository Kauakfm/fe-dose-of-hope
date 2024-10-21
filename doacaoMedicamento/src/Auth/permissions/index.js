export const permissions = {
    1: {
        inicio: true,
        contribuir: true,
        doacao: true,
        chat: true,
        administrativo: true,
    },
    2: {
        inicio: true,
        contribuir: true,
        doacao: true,
        chat: false,
        administrativo: false,
    }
}

export const RotasSignalR = {
    1: "https://localhost:7277/chat",
    2: "https://www.webapiesperanca.online/webApiNet8/chat"
}

export function createFormDataMedicamentos(tipoItem, nomeItem, formaItem, condicaoItem, dosagem, quantidade, dataValidade, necessidadeArmazenamento, descricaoDetalhada) {
    return {
        tipoItem,
        nomeItem,
        formaItem,
        condicaoItem,
        dosagem,
        quantidade,
        dataValidade,
        necessidadeArmazenamento,
        descricaoDetalhada
    };
}

export const mapTipoItem = (value) => {
    switch (value) {
        case '1': return 'Medicamento';
        case '2': return 'Suplemento';
        case '3': return 'Item primeiro socorros';
        case '4': return 'Outros';
        default: return '';
    }
};

export const mapFormaItem = (value) => {
    switch (value) {
        case '1': return 'Drágeas';
        case '2': return 'Líquido';
        case '3': return 'Gotas';
        case '4': return 'Xarope';
        case '5': return 'Creme';
        case '6': return 'Pomada';
        case '7': return 'Supositório';
        case '8': return 'Spray';
        case '9': return 'Óvulo';
        case '10': return 'Aerossóis';
        case '11': return 'Colírios';
        case '12': return 'Suspensão Oral';
        case '13': return 'Otológicos';
        default: return '';
    }
};

export const mapCondicaoItem = (value) => {
    switch (value) {
        case '1': return 'Adulto';
        case '2': return 'Pediátrico';
        default: return '';
    }
};

export const mapNecessidadeArmazenamento = (value) => {
    switch (value) {
        case '1': return 'Temperatura Ambiente';
        case '2': return 'Refrigerado';
        case '3': return 'Congelado';
        default: return '';
    }
};


