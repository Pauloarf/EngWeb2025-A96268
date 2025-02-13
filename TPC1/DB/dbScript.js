/**
 *  This script is going to be used to "normalize" the database file
 *  The JSON needs to have every type that is going to be used in the application separated. (e.g: users, products, orders)
 */
const fs = require('fs');
const rawData = fs.readFileSync('./dataset_reparacoes.json');
const json = JSON.parse(rawData); // Explicitly parse JSON

const reparacoes = json.reparacoes;
const viaturas = [];
const intervencoes = [];

reparacoes.forEach((entry) => {
  if (entry.viatura) viaturas.push(entry.viatura);
  if (entry.intervencoes) {
    entry.intervencoes.forEach((intervencao) => {
      intervencoes.push(intervencao);
    });
  };
});

const writeObject = (path, data) => {
  try{
    fs.writeFileSync(path, JSON.stringify(data, null, 4), 'utf-8'); 
  } catch (error) {
    console.error(error);
  }
}

writeObject('./normalized_dataset.json', { reparacoes, viaturas, intervencoes });

