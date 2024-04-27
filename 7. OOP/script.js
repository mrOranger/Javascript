const coursesList = document.getElementById('courses-list');
const total = document.getElementById('total');
const addButtons = Array.from(document.getElementsByTagName('button'));

class Course {
      constructor(title, image, description, cost) {
            this._title = title;
            this._image = image;
            this._description = description;
            this._cost = cost;
            this._selected = false;
      }

      get title() {
            return this._title;
      }

      set title(value) {
            if (value && value.length > 0) {
                  this._title = value;
            }
      }

      get image() {
            return this._image;
      }

      set image(value) {
            if (value && value.length > 0) {
                  this._image = value;
            }
      }

      get description() {
            return this._description;
      }

      set description(value) {
            if (value && value.length > 0) {
                  this._description = value;
            }
      }

      get cost() {
            return this._cost;
      }

      set cost(value) {
            if (value > 0) {
                  this._cost = value;
            }
      }

      get selected() {
            return this._selected;
      }

      set selected(value) {
            this._selected = value;
      }
}

class CourseList {
      constructor(courses) {
            this._courses = courses;
      }

      getCourseByIndex(index) {
            if (index >= 0 && index < this._courses.length) {
                  return this._courses[index];
            }
      }

      get amount() {
            return this._courses
                  .filter((course) => course.selected)
                  .map((course) => course.cost)
                  .reduce((amount, cost) => amount + cost, 0);
      }

      render() {
            this._courses.forEach((course, index) => {
                  coursesList.innerHTML += `                        
                  <div
                        class="flex flex-col w-full h-full p-5 border-double border-4 border-indigo-600 rounded-xl justify-center">
                        <h1 class="font-sans text-2xl text-center m-2">${course.title}</h1>
                        <div class = "flex flex-col justify-center items-center">
                              <img src="${course.image}" class="rounded-xl m-2 w-2/3 h-full" />
                        </div>
                        <p class="font-sans text-md text-justify m-2">
                              ${course.description}
                        </p>
                        <h2 class="font-sans text-xl text-center m-2">Cost : ${course.cost} $</h1>
                        <div class="flex flex-row justify-center items-center m-2">
                              <button 
                                    id = "add-to-list-${index}"
                                    type="button" 
                                    class="rounded-xl bg-violet-300 w-1/2 p-2" 
                                    onclick="addToList(${index})">
                              Add to list</button>
                              <button 
                                    id = "remove-from-list-${index}"
                                    type="button" 
                                    class="rounded-xl bg-rose-200 w-1/2 p-2" style = "display: none" 
                                    onclick="removeFromList(${index})">
                              Remove from list</button>
                        </div>
                  </div>`;
            });
      }
}

const courses = new CourseList([
      new Course(
            'Algorithms & Data Structures',
            `https://random.imagecdn.app/500/150`,
            `Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
            Porro asperiores facere nobis maiores illum libero hic corporis iusto. 
            Repellendus magni enim quis? Beatae accusantium praesentium ducimus nobis quam sed harum!`,
            20.0,
      ),
      new Course(
            'Calculus 1',
            `https://random.imagecdn.app/500/150`,
            `Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
            Porro asperiores facere nobis maiores illum libero hic corporis iusto. 
            Repellendus magni enim quis? Beatae accusantium praesentium ducimus nobis quam sed harum!`,
            15.0,
      ),
      new Course(
            'Calculus 2',
            `https://random.imagecdn.app/500/150`,
            `Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
            Porro asperiores facere nobis maiores illum libero hic corporis iusto. 
            Repellendus magni enim quis? Beatae accusantium praesentium ducimus nobis quam sed harum!`,
            10.0,
      ),
      new Course(
            'Software Engineering',
            `https://random.imagecdn.app/500/150`,
            `Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
            Porro asperiores facere nobis maiores illum libero hic corporis iusto. 
            Repellendus magni enim quis? Beatae accusantium praesentium ducimus nobis quam sed harum!`,
            30.0,
      ),
]);

courses.render();

function addToList(index) {
      const addButton = document.getElementById(`add-to-list-${index}`);
      const removeButton = document.getElementById(`remove-from-list-${index}`);
      const course = courses.getCourseByIndex(index);
      course.selected = true;
      const coursesTotal = courses.amount;
      total.innerText = `Amount : ${coursesTotal} $`;
      addButton.style.display = 'none';
      removeButton.style.display = '';
}

function removeFromList(index) {
      const addButton = document.getElementById(`add-to-list-${index}`);
      const removeButton = document.getElementById(`remove-from-list-${index}`);
      const course = courses.getCourseByIndex(index);
      course.selected = false;
      const coursesTotal = courses.amount;
      total.innerText = `Amount : ${coursesTotal} $`;
      addButton.style.display = '';
      removeButton.style.display = 'none';
}
