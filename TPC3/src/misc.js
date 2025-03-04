exports.myDateTime = () => {
    return new Date().toISOString().substring(0,10);
}

exports.myName = () => {
    return "Paulo Ferreira"
}

exports.pageList = [
    {name: 'Main Page', url: '/'},
    {name: 'Treinos', url: '/treinos'},
    {name: 'Adicionar Treino', url: '/treinos/register'}
]

exports.myTurma = "EngWeb2025"

