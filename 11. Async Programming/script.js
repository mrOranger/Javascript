class Message {
      constructor(message, receiver) {
            this.message = message;
            this.timestamp = new Date().toLocaleString();
            this.receiver = receiver;
      }

      render() {
            if (this.receiver) {
                  return `
                        <div class="row justify-content-start g-0 mt-2 mb-2 class = "user-input">
                              <div
                                    class="col-10 m-3 g-0 d-flex flex-column justify-content-center align-items-center border rounded-2 border-primary bg-primary-subtle">
                                    <p class="text-start container g-0 p-2 m-0 fs-5">
                                          ${this.message}
                                    </p>
                                    <p class="text-end container g-0 p-1 m-0 fs-6 fw-lighter">
                                          ${this.timestamp}
                                    </p>
                              </div>
                        </div>`;
            }
            return `
                  <div class="row justify-content-end g-0 mt-2 mb-2 user-reply">
                        <div
                              class="col-10 m-3 g-0 d-flex flex-column justify-content-center align-items-center border rounded-2 border-success bg-success-subtle">
                              <p class="text-end container g-0 p-2 m-0 fs-5">
                                    ${this.message}
                              </p>
                              <p class="text-start container g-0 p-1 m-0 fs-6 fw-lighter">
                                    ${this.timestamp}
                              </p>
                        </div>
                  </div>`;
      }
}

class Chat {
      constructor() {
            this.input = document.getElementById('input');
            this.button = document.getElementById('button');
            this.chat = document.getElementById('chat');

            this.button.addEventListener('click', this.send.bind(this));
      }

      send() {
            const message = new Message(this.input.value.trim(), true);
            this.chat.innerHTML += message.render();
            this.reply()
                  .then((response) => {
                        const reply = new Message(response, false);
                        this.chat.innerHTML += reply.render();
                  })
                  .catch((error) => console.error(error));
      }

      reply() {
            return new Promise((resolve, reject) => {
                  setTimeout(() => {
                        return resolve(this.input.value.trim());
                  }, Math.random() * 2000);
            });
      }
}

const chat = new Chat();
