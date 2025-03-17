# Manifesto TPC3

## 📌 Informação do TPC e do Aluno  

- **Título:** Site Para Adição, Remoção, Atualização e listagem de Treinos 
- **Data:** 2025-03-04
- **Autor:**  Paulo Ferreira
    <table>
    <tr>
        <td><img src="../Images/Profile.jpg" width="100"></td>
        <td>
        <strong>Nome:</strong> Paulo Alexandre Rodrigues Ferreira<br>
        <strong>Número:</strong> A96268
        </td>
    </tr>
    </table>
- **Resumo:**  

O objetivo deste trabalho foi desenvolver uma aplicação web para gestão de uma base de dados de treinos, utilizando operações CRUD (Create, Read, Update, Delete). A aplicação permite adicionar, remover, atualizar e listar treinos, que são armazenados num ficheiro JSON. Cada treino contém os seguintes campos:  
- **ID** (identificador único)  
- **Nome** (nome do treino)  
- **NUF** (número único de treino)  
- **Data** (data do treino)  
- **Desporto** (tipo de desporto)  
- **Duração** (duração do treino)  

A aplicação foi desenvolvida com uma REST API baseada no padrão JSON-API, seguindo a estrutura utilizada em trabalhos anteriores. O servidor processa as operações CRUD, enquanto o frontend permite a interação do utilizador de forma intuitiva.

## 📂 Resultados  

Tal como nos outros TPCs, a resolução deste trabalho começou com o planeamento das páginas e serviços necessários. Foram delineadas três páginas principais: **a página inicial**, que serve como ponto de partida para as outras duas; **a página de listagem de treinos**, onde todos os treinos são exibidos; e **a página de criação de treinos**, que contém um formulário para adicionar novos registos. Esta última página foi especialmente útil para explorar e experimentar tags HTML relacionadas com formulários, como inputs, labels e botões de submissão.  

Com o planeamento concluído, partimos para a implementação. A primeira etapa foi a criação da página de listagem de treinos, que utiliza uma operação GET para obter os dados do JSON-server e exibi-los numa tabela. Cada linha da tabela representa um treino e inclui dois botões: um para editar e outro para eliminar o treino correspondente.  

A funcionalidade de **eliminar** um treino foi implementada através de um botão que, ao ser clicado, redireciona o utilizador para um LINK específico. Este LINK, por sua vez, envia um pedido DELETE ao JSON-server, removendo o treino da base de dados. Após a operação, o utilizador recebe uma mensagem indicando se a eliminação foi bem-sucedida ou se ocorreu algum erro.  

Para a **edição** de treinos, foi criada uma página dedicada que contém um formulário pré-preenchido com os dados atuais do treino selecionado. Quando o utilizador clica no botão "Editar", é redirecionado para esta página, onde o serviço realiza um pedido GET ao JSON-server para obter os dados do treino e carregá-los nos campos do formulário. Após a edição, o utilizador pode submeter o formulário, o que aciona um pedido PUT ao JSON-server para atualizar o treino na base de dados.  

A **criação** de novos treinos foi implementada através de uma página com um formulário vazio. O utilizador preenche os campos necessários, como nome, data, desporto e duração, e clica no botão "Registar". O serviço, por sua vez, envia um pedido POST ao JSON-server para adicionar o novo treino à base de dados. Para garantir que os IDs dos treinos são únicos e sequenciais, foi criado um objeto `config` no ficheiro JSON, que armazena o valor do próximo ID a ser utilizado.  