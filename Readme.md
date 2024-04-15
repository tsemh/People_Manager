# Gerenciador de Pessoas e Endereços

Este projeto consiste em uma aplicação para gerenciamento de pessoas e seus endereços, utilizando uma API REST em Node.js para realizar operações CRUD e um front-end com uma interface intuitiva para interagir com a API.

## Funcionalidades Principais

- [X] CRUD de pessoas com as seguintes informações:
  - Nome
  - Sexo
  - Data de nascimento
  - Estado civil
  - Múltiplos endereços contendo:
    - CEP
    - Endereço
    - Número
    - Complemento
    - Bairro
    - Estado
    - Cidade

## Funcionalidades Adicionais

- [X] Integração com uma API de consulta de CEPs para preencher automaticamente os detalhes do endereço.
- [X] Exibir idade e dias restantes para o próximo aniversário ao cadastrar uma pessoa, com mensagem de parabéns se o cadastro ocorrer no dia do aniversário.

## Requisitos Adicionais

- [X] Implementar validações nos campos de entrada no front-end e back-end.
- [X] Adicionar tratamento de erros em todas as camadas da aplicação.

## Desafios Opcionais

- [X] Utilização do framework NestJS no backend.
- [X] Utilização do framework Angular no front-end.
- [X] Adicionar suporte à paginação na listagem de pessoas.
- [X] Implementar um mecanismo de busca para filtrar pessoas com base em critérios como nome, sexo, estado civil, etc.
- [ ] Criar um sistema de autenticação de usuários para acessar a API e o front-end, garantindo que apenas usuários autorizados possam realizar operações.

## Rodando o Projeto Localmente

### Pré-requisitos

Antes de iniciar, certifique-se de ter o Node.js e o npm instalados em sua máquina.

### Configuração do Backend (Node.js)

1. **Instalação das Dependências e Inicialização:**
  - path: ../nest-manager
    - comando: npm install -> npm start
  - url: http://localhost:3000/
  - endpoints: 
    - address:
      - GET ALL: http://localhost:3000/address
      - GET BY ID: http://localhost:3000/address/{id}
      - POST: http://localhost:3000/address/{personId}
      - PATCH: http://localhost:3000/address/{id}
      - DELETE: http://localhost:3000/address/{id}
    - people:
        - GET ALL: http://localhost:3000/people?page={page}&limit={limit}
        - GET BY ID: http://localhost:3000/people/{id}
        - SEARCH: http://localhost:3000/people/search?query={input}&page={page}&limit={limit}
        - POST: http://localhost:3000/people
        - PATCH: http://localhost:3000/people/{id}
        - DELETE: http://localhost:3000/people/{id}

  ### Configuração do Frontend (Node.js)

1. **Instalação das Dependências e Inicialização:**
  - path: ../angularManager
    - comando: npm install -> npm start
  - url: http://localhost:4200/display


