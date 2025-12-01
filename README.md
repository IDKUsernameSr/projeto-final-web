# Sistema de Locadora de Veículos

Projeto final - 2o semestre.

O sistema foi desenvolvido utilizando a arquitetura MVC, com frontend em EJS + Bootstrap e backend em Node.js com Express.js, conectado a um banco de dados PostgreSQL.

O sistema permite o gerenciamento completo de uma locadora de veículos, incluindo:

- Autenticação de usuários
- CRUD de Clientes
- CRUD de Veículos
- CRUD de Locações
- Relatório de veículos alugados por cliente

---

## Integrantes do grupo

- Eric Daiske Nogata
- Cauã Stracke Do Nascimento
- Laura Maria Silva Ribeiro
- Carla Abreu de Oliveira

(Commits em grupo, realizados por meio do Live Share)

---

## Instalação e Execução

### 1. Clone o repositório
```bash
git clone https://github.com/IDKUsernameSr/projeto-final-web
cd projeto-final-web
```
### 2. Instale as dependências
```bash
npm install
```
---

## 3. Configuração do Banco de Dados

### 1. Crie um banco chamado locadora_db

### 2. Execute o arquivo locadora_db.sql no PostgreSQL para criar as tabelas

### 3. (Caso Necessário) Alterar o PGPASSWORD no .env para a do Postgre de seu computador

---

## 4. Executar o Servidor

```bash
node server.js
```

### Depois acesse http://localhost:3000