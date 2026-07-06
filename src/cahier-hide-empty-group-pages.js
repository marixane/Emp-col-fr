const ensureEmptyGroupPageStyle = () => {
  if (document.getElementById('cahier-empty-group-page-style')) return;
  const style = document.createElement('style');
  style.id = 'cahier-empty-group-page-style';
  style.textContent = 'body.cahier-tab-active .homework-page{display:block!important;} body.cahier-tab-active [data-cahier-july-complete="true"]{display:none!important;} body.cahier-tab-active .homework-page.cahier-page-hidden-after-limit{display:none!important;} body.cahier-tab-active .homework-entry.cahier-entry-hidden-after-limit{display:none!important;} body.cahier-tab-active .cahier-group-cover-page.cahier-cover-hidden-before-july{display:none!important;}';
  document.head.appendChild(style);
};

const getCahierEntryDate = (entry) => {
  const text = String(entry.querySelector('.homework-date')?.textContent || '');
  const match = text.match(/(\d{2})\/(\d{2})/);
  if (!match) return null;
  return { day: Number(match[1]), month: Number(match[2]) };
};

const fixJuly2027Labels = () => {
  const fixes = new Map([
    ['LUNDI 06/07', 'LUNDI 05/07'],
    ['MARDI 07/07', 'MARDI 06/07'],
    ['MERCREDI 08/07', 'MERCREDI 07/07'],
    ['JEUDI 09/07', 'JEUDI 08/07'],
    ['VENDREDI 10/07', 'VENDREDI 09/07'],
    ['SAMEDI 11/07', 'SAMEDI 10/07']
  ]);

  document.querySelectorAll('.homework-entry:not(.cahier-exam-entry):not(.cahier-extra-holiday-entry) .homework-date').forEach((node) => {
    const text = String(node.textContent || '').trim();
    if (fixes.has(text)) node.textContent = fixes.get(text);
  });
};

const getCahierProgressDate = (page) => getCahierEntryDate(page.querySelector('.homework-entry')) || { day: 1, month: 9 };

const getProgressPercentToJulyFirst = (date) => {
  const start = new Date(2026, 8, 1);
  const end = new Date(2027, 6, 1);
  const current = new Date(date.month >= 9 ? 2026 : 2027, date.month - 1, date.day);
  const percent = Math.round(((current - start) / (end - start)) * 100);
  return Math.min(100, Math.max(0, percent));
};

const fixCahierProgressBars = () => {
  document.querySelectorAll('.homework-page').forEach((page) => {
    const progressWrap = page.firstElementChild?.children?.[1];
    const progressBar = progressWrap?.children?.[0];
    const progressFill = progressBar?.children?.[0];
    const progressText = progressWrap?.children?.[1];
    if (!progressFill || !progressText) return;
    const percent = getProgressPercentToJulyFirst(getCahierProgressDate(page));
    progressFill.style.setProperty('width', `${percent}%`, 'important');
    progressText.textContent = `${percent}%`;
  });
};

const applyCahierEndLimit = () => {
  fixJuly2027Labels();
  document.querySelectorAll('[data-cahier-july-complete="true"]').forEach((page) => page.classList.add('cahier-page-hidden-after-limit'));

  document.querySelectorAll('.homework-entry').forEach((entry) => {
    const date = getCahierEntryDate(entry);
    const afterLimit = date?.month === 7 && date.day > 10;
    if (afterLimit) entry.classList.add('cahier-entry-hidden-after-limit');
    else entry.classList.remove('cahier-entry-hidden-after-limit');
  });

  document.querySelectorAll('.homework-page').forEach((page) => {
    const visibleEntries = Array.from(page.querySelectorAll('.homework-entry')).filter((entry) => !entry.classList.contains('cahier-entry-hidden-after-limit'));
    page.classList.toggle('cahier-page-hidden-after-limit', visibleEntries.length === 0 || page.dataset.cahierJulyComplete === 'true');
  });

  fixCahierProgressBars();
};

const applyEmptyGroupPageVisibility = () => {
  if (!document.body.classList.contains('cahier-tab-active')) return;
  ensureEmptyGroupPageStyle();
  document.querySelectorAll('.homework-page').forEach((page) => page.classList.add('cahier-visible-group-page'));
  applyCahierEndLimit();
};

let emptyGroupPagesRaf = 0;
const scheduleEmptyGroupPageVisibility = () => {
  if (emptyGroupPagesRaf) return;
  emptyGroupPagesRaf = window.requestAnimationFrame(() => {
    emptyGroupPagesRaf = 0;
    applyEmptyGroupPageVisibility();
  });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', scheduleEmptyGroupPageVisibility, { once: true });
} else {
  scheduleEmptyGroupPageVisibility();
}

window.setTimeout(scheduleEmptyGroupPageVisibility, 150);
window.setTimeout(scheduleEmptyGroupPageVisibility, 500);
window.setTimeout(scheduleEmptyGroupPageVisibility, 1200);
window.setTimeout(scheduleEmptyGroupPageVisibility, 2200);
window.setTimeout(scheduleEmptyGroupPageVisibility, 3600);
window.setTimeout(scheduleEmptyGroupPageVisibility, 5600);
window.setTimeout(scheduleEmptyGroupPageVisibility, 7600);

document.addEventListener('input', (event) => {
  if (event.target?.closest?.('.timetable-table')) window.setTimeout(scheduleEmptyGroupPageVisibility, 120);
}, { passive: true });
document.addEventListener('drop', () => window.setTimeout(scheduleEmptyGroupPageVisibility, 150), { passive: true });
document.addEventListener('mouseup', () => window.setTimeout(scheduleEmptyGroupPageVisibility, 150), { passive: true });
