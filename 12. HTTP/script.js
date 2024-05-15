const POST_RESOURCE = 'https://jsonplaceholder.typicode.com/posts';
const submitButton = document.querySelector('#submit');
const fetchButton = document.querySelector('#fetch');
const content = document.querySelector('#content');

const userIdInput = document.querySelector('#inputUserId');
const titleInput = document.querySelector('#inputTitle');
const bodyInput = document.querySelector('#inputBody');

function getAll() {
      return fetch(POST_RESOURCE).then((response) => {
            if (response.status >= 200 && response.status < 300) {
                  return response.json();
            }
            throw new Error(`${response.status} - An error occurred while fetching all.`);
      });
}

function save(post) {
      return fetch(POST_RESOURCE, {
            method: 'POST',
            body: JSON.stringify(post),
            headers: {
                  'Content-Type': 'application/json',
            },
      }).then((response) => {
            if (response.status >= 200 && response.status < 300) {
                  return response.json();
            }
            throw new Error(`${response.status} - An error occurred while posting.`);
      });
}

function remove(id) {
      return fetch(`${POST_RESOURCE}/${id}`, {
            method: 'DELETE',
            headers: {
                  'Content-Type': 'application/json',
            },
      }).then((response) => {
            if (response.status >= 200 && response.status < 300) {
                  return response.json();
            }
            throw new Error(`${response.status} - An error occurred while deleting.`);
      });
}

function createPostCard(post) {
      return `
            <div class="card mt-20 mb-20" id = "post-${post.id}">
                  <div class="card-header">${post.title}</div>
                  <div class="card-body">
                        <p class="card-text">${post.body}</p>
                        <button type = "button" class="btn btn-danger" onclick="deletePost(${post.id})">Delete</a>
                  </div>
            </div>`;
}

submitButton.addEventListener('click', (clickEvent) => {
      clickEvent.preventDefault();
      const userId = userIdInput.value;
      const title = titleInput.value;
      const body = bodyInput.value;
      save({ userId, title, body })
            .then(() => {
                  const card = createPostCard({
                        id: userId,
                        title: title,
                        body: body,
                  });
                  content.innerHTML += card;
            })
            .catch((error) => {
                  alert(error);
            });
});

fetchButton.addEventListener('click', () => {
      getAll()
            .then((posts) => {
                  for (const post of posts) {
                        const card = createPostCard(post);
                        content.innerHTML += card;
                  }
            })
            .catch((error) => {
                  console.error(error);
            });
});

function deletePost(postId) {
      remove(postId)
            .then((result) => {
                  document.querySelector(`#post-${postId}`).remove();
                  alert(`Post ${postId} deleted!`);
            })
            .catch((error) => {
                  console.error(error);
            });
}
