import { GetAllListener } from './listeners/main-actions/get-all.listener';

const body = document.querySelector('body');
const showAllAction = document.querySelector('#getAllAction');

const todoAction = new GetAllListener(showAllAction, body);
