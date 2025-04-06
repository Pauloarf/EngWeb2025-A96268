# **Relatório de Implementação - PR.md**

## **1. Introdução**

Este projeto tem como objetivo a criação de uma API e uma interface web para gerir e consultar dados sobre livros, autores e personagens. A API foi desenvolvida utilizando **Node.js** e **Express**, enquanto o frontend foi implementado com **Pug**. A comunicação entre o frontend e a API é realizada através de requisições HTTP, com a utilização de **fetch** para consumo dos dados da API. A base de dados está configurada dentro de um ambiente Docker, e os dados foram preparados e tratados antes de serem importados para o MongoDB.

## **2. Estrutura do Projeto**

O projeto está dividido em duas partes principais:
- **API** (porta 17000)
- **Frontend** (porta 17001)

O **frontend** consome a API desenvolvida e exibe as informações de livros, autores e personagens, utilizando a engine de templates **Pug**. A comunicação entre o frontend e a API é feita de forma simples e eficaz, permitindo uma experiência interativa para o utilizador.

## **3. Configuração da Base de Dados (MongoDB em Docker)**

### **Base de Dados**

A base de dados utilizada é o **MongoDB**, que está a correr dentro de um **container Docker** para garantir um ambiente isolado e facilmente configurável. O MongoDB armazena documentos JSON com informações sobre livros, autores e personagens. Cada livro tem campos como **`title`**, **`author`**, **`publishDate`**, **`pages`**, **`description`**, **`coverImg`**, entre outros.

### **Configuração da Base de Dados no Docker**

1. **Instalação do Docker**:
   Para configurar o MongoDB dentro de um container Docker, é necessário ter o **Docker** instalado na sua máquina.

2. **Configuração do MongoDB**:
   Após instalar o Docker, o MongoDB é configurado e iniciado através do seguinte comando:

   ```bash
   docker run --name mongodb -d -p 27017:27017 mongoEW
   ```
   Este comando cria e executa um container do MongoDB, expondo a porta 27017 para comunicação com a aplicação.

3. **Tratamento do Arquivo `.json`**:
   O arquivo `.json` contendo os dados dos livros foi previamente tratado para garantir que os dados estivessem no formato correto antes de serem importados para o MongoDB. Durante este tratamento, foram removidos erros de formatação, ajustados tipos de dados e corrigidos problemas de codificação para garantir uma importação sem falhas.

4. **Importação dos Dados para o MongoDB**:
   Após o tratamento, os dados foram importados para a base de dados MongoDB utilizando o comando:

   ```bash
   mongoimport --db livros --collection livros --file livros.json --jsonArray
   ```

## **4. Como Executar as Aplicações**

Para executar a aplicação localmente, siga as etapas abaixo:

### **Passo 1: Instalar Dependências**
Certifique-se de ter o **Node.js** e o **Docker** instalados na sua máquina. Em seguida, execute o comando abaixo para instalar as dependências do projeto:

```bash
$ npm install
```

### **Passo 2: Rodar a API na Porta 17000**
1. A API pode ser iniciada com o comando:

```bash
$ npm start
```

2. A API ficará disponível na **porta 17000**. Para verificar se a API está a funcionar corretamente, aceda a `http://localhost:17000/` no seu navegador.

### **Passo 3: Rodar o Frontend na Porta 17001**
Em outro terminal, execute o seguinte comando para iniciar o servidor do frontend:

```bash
$ npm start
```

3. O frontend será iniciado na **porta 17001**. Acesse `http://localhost:17001/` para visualizar a interface web, que consumirá os dados da API.

### **Passo 4: Consultar a API**
A API oferece as seguintes rotas:

- **`GET /books`**: Retorna a lista de todos os livros.
- **`GET /books/:id`**: Retorna os detalhes de um livro específico, com base no ID.
- **`GET /books?genre=AAA`**: Retorna os livros do gênero especificado.
- **`GET /books/genres`**: Retorna a lista de gêneros, ordenada alfabeticamente e sem repetições.
- **`GET /books/characters`**: Retorna a lista de personagens, ordenada alfabeticamente e sem repetições.
- **`POST /books`**: Adiciona um novo livro à base de dados.
- **`DELETE /books/:id`**: Elimina um livro com o ID especificado.
- **`PUT /books/:id`**: Atualiza um livro existente, com base no ID.

O frontend irá exibir páginas específicas para cada autor e livro, utilizando as rotas **`GET /entidades/:idAutor`** e **`GET /books/:id`**.

## **Passo 5: Conclusão**

Este projeto implementa uma API funcional que interage com uma base de dados MongoDB executada dentro de um container Docker. A API permite realizar consultas detalhadas sobre livros, autores e personagens, enquanto o frontend exibe essas informações de forma interativa e acessível ao utilizador. A configuração é simples e com os comandos fornecidos, qualquer utilizador pode configurar e executar o projeto localmente.
