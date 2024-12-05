//Função para obter o número aleatório de IDs entre 1 e 1010
const getRandomPokemonId = () => Math.floor(Math.random() * 1010 +1);

//Função para buscar dados de um Pokemon por ID
const fetchPokemonData = (id) =>
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then((response) => response.ok ? response.json() : Promise.reject(`Erro ${response.status} : ${response.statusText}`))

//função Principal para carregar 8 Pokemons aleatórios
const loadRandomPokemons = async () => {
    const lista = document.getElementById('listaPokemons')
    lista.innerHTML = ""//Limpa a lista antes de carregar novos Pokemons

    try {
        const promises = Array.from({length: 8}, () => fetchPokemonData(getRandomPokemonId()))
        const results = await Promise.all(promises);

        const ul = document.createElement('ul')
        results.forEach(({name, sprites}) => {
            const li = document.createElement('li')
            li.innerHTML = `
            <h2>${name}</h2>
            <img src="${sprites.front_default}" width="150" alt="${name}">
            `
            ul.appendChild(li)
        })
        lista.appendChild(ul)
    } catch(error) {
        console.error("Ocorreu o erro: ", error)
    }
}
    //Carregar Pokemons ao carregar a página
    document.addEventListener("DOMContentLoaded", loadRandomPokemons);