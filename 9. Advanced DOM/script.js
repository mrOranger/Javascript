function Template(id) {
      const template = document.getElementById(id);
      const todayDate = new Date().toLocaleDateString();
      const href = location.href;
      const view = new View('view');
      let startingParameters = {
            '$now-date$': new Date().toLocaleDateString(),
            '$now-datetime$': new Date().toLocaleTimeString(),
            '$location.href': location.href,
      };

      Template.prototype.forceRender = function forceRender(parameters) {
            let viewText = view.getText();
            startingParameters = parameters;

            for (const parameter in parameters) {
                  if (viewText.includes(parameter)) {
                        viewText = viewText.replaceAll(parameter, parameters[parameter]);
                  }
            }

            view.setText(viewText);
      };

      Template.prototype.onChangeListener = function onChangeListener(value) {
            let viewText = value.target.value;

            for (const parameter in startingParameters) {
                  if (viewText.includes(parameter)) {
                        viewText = viewText.replaceAll(parameter, startingParameters[parameter]);
                  }
            }

            view.setText(viewText);

            view.setText(viewText);
      };

      Template.prototype.render = function render() {
            template.addEventListener('input', this.onChangeListener.bind(this));
      };
}

function View(id) {
      const view = document.getElementById(id);

      View.prototype.getText = function getText() {
            return view.textContent;
      };

      View.prototype.setText = function setText(value) {
            view.textContent = value;
      };
}

function Form(template) {
      const variablesList = document.getElementById('variables-list');
      const keyName = document.getElementById('key-name');
      const keyValue = document.getElementById('key-value');
      const submit = document.getElementById('submit');

      const parametes = {
            '$now-date$': new Date().toLocaleDateString(),
            '$now-datetime$': new Date().toLocaleTimeString(),
            '$location.href': location.href,
      };

      Form.prototype.onSubmitListener = function onSubmitListener() {
            const li = document.createElement('li');
            li.innerHTML = `The value <i class = "fw-semibold">${keyName.value}</i> is replace by <i class = "fw-semibold">${keyValue.value}</i>`;
            variablesList.appendChild(li);
            parametes[keyName.value] = keyValue.value;
            template.forceRender(parametes);
      };

      Form.prototype.render = function render() {
            submit.addEventListener('click', this.onSubmitListener.bind(this));
      };
}

function App() {
      const template = new Template('template');
      const form = new Form(template);

      App.prototype.render = function render() {
            template.render();
            form.render();
      };
}

const app = new App();
app.render();
