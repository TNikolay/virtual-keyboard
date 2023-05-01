import { createElement } from './utils.js';
import initKeyboard from './keyboard.js';

function initApp() {
  const elWrapper = createElement('div', { className: 'wrapper' });
  const elTextArea = createElement('textarea', { className: 'input-field', textContent: 'Привет, Маугли!' });

  elWrapper.append(createElement('h1', { className: 'h1', textContent: 'Rainforest grown keyboard' }));
  elWrapper.append(elTextArea);

  const info = createElement('div', { className: 'info' });
  const lang = createElement('span', { className: 'info_sense' });
  info.append(
    createElement('span', { className: 'info_title', textContent: 'OS:' }),
    createElement('span', { className: 'info_sense', textContent: 'Windows' }),
    createElement('span', { className: 'info2', textContent: 'Language: ' }),
    lang,
    createElement('span', { className: 'info_title', textContent: 'Switch layout:' }),
    createElement('span', { className: 'info_sense', textContent: 'Use Shift + Space' }),
  );
  elWrapper.append(initKeyboard(elTextArea, lang));
  elWrapper.append(info);
  document.body.append(elWrapper);
  elTextArea.focus();
}

initApp();
