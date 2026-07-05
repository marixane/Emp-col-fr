const applyCahierButtonOffset = () => {
  const existing = document.getElementById('cahier-span-buttons-left-style');
  if (existing) existing.remove();
  const style = document.createElement('style');
  style.id = 'cahier-span-buttons-left-style';
  style.textContent = [
    '.cahier-tab-active .timetable-cell-content.colored-cell .span-tools{width:max-content!important;margin:0 auto!important;transform:translateX(-7px)!important;}',
    '.cahier-tab-active .span-tools button:active,.cahier-tab-active .span-tools button:focus-visible{background:#2563eb!important;color:white!important;border-color:#1d4ed8!important;}',
    '.cahier-tab-active .span-tools .span-remove-button:active,.cahier-tab-active .span-tools .cell-delete-button:active{background:#2563eb!important;color:white!important;border-color:#1d4ed8!important;}'
  ].join('');
  document.head.appendChild(style);
};

const clearCahierForcedScrollLock = () => {
  applyCahierButtonOffset();
  document.documentElement.style.overflow = '';
  document.documentElement.style.height = '';
  document.body.style.overflow = '';
  document.body.style.height = '';

  const zone = document.querySelector('.cahier-preview-zone');
  const shell = document.querySelector('.cahier-shell');

  if (shell) {
    shell.style.height = '';
    shell.style.maxHeight = '';
    shell.style.overflow = '';
  }

  if (zone) {
    zone.style.height = '';
    zone.style.maxHeight = '';
    zone.style.overflowY = '';
    zone.style.overflowX = '';
    zone.style.webkitOverflowScrolling = '';
    zone.style.paddingBottom = '';
    zone.style.scrollBehavior = '';
  }
};

const scheduleClearCahierScrollLock = () => window.requestAnimationFrame(clearCahierForcedScrollLock);

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', scheduleClearCahierScrollLock, { once: true });
} else {
  scheduleClearCahierScrollLock();
}

window.addEventListener('resize', scheduleClearCahierScrollLock);
window.addEventListener('orientationchange', scheduleClearCahierScrollLock);

new MutationObserver(scheduleClearCahierScrollLock).observe(document.body, {
  childList: true,
  subtree: true,
  attributes: true,
  attributeFilter: ['class', 'style']
});
