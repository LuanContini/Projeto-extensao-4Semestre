-- DATABASE IF EXISTS controle_locacao_teste;
CREATE DATABASE  IF NOT EXISTS controle_locacao_teste;
USE controle_locacao_teste;

CREATE TABLE IF NOT EXISTS usuario (
	idUsuario INT AUTO_INCREMENT,
	nome VARCHAR(100) NOT NULL,
	cpf VARCHAR(11) UNIQUE NOT NULL, -- Validar tamanho do CPF como 11 digitos
	email VARCHAR(100) NOT NULL, -- Email deve conter um validador de email
	senha VARCHAR(50) NOT NULL, -- Armazenar com criptografia + salt
	dataNasc DATE, -- Validar idade minima ou datas posteriores a atual e se ajustar ao padrao (YYYY-MM-DD)
	telefone INT NOT NULL,
	data_cad TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	tipo ENUM('Administrador', 'Operador') NOT NULL DEFAULT ('Operador'), -- Tipo so pode ser armazenado com 1 desses 2 tipos
	imagem LONGBLOB,
	PRIMARY KEY(idUsuario),
    CHECK(LENGTH(nome) >= 3), -- Validar tamanho do nome é maior ou igual que 3 caracteres
	CHECK(LENGTH(telefone) >= 12) -- Validar telefone como maior ou igual a 12 Digitos
);

-- SELECT nome, DATE_FORMAT(data_nascimento, '%d/%m/%Y') AS data_nascimento_br FROM usuarios;

CREATE TABLE IF NOT EXISTS contratante (
    idContratante INT AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL, -- Email deve conter um validador de email
    telefone INT NOT NULL, -- Validar minimo de números
    imagem LONGBLOB,
    observacao VARCHAR(300),
	CHECK(LENGTH(nome) >= 3), -- Validar tamanho do nome é maior ou igual que 3 caracteres
    CHECK(LENGTH(telefone) >= 12), -- Validar telefone como maior ou igual a 12 Digitos
    PRIMARY KEY(idContratante)
);

CREATE TABLE IF NOT EXISTS pessoJuridica(
    idContratante INT NOT NULL,
    cnpj VARCHAR(14) UNIQUE NOT NULL, -- CNPJ Conter validador de numero e tamanho
    CHECK(LENGTH(cnpj) = 14), -- Validar cnpj é valido e se tem 14 digitos
    PRIMARY KEY(idContratante),
    FOREIGN KEY (idContratante) REFERENCES contratante(idContratante)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS pessoaFisica (
    idContratante INT NOT NULL,
    cpf VARCHAR(11) UNIQUE NOT NULL, -- CPF Conter validador no banco de numero e tamanho
    CHECK(LENGTH(cpf) = 11), -- Validar se é valido e contem 11 Digitos
    PRIMARY KEY(idContratante),
    FOREIGN KEY (idContratante) REFERENCES contratante(idContratante)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);  

CREATE TABLE IF NOT EXISTS contrato (
    idContrato INT AUTO_INCREMENT,
    tipo ENUM('Locacao', 'Evento') NOT NULL DEFAULT ('Locacao'), -- Tipo so pode ser armazenado com 1 desses valores
    valor_total DECIMAL(5,2) NOT NULL DEFAULT(0),
    cep VARCHAR(8) NOT NULL, -- Validador para se o cep tem exatamente 8 digitos
    localEvento VARCHAR(150) NOT NULL,
    localRetirada VARCHAR(150) NOT NULL,
    dataHora_Ini DATETIME NOT NULL,
    dataHora_Term DATETIME NOT NULL,
    desc_empregados VARCHAR(300) NOT NULL,
    idUsuario INT NOT NULL,
    idContratante INT NOT NULL,
    PRIMARY KEY(idContrato),
    FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
    FOREIGN KEY (idContratante) REFERENCES Contratante(idContratante)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

CREATE TABLE grupo (
	idGrupo INT AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    categoria VARCHAR(100) NOT NULL,
    pregoGrupo DECIMAL(5,2),
	CHECK(LENGTH(nome) >= 3), -- Validar tamanho do nome é maior ou igual que 3 caracteres
    PRIMARY KEY (idGrupo)
);

CREATE TABLE IF NOT EXISTS reserva(
	idReserva INT AUTO_INCREMENT,
    dataHora_loca TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    idGrupo INT NOT NULL,
    idContrato INT NOT NULL,
    PRIMARY KEY(idReserva),
    FOREIGN KEY (idGrupo) REFERENCES grupo(idGrupo)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
    FOREIGN KEY (idContrato) REFERENCES contrato(idContrato)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS itens (
	idItens INT AUTO_INCREMENT,
    codBarras VARCHAR(13) NOT NULL, -- Validar se o codigo de barras é maior que 12 BACK-END
    dataLocacao DATETIME NOT NULL,
    precoItem DECIMAL(10,2) NOT NULL,
	imagem LONGBLOB,
    idGrupo INT NOT NULL,
    CHECK(LENGTH(codBarras) >= 12), -- Validar se o codigo de barras é maior que 12
    PRIMARY KEY (idItens),
    FOREIGN KEY (idGrupo) REFERENCES grupo(idGrupo)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS manutencao (
	idManutencao INT AUTO_INCREMENT,
    motivo VARCHAR(300) NOT NULL,
    data_Inic DATETIME NOT NULL,
    data_Retorno DATETIME NOT NULL,
    responsavel VARCHAR(100) NOT NULL,
    PRIMARY KEY (idManutencao)
);

CREATE TABLE IF NOT EXISTS historicoManutencao (
	idHistorico INT AUTO_INCREMENT,
    data_Inic DATETIME NOT NULL,
    data_Term DATETIME NOT NULL,
    idManutencao INT NOT NULL,
    idItens INT NOT NULL,
    PRIMARY KEY (idHistorico),
    FOREIGN KEY (idManutencao) REFERENCES manutencao(idManutencao)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
    FOREIGN KEY (idItens) REFERENCES itens(idItens)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);