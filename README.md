# My Sales API 🏆

Uma API de gerenciamento de vendas robusta e escalável, desenvolvida com foco em boas práticas de arquitetura, segurança e testabilidade.

## 🚀 Tecnologias
Este projeto foi construído utilizando as melhores ferramentas do ecossistema Node.js:

- **Node.js** com **TypeScript** para um código tipado e seguro.
- **Express** como framework web.
- **TypeORM** para integração com o banco de dados **PostgreSQL**.
- **TSyringe** para Injeção de Dependência (DI), garantindo baixo acoplamento.
- **Redis** no Docker para cache e controle de requisições.
- **JWT (JSON Web Token)** para autenticação segura.
- **Jest** para testes unitários e de integração.
- **Celebrate/Joi** para validação rigorosa de dados.
- **BCrypt** para hashing de senhas.

## 🛠️ Arquitetura e Diferenciais
- **Injeção de Dependências**: Utilização do container do TSyringe para gerenciar instâncias de serviços e repositórios.
- **Paginação Customizada**: Listagens inteligentes (Users/Orders) que aceitam parâmetros de URL (`page`, `limit`) e filtros detalhados (`full=true`).
- **Domain-Driven Design (Princípios)**: Organização do código por módulos (Users, Customers, Products, Orders).
- **Tratamento de Erros**: Middleware global para captura de exceções e respostas padronizadas.

## 📋 Como rodar o projeto

### Pré-requisitos
- [Node.js](https://nodejs.org) (versão LTS)
- [Docker Desktop](https://docker.com) (para o Redis e Postgres opcional)
- Um banco de dados **PostgreSQL** rodando.

### Instalação
1. Clone o repositório:
   ```bash
   git clone https://github.com
   cd my_sales
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure as variáveis de ambiente:
   - Copie o arquivo `.env.example` para `.env` e preencha com suas credenciais.
4. Execute as migrações do banco de dados:
   ```bash
   npm run typeorm migration:run
   ```
5. Inicie o servidor:
   ```bash
   npm run dev
   ```

## 🧪 Testes
Para garantir a qualidade, o projeto conta com suítes de testes unitários e de integração:
```bash
npm run test
```

## 🛣️ Rotas Principais
- `POST /users`: Cadastro de usuários.
- `POST /sessions`: Autenticação e geração de token.
- `GET /users`: Listagem paginada de usuários (requer Token).
- `GET /orders`: Listagem de pedidos (Use `?full=true` para detalhes completos).
- `POST /orders`: Criação de novos pedidos com validação de estoque.

---
Desenvolvido por **[Seu Nome Aqui]** - [LinkedIn](SEU_LINK_DO_LINKEDIN)
