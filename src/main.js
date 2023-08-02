import { fetchPokemon, getMoviesAndVotes, vote } from './services/api.js';

function createVersusImage() {
  const versusImage = document.createElement('img');
  versusImage.src = './src/vs.png'; 
  versusImage.alt = 'Versus';
  versusImage.style.width = '100px';
  versusImage.style.objectFit = 'contain';
  return versusImage;
}

// Função para adicionar um filme e a imagem "VERSUS" (se necessário) ao contêiner
function addMovieToContainer(movie, vote, container, isLastMovie) {
  const movieElement = createMovieElement(movie, vote.voteCount);
  container.appendChild(movieElement);
  
  // Se não for o último filme, adicione a imagem "VERSUS"
  if (!isLastMovie) {
    const versusImage = createVersusImage();
    container.appendChild(versusImage);
  }
}

async function loadMovies() {
  const [movies, votes] = await getMoviesAndVotes();
  const movieContainer = document.getElementById('movie-container');
  movieContainer.innerHTML = '';
  
  const firstTwoMovies = movies.slice(0, 3);

  console.log(firstTwoMovies);
  firstTwoMovies.forEach((movie, index) => {
    const vote = votes.find(vote => vote.movieId === movie.id);
    const isLastMovie = index === firstTwoMovies.length - 1;
    addMovieToContainer(movie, vote, movieContainer, isLastMovie);
  });
}

function createMovieElement(movie, votes) {
  const movieDiv = document.createElement('div');
  movieDiv.innerHTML = `
    <h2>${movie.name}</h2>
    <img src="${movie.image}" alt="${movie.name}" width="200">
    <div class="votes">
      <button>Votar</button>
      <p>${votes}</p>
    </div>
  `;
  const button = movieDiv.querySelector('button');
  button.addEventListener('click', () => {
    vote(movie.id, votes).then(loadMovies);
  });
  return movieDiv;
}

// function loadMovies() {
//   getMoviesAndVotes().then(([movies, votes]) => {
//     const movieContainer = document.getElementById('movie-container');
//     movieContainer.innerHTML = '';
//     const firstTwoMovies = movies.slice(0, 3);
//     for (const movie of firstTwoMovies) {
//       const vote = votes.find(vote => vote.movieId === movie.id);
//       const movieElement = createMovieElement(movie, vote.voteCount);
//       movieContainer.appendChild(movieElement);
//       // Se não for o último filme, adicione a imagem "VERSUS"
//       if (movie.id !== firstTwoMovies[firstTwoMovies.length - 1].id) {
//         const versusImage = document.createElement('img');
//         versusImage.src = './src/vs.png'; 
//         versusImage.alt = 'Versus';
//         versusImage.style.width = '100px';
//         versusImage.style.objectFit = 'contain';
//         movieContainer.appendChild(versusImage);
//       }
//     }
//   });
// }

loadMovies();

async function requestPokemons() {
  await Promise.all([
  fetchPokemon('ditto'),
  fetchPokemon('bulbasaur'),
  fetchPokemon('charmander'),
  fetchPokemon('squirtle'),
  fetchPokemon('dratini')
]);
}

requestPokemons();