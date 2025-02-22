# express stuff

// Com isto podemos definira o codigo da mensagem
res.sendStatus(200)

// Podemos inclusive acrescentar coisas
res.sendStatus(200).send('Hi')
res.sendStatus(200).json({ message : "Error" })

// Podemos enviar ficheiros para download
res.download("server.js")

// Podemos renderizar ficheiros com esta defenição
res.render('index')

// Quando utilizamos ejs, podemos passar argumentos para dentro do render
// Se tivermos
```js
    res.render("mainPage", 
        {text123: `World`}
    )
```
// Podemos usar locals no .ejs para evitar erros caso passemos outro argumento
```ejs
<%= locals.text || 'Default' %>