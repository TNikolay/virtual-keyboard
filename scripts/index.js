import { createElement } from './utils.js';
import initKeyboard from './keyboard.js';

function initApp() {
  const elWrapper = createElement('div', { className: 'wrapper' });
  const elTextArea = createElement('textarea', { className: 'input-field' });

  elWrapper.append(createElement('h1', { className: 'h1', textContent: 'Keyboard losted in rainforest' }));
  elWrapper.append(elTextArea);
  elWrapper.append(initKeyboard(elTextArea));
  document.body.append(elWrapper);
}

initApp();
