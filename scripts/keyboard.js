import createElement from './utils.js';

const KEY_CODES = ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace', 'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'Delete', 'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter', 'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight', 'ControlLeft', 'AltLeft', 'Space', 'AltRight', 'ControlRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight'];
const LAYOUTS = {
  eng: ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace', 'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Delete', 'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter', 'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '\u2191', 'Shift', 'Control', 'Alt', ' ', 'Alt', 'Control', '\u2190', '\u2193', '\u2192'],
  rus: ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace', 'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'Delete', 'CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter', 'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '\u2191', 'Shift', 'Control', 'Alt', ' ', 'Alt', 'Control', '\u2190', '\u2193', '\u2192'],
};
const LAYOUTS_SHIFT = {
  eng: ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'Backspace', 'Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|', 'Delete', 'CapsLock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', 'Enter', 'Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', '\u2191', 'Shift', 'Control', 'Alt', ' ', 'Alt', 'Control', '\u2190', '\u2193', '\u2192'],
  rus: ['Ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', 'Backspace', 'Tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '/', 'Delete', 'CapsLock', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'Enter', 'Shift', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', ',', '\u2191', 'Shift', 'Control', 'Alt', ' ', 'Alt', 'Control', '\u2190', '\u2193', '\u2192'],
};
const indexCapsLock = KEY_CODES.indexOf('CapsLock');
const indexShiftLeft = KEY_CODES.indexOf('ShiftLeft');
const indexShiftRight = KEY_CODES.indexOf('ShiftRight');

let keys;
let input;
let layout;
let layoutName;
let latestPressedByMouseButtons;
let isCapsLock = false;
let isShift = false;

function updateButtonsNames() {
  for (let i = 0; i < keys.length; i += 1) {
    const t = layout[i];
    if (!isCapsLock || t.length > 1) keys[i].textContent = t;
    else keys[i].textContent = isShift ? t.toLocaleLowerCase() : t.toLocaleUpperCase();
  }
}

function resetShift() {
  keys[indexShiftLeft].classList.remove('key-button_pressed');
  keys[indexShiftRight].classList.remove('key-button_pressed');
  isShift = false;
  layout = LAYOUTS[layoutName];
  updateButtonsNames();
}

function setLayout(name) {
  layoutName = name || 'eng';
  layout = LAYOUTS[layoutName];
  localStorage.setItem('TNikolay_VK_Layout', layoutName);
  updateButtonsNames();
}

function switchLayout() {
  const k = Object.keys(LAYOUTS);
  const i = k.indexOf(layoutName);
  setLayout(k[i === k.length - 1 ? 0 : i + 1]);
}

function emulateKeyPress(index) {
  if (['ControlRight', 'ControlLeft', 'AltRight', 'AltLeft'].includes(KEY_CODES[index])) return;
  if (isShift && KEY_CODES[index] === 'Space') {
    resetShift();
    switchLayout();
    return;
  }

  let b = input.selectionStart;
  let e = input.selectionEnd;
  let nb = b + 1;
  let nk;

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
      if (!isCapsLock) nk = layout[index];
      else nk = isShift ? layout[index].toLocaleLowerCase() : layout[index].toLocaleUpperCase();
  }
  // console.log(b, e, nk, t);

  input.focus();
  input.setRangeText(nk, b, e);
  input.setSelectionRange(nb, nb);
}

function createKeyButton(_key, index) {
  const el = createElement('button', { className: 'key-button', tabIndex: '-1' });
  el.dataset.index = index;
  return el;
}

function onVirtualButtonDown(index, doNotResetShift = false) {
  console.log('onVirtualButtonDown ', index);

  if (index === indexCapsLock) {
    isCapsLock = !isCapsLock;
    keys[index].classList.toggle('key-button_pressed');
    updateButtonsNames();
    return;
  }

  if (index === indexShiftLeft || index === indexShiftRight) {
    if (isShift) resetShift();
    else {
      keys[index].classList.add('key-button_pressed');
      layout = LAYOUTS_SHIFT[layoutName];
      isShift = true;
      updateButtonsNames();
    }
    return;
  }

  keys[index].classList.add('key-button_pressed');
  emulateKeyPress(index);

  if (isShift && !doNotResetShift) resetShift();
}

function onVirtualButtonUp(index) {
  console.log('onVirtualButtonUp ', index);
  input.focus();
  if (index === indexCapsLock || index === indexShiftLeft || index === indexShiftRight) return;

  keys[index].classList.remove('key-button_pressed');
}

function onKeyDown(e) {
  e.preventDefault();
  if (e.repeat && (e.code === 'CapsLock' || e.code === 'ShiftLeft' || e.code === 'ShiftRight')) return;

  const index = KEY_CODES.indexOf(e.code);
  if (index === -1) return;

  onVirtualButtonDown(index, e.shiftKey);
}

function onKeyUp(e) {
  e.preventDefault();
  if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
    resetShift();
    return;
  }

  const index = KEY_CODES.indexOf(e.code);
  if (index === -1) return;

  onVirtualButtonUp(index);
}

function onMouseDown(e) {
  if (e.button !== 0 || !e.target.classList.contains('key-button')) return;
  latestPressedByMouseButtons = +e.target.dataset.index;
  onVirtualButtonDown(latestPressedByMouseButtons, e.shiftKey);
}

function onMouseUp(e) {
  input.focus();
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
  window.addEventListener('focus', () => { keys.forEach((v, i) => { if (['ControlRight', 'ControlLeft', 'AltRight', 'AltLeft'].includes(KEY_CODES[i])) v.classList.remove('key-button_pressed'); }); });
  setLayout(localStorage.getItem('TNikolay_VK_Layout') || 'eng');

  return elKeyboardWrapper;
}
