import { GetAllAction } from './components/actions/getAllAction.component';
import { GetByIdAction } from './components/actions/getByIdAction.component';
import { SaveAction } from './components/actions/saveAction.component';
import { UpdateAction } from './components/actions/updateAction.component';
import { PatchStateAction } from './components/actions/patchStateAction.component';
import { DeleteAction } from './components/actions/deleteAction.component';

sessionStorage.setItem('semaphore', true);

const body = document.querySelector('body');
const header = document.querySelector('#header');

const getAllActionElement = document.querySelector('#getAllAction');
const getByIdActionElement = document.querySelector('#getByIdAction');
const saveActionElement = document.querySelector('#saveAction');
const updateActionElement = document.querySelector('#updateAction');
const patchStateActionElement = document.querySelector('#patchStateAction');
const deleteActionElement = document.querySelector('#deleteAction');

const getAllAction = new GetAllAction(getAllActionElement, body);
const getByIdAction = new GetByIdAction(getByIdActionElement, body);
const saveAction = new SaveAction(saveActionElement, body);
const updateAction = new UpdateAction(updateActionElement, body);
const patchStateAction = new PatchStateAction(patchStateActionElement, body);
const deleteAction = new DeleteAction(deleteActionElement, body);
