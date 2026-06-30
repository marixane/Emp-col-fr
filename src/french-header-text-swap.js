function setTextAreaValue(el, value) {
  if (!el || el.value === value) return;
  const setter = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value').set;
  setter.call(el, value);
  el.dispatchEvent(new Event('input', { bubbles: true }));
}

function swapFrenchHeaderTextValues() {
  if (document.body.classList.contains('arabic-mode')) return;

  const leftText = document.querySelector('.left-header-cell .inline-class-input');
  const rightTop = document.querySelector('.right-header-cell .right-line-top');
  const rightBottom = document.querySelector('.right-header-cell .right-line-bottom');

  if (!leftText || !rightTop || !rightBottom) return;
  if (leftText.dataset.frenchHeaderSwapped === 'true') return;

  const leftValue = leftText.value;
  const rightTopValue = rightTop.value;
  const rightBottomValue = rightBottom.value;

  setTextAreaValue(leftText, `${rightTopValue}\n${rightBottomValue}`);
  setTextAreaValue(rightTop, leftValue);
  setTextAreaValue(rightBottom, 'Durée');

  leftText.rows = 2;
  leftText.dataset.frenchHeaderSwapped = 'true';
}

window.addEventListener('load', () => {
  setTimeout(swapFrenchHeaderTextValues, 80);
  setTimeout(swapFrenchHeaderTextValues, 300);
});

setTimeout(swapFrenchHeaderTextValues, 500);
