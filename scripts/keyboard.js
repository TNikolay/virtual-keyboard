import { createElement, getRandomNumber } from './utils.js';

const KEY_CODES = ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace', 'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Delete', 'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Backslash', 'Enter', 'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight', 'ControlLeft', 'AltLeft', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight'];
const LAYOUTS = {
  Monkey: ['\u0E01', '\u0E02', '\u0E03', '\u0E04', '\u0E05', '\u0E06', '\u0E07', '\u0E08', '\u0E09', '\u0E0A', '\u0E0B', '\u0E0C', '\u0E0D', 'Backspace', 'Tab', '\u0E0F', '\u0E10', '\u0E11', '\u0E12', '\u0E13', '\u0E14', '\u0E15', '\u0E16', '\u0E17', '\u0E18', '\u0E1A', '\u0E1B', 'Delete', 'CapsLock', '\u0E1E', '\u0E1F', '\u0E20', '\u0E21', '\u0E22', '\u0E23', '\u0E24', '\u0E25', '\u0E26', '\u0E27', '\u0E28', '\u0E1C', 'Enter', '\u21D1 Shift', '\u0E2A', '\u0E2B', '\u0E2C', '\u0E2D', '\u0E2E', '\u0E2F', '\u0E30', '\u0E31', '\u0E32', '\u0E33', '\u2191', '\u21D1 Shift', 'Control', 'Alt', ' ', 'Alt', '\u2190', '\u2193', '\u2192', 'Control'],
  English: ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace', 'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', 'Delete', 'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", '\\', 'Enter', '\u21D1 Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '\u2191', '\u21D1 Shift', 'Control', 'Alt', ' ', 'Alt', '\u2190', '\u2193', '\u2192', 'Control'],
  Russian: ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace', 'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', 'Delete', 'CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', '\\', 'Enter', '\u21D1 Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '\u2191', '\u21D1 Shift', 'Control', 'Alt', ' ', 'Alt', '\u2190', '\u2193', '\u2192', 'Control'],
};
const LAYOUTS_SHIFT = {
  Monkey: ['\u0E34', '\u0E35', '\u0E36', '\u0E37', '\u0E38', '\u0E39', '\u0E3A', '\u0E3F', '\u0E40', '\u0E41', '\u0E42', '\u0E43', '\u0E44', 'Backspace', 'Tab', '\u0E45', '\u0E46', '\u0E47', '\u0E48', '\u0E49', '\u0E4A', '\u0E4B', '\u0E4C', '\u0E4E', '\u0E4F', '\u0E50', '\u0E51', 'Delete', 'CapsLock', '\u0E52', '\u0E53', '\u0E54', '\u0E55', '\u0E56', '\u0E57', '\u0E58', '\u0E59', '\u0E5A', '\u0E5B', '\u0E20', '\u0E21', 'Enter', '\u21D1 Shift', '\u0E23', '\u0E24', '\u0E01', '\u0E02', '\u0E03', '\u0E04', '\u0E05', '\u0E06', '\u0E1B', '\u0E1C', '\u2191', '\u21D1 Shift', 'Control', 'Alt', ' ', 'Alt', '\u2190', '\u2193', '\u2192', 'Control'],
  English: ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'Backspace', 'Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', 'Delete', 'CapsLock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', '|', 'Enter', '\u21D1 Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', '\u2191', '\u21D1 Shift', 'Control', 'Alt', ' ', 'Alt', '\u2190', '\u2193', '\u2192', 'Control'],
  Russian: ['Ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', 'Backspace', 'Tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', 'Delete', 'CapsLock', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', '/', 'Enter', '\u21D1 Shift', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', ',', '\u2191', '\u21D1 Shift', 'Control', 'Alt', ' ', 'Alt', '\u2190', '\u2193', '\u2192', 'Control'],
};
const indexCapsLock = KEY_CODES.indexOf('CapsLock');
const indexShiftLeft = KEY_CODES.indexOf('ShiftLeft');
const indexShiftRight = KEY_CODES.indexOf('ShiftRight');

let keys;
let input;
let info;
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
  info.textContent = layoutName;
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

  let begin = input.selectionStart;
  let end = input.selectionEnd;
  let newBegin = begin + 1;
  let newKey = '';
  let charactersRigth;
  let charactersLeft;
  let text;
  let endOfNearString;

  switch (KEY_CODES[index]) {
    case 'Enter': newKey = '\n'; break;
    case 'Tab': newKey = '\t'; break;

    case 'Delete':
      if (begin === end) end += 1;
      newBegin = begin;
      break;

    case 'Backspace':
      if (begin === 0 && end === 0) return;
      if (begin === end) begin -= 1;
      newBegin = begin;
      break;

    case 'ArrowRight': break;

    case 'ArrowLeft':
      newBegin = begin === 0 ? 0 : begin - 1;
      break;

    case 'ArrowDown':
      text = input.value;
      charactersLeft = text.lastIndexOf('\n', begin - 1);
      charactersLeft = charactersLeft === -1 ? begin : begin - charactersLeft - 1;
      charactersRigth = text.indexOf('\n', begin);
      charactersRigth = charactersRigth === -1 ? text.length - begin : charactersRigth - begin;
      endOfNearString = text.indexOf('\n', charactersRigth + begin + 1);
      endOfNearString = endOfNearString === -1 ? text.length : endOfNearString;
      newBegin = Math.min(newBegin + charactersLeft + charactersRigth, endOfNearString);
      break;

    case 'ArrowUp':
      text = input.value;
      charactersLeft = text.lastIndexOf('\n', begin - 1);
      if (charactersLeft === -1) { newBegin = 0; break; }
      charactersLeft = begin - charactersLeft;
      endOfNearString = text.lastIndexOf('\n', begin - charactersLeft - 1);
      newBegin = Math.min(endOfNearString + charactersLeft, begin - charactersLeft);
      if (newBegin < 0) newBegin = 0;
      break;

    default:
      if (!isCapsLock) newKey = layout[index];
      else newKey = isShift ? layout[index].toLocaleLowerCase() : layout[index].toLocaleUpperCase();
  }

  input.focus();
  input.setRangeText(newKey, begin, end);
  input.setSelectionRange(newBegin, newBegin);
}

function createKeyButton(_key, index) {
  const el = createElement('button', { className: 'key-button', tabIndex: '-1' });
  el.dataset.index = index;
  return el;
}

function playSound() {
  const a = new Audio(`./asserts/${getRandomNumber(9)}.wav`);
  a.volume = 0.005;
  a.play();
}

function onVirtualButtonDown(index, doNotResetShift = false) {
  playSound();

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

export default function initKeyboard(inputTo, infoTo) {
  input = inputTo;
  info = infoTo;

  const elKeyboardWrapper = createElement('div', { className: 'keyboard-wrapper' });
  keys = KEY_CODES.map(createKeyButton);
  keys.forEach((v, i) => { if (['Space', 'Backspace', 'Delete', 'ShiftLeft', 'ShiftRight'].includes(KEY_CODES[i])) v.classList.add('key-button_grow'); });
  elKeyboardWrapper.append(...keys);

  elKeyboardWrapper.addEventListener('mousedown', onMouseDown);
  elKeyboardWrapper.addEventListener('mouseup', onMouseUp);
  elKeyboardWrapper.addEventListener('mouseout', onMouseUp);
  document.body.addEventListener('keydown', onKeyDown);
  document.body.addEventListener('keyup', onKeyUp);
  window.addEventListener('focus', () => { keys.forEach((v, i) => { if (['ControlRight', 'ControlLeft', 'AltRight', 'AltLeft'].includes(KEY_CODES[i])) v.classList.remove('key-button_pressed'); }); });

  setLayout(localStorage.getItem('TNikolay_VK_Layout') || 'Monkey');

  return elKeyboardWrapper;
}
