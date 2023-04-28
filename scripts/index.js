import createElement from './utils.js';

const keyCodes = ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace', 'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'Delete', 'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter', 'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight', 'ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ControlRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight'];
const layoutEng = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace', 'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Delete', 'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter', 'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'ArrowUp', 'Shift', 'Control', 'Meta', 'Alt', ' ', 'Alt', 'Control', 'ArrowLeft', 'ArrowDown', 'ArrowRight'];
const layoutRus = ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace', 'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'Delete', 'CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter', 'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', 'ArrowUp', 'Shift', 'Control', 'Meta', 'Alt', ' ', 'Alt', 'Control', 'ArrowLeft', 'ArrowDown', 'ArrowRight'];

const elWrapper = createElement('div', { className: 'wrapper' });
const elTextArea = createElement('textarea', { className: 'input-field', textContent: '1234567890' });
const elKeyboardWrapper = createElement('div', { className: 'keyboard-wrapper' });
const keys = keyCodes.map(createKeyButton);

setLayout(layoutEng);

elWrapper.append(createElement('h1', { className: 'h1', textContent: 'Virtual Keyboard' }));
elWrapper.append(elTextArea);
elKeyboardWrapper.append(...keys);
elWrapper.append(elKeyboardWrapper);
document.body.append(elWrapper);
document.body.addEventListener('keydown', onKeyDown);
document.body.addEventListener('keyup', onKeyUp);
// document.body.addEventListener('keypress', onKeyPress);

// const aKeys = [], aCodes = []
// window.addEventListener('keydown', evt => {
//   evt.preventDefault();
//   console.log(evt)
//   aKeys.push(evt.key)
//   aCodes.push(evt.code)
//   if (evt.code == 'NumpadAdd') {
//     console.log('aKeys = ', aKeys)
//     console.log('aCode = ', aCodes)
//   }
// });

function setLayout(layout) {
  for (let i = 0; i < keys.length; i += 1) {
    keys[i].textContent = layout[i];
  }
}

function onKeyDown(e) {
  const index = keyCodes.indexOf(e.code);
  if (index == -1) return console.log('!!!!!!!!!!!!!!! onKeyDown ', e.code);

  console.log('onKeyDown', e.code);
  e.preventDefault();
  keys[index].classList.add('key-button_pressed');
  emulateKeyPress(index);
}

function onKeyUp(e) {
  const index = keyCodes.indexOf(e.code);
  if (index == -1) return console.log('!!!!!!!!!!!!!!! onKeyUp ', e.code);

  console.log('onKeyUp', e.code);
  e.preventDefault();
  keys[index].classList.remove('key-button_pressed');
}

// function onKeyPress(e) {
//   const index = keyCodes.indexOf(e.code);
//   if (index == -1) return console.log('!!!!!!!!!!!!!!! onKeyPress ', e.code)
//   console.log('onKeyPress', e.code)
//   e.preventDefault();

// }

function createKeyButton(key, index) {
  const el = createElement('button', { className: 'key-button' });
  el.dataset.index = index;
  el.addEventListener('click', () => emulateKeyPress(index));
  return el;
}

function emulateKeyPress(index) {
  const b = elTextArea.selectionStart;
  const e = elTextArea.selectionEnd;
  const t = elTextArea.value;
  let nk = layoutEng[index];
  if (keyCodes[index] === 'Enter') nk = '\n';
  else if (keyCodes[index] === 'Tab') nk = '\t';
  else if (keyCodes[index] === 'Backspace') nk = '\b';
  else if (keyCodes[index] === 'Tab') nk = '\t';
  console.log(b, e, nk, t);

  elTextArea.focus();
  elTextArea.setRangeText(nk, b, e);

  elTextArea.setSelectionRange(b + 1, b + 1);
}
