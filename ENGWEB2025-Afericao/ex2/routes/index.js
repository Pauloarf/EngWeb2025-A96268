var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async (req, res) => {
    try {
        const response = await fetch('http://localhost:17000/books'); // Substitua com a URL correta da sua API
        const books = await response.json(); // Recebe os dados como JSON

        res.render('index', { books });
    } catch (err) {
        res.status(500).send('Erro ao buscar os livros: ' + err.message);
    }
});

router.get('/books/:id', async (req, res) => {
    try {
        const bookId = req.params.id;  // Pega o id do livro a partir da URL
        const response = await fetch(`http://localhost:17000/books/${bookId}`);
        const book = await response.json(); // Pega o livro específico pela API

        // Renderiza a página de detalhes do livro
        res.render('book', { book });
    } catch (err) {
        res.status(500).send('Erro ao buscar o livro: ' + err.message);
    }
});

router.get('/entidades/:idAutor', async (req, res) => {
    try {
        const idAutor = req.params.idAutor;  // Pega o id do autor da URL

        // Fazendo uma requisição para obter todos os livros da API na porta 17000
        const response = await fetch('http://localhost:17000/books');
        const books = await response.json(); // Pega todos os livros da API
        
        // Filtra os livros do autor com base no idAutor
        const booksByAuthor = books.filter(book => book.author[0] === idAutor);

        // Verifica se encontrou algum livro
        if (booksByAuthor.length === 0) {
            return res.status(404).send('Autor não encontrado ou sem livros');
        }

        // Renderiza a página do autor com seus livros
        res.render('author', { 
            idAutor,
            name: booksByAuthor[0].author[0],  // Supondo que o nome do autor seja o mesmo para todos os livros
            books: booksByAuthor,
            totalBooks: booksByAuthor.length
        });
    } catch (err) {
        res.status(500).send('Erro ao buscar o autor: ' + err.message);
    }
});

module.exports = router;
