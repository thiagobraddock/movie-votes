// export function getMoviesAndVotes() {
//   return Promise.all([
//     fetch('http://localhost:3000/movies').then(response => response.json()),
//     fetch('http://localhost:3000/votes').then(response => response.json())
//   ]);
// }

export async function getMoviesAndVotes() {
  const responses = await Promise.all([
    // fetch('http://localhost:3000/movies'),
    // fetch('http://localhost:3000/votes'),
    fetch('https://movies-backend-api.onrender.com/movies'),
    fetch('https://movies-backend-api.onrender.com/votes'),
  ]);

  const data = await Promise.all(
    responses.map((response) => {
      if (!response.ok) throw new Error(response.statusText);
      return response.json();
    })
  );

  return data;
}

// Função para incrementar a contagem de votos de um filme
export async function vote(movieId, currentVoteCount) {
  // Constrói a URL para a requisição
  // const url = `http://localhost:3000/votes/${movieId}`;
  const url = `https://movies-backend-api.onrender.com/votes/${movieId}`;

  // Define as opções para a requisição
  const options = {
    method: 'PATCH', // Método HTTP para atualizar parte dos recursos do servidor
    headers: {
      'Content-Type': 'application/json', // Informa ao servidor que estamos enviando dados JSON
    },
    body: JSON.stringify({ // Converte o objeto JavaScript em uma string JSON
      voteCount: currentVoteCount + 1, // Incrementa a contagem de votos atual
    }),
  };

  // Faz a requisição ao servidor
  const response = await fetch(url, options);
  console.log(response);
  // Converte a resposta do servidor em JSON e retorna
  return response.json();
}



export async function fetchPokemon(pokemonName) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
  const data = await response.json();
  
  console.count(data.name);
}