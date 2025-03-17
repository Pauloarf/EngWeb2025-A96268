# Manifesto TPC4

## 📌 Informação do TPC e do Aluno  

- **Título:** Site com operações sobre um dataset de filmes.
- **Data:** 2025-03-15
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

O objetivo deste trabalho foi desenvolver uma aplicação web para gestão de uma base de dados de filme, continuando o processo desenvolvido em aula. Este processo de implementação, diferente do que foi feito até agora, foi realizado com auxilio ao motor de templates pug, e com auxilio ao modulo express. O objetivo principal deste tpc era adicionar dois butões a listagem de filmes que permitisse editar e remover os mesmos. Para além disso, caso fosse selecionado um ator, o site deverá direcionar o utilizador para uma pagina com todos os filmes no qual esse ator participou. Um dos pontos a ter em atençãp é a existencia de estruturas aninhadas que fornecem um maior desafio em relação a tpc's anteriores. a estutura do dataset é a que se segue 

- **Title** (Título do filme)  
- **Year** (Ano de lançamento)  
- **Cast** (Lista de atores)  
- **Genres** (Gêneros do filme)  

A aplicação foi desenvolvida com uma REST API baseada no padrão JSON-API, seguindo a estrutura utilizada em trabalhos anteriores. O servidor processa algumas das operações CRUD, enquanto o frontend permite a interação do utilizador de forma intuitiva.

## 📂 Resultados  

O primeiro passo para a execução deste TPC foi a observação do dataset fornecido. Após uma breve análise, verificou-se que o dataset estava normalizado e correto, com exceção da ausência de um campo `id`. Para resolver este problema, optou-se por utilizar um gerador de IDs em Python, que lê o ficheiro JSON e adiciona um `id` único baseado em UUID a cada filme. Os objetos atualizados foram então salvos num novo ficheiro JSON, garantindo a consistência dos dados.  

Com o dataset corrigido, o foco foi direcionado para a implementação das funcionalidades restantes. Tendo a listagem de filmes já sido implementada em aula, as principais tarefas foram:  
1. Adicionar um botão para editar filmes.  
2. Adicionar um botão para remover filmes.  
3. Permitir a navegação para uma página que lista todos os filmes em que um ator específico participou.  

### Implementação dos Botões  
- **Botão de Remover:**  
  Para a funcionalidade de remoção, foi utilizado um simples pedido `GET` no endpoint `filmes/remove/_id`, onde `_id` corresponde ao ID do filme a ser eliminado. Este pedido envia uma solicitação `DELETE` ao servidor JSON-Server para remover o filme com o ID especificado. Em caso de sucesso, o utilizador é notificado com uma mensagem no browser e tem a opção de voltar à página anterior.  

- **Botão de Editar:**  
  A implementação do botão de edição foi mais complexa devido à presença de **estruturas aninhadas** (como `cast` e `genres`). Para lidar com esses campos, utilizou-se o motor de templates Pug para separar os campos de edição em duas secções distintas: uma para o elenco (`cast`) e outra para os géneros (`genres`). Em cada secção, foi realizado um loop que gera um campo de input para cada valor existente na lista, permitindo a edição individual de cada item. Para os campos simples, como `title` e `year`, a implementação foi direta, apresentando os campos pré-preenchidos com os valores atuais.  

### Listagem de Filmes por Ator  
A funcionalidade de listar os filmes em que um ator específico participou foi implementada da seguinte forma:  
- No frontend, a página foi construída utilizando Pug, seguindo uma estrutura semelhante às outras páginas de listagem.  
- No backend, quando um pedido para a página de um ator é recebido, o servidor solicita à API todos os filmes disponíveis. Em seguida, é realizada uma filtragem para identificar os filmes nos quais o ator em questão participa. Esta lista filtrada é então enviada para o frontend, que a exibe ao utilizador.  

### Conclusão e Possíveis Melhorias  
O trabalho foi concluído com sucesso, mas ainda há espaço para melhorias:  
- **Adição Dinâmica de Campos:**  
  No formulário de edição, seria interessante permitir a adição dinâmica de campos, especialmente para o elenco (`cast`). Por exemplo, ao adicionar um novo ator, um novo bloco de input deveria aparecer automaticamente, tornando o processo mais intuitivo.  
- **Utilização de Query Strings:**  
  Para otimizar o processamento, seria benéfico delegar mais tarefas ao JSON-Server através de query strings. Isso aproximaria a aplicação das boas práticas de utilização de bases de dados, onde o processamento de queries é realizado pelo motor de base de dados, e não pelo backend da aplicação.  

Estas melhorias poderiam tornar a aplicação mais robusta e alinhada com as melhores práticas de desenvolvimento.

