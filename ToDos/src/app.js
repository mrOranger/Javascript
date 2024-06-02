import { GetAllListener } from './listeners/main-actions/get-all.listener';

const showAllAction = document.querySelector('#getAllAction');

const todoAction = new GetAllListener(showAllAction);
