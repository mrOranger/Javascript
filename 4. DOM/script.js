const modalBackdrop = document.getElementById('modal-backdrop');
const addMovieButton = document.getElementById('add-btn');
const confirmModalButton = document.getElementById('confirm-modal-btn');
const cancelModalButton = document.getElementById('cancel-modal-btn');

const onAddNewMovie = function () {
      modalBackdrop.style.visibility = 'visible';
};

const onConfirmModal = function () {
      modalBackdrop.style.visibility = 'hidden';
};

const onCancelModal = function () {
      modalBackdrop.style.visibility = 'hidden';
};

addMovieButton.addEventListener('click', onAddNewMovie);
confirmModalButton.addEventListener('click', onConfirmModal);
cancelModalButton.addEventListener('click', onCancelModal);
