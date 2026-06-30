function setHomeworkInputValue(selector, value) {
  var input = document.querySelector(selector);
  if (!input || input.value === value) return;
  var setter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value')?.set;
  if (setter) setter.call(input, value);
  else input.value = value;
  input.dispatchEvent(new Event('input', { bubbles: true }));
}

function hideBarRibbonNow() {
  var ribbonToggle = document.querySelector('.bar-ribbon-toggle.on');
  if (ribbonToggle) ribbonToggle.click();
}

function applyArabicHomeworkTitle() {
  if (window.__examLanguage !== 'ar') return;
  setHomeworkInputValue('.title-line-top', 'فرض منزلي');
}

function applyHomeworkOptions() {
  hideBarRibbonNow();
  applyArabicHomeworkTitle();
  setTimeout(function () { hideBarRibbonNow(); applyArabicHomeworkTitle(); }, 0);
  setTimeout(function () { hideBarRibbonNow(); applyArabicHomeworkTitle(); }, 80);
  setTimeout(function () { hideBarRibbonNow(); applyArabicHomeworkTitle(); }, 200);
}

document.addEventListener('click', function (event) {
  var button = event.target && event.target.closest && event.target.closest('.assignment-control button');
  if (!button) return;
  var text = (button.textContent || '').toLowerCase();
  if (!text.includes('maison')) return;
  applyHomeworkOptions();
}, true);
