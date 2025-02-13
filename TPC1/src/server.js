const http = require('http');
// Pq não posso enviar o ficheiro diretamente?
// Algo a ver com static data... pq nao posso simplesmente usar o <img> tag?
const pic501 = require('fs').readFileSync('./Errors/501.jpg');
const pic404 = require('fs').readFileSync('./Errors/404.jpg');
const pic500 = require('fs').readFileSync('./Errors/500.jpg');

http.createServer((req, res) => {
    console.log('--- Request ---');
    console.log(`Method: ${req.method}`);
    console.log(`URL: ${req.url}`);

    switch (req.method) {
        case 'GET':
            if (req.url === `/`) {
                res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
                res.write('<h1>Bem-Vindo à Oficina do Daniel</h1>');
                res.end();
            } else if (req.url === `/reparacoes`) {
                axios.get('http://localhost:3000/reparacoes?_sort=nome').then((resp) => {
                    var reparacoes = resp.data;
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
                    res.write('<h1>Reparações</>');
                    res.write('<ul>');
                    reparacoes.forEach(reparacao => {
                        res.write('<li><a href="/reparacao/' + reparacao.nome + '">' + reparacao.data + '</a></li>');
                    });
                    res.write('</ul>');
                    res.end();    
                }).catch((error) => {
                    res.writeHead(500, {'Content-Type': 'text/html;charset=utf-8'});
                    res.write("<p>Erro: " + error + "</p>");
                    res.end();
                });
            } else if (req.url === `/intervencoes`) {
                res.writeHead(501, { 'Content-Type': 'image/jpeg' });
                res.end(pic501);
            } else if (req.url === `/viaturas`) {
                res.writeHead(501, { 'Content-Type': 'image/jpeg' });
                res.end(pic501);
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
}).listen(4000, () => {
  console.log('Server is running on port 3000');
});