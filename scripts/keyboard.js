import createElement from './utils.js';

const KEY_CODES = ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace', 'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'Delete', 'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter', 'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight', 'ControlLeft', 'AltLeft', 'Space', 'AltRight', 'ControlRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight'];
const LAYOUTS = {
  eng: ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace', 'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Delete', 'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter', 'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '\u2191', 'Shift', 'Control', 'Alt', ' ', 'Alt', 'Control', '\u2190', '\u2193', '\u2192'],
  rus: ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace', 'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'Delete', 'CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter', 'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '\u2191', 'Shift', 'Control', 'Alt', ' ', 'Alt', 'Control', '\u2190', '\u2193', '\u2192'],
};

let keys;
let layout;
let input;
let latestPressedByMouseButtons;
function setLayout(name) {
  layout = LAYOUTS[name];
  for (let i = 0; i < keys.length; i += 1) {
    keys[i].textContent = layout[i];
  }
}

function emulateKeyPress(index) {
  const t = input.value;
  let b = input.selectionStart;
  let e = input.selectionEnd;
  let nb = b + 1;
  let nk = layout[index];

  switch (KEY_CODES[index]) {
    case 'Enter': nk = '\n'; break;
    case 'Tab': nk = '\t'; break;
    case 'Delete':
      if (b === e) e += 1;
      nk = '';
      nb = b;
      break;
    case 'Backspace':
      if (b === 0 && e === 0) return;
      if (b === e) b -= 1;
      nk = '';
      nb = b;
      break;
    default:
  }
  console.log(b, e, nk, t);

  input.focus();
  input.setRangeText(nk, b, e);
  input.setSelectionRange(nb, nb);
}

function createKeyButton(_key, index) {
  const el = createElement('button', { className: 'key-button' });
  el.dataset.index = index;

  return el;
}

function onVirtualButtonDown(index) {
  console.log('onVirtualButtonDown ', index);
  keys[index].classList.add('key-button_pressed');
  emulateKeyPress(index);
}

function onVirtualButtonUp(index) {
  console.log('onVirtualButtonUp ', index);
  keys[index].classList.remove('key-button_pressed');
}

function onKeyDown(e) {
  const index = KEY_CODES.indexOf(e.code);
  if (index === -1) return;

  e.preventDefault();
  onVirtualButtonDown(index);
}

function onKeyUp(e) {
  const index = KEY_CODES.indexOf(e.code);
  if (index === -1) return;

  e.preventDefault();
  onVirtualButtonUp(index);
}

function onMouseDown(e) {
  if (e.button !== 0 || !e.target.classList.contains('key-button')) return;
  onVirtualButtonDown(e.target.dataset.index);
  latestPressedByMouseButtons = e.target.dataset.index;
}

function onMouseUp(e) {
  if (e.button !== 0 || latestPressedByMouseButtons === undefined) return;
  onVirtualButtonUp(latestPressedByMouseButtons);
  latestPressedByMouseButtons = undefined;
}

export default function initKeyboard(inputTo) {
  input = inputTo;

  const elKeyboardWrapper = createElement('div', { className: 'keyboard-wrapper' });
  keys = KEY_CODES.map(createKeyButton);
  elKeyboardWrapper.append(...keys);

  elKeyboardWrapper.addEventListener('mousedown', onMouseDown);
  elKeyboardWrapper.addEventListener('mouseup', onMouseUp);
  elKeyboardWrapper.addEventListener('mouseout', onMouseUp);
  document.body.addEventListener('keydown', onKeyDown);
  document.body.addEventListener('keyup', onKeyUp);

  setLayout('eng');

  return elKeyboardWrapper;
}
