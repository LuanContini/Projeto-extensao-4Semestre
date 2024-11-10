/*View para listar itens que não foram reservados:*/

DROP VIEW IF EXISTS view_itens_disponiveis;

CREATE VIEW view_itens_disponiveis AS
SELECT i.idItem, i.nome, i.categoria, i.preco_loca, g.nome AS grupo
FROM item i
JOIN grupo g ON i.idGrupo = g.idGrupo
WHERE i.idItem NOT IN (
    SELECT r.idReserva
    FROM reserva r
    WHERE r.data_devol IS NULL
);

/*View para listar as reservas ativas e os detalhes do contrato e grupo:*/

DROP VIEW IF EXISTS view_contratos_ativos;

CREATE VIEW view_contratos_ativos AS
SELECT idContrato, tipo, localEven, apelido, idUsuario, idContratante
FROM contrato
WHERE idContrato IN (
    SELECT idContrato
    FROM locacao
    WHERE data_locacao >= CURDATE() AND (data_reserva <= CURDATE() OR data_reserva IS NULL)
);

/*View para listar todos os contratos com os detalhes do usuário e do contratante:*/

DROP VIEW IF EXISTS view_contratos_usuarios_contratantes;

CREATE VIEW view_contratos_usuarios_contratantes AS
SELECT c.idContrato, c.tipo, c.localEven, c.cep, c.apelido,
       u.nome AS nomeUsuario, u.email AS emailUsuario,
       ctr.nome AS nomeContratante, ctr.telefone AS telefoneContratante
FROM contrato c
JOIN usuario u ON c.idUsuario = u.idUsuario
JOIN contratante ctr ON c.idContratante = ctr.idContratante;

/*View para listar os itens e seus respectivos grupos:*/

DROP VIEW IF EXISTS view_itens_grupos;

CREATE VIEW view_itens_grupos AS
SELECT i.idItem, i.nome AS nomeItem, i.categoria, i.descricao, i.preco_loca,
       g.nome AS nomeGrupo
FROM item i
JOIN grupo g ON i.idGrupo = g.idGrupo;

#PROCEDURES

SET GLOBAL log_bin_trust_function_creators = 1;

/*Function para calcular o valor total de locações em um mês específico:*/

DROP FUNCTION IF EXISTS function_calcular_valor_total_locacoes;

DELIMITER //
CREATE FUNCTION function_calcular_valor_total_locacoes(p_mes INT, p_ano INT) 
RETURNS DECIMAL(15, 2)
BEGIN
    DECLARE total DECIMAL(15, 2);
    SELECT SUM(valor_total)
    INTO total
    FROM locacao
    WHERE MONTH(data_locacao) = p_mes AND YEAR(data_locacao) = p_ano;
    RETURN total;
END //
DELIMITER ;

SELECT function_calcular_valor_total_locacoes(9, 2024);

/*Procedure para listar contratos por usuario*/

DROP PROCEDURE IF EXISTS procedure_listar_contratos_usuario;

DELIMITER //
CREATE PROCEDURE procedure_listar_contratos_usuario(IN p_idUsuario INT)
BEGIN
    SELECT c.idContrato, c.tipo, c.localEven, c.cep, c.apelido
    FROM contrato c
    WHERE c.idUsuario = p_idUsuario;
END //
DELIMITER ;

CALL procedure_listar_contratos_usuario(1);

/*Procedure para adiconar usuario:*/

DROP PROCEDURE IF EXISTS procedure_add_usuario;

DELIMITER //
CREATE PROCEDURE procedure_add_usuario(
    IN nome VARCHAR(50),
    IN cpf VARCHAR(15),
    IN email VARCHAR(50),
    IN senha VARCHAR(50),
    IN nasc DATE,
    IN telefone VARCHAR(15),
    IN tipo VARCHAR(40)
)
BEGIN
    INSERT INTO usuario (nome, cpf, email, senha, nasc, telefone, data_Cad, tipo)
    VALUES (nome, cpf, email, senha, nasc, telefone, CURDATE(), tipo);
END //
DELIMITER ;

CALL procedure_add_usuario("teste", "791.645.340-14", "teste@gmail.com", "testesenha123", "1992-04-02", "(38) 98283-8811", "Montador");

SELECT * FROM usuario;

/*Procedure para atualizar data de devolução:*/

DROP PROCEDURE IF EXISTS procedure_atualizar_data_devolucao;

DELIMITER //
CREATE PROCEDURE procedure_atualizar_data_devolucao(
    IN p_idReserva INT,
    IN p_data_devol DATE
)
BEGIN
    UPDATE reserva
    SET data_devol = p_data_devol
    WHERE idReserva = p_idReserva;
END //
DELIMITER ;

CALL procedure_atualizar_data_devolucao(10, "2024-08-28");

SELECT * FROM reserva;

#TRIGGER

/*Trigger que salva alterações em contrato_audit*/

DROP TRIGGER IF EXISTS antes_update_contrato;

DELIMITER //

CREATE TRIGGER antes_update_contrato
BEFORE UPDATE ON contrato
FOR EACH ROW
BEGIN
    -- Inserir informações na tabela de audit
    INSERT INTO contrato_audit (
        idContrato,
        old_tipo, new_tipo,
        old_localEven, new_localEven,
        old_cep, new_cep,
        old_apelido, new_apelido,
        data_modificacao,
        usuario_responsavel
    )
    VALUES (
        OLD.idContrato,
        OLD.tipo, NEW.tipo,
        OLD.localEven, NEW.localEven,
        OLD.cep, NEW.cep,
        OLD.apelido, NEW.apelido,
        NOW(),
        'sistema' 
    );
END //

DELIMITER ;

UPDATE contrato
SET tipo = 'Casamento',
    localEven = 'Espaço Jardins',
    cep = '12345-678',
    apelido = 'Bodas de Ouro'
WHERE idContrato = 1;

SELECT * FROM contrato_audit;

#CURSOR

/*Procedure com cursor para lista contratos e contratantes:*/

DROP PROCEDURE IF EXISTS procedure_listar_contratos;

DELIMITER //
CREATE PROCEDURE procedure_listar_contratos()
BEGIN
    DECLARE done INT DEFAULT 0;
    DECLARE c_id INT;
    DECLARE c_tipo VARCHAR(30);
    DECLARE c_nomeContratante VARCHAR(50);
    
    DECLARE contratos_cursor CURSOR FOR
    SELECT c.idContrato, c.tipo, ctr.nome
    FROM contrato c
    JOIN contratante ctr ON c.idContratante = ctr.idContratante;
    
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;
    
    OPEN contratos_cursor;
    
    read_loop: LOOP
        FETCH contratos_cursor INTO c_id, c_tipo, c_nomeContratante;
        IF done THEN
            LEAVE read_loop;
        END IF;
        SELECT c_id, c_tipo, c_nomeContratante;
    END LOOP;
    
    CLOSE contratos_cursor;
END //
DELIMITER ;

CALL procedure_listar_contratos();

#USUARIO

CREATE USER 'usuario_locacao'@'localhost' IDENTIFIED BY 'senha123';

GRANT SELECT, INSERT, UPDATE, DELETE ON controle_locacao.* TO 'usuario_locacao'@'localhost';

FLUSH PRIVILEGES;

