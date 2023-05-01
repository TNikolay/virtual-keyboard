export function createElement(tag, attr) {
  const el = document.createElement(tag);
  return Object.assign(el, attr);
}

export function getRandomNumber(max) {
  return Math.floor(Math.random() * (max + 1));
}
