const RATE = 0.08376;
const uahInput = document.querySelector('#uah');
const sarInput = document.querySelector('#sar');

function normalizeInput(value) {
  const normalized = Array.from(value, (character) => {
    const code = character.codePointAt(0);

    if (code >= 0x0660 && code <= 0x0669) return String(code - 0x0660);
    if (code >= 0x06f0 && code <= 0x06f9) return String(code - 0x06f0);
    if (character === '،' || character === '٫' || character === ',') return '.';
    if (character === '٬') return '';
    return character;
  }).join('');

  const numeric = normalized.replace(/[^0-9.]/g, '');
  const firstDot = numeric.indexOf('.');

  return firstDot === -1
    ? numeric
    : numeric.slice(0, firstDot + 1) + numeric.slice(firstDot + 1).replace(/\./g, '');
}

function format(value) {
  if (!Number.isFinite(value)) return '';
  return value.toFixed(4).replace(/0+$/, '').replace(/\.$/, '');
}

function convert(source, target, multiplier) {
  const normalized = normalizeInput(source.value);
  source.value = normalized;

  if (normalized === '') {
    target.value = '';
    return;
  }

  const value = Number.parseFloat(normalized);
  target.value = Number.isNaN(value) ? '' : format(value * multiplier);
}

function handleInput(event) {
  const source = event.currentTarget;
  const target = source === uahInput ? sarInput : uahInput;
  const multiplier = source === uahInput ? RATE : 1 / RATE;
  convert(source, target, multiplier);
}

[uahInput, sarInput].forEach((input) => {
  input.addEventListener('input', handleInput);
  input.addEventListener('change', handleInput);
});
