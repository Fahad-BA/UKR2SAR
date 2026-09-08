const RATE = 0.08376;
const uahInput = document.querySelector('#uah');
const sarInput = document.querySelector('#sar');

function format(value) {
  if (!Number.isFinite(value)) return '';
  return value.toFixed(4).replace(/0+$/, '').replace(/\.$/, '');
}

function convert(source, target, multiplier) {
  if (source.value.trim() === '') {
    target.value = '';
    return;
  }
  const value = Number.parseFloat(source.value);
  target.value = Number.isFinite(value) ? format(value * multiplier) : '';
}

uahInput.addEventListener('input', () => convert(uahInput, sarInput, RATE));
sarInput.addEventListener('input', () => convert(sarInput, uahInput, 1 / RATE));
