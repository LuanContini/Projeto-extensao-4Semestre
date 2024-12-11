/*use controle_locacao_teste;*/

INSERT INTO usuario (nome, cpf, email, senha, telefone, tipo, imagem)
VALUES 
('João Silva', '12345678901', 'joao.silva@email.com', 'senhaCriptografada', '011987654321', 'Administrador', NULL),
('Maria Oliveira', '98765432109', 'maria.oliveira@email.com', 'senhaCriptografada', '011991234567', 'Operador', NULL),
('Carlos Souza', '23456789012', 'carlos.souza@email.com', 'senhaCriptografada', '011987765543', 'Administrador', NULL),
('Ana Costa', '34567890123', 'ana.costa@email.com', 'senhaCriptografada', '011999887766', 'Operador', NULL),
('Fernanda Almeida', '45678901234', 'fernanda.almeida@email.com', 'senhaCriptografada', '011999112233', 'Administrador', NULL),
('Paulo Lima', '56789012345', 'paulo.lima@email.com', 'senhaCriptografada', '011995432211', 'Operador', NULL),
('Juliana Pereira', '67890123456', 'juliana.pereira@email.com', 'senhaCriptografada', '011993322112', 'Administrador', NULL),
('Roberta Martins', '78901234567', 'roberta.martins@email.com', 'senhaCriptografada', '011992233445', 'Operador', NULL),
('Ricardo Alves', '89012345678', 'ricardo.alves@email.com', 'senhaCriptografada', '011991156677', 'Administrador', NULL),
('Juliano Barbosa', '90123456789', 'juliano.barbosa@email.com', 'senhaCriptografada', '011998833445', 'Operador', NULL);

INSERT INTO contratante (nome, email, telefone, imagem, observacao)
VALUES 
('Empresa X', 'empresa.x@email.com', '011922334455', NULL, 'Empresa especializada em locações de equipamentos'),
('Fulano de Tal', 'fulano.tal@email.com', '0111987654321', NULL, 'Pessoa física contratante de equipamentos'),
('Tech Solutions', 'tech.solutions@email.com', '011933445566', NULL, 'Empresa de TI oferecendo serviços tecnológicos'),
('Construtora ABC', 'construtora.abc@email.com', '011944556677', NULL, 'Construtora de obras residenciais'),
('Flora Garden', 'flora.garden@email.com', '011955667788', NULL, 'Empresa especializada em jardinagem'),
('Fast Delivery', 'fast.delivery@email.com', '011966778899', NULL, 'Serviço de entregas rápidas'),
('Alimentos SA', 'alimentos.sa@email.com', '011977889900', NULL, 'Indústria alimentícia'),
('Móveis Planejados', 'moveis.planejados@email.com', '011988990011', NULL, 'Fábrica de móveis personalizados'),
('Medtech', 'medtech@email.com', '011999001122', NULL, 'Tecnologia médica'),
('Auto Peças', 'auto.pecas@email.com', '0119100112233', NULL, 'Comércio de peças automotivas');

INSERT INTO pessoJuridica (idContratante, cnpj)
VALUES 
(1, '12345678000195'),
(2, '23456789000164'),
(3, '34567890000123'),
(4, '45678901000112'),
(5, '56789012000101'),
(6, '67890123000190'),
(7, '78901234000179'),
(8, '89012345000168'),
(9, '90123456000157'),
(10, '01234567000146');

INSERT INTO pessoaFisica (idContratante, cpf)
VALUES 
(1, '12345678901'),
(2, '23456789012'),
(3, '34567890123'),
(4, '45678901234'),
(5, '56789012345'),
(6, '67890123456'),
(7, '78901234567'),
(8, '89012345678'),
(9, '90123456789'),
(10, '01234567890');

INSERT INTO contrato (tipo, valor_total, cep, localEvento, localRetirada, dataHora_Ini, dataHora_Term, desc_empregados, idUsuario, idContratante)
VALUES
('Locacao', 1500.00, '12345678', 'Local A', 'Retirada A', '2024-12-01 08:00:00', '2024-12-01 18:00:00', 'Evento para empresa A', 1, 1),
('Evento', 3000.00, '23456789', 'Local B', 'Retirada B', '2024-12-02 09:00:00', '2024-12-02 19:00:00', 'Casamento B', 2, 2),
('Locacao', 500.00, '34567890', 'Local C', 'Retirada C', '2024-12-03 10:00:00', '2024-12-03 20:00:00', 'Locação de equipamentos C', 3, 3),
('Evento', 1000.00, '45678901', 'Local D', 'Retirada D', '2024-12-04 11:00:00', '2024-12-04 21:00:00', 'Festa de aniversário D', 4, 4),
('Locacao', 2500.00, '56789012', 'Local E', 'Retirada E', '2024-12-05 12:00:00', '2024-12-05 22:00:00', 'Locação de equipamentos E', 5, 5),
('Evento', 2000.00, '67890123', 'Local F', 'Retirada F', '2024-12-06 13:00:00', '2024-12-06 23:00:00', 'Show F', 6, 6),
('Locacao', 1800.00, '78901234', 'Local G', 'Retirada G', '2024-12-07 14:00:00', '2024-12-07 00:00:00', 'Locação para empresa G', 7, 7),
('Evento', 3500.00, '89012345', 'Local H', 'Retirada H', '2024-12-08 15:00:00', '2024-12-08 01:00:00', 'Conferência H', 8, 8),
('Locacao', 1200.00, '90123456', 'Local I', 'Retirada I', '2024-12-09 16:00:00', '2024-12-09 02:00:00', 'Equipamentos para evento I', 9, 9),
('Evento', 2500.00, '01234567', 'Local J', 'Retirada J', '2024-12-10 17:00:00', '2024-12-10 03:00:00', 'Casamento J', 10, 10);

INSERT INTO grupo (nome, categoria, precoGrupo)
VALUES
('Grupo A', 'Categoria 1', 100.00),
('Grupo B', 'Categoria 2', 200.00),
('Grupo C', 'Categoria 3', 150.00),
('Grupo D', 'Categoria 1', 300.00),
('Grupo E', 'Categoria 2', 250.00),
('Grupo F', 'Categoria 3', 500.00),
('Grupo G', 'Categoria 1', 450.00),
('Grupo H', 'Categoria 2', 600.00),
('Grupo I', 'Categoria 3', 700.00),
('Grupo J', 'Categoria 1', 350.00);

INSERT INTO reserva (idGrupo, idContrato)
VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6),
(7, 7),
(8, 8),
(9, 9),
(10, 10);

INSERT INTO itens (codBarras, dataLocacao, idGrupo)
VALUES
('1234567890123', '2024-12-01 08:00:00', 1),
('2345678901234', '2024-12-02 09:00:00', 2),
('3456789012345', '2024-12-03 10:00:00', 3),
('4567890123456', '2024-12-04 11:00:00', 4),
('5678901234567', '2024-12-05 12:00:00', 5),
('6789012345678', '2024-12-06 13:00:00', 6),
('7890123456789', '2024-12-07 14:00:00', 7),
('8901234567890', '2024-12-08 15:00:00', 8),
('9012345678901', '2024-12-09 16:00:00', 9),
('0123456789012', '2024-12-10 17:00:00', 10);

INSERT INTO manutencao (motivo, data_Inic, data_Retorno, responsavel)
VALUES
('Troca de peça', '2024-12-01 08:00:00', '2024-12-01 10:00:00', 'Carlos Souza'),
('Reparo no motor', '2024-12-02 09:00:00', '2024-12-02 11:00:00', 'Maria Oliveira'),
('Troca de óleo', '2024-12-03 10:00:00', '2024-12-03 12:00:00', 'Juliano Barbosa'),
('Reparo no sistema elétrico', '2024-12-04 11:00:00', '2024-12-04 13:00:00', 'Ricardo Alves'),
('Manutenção preventiva', '2024-12-05 12:00:00', '2024-12-05 14:00:00', 'Fernanda Almeida'),
('Ajuste de peças', '2024-12-06 13:00:00', '2024-12-06 15:00:00', 'Paulo Lima'),
('Troca de peças e revisão', '2024-12-07 14:00:00', '2024-12-07 16:00:00', 'João Silva'),
('Reparo hidráulico', '2024-12-08 15:00:00', '2024-12-08 17:00:00', 'Roberta Martins'),
('Limpeza de sistema', '2024-12-09 16:00:00', '2024-12-09 18:00:00', 'Juliana Pereira'),
('Revisão geral', '2024-12-10 17:00:00', '2024-12-10 19:00:00', 'Ricardo Alves');

INSERT INTO historicoManutencao (data_Inic, data_Term, idManutencao, idItens)
VALUES
('2024-12-01 08:00:00', '2024-12-01 10:00:00', 1, 1),
('2024-12-02 09:00:00', '2024-12-02 11:00:00', 2, 2),
('2024-12-03 10:00:00', '2024-12-03 12:00:00', 3, 3),
('2024-12-04 11:00:00', '2024-12-04 13:00:00', 4, 4),
('2024-12-05 12:00:00', '2024-12-05 14:00:00', 5, 5),
('2024-12-06 13:00:00', '2024-12-06 15:00:00', 6, 6),
('2024-12-07 14:00:00', '2024-12-07 16:00:00', 7, 7),
('2024-12-08 15:00:00', '2024-12-08 17:00:00', 8, 8),
('2024-12-09 16:00:00', '2024-12-09 18:00:00', 9, 9),
('2024-12-10 17:00:00', '2024-12-10 19:00:00', 10, 10);
