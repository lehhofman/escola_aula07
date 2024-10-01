# Escola_Aula07

## Requisitos do Sistema

### Banco de Dados
- **SGBD**: MySQL
- **Versão**: v3.3.0

### Servidor de Aplicação
- **Servidor**: node
- **Versão/Sistema Operacional**: v20.15.1

### Linguagens Utilizadas
- **JavaScript**: ECMAScript 2018
- **HTML**: HTML5
- **CSS**: CSS2

## Tecnologias
- **Prisma**: v5.20.0
- **Insomnia**: v10.0.0

## Tutorial de Testes do Aplicativo

### Pré-requisitos
1. Instale o [Node.js](https://nodejs.org/).
2. Instale o [Prisma](https://www.prisma.io/docs/getting-started) e configure-o conforme necessário.

### Passos para Testar

1. Clone o repositório:
   ```bash
   git clone https://github.com/lehhofman/escola_aula07.git
   ```
2. Abra com o vscode:

3. inicie o projeto:
   ```bash
   cd api
   ```

   ```bash
   npm install
   ```
4. Configure o Prisma:

 - Atualize o arquivo .env com suas credenciais de banco de dados.
   
5. Execute o banco de dados:
   
  ```bash
   npx prisma migrate dev
   ```

6. Inicie o servidor:

   ```bash
   node server.js
   ```

8. Abra com o Live Server.
