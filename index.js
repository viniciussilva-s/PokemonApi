// const Pokedex = require("pokeapi-js-wrapper")
// import Pokedex from './pokeapi-js-wrapper';
const APP = document.getElementById("app");
const title = document.querySelector(".card-header h5");
const img = document.querySelector(".card-body img");
const article = document.querySelector("article");
const paginacao = document.querySelectorAll("li button")
// const first = document.querySelector("ul li:first-child");
// const firt = document.querySelector("ul li:first-child");
// const last = document.querySelector("ul li:last-child");
const P = new Pokedex.Pokedex()
// P.getPokemonByName("eevee")
//     .then(function (response) {
//         if (response.id != "") {
//             pokemon_id = response.id;
//             // <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon_id}.png" alt="${pokemon_id}">
//             // <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon_id}.svg"
//             //     alt="${pokemon_id}">
//             // <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/${pokemon_id}.png"
//             //     alt="${pokemon_id}">
//             title.innerHTML = response.name
//             img.setAttribute("src",
//                 `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon_id}.svg`
//             )
//         }
//     })

function setPagina(pos, number) {
    paginacao[pos].innerHTML = number;
    paginacao[pos].setAttribute("alt", number);
}
var pokemon_id = 1;
var url_paginacao = "https://pokeapi.co/api/v2/ability/?limit=1&offset=0";
function search_pokemon(pokemon_atual = pokemon_id, url = url_paginacao) {
    P.resource([
        `https://pokeapi.co/api/v2/ability/?limit=1&offset=${pokemon_atual}`,
        `/api/v2/pokemon/${pokemon_atual}`,
    ]).then(response => {

        if (response) {
            rlt = response[0];
            response_pokemon = response[1]
            // console.log(rlt);
            // console.log(rlt.results[0]);
            // console.log(rlt.results[0].name);
            // if (response[0]) {
            // pokemon_atual = response[0];
            // P.getPokemonByName(rlt.results[0].name)
            //     .then(function (response_pokemon) {
            // if (response_pokemon != "") {
            pokemon_id = response_pokemon.id;
            // <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon_id}.png" alt="${pokemon_id}">
            // <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon_id}.svg"
            //     alt="${pokemon_id}">
            // <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/${pokemon_id}.png"
            //     alt="${pokemon_id}">
            title.innerHTML = response_pokemon.name
            img.setAttribute("src",
                `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon_id}.svg`
            )
            // }
            // })
            // }
            numero_atual = null
            if (rlt.next) {
                var url = new URL(rlt.next);
                numero_atual = parseInt(url.searchParams.get("offset")) - 1;

            } else {
                var url = new URL(rlt.next);
                numero_atual = parseInt(url.searchParams.get("offset")) + 1;
            }
            // (rlt.next) ? (URL(rlt.next).searchParams.get("offset")) - 1 : (URL(rlt.previous).searchParams.get("offset")) + 1;

            setPagina(0, (numero_atual > 1) ? numero_atual - 1 : numero_atual)
            setPagina(1, (numero_atual > 1) ? numero_atual - 1 : numero_atual)
            // setPagina(1, numero_atual - 1)
            setPagina(2, numero_atual)
            setPagina(3, (numero_atual < rlt.count) ? numero_atual + 1 : numero_atual)
            setPagina(4, (numero_atual < rlt.count) ? numero_atual + 1 : numero_atual)

        }

        console.log(response)
    })
}
search_pokemon()

