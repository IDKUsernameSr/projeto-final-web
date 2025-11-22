CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  senha_hash TEXT NOT NULL,
  tipo TEXT CHECK (tipo IN ('admin','funcionario')) DEFAULT 'funcionario'
);

CREATE TABLE clientes (
  id SERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  cpf  VARCHAR(14) UNIQUE NOT NULL,
  telefone TEXT,
  email TEXT UNIQUE
);

CREATE TABLE veiculos (
  id SERIAL PRIMARY KEY,
  marca TEXT NOT NULL,
  modelo TEXT NOT NULL,
  placa VARCHAR(8) UNIQUE NOT NULL,
  tipo TEXT,
  valor_diaria NUMERIC(10,2) NOT NULL,
  status TEXT CHECK (status IN ('disponível','alugado')) DEFAULT 'disponível'
);

CREATE TABLE locacoes (
  id SERIAL PRIMARY KEY,
  cliente_id INT NOT NULL REFERENCES clientes(id) ON DELETE RESTRICT,
  veiculo_id INT NOT NULL REFERENCES veiculos(id) ON DELETE RESTRICT,
  data_inicio DATE NOT NULL,
  data_fim    DATE NOT NULL,
  valor_total NUMERIC(10,2) NOT NULL
);
