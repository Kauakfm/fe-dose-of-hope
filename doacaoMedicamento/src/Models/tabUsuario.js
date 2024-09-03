export default class tabUsuario {
    constructor(nome, email, senha, cpf, dataNascimento, tipoUsuarioCodigo = 2, unidadeCodigo = 1) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.cpf = cpf.replace(/[.-]/g, '');  
        this.dataNascimento = dataNascimento;
        this.tipoUsuarioCodigo = tipoUsuarioCodigo;
        this.unidadeCodigo = unidadeCodigo;
        this.dataCriacao = "2024-08-15";
        this.dataEmailEnviado = "2024-08-15";
    }
}