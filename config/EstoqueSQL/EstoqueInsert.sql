INSERT INTO usuario (nome, cpf, email, senha, nasc, telefone, data_Cad, tipo) VALUES
('João Silva', '123.456.789-00', 'joao@example.com', 'senha123', '1985-01-01', '11999999999', '2024-01-01', 'Gerente'),
('Maria Oliveira', '234.567.890-11', 'maria@example.com', 'senha123', '1990-02-02', '11999999998', '2024-02-01', 'Técnico'),
('Carlos Lima', '345.678.901-22', 'carlos@example.com', 'senha123', '1992-03-03', '11999999997', '2024-03-01', 'Freelancer'),
('Ana Souza', '456.789.012-33', 'ana@example.com', 'senha123', '1988-04-04', '11999999996', '2024-04-01', 'Montador'),
('Pedro Santos', '567.890.123-44', 'pedro@example.com', 'senha123', '1987-05-05', '11999999995', '2024-05-01', 'Montador'),
('Lucas Rocha', '678.901.234-55', 'lucas@example.com', 'senha123', '1986-06-06', '11999999994', '2024-06-01', 'Montador'),
('Beatriz Azevedo', '789.012.345-66', 'beatriz@example.com', 'senha123', '1991-07-07', '11999999993', '2024-07-01', 'Montador'),
('Rafael Almeida', '890.123.456-77', 'rafael@example.com', 'senha123', '1989-08-08', '11999999992', '2024-08-01', 'Montador'),
('Fernanda Costa', '901.234.567-88', 'fernanda@example.com', 'senha123', '1993-09-09', '11999999991', '2024-09-01', 'Montador'),
('Gabriel Gomes', '012.345.678-99', 'gabriel@example.com', 'senha123', '1994-10-10', '11999999990', '2024-10-01', 'Montador');

INSERT INTO contratante (nome, cpf, telefone, email) VALUES
('Empresa A', '111.111.111-11', '1122223333', 'contato@empresaa.com'),
('Empresa B', '222.222.222-22', '1122224444', 'contato@empresab.com'),
('Empresa C', '333.333.333-33', '1122225555', 'contato@empresac.com'),
('Empresa D', '444.444.444-44', '1122226666', 'contato@empresad.com'),
('Empresa E', '555.555.555-55', '1122227777', 'contato@empresa.com'),
('Empresa F', '666.666.666-66', '1122228888', 'contato@empresaf.com'),
('Empresa G', '777.777.777-77', '1122229999', 'contato@empresag.com'),
('Empresa H', '888.888.888-88', '1122220000', 'contato@empresah.com'),
('Empresa I', '999.999.999-99', '1122221111', 'contato@empresai.com'),
('Empresa J', '000.000.000-00', '1122222222', 'contato@empresaj.com');

INSERT INTO contrato (tipo, localEven, cep, apelido, idUsuario, idContratante) VALUES
('Festa de Aniversário', 'Salão Nobre', '11111-111', 'Aniversário João', 1, 1),
('Casamento', 'Praça Central', '22222-222', 'Casamento Maria e José', 2, 2),
('Show', 'Estádio Municipal', '33333-333', 'Show de Rock', 3, 3),
('Conferência', 'Centro de Convenções', '44444-444', 'Conferência de Negócios', 4, 4),
('Feira', 'Pavilhão de Exposições', '55555-555', 'Feira de Tecnologia', 5, 5),
('Festival', 'Parque da Cidade', '66666-666', 'Festival de Música', 6, 6),
('Lançamento de Produto', 'Hotel Luxo', '77777-777', 'Lançamento de Smartphone', 7, 7),
('Desfile de Moda', 'Avenida Principal', '88888-888', 'Desfile Primavera/Verão', 8, 8),
('Show de Talentos', 'Teatro Municipal', '99999-999', 'Show de Talentos Infantil', 9, 9),
('Encontro Empresarial', 'Auditório da Sede', '00000-000', 'Encontro Anual de Executivos', 10, 10);

INSERT INTO grupo (nome) VALUES
('Microfone SLX55'),
('Projetor HD7000'),
('Caixa de Som JBL Pro'),
('Mesa de Som Yamaha MG10'),
('Iluminação LED RGB'),
('Microfone de Mão MX500'),
('Câmera Canon Pro'),
('Tripé Ajustável'),
('Amplificador 1000W'),
('Cabos Diversos');

INSERT INTO item (cod_barras, categoria, descricao, nome, preco_loca, data_adicao, idGrupo) VALUES
("123456789012", 'Áudio', 'Microfone sem fio SLX55', 'Microfone SLX55', 50.00, '2024-01-01', 1),
("223456789012", 'Vídeo', 'Projetor Full HD', 'Projetor HD7000', 100.00, '2024-02-01', 2),
("323456789012", 'Áudio', 'Caixa de som profissional', 'Caixa de Som JBL Pro', 80.00, '2024-03-01', 3),
("423456789012", 'Áudio', 'Mesa de som 10 canais', 'Mesa de Som Yamaha MG10', 150.00, '2024-04-01', 4),
("523456789012", 'Iluminação', 'Luzes LED RGB', 'Iluminação LED RGB', 200.00, '2024-05-01', 5),
("623456789012", 'Áudio', 'Microfone de mão', 'Microfone de Mão MX500', 30.00, '2024-06-01', 6),
("723456789012", 'Vídeo', 'Câmera profissional', 'Câmera Canon Pro', 250.00, '2024-07-01', 7),
("823456789012", 'Acessório', 'Tripé ajustável para câmera', 'Tripé Ajustável', 40.00, '2024-08-01', 8),
("923456789012", 'Áudio', 'Amplificador de som', 'Amplificador 1000W', 120.00, '2024-09-01', 9),
("1023456789012", 'Acessório', 'Conjunto de cabos para áudio e vídeo', 'Cabos Diversos', 20.00, '2024-10-01', 10);

INSERT INTO evento (idContrato, hora_ini, hora_term) VALUES
(1, '18:00:00', '23:00:00'),
(2, '15:00:00', '21:00:00'),
(3, '20:00:00', '02:00:00'),
(4, '09:00:00', '17:00:00'),
(5, '10:00:00', '18:00:00'),
(6, '14:00:00', '22:00:00'),
(7, '19:00:00', '23:59:00'),
(8, '16:00:00', '20:00:00'),
(9, '18:30:00', '21:30:00'),
(10, '08:00:00', '12:00:00');

INSERT INTO locacao (idContrato, data_locacao, data_reserva, valor_total) VALUES
(1, '2024-08-20', '2024-08-10', 500.00),
(2, '2024-08-22', '2024-08-12', 700.00),
(3, '2024-08-25', '2024-08-15', 1500.00),
(4, '2024-08-28', '2024-08-18', 1200.00),
(5, '2024-09-01', '2024-08-20', 900.00),
(6, '2024-09-05', '2024-08-22', 800.00),
(7, '2024-09-10', '2024-08-25', 1100.00),
(8, '2024-09-15', '2024-08-30', 600.00),
(9, '2024-09-20', '2024-09-01', 700.00),
(10, '2024-09-25', '2024-09-05', 1000.00);

INSERT INTO reserva (data_reserva, data_devol, idContrato, idGrupo) VALUES
('2024-08-10 10:00:00', '2024-08-20', 1, 1),
('2024-08-12 11:00:00', '2024-08-22', 2, 2),
('2024-08-15 09:00:00', '2024-08-25', 3, 3),
('2024-08-18 14:00:00', '2024-08-28', 4, 4),
('2024-08-20 15:00:00', '2024-09-01', 5, 5),
('2024-08-22 10:30:00', '2024-09-05', 6, 6),
('2024-08-25 16:00:00', '2024-09-10', 7, 7),
('2024-08-30 13:00:00', '2024-09-15', 8, 8),
('2024-09-01 08:00:00', '2024-09-20', 9, 9),
('2024-09-05 11:30:00', '2024-09-25', 10, 10);
