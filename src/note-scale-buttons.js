function syncNoteScaleButtons() {
  var panel = document.querySelector('.panel');
  if (!panel || document.querySelector('.note-scale-control')) return;

  var control = document.createElement('div');
  control.className = 'note-scale-control';

  var title = document.createElement('div');
  title.className = 'note-scale-title';
  title.textContent = 'Notes :';

  var buttons = document.createElement('div');
  buttons.className = 'note-scale-buttons';

  var sur10 = document.createElement('button');
  sur10.type = 'button';
  sur10.className = 'note-scale-button';
  sur10.textContent = 'Sur 10';

  var sur20 = document.createElement('button');
  sur20.type = 'button';
  sur20.className = 'note-scale-button active';
  sur20.textContent = 'Sur 20';

  function activate(button) {
    sur10.classList.toggle('active', button === sur10);
    sur20.classList.toggle('active', button === sur20);
    document.body.classList.toggle('notes-sur-10', button === sur10);
    document.body.classList.toggle('notes-sur-20', button === sur20);
  }

  sur10.addEventListener('click', function () { activate(sur10); });
  sur20.addEventListener('click', function () { activate(sur20); });

  buttons.appendChild(sur10);
  buttons.appendChild(sur20);
  control.appendChild(title);
  control.appendChild(buttons);

  var oldTotal = panel.querySelector('.total-mode-control');
  if (oldTotal && oldTotal.parentNode) {
    oldTotal.parentNode.insertBefore(control, oldTotal);
  } else {
    var linesButton = panel.querySelector('.pdf-lines-toggle');
    if (linesButton && linesButton.parentNode) {
      linesButton.parentNode.insertBefore(control, linesButton);
    } else {
      panel.appendChild(control);
    }
  }

  document.body.classList.add('notes-sur-20');
}

syncNoteScaleButtons();
setTimeout(syncNoteScaleButtons, 100);
setTimeout(syncNoteScaleButtons, 400);

new MutationObserver(function () {
  syncNoteScaleButtons();
}).observe(document.body, { childList: true, subtree: true });
