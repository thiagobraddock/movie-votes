// export function getMoviesAndVotes() {
//   return Promise.all([
//     fetch('http://localhost:3000/movies').then(response => response.json()),
//     fetch('http://localhost:3000/votes').then(response => response.json())
//   ]);
// }
const ENV = 'production';
const API_URL = ENV === 'production'
? 'https://movies-backend-api.onrender.com'
: 'http://localhost:3000';

export async function getMoviesAndVotes() {
  const responses = await Promise.all([
    // fetch('http://localhost:3000/movies'),
    // fetch('http://localhost:3000/votes'),
    fetch(`${API_URL}/movies`),
    fetch(`${API_URL}/votes`),
  ]);

  const data = await Promise.all(
    responses.map((response) => {
      if (!response.ok) throw new Error(response.statusText);
      return response.json();
    })
  );

  return data;
}

export async function vote(movieId, currentVoteCount) {
  // const url = `http://localhost:3000/votes/${movieId}`;
  const url = `${API_URL}/votes/${movieId}`;

  const options = {
    method: 'PATCH', // Método HTTP para atualizar parte dos recursos do servidor
    headers: {
      'Content-Type': 'application/json', // Informa ao servidor que estamos enviando dados JSON
    },
    body: JSON.stringify({ // Converte o objeto JavaScript em uma string JSON
      voteCount: currentVoteCount + 1, // Incrementa a contagem de votos atual
    }),
  };

  const response = await fetch(url, options);
  return response.json();
}



export async function fetchPokemon(pokemonName) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
  const data = await response.json();
  
  console.count(data.name);
}