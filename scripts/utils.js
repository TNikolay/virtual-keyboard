export default function createElement(tag, attr) {
  const el = document.createElement(tag);
  return Object.assign(el, attr);
}
