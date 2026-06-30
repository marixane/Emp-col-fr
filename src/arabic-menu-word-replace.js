function replaceArabicMenuWords(text) {
  var value = String(text || '');

  if (window.__examLanguage === 'ar') {
    return value
      .replace(/Lignes/g, 'أسطر')
      .replace(/Barème/g, 'سُلَّم التنقيط')
      .replace(/barème/g, 'سُلَّم التنقيط')
      .replace(/Total/g, 'المجموع')
      .replace(/Page/g, 'الصفحة');
  }

  return value
    .replace(/أسطر/g, 'Lignes')
    .replace(/سُلَّم التنقيط/g, 'barème')
    .replace(/المجموع/g, 'Total')
    .replace(/الصفحة/g, 'Page');
}

function syncArabicMenuWords() {
  document.querySelectorAll('.pdf-lines-toggle, .bar-ribbon-toggle, .note-scale-counter, .page-number').forEach(function (node) {
    var next = replaceArabicMenuWords(node.textContent);
    if (node.textContent !== next) node.textContent = next;
  });
}

syncArabicMenuWords();
setTimeout(syncArabicMenuWords, 100);
setTimeout(syncArabicMenuWords, 400);

new MutationObserver(syncArabicMenuWords).observe(document.body, { childList: true, subtree: true });
