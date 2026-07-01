var gradingMarkActive = false;
var gradingMarkBlockUntil = 0;

function isGradingMark(target) {
  return target && target.closest && target.closest('.bar-mark');
}

function isPhotoZone(target) {
  return target && target.closest && target.closest('.clickable-photo-zone');
}

function isFileInput(target) {
  return target && target.matches && target.matches('input[type="file"]');
}

function blockNextPhotoClick(ms) {
  gradingMarkBlockUntil = Date.now() + (ms || 900);
  window.__blockPhotoPickerUntil = gradingMarkBlockUntil;
}

document.addEventListener('mousedown', function (event) {
  if (isGradingMark(event.target)) {
    gradingMarkActive = true;
    blockNextPhotoClick(1200);
  }
}, true);

document.addEventListener('mousemove', function () {
  if (gradingMarkActive) blockNextPhotoClick(1200);
}, true);

document.addEventListener('mouseup', function () {
  if (gradingMarkActive) {
    blockNextPhotoClick(1500);
    setTimeout(function () {
      gradingMarkActive = false;
    }, 500);
  }
}, true);

document.addEventListener('click', function (event) {
  if (Date.now() < gradingMarkBlockUntil && (isPhotoZone(event.target) || isFileInput(event.target))) {
    event.preventDefault();
    event.stopPropagation();
    if (event.stopImmediatePropagation) event.stopImmediatePropagation();
  }
}, true);

document.addEventListener('dragstart', function (event) {
  if (isGradingMark(event.target)) {
    event.preventDefault();
  }
}, true);

HTMLInputElement.prototype.__barMarkGuardClick = HTMLInputElement.prototype.__barMarkGuardClick || HTMLInputElement.prototype.click;
HTMLInputElement.prototype.click = function () {
  if (this.type === 'file' && Date.now() < (window.__blockPhotoPickerUntil || 0)) return;
  return HTMLInputElement.prototype.__barMarkGuardClick.apply(this, arguments);
};
