# Manifesto TPC5

## 📌 Informação do TPC e do Aluno  

- **Título:** Criação de um website com recurso ao mongoDB.
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

O objetivo deste trabalho foi desenvolver uma aplicação web para gestão de dados sobre os contratos de 2024 presentes em `gov.pt`, continuando o processo desenvolvido em aula. A implementação do frontend deste projecto, assim como no tpcs anterior, foi realizado com auxilio ao motor de templates pug, e com auxilio ao modulo express. No caso do backend, ao contrario do que tem sido feito até agora(json-server), utilizou-se o motor de base de daos mongoDB, estando este a correr dentro de um container(docker). O objetivo principal deste tpc foi completar o trabalho realizado na aula fazendo a interface de utilizador para a api já desenvolvida em aula, na secção seguinte será explicado o processo de implementação e a razão pela qual se tomou cada decisão. Para melhor compreender o processo, apresentamos em seguida estrutura dos contratos presentes no dataset: 

- **_id** (string)  
- **dataCelebracaoContrato** (string)  
- **dataPublicacao** (string)  
- **entidade_comunicante** (string)  
- **fundamentacao** (string)  
- **nAnuncio** (string)  
- **NIPC_entidadde_comunicante** (string)  
- **objectoContrato** (string)  
- **prazoExecucao** (int32)  
- **precoContratual** (double)  
- **tipoprocedimento** (string)  

## 📂 Resultados  

A aplicação apresenta três visualizações principais:

1. **Listagem geral de contratos** - Mostra uma tabela resumida com os campos essenciais, onde cada ID de contrato é um link para a página detalhada.

2. **Página de detalhe de contrato** - Exibe todos os campos do documento com um layout organizado em seções temáticas (informação básica, valores e prazos, entidade contratante), utilizando componentes visuais do W3.CSS para melhor legibilidade.

3. **Página por entidade** - Acessível através da rota `/entidades/NIPC`, agrega todos os contratos da mesma entidade, calculando automaticamente o valor total e formatando os valores monetários segundo as convenções portuguesas.

### Desafios e Soluções

Durante o desenvolvimento, enfrentei alguns desafios técnicos relevantes. Um deles, o qual ainda carece de solução é a inexistencia de valor no campo referente ao `objectoContrato`, o qual se mantem com undefined por razões que ainda não consegui identificar.

A integração com Font Awesome permitiu enriquecer a interface com ícones intuitivos, enquanto o W3.CSS forneceu uma base consistente para o design responsivo.

### Conclusão
O resultado final é um sistema funcional que cumpre todos os requisitos propostos, com especial destaque para:

- Organização clara da informação complexa dos contratos
- Mecanismos de navegação intuitivos entre as diferentes visualizações
- Cálculos automáticos de valores agregados
