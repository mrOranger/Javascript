const emailForm = document.querySelector('#email-form');
const passwordForm = document.querySelector('#password-form');
const emailInput = document.querySelector('input[type="email"]') as HTMLInputElement;
const passwordInput = document.querySelector('input[type="password"]') as HTMLInputElement;
const loginButton = document.querySelector('button[type="button"]') as HTMLButtonElement;

type Model = {
      email: {
            value: string;
            valid: boolean;
            message: string;
      };
      password: {
            value: string;
            valid: boolean;
            message: string;
      };
};

enum InputType {
      EMAIL,
      PASSWORD,
}

const model: Model = {
      email: { value: '', valid: false, message: '' },
      password: { value: '', valid: false, message: '' },
};

emailInput.oninput = function onEmailInputChange(event: Event) {
      const inputEvent = event as InputEvent;

      if (inputEvent.inputType === 'deleteContentBackward' && model.email.value.length > 0) {
            model.email.value = model.email.value.slice(0, model.email.value.length - 1);
      } else {
            const value = <string>(event as InputEvent).data;
            model.email.value += value;
      }

      const isValidEmail = onEmailInputValidate(model.email.value);
      emailInput.setAttribute('valid', `${isValidEmail}`);
      model.email.valid = isValidEmail;
      passwordInput.setAttribute('valid', `${isValidEmail}`);
      if (isValidEmail) {
            deleteErrorMessage(InputType.EMAIL, emailInput);
      } else {
            renderErrorMessage(InputType.EMAIL, 'Not a valid email!', emailForm, emailInput);
      }

      if (model.email.valid && model.password.valid) {
            loginButton.removeAttribute('disabled');
      } else {
            loginButton.setAttribute('disabled', '');
      }
};

passwordInput.oninput = function onPasswordInputChange(event: Event) {
      const inputEvent = event as InputEvent;

      if (inputEvent.inputType === 'deleteContentBackward' && model.password.value.length > 0) {
            model.password.value = model.password.value.slice(0, model.password.value.length - 1);
      } else {
            const value = <string>(event as InputEvent).data;
            model.password.value += value;
      }

      const isValidPassword = onPasswordInputValidate(model.password.value);
      model.password.valid = isValidPassword;
      passwordInput.setAttribute('valid', `${isValidPassword}`);
      if (isValidPassword) {
            deleteErrorMessage(InputType.PASSWORD, passwordInput);
      } else {
            renderErrorMessage(InputType.PASSWORD, 'Not a valid password!', passwordForm, passwordInput);
      }

      if (model.email.valid && model.password.valid) {
            loginButton.removeAttribute('disabled');
      } else {
            loginButton.setAttribute('disabled', '');
      }
};

loginButton.onclick = function onLoginButtonClick() {
      if (model.email.valid && model.password.valid) {
            alert('You login successfully!');
      }
};

function renderErrorMessage(
      messageType: InputType,
      message: string,
      form: Element | null,
      input: Element | null,
): void {
      const errorMessage = document.getElementById(`error-message-${messageType}`);

      if (!errorMessage) {
            const div = document.createElement('div');
            div.id = `error-message-${messageType}`;
            div.classList.add('invalid-feedback');
            div.textContent = message;

            input?.classList.add('is-invalid');
            form?.appendChild(div);
      }
}

function deleteErrorMessage(messageType: InputType, input: Element | null): void {
      input?.classList.remove('is-invalid');
      document.getElementById(`error-message-${messageType}`)?.remove();
}

function onEmailInputValidate(email: string) {
      return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
}

function onPasswordInputValidate(password: string) {
      return /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(password);
}
