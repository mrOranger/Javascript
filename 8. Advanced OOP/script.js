class Project {
      constructor(id, name, description, projectManager, active) {
            this.id = id;
            this.name = name;
            this.description = description;
            this.projectManager = projectManager;
            this.active = active;
            this.createdAt = new Date().toLocaleTimeString('it-IT');
            this.updatedAt = this.createdAt;
      }

      move() {
            this.updatedAt = new Date().toLocaleTimeString('it-IT');
            this.active = !this.active;
            document.getElementById(`project-${this.id}`).remove();
            this.render();
      }

      render() {
            const li = document.createElement('li');
            li.id = `project-${this.id}`;
            li.classList.add('border-2', 'border-indigo-200', 'mt-5', 'mb-5', 'rounded-lg');

            li.appendChild(this.#renderTitle());
            li.appendChild(this.#renderProjectManager());
            li.appendChild(this.#renderDescription());
            li.appendChild(this.#renderButtons());
            li.appendChild(this.#renderTimestampsDetails());

            if (this.active) {
                  document.getElementById('active-projects-list').appendChild(li);
            } else {
                  document.getElementById('unactive-projects-list').appendChild(li);
            }
      }

      #renderTitle() {
            const h1 = document.createElement('h1');
            h1.classList.add('font-sans', 'text-2xl', 'm-5');
            h1.innerText = `Progetto ${this.id}`;
            return h1;
      }

      #renderProjectManager() {
            const h3 = document.createElement('h3');
            h3.classList.add('text-xl', 'm-3');
            h3.textContent = `Project Manager : ${this.projectManager.firstName} ${this.projectManager.lastName}`;
            return h3;
      }

      #renderDescription() {
            const p = document.createElement('p');
            p.classList.add('text-justify', 'm-3');
            p.textContent = this.description;
            return p;
      }

      #renderButtons() {
            const buttonsDiv = document.createElement('div');
            buttonsDiv.classList.add('w-full', 'flex', 'flex-row', 'justify-start', 'items-center', 'm-5');

            if (this.active) {
                  buttonsDiv.appendChild(this.#renderStopButton());
            } else {
                  buttonsDiv.appendChild(this.#renderStartButton());
                  buttonsDiv.appendChild(this.#renderDeleteButton());
            }

            return buttonsDiv;
      }

      #renderStartButton() {
            const startButton = document.createElement('button');

            startButton.classList.add(
                  'w-1/6',
                  'bg-green-300',
                  'mr-5',
                  'p-2',
                  'rounded-lg',
                  'text-zinc-100',
                  'cursor-pointer',
                  'transition',
                  'ease-in-out',
                  'delay-150',
                  'bg-green-500',
                  'hover:-translate-y-1',
                  'hover:scale-110',
                  'hover:bg-green-500',
                  'duration-300',
            );

            startButton.textContent = 'Start';
            startButton.addEventListener('click', this.onStart.bind(this));

            return startButton;
      }

      #renderStopButton() {
            const stopButton = document.createElement('button');

            stopButton.classList.add(
                  'w-1/6',
                  'bg-rose-400',
                  'mr-5',
                  'p-2',
                  'rounded-lg',
                  'text-zinc-100',
                  'cursor-pointer',
                  'transition',
                  'ease-in-out',
                  'delay-150',
                  'bg-rose-500',
                  'hover:-translate-y-1',
                  'hover:scale-110',
                  'hover:bg-rose-500',
                  'duration-300',
            );
            stopButton.textContent = 'Stop';
            stopButton.addEventListener('click', this.onStop.bind(this));

            return stopButton;
      }

      #renderDeleteButton() {
            const deleteButton = document.createElement('button');

            deleteButton.classList.add(
                  'w-1/6',
                  'bg-rose-400',
                  'mr-5',
                  'p-2',
                  'rounded-lg',
                  'text-zinc-100',
                  'cursor-pointer',
                  'transition',
                  'ease-in-out',
                  'delay-150',
                  'bg-rose-500',
                  'hover:-translate-y-1',
                  'hover:scale-110',
                  'hover:bg-rose-500',
                  'duration-300',
            );
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', this.onDelete.bind(this));

            return deleteButton;
      }

      #renderTimestampsDetails() {
            const divTimelineInfo = document.createElement('div');
            divTimelineInfo.classList.add('w-full', 'flex', 'flex-col', 'm-3');

            const createdAt = document.createElement('h3');
            createdAt.classList.add('text-sm', 'italic');
            createdAt.textContent = `Created at : ${this.createdAt}`;
            divTimelineInfo.appendChild(createdAt);

            const updatedAt = document.createElement('h3');
            updatedAt.classList.add('text-sm', 'italic');
            updatedAt.textContent = `Updated at : ${this.updatedAt}`;
            divTimelineInfo.appendChild(updatedAt);

            return divTimelineInfo;
      }

      onDelete() {
            document.getElementById(`project-${this.id}`).remove();

            const unactiveProjectsHeader = document.getElementById('unactive-projects-header');

            unactiveProjectsHeader.textContent = `Unctive Projects : ${ProjectsList.getUnactiveProjectsNumber()}`;
      }

      onStop() {
            this.move();

            const activeProjectsHeader = document.getElementById('active-projects-header');
            const unactiveProjectsHeader = document.getElementById('unactive-projects-header');

            activeProjectsHeader.textContent = `Active Projects : ${ProjectsList.getActiveProjectsNumber()}`;
            unactiveProjectsHeader.textContent = `Unctive Projects : ${ProjectsList.getUnactiveProjectsNumber()}`;
      }

      onStart() {
            this.move();

            const activeProjectsHeader = document.getElementById('active-projects-header');
            const unactiveProjectsHeader = document.getElementById('unactive-projects-header');

            activeProjectsHeader.textContent = `Active Projects : ${ProjectsList.getActiveProjectsNumber()}`;
            unactiveProjectsHeader.textContent = `Unctive Projects : ${ProjectsList.getUnactiveProjectsNumber()}`;
      }
}

class ProjectManager {
      constructor(firstName, lastName) {
            this.firstName = firstName;
            this.lastName = lastName;
      }
}

class ProjectsList {
      constructor(projects) {
            this.projects = projects;
      }

      renderAll() {
            this.projects.forEach((project) => project.render());
            const activeProjectsHeader = document.getElementById('active-projects-header');
            const unactiveProjectsHeader = document.getElementById('unactive-projects-header');

            activeProjectsHeader.textContent = `Active Projects : ${ProjectsList.getActiveProjectsNumber()}`;
            unactiveProjectsHeader.textContent = `Unctive Projects : ${ProjectsList.getUnactiveProjectsNumber()}`;
      }

      static getActiveProjectsNumber() {
            return document.querySelectorAll('#active-projects-list > li').length;
      }

      static getUnactiveProjectsNumber() {
            return document.querySelectorAll('#unactive-projects-list > li').length;
      }
}

class Application {
      static init() {
            const projectsList = new ProjectsList([
                  new Project(
                        1,
                        'Progetto Urano',
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tincidunt venenatis nibh tincidunt bibendum. Morbi ullamcorper ac elit nec aliquet. Aenean non metus ante. Integer in sagittis lorem. Aenean sem nisl, dictum sed molestie non, imperdiet molestie urna. Ut consectetur turpis ante, non malesuada eros mollis at. Nulla tincidunt lorem sit amet metus ullamcorper interdum. Donec non massa odio. Aenean faucibus ipsum a augue ultricies, id tempus risus consectetur. Phasellus feugiat cursus condimentum. Aenean dignissim condimentum pulvinar. Nulla a scelerisque dui. In nec odio aliquet, porta erat non, varius neque. Pellentesque id ultricies risus, eget fermentum sem. In hac habitasse platea dictumst.',
                        new ProjectManager('Mario', 'Rossi'),
                        true,
                  ),
                  new Project(
                        2,
                        'Progetto Giove',
                        'Maecenas rutrum ut sem vel pellentesque. Cras efficitur lacus et libero pellentesque malesuada. Ut tempus convallis nisl, non imperdiet urna congue eu. Ut tincidunt arcu in purus maximus, nec congue arcu luctus. Vestibulum sit amet leo nec ligula efficitur consequat. Sed vel risus arcu. Nullam vel felis tempor, venenatis ex ut, placerat ipsum. Pellentesque feugiat eu libero at molestie. Donec egestas arcu at laoreet bibendum.',
                        new ProjectManager('Federico', 'Bruni'),
                        true,
                  ),
                  new Project(
                        3,
                        'Progetto Saturno',
                        'Curabitur elementum, lorem non finibus venenatis, tellus ex bibendum turpis, ut vestibulum lectus sem id est. Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut vel tristique risus. Pellentesque aliquet pretium lectus eu pulvinar. Sed fermentum nisl justo, et tempor mauris sollicitudin vel. Mauris venenatis laoreet arcu, ut cursus nibh volutpat in. Phasellus sodales, nunc at fringilla ultricies, purus lorem auctor neque, ut luctus neque magna porta ante. Donec ultrices posuere ex.',
                        new ProjectManager('Mario', 'Rossi'),
                        false,
                  ),
            ]);

            projectsList.renderAll();
      }
}

Application.init();
