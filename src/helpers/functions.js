import { getMoviesAndVotes, vote } from "../services/api";

export function createVersusImage() {
  const versusImage = document.createElement('img');
  versusImage.src = './src/assets/vs2.png';
  versusImage.alt = 'Versus';
  versusImage.style.width = '100px';
  versusImage.style.objectFit = 'contain';
  return versusImage;
}

export async function loadMovies() {
  const [movies, votes] = await getMoviesAndVotes();
  const movieContainer = document.getElementById('movie-container');
  movieContainer.innerHTML = '';

  const firstTwoMovies = movies.slice(0, 2);

  firstTwoMovies.forEach((movie, index) => {
    const vote = votes.find((vote) => vote.movieId === movie.id);
    const isLastMovie = index === firstTwoMovies.length - 1;
    addMovieToContainer(movie, vote, movieContainer, isLastMovie);
  });
}

// Função para adicionar um filme e a imagem "VERSUS" (se necessário) ao contêiner
export function addMovieToContainer(movie, vote, container, isLastMovie) {
  const movieElement = createMovieElement(movie, vote.voteCount);
  container.appendChild(movieElement);

  // Se não for o último filme, adicione a imagem "VERSUS"
  if (!isLastMovie) {
    const versusImage = createVersusImage();
    container.appendChild(versusImage);
  }
}

export function createMovieElement(movie, votes) {
  const movieDiv = document.createElement('div');
  movieDiv.innerHTML = `
    
    <h2>${movie.name}</h2>
    <img src="${movie.image}" alt="${movie.name}" width="200">
    <div class="votes">
      <button>Votar <span>💚 ${votes}</span></button>
    </div>
  `;
  const button = movieDiv.querySelector('button');
  button.addEventListener('click', async () => {
    try {
      button.textContent = 'Votando...';
      await vote(movie.id, votes);
      button.textContent = 'Votar';
      loadMovies();
    } catch (error) {
      button.textContent = 'Votar';
      alert('Ocorreu um erro ao votar no filme');
      console.error(error);
    }
  });
  return movieDiv;
}
