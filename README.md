

# Projeto Extensão

**Versão:** 0.0.1

**Descrição:**  
Projeto de extensão da faculdade IFSP para o cliente Greg Eventos. Este sistema visa melhorar a gestão de aluguel de equipamentos, centralizando e automatizando os processos para aumentar a eficiência e reduzir perdas financeiras.

---

## 📚 Tabela de Conteúdos
- [Descrição](#-descrição)
- [Objetivo do Projeto](#-objetivo-do-projeto)
- [Objetivo SMART](#-objetivo-smart)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Como Utilizar o Projeto](#-como-utilizar-o-projeto)
  - [Pré-requisitos](#1-pré-requisitos)
  - [Instalação](#2-instalação)
  - [Configuração](#3-configuração)
  - [Executando o Projeto](#4-executando-o-projeto)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Justificativa](#-justificativa)
- [Referências](#-referências)

---

## 📋 Objetivo do Projeto

Implementar um sistema de gestão de aluguel de equipamentos para a Greg Eventos, com foco em:

- Registro de locações.
- Rastreamento de ativos via RFID e códigos de barras.
- Geração automática de alertas para manutenções e devoluções.
- Interface amigável para consulta de disponibilidade de itens.

---

## 🎯 Objetivo SMART

- **Específico:** Desenvolver um sistema digital de gestão de equipamentos.
- **Mensurável:** Avaliar a facilidade e agilidade no controle dos ativos da empresa.
- **Acordado:** Definido em conjunto com todas as partes interessadas.
- **Realista:** Utilização de tecnologias disponíveis como RFID e códigos de barras.
- **Limitado no tempo:** Prazo de 3 meses para conclusão total.

---

## 🛠️ Tecnologias Utilizadas

- Node.js
- Express
- EJS
- MySQL
- RFID e Códigos de Barras

---

## 🚀 Como Utilizar o Projeto

### 1. Pré-requisitos

- Node.js instalado.
- Banco de dados MySQL configurado.

### 2. Instalação

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/LuanContini/Projeto-extensao-4Semestre
cd projeto-extensao
npm install
```

### 3. Configuração

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
PORT=3000
JWT_SECRET=<segredo-jwt>
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=<sua-senha>
DB_NAME=<nome-do-seu-banco-de-dados>
SALT_ROUNDS=<numero-de-salt-rounds>
```

### 4. Executando o Projeto

Para iniciar o servidor:

```bash
npm start
```

Acesse o projeto em: [http://localhost:3000 ](http://localhost:3000).

---

## 📁 Estrutura do Projeto

- `server.js`: Inicializa o servidor Express.
- `routes/index.js`: Define as rotas.
- `views/`: Contém as views em EJS.
- `public/`: Diretório de arquivos estáticos (CSS, JS, imagens).
- `.env`: Configurações de ambiente.

---

## 📚 Justificativa

A gestão manual de ativos na Greg Eventos resulta em falhas, atrasos e perdas financeiras. Este sistema centraliza a comunicação e o controle, reduzindo os erros operacionais e melhorando a eficiência.

---

## 📚 Referências

- [Documentação do Node.js](https://nodejs.org/en/docs/)
- [Documentação do Express](https://expressjs.com/)
- [Documentação do MySQL](https://dev.mysql.com/doc/)
