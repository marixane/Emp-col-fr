function isHomeworkMode() {
  var activeButton = document.querySelector('.assignment-control button[disabled]');
  if (activeButton && /maison/i.test(activeButton.textContent || '')) return true;
  var titleTop = document.querySelector('.title-line-top');
  return /maison/i.test((titleTop && titleTop.value) || '');
}

function createDisabledNotesControl() {
  var control = document.createElement('div');
  control.className = 'note-scale-control homework-disabled-note';
  control.innerHTML = '<div class="note-scale-title">Notes : désactivé</div><div class="note-scale-buttons"><button type="button" class="note-scale-button" disabled>/ 10</button><button type="button" class="note-scale-button" disabled>/ 20</button></div><div class="note-scale-counter">Désactivé</div>';
  return control;
}

function syncHomeworkDisabledSettings() {
  if (!document.body) return;
  var homework = isHomeworkMode();
  document.body.classList.toggle('homework-mode', homework);

  var panel = document.querySelector('.panel');
  if (!panel) return;

  var fakeNotes = panel.querySelector('.homework-disabled-note');
  var realNotes = panel.querySelector('.note-scale-control:not(.homework-disabled-note)');

  if (homework && !realNotes && !fakeNotes) {
    var formGroup = panel.querySelector('.form-group');
    var notesControl = createDisabledNotesControl();
    if (formGroup && formGroup.nextSibling) panel.insertBefore(notesControl, formGroup.nextSibling);
    else panel.appendChild(notesControl);
  }

  if (!homework && fakeNotes) fakeNotes.remove();

  var barButton = panel.querySelector('.bar-ribbon-toggle');
  if (barButton) {
    barButton.disabled = homework;
    barButton.classList.toggle('homework-disabled', homework);
    barButton.setAttribute('aria-disabled', homework ? 'true' : 'false');
    if (homework) barButton.textContent = 'Ruban de barème désactivé';
    else barButton.textContent = barButton.classList.contains('on') ? 'Ruban de barème visible' : 'Ruban de barème masqué';
  }
}

syncHomeworkDisabledSettings();
setTimeout(syncHomeworkDisabledSettings, 200);
setTimeout(syncHomeworkDisabledSettings, 700);

document.addEventListener('click', function () {
  setTimeout(syncHomeworkDisabledSettings, 80);
  setTimeout(syncHomeworkDisabledSettings, 250);
});

document.addEventListener('input', function () {
  setTimeout(syncHomeworkDisabledSettings, 80);
});

window.syncHomeworkDisabledSettings = syncHomeworkDisabledSettings;
