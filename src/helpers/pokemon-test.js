
export async function fetchPokemon(pokemonName) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
  const data = await response.json();
  
  console.count(data.name);
}

async function requestPokemons() {
  await Promise.all([
    fetchPokemon('ditto'),
    fetchPokemon('bulbasaur'),
    fetchPokemon('charmander'),
    fetchPokemon('squirtle'),
    fetchPokemon('dratini'),
  ]);
}

requestPokemons();
