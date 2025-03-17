var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Cinema8k',
    docente: 'jrc',
    instituicao: 'DI-UM'
  });
});

router.get('/filmes', async (req, res, next) => {
  try {
    const response = await fetch('http://localhost:3000/movies', {
      method: 'GET',
    });
    const movies = await response.json();
    console.log(movies);
    res.render('filmes', {filmes: movies, tit:'Lista de Filmes'});
  } catch (err) {
    console.log(`Erro: ${err}`);
  }
});

router.get('/filmes/remove/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const response = await fetch('http://localhost:3000/movies/' + id, {
      method: 'DELETE',
    });
    const movies = await response.json();
    console.log(movies);
    res.render('sucess');
  } catch (err) {
    console.log(`Erro: ${err}`);
  }
});

router.get('/filmes/edit/:id', async (req, res, next) => {
  try {
    const id = req.params.id;

    const response = await fetch(`http://localhost:3000/movies/${id}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch movie: ${response.statusText}`);
    }

    const movie = await response.json();
    console.log('Movie Data:', movie);

    res.render('edit', {
      filme: movie,
    });
  } catch (err) {
    console.error(`Erro: ${err}`);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/filmes/edit/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const { title, year, cast, genres } = req.body; 

    if (!title || !year || !cast || !genres) {
      return res.status(400).send('Todos os campos são obrigatórios.');
    }

    const updatedMovie = {
      title,
      year: parseInt(year, 10),
      cast: Array.isArray(cast) ? cast : [cast],
      genres: Array.isArray(genres) ? genres : [genres], 
    };

    const response = await fetch(`http://localhost:3000/movies/${id}`, {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedMovie), 
    });

    if (!response.ok) {
      throw new Error(`Erro ao atualizar o filme: ${response.statusText}`);
    }

    res.render('sucess');
  } catch (err) {
    console.error(`Erro: ${err}`);
    res.status(500).send('Erro interno do servidor');
  }
});

function moviesFromActor(name, movies) {
  const newList = []
  movies.forEach(movie => {    
    console.log(movie);
    if (movie.cast.includes(name)){
      newList.push(movie.title);
    }
  });
  return newList;
}

router.get('/ator/:name', async (req, res, next) => {
  try {
    const name = req.params.name;
    const response = await fetch('http://localhost:3000/movies', {
      method: 'GET',
    });
    const movies = await response.json();
    const selectedMovies = moviesFromActor(name, movies);
    console.log(selectedMovies);
    res.render('ator', {filmes: selectedMovies, name: name});
  } catch (err) {
    console.log(`Erro: ${err}`);
  }
});

module.exports = router;
