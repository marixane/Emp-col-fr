function syncMenuTitle() {
  var title = document.querySelector('.panel .eyebrow');
  if (!title) return;
  if (title.textContent !== 'Réglages') title.textContent = 'Réglages';
}

syncMenuTitle();
setTimeout(syncMenuTitle, 100);
setTimeout(syncMenuTitle, 400);

new MutationObserver(function () {
  syncMenuTitle();
}).observe(document.body, { childList: true, subtree: true, characterData: true });
