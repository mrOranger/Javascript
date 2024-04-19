const modalBackdrop = document.getElementById('modal-backdrop');
const addMovieButton = document.getElementById('add-btn');
const confirmModalButton = document.getElementById('confirm-modal-btn');
const cancelModalButton = document.getElementById('cancel-modal-btn');

const movieList = document.getElementById('movie-list');
const movieTitle = document.getElementById('movie-title');
const movieDescription = document.getElementById('movie-desc');
const movieImage = document.getElementById('movie-image');

const movies = [];

const onAddNewMovie = function () {
      modalBackdrop.style.visibility = 'visible';
};

const onConfirmModal = function () {
      if (isFieldValid(movieTitle.value) && isFieldValid(movieDescription.value) && isFieldValid(movieImage.value)) {
            movies.push({
                  name: movieTitle.value.trim(),
                  description: movieDescription.value.trim(),
                  image: movieImage.value.trim(),
            });
            alert('Movie added successfully!');
            modalBackdrop.style.visibility = 'hidden';
            movieList.appendChild(
                  createNewMovie({
                        name: movieTitle.value.trim(),
                        description: movieDescription.value.trim(),
                        image: movieImage.value.trim(),
                  }),
            );
            resetElementsValues();
      } else {
            alert('Invalid movie');
      }
};

const onCancelModal = function () {
      resetElementsValues();
      modalBackdrop.style.visibility = 'hidden';
};

function isFieldValid(field) {
      return field && field.trim().length > 0;
}

function resetElementsValues() {
      resetElementValue(movieTitle);
      resetElementValue(movieDescription);
      resetElementValue(movieImage);
}

function resetElementValue(element) {
      element.value = '';
}

function createNewMovie(movie) {
      movieList.style.visibility = 'visible';

      const movieContainer = document.createElement('div');
      const movieContainerTitle = document.createElement('h1');
      const movieContainerDescription = document.createElement('p');
      const movieContainerImage = document.createElement('img');

      movieContainer.classList = 'movie-container';

      movieContainerTitle.textContent = movie.name;
      movieContainerDescription.textContent = movie.description;
      movieContainerImage.setAttribute('src', movie.image);

      movieContainer.appendChild(movieContainerTitle);
      movieContainer.appendChild(movieContainerDescription);
      movieContainer.appendChild(movieContainerImage);

      return movieContainer;
}

addMovieButton.addEventListener('click', onAddNewMovie);
confirmModalButton.addEventListener('click', onConfirmModal);
cancelModalButton.addEventListener('click', onCancelModal);
