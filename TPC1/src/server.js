const http = require('http');
const axios = require('axios');
// Pq não posso enviar o ficheiro diretamente?
// Algo a ver com static data... pq nao posso simplesmente usar o <img> tag?

// Qual a diferença entre usar o global e o pnpmx? um mete id o outro nao
const pic501 = require('fs').readFileSync('./Errors/501.jpg');
const pic404 = require('fs').readFileSync('./Errors/404.jpg');
const pic500 = require('fs').readFileSync('./Errors/500.jpg');

const port = 4000;

http.createServer((req, res) => {
    console.log('--- Request ---');
    console.log(`Method: ${req.method}`);
    console.log(`URL: ${req.url}`);

    switch (req.method) {
        case 'GET':
            if (req.url === `/`) {
                res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
                res.write('<h1>Bem-Vindo à Oficina do Daniel</h1>');
                res.write('<ul>');
                res.write(`<li> Para ver lista de reparacoes carregue <a href="/reparacoes">aqui</a>.</li>`);
                res.write(`<li> Para ver lista de intervenções carregue <a href="/intervencoes">aqui</a>.</li>`);
                res.write(`<li> Para ver lista de viaturas carregue <a href="/viaturas">aqui</a>.</li>`);
                res.write('</ul>');
                res.end();
            } else if (req.url === `/reparacoes`) {
                axios.get('http://localhost:3000/reparacoes?_sort=nome').then((resp) => {
                    var reparacoes = resp.data;
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
                    res.write('<h1>Lista de Reparações</>');
                    res.write('<ul>');
                    reparacoes.forEach(reparacao => {
                        res.write('<li><a href="/reparacoes/' + reparacao.nif + '">' + reparacao.nome + '</a></li>');
                    });
                    res.write('</ul>');
                    res.end();    
                }).catch((error) => {
                    res.writeHead(500, { 'Content-Type': 'image/jpeg' });
                    res.end(pic500);
                });
            } else if (req.url.match(/\/reparacoes\/.+/)) {
                var nif = req.url.split('/')[2];
                axios.get('http://localhost:3000/reparacoes?nif=' + nif).then((resp) => {
                    var reparacao = resp.data;
                    reparacao = reparacao[0];
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
                    res.write('<h1>Nome do cliente: ' + reparacao.nome + '</h1>');
                    res.write('<h1>nif do cliente: ' + reparacao.nif + '</h1>');
                    res.write('<p>Data da reparação: ' + reparacao.data + '</p>');
                    res.write('<p>Numero de intervenções: ' + reparacao.nr_intervencoes + '</p>');
                    res.write('<p></p>');
                    res.write('<p>Viatura: <a href="http://localhost:4000/viaturas/' + reparacao.viatura.matricula + '">info</a></p>');
                    res.end();    
                }).catch((error) => {
                    res.writeHead(500, { 'Content-Type': 'image/jpeg' });
                    res.end(pic500);
                });
            } else if (req.url === `/intervencoes`) {
                axios.get('http://localhost:3000/intervencoes?_sort=codigo').then((resp) => {
                    var intervencoes = resp.data;
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
                    res.write('<h1>Lista de Intervenções</>');
                    res.write('<ul>');
                    intervencoes.forEach(intervencao => {
                        res.write('<li><a href="/intervencoes/' + intervencao.codigo + '">' + '#' + intervencao.codigo + ': ' + intervencao.nome + '</a></li>');
                    });
                    res.write('</ul>');
                    res.end();    
                }).catch((error) => {
                    res.writeHead(500, { 'Content-Type': 'image/jpeg' });
                    res.end(pic500);
                });
            } else if (req.url.match(/\/intervencoes\/.+/)) {
                var codigo = req.url.split('/')[2];
                axios.get('http://localhost:3000/intervencoes?codigo=' + codigo).then((resp) => {
                    var intervencao = resp.data;
                    intervencao = intervencao[0];
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
                    res.write('<h1>Código: ' + intervencao.codigo + '</h1>');
                    res.write('<h1>Nome: ' + intervencao.nome + '</h1>');
                    res.write('<p>Descricao: ' + intervencao.descricao + '</p>');
                    res.end();    
                }).catch((error) => {
                    res.writeHead(500, { 'Content-Type': 'image/jpeg' });
                    res.end(pic500);
                });
            } else if (req.url === `/viaturas`) {
                axios.get('http://localhost:3000/viaturas?_sort=matricula').then((resp) =>{
                    var viaturas = resp.data;
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
                    res.write('<h1>Lista de Viaturas</>');
                    res.write('<ul>');
                    viaturas.forEach(viatura => {
                        res.write('<li><a href="/viaturas/' + viatura.matricula + '">' + viatura.matricula + '</a></li>');
                    });
                    res.write('</ul>');
                    res.end();    
                }).catch((error) => {
                    res.writeHead(500, { 'Content-Type': 'image/jpeg' });
                    res.end(pic500);
                });
            } else if (req.url.match(/\/viaturas\/.+/)) {
                var matricula = req.url.split('/')[2];
                axios.get('http://localhost:3000/viaturas?matricula=' + matricula).then((resp) => {
                    var viatura = resp.data;
                    viatura = viatura[0];
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
                    res.write('<h1>Marca: ' + viatura.marca + '</h1>');
                    res.write('<h1>Modelo: ' + viatura.modelo + '</h1>');
                    res.write('<p>Matricula: ' + viatura.matricula + '</p>');
                    res.end();    
                }).catch((error) => {
                    res.writeHead(500, { 'Content-Type': 'image/jpeg' });
                    res.end(pic500);
                });
            } else {
                res.writeHead(404, { 'Content-Type': 'image/jpeg' });
                res.end(pic404);
            }
            break;
        case 'POST':
            res.writeHead(501, { 'Content-Type': 'image/jpeg' });
            res.end(pic501);
            break;
        default:
            res.writeHead(501, { 'Content-Type': 'image/jpeg' });
            res.end(pic501);
            break
        }
}).listen(port, () => {
  console.log(`Server is running on port ${port}`);
});