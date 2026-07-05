const applyCahierForceScroll = () => {
  const isCahier = document.body.classList.contains('cahier-tab-active');
  const zone = document.querySelector('.cahier-preview-zone');
  const shell = document.querySelector('.cahier-shell');

  if (!isCahier || !zone) return;

  document.documentElement.style.overflow = 'hidden';
  document.body.style.overflow = 'hidden';
  document.body.style.height = '100vh';

  if (shell) {
    shell.style.height = 'calc(100vh - 54px)';
    shell.style.maxHeight = 'calc(100vh - 54px)';
    shell.style.overflow = 'hidden';
  }

  zone.style.height = 'calc(100vh - 78px)';
  zone.style.maxHeight = 'calc(100vh - 78px)';
  zone.style.overflowY = 'auto';
  zone.style.overflowX = 'auto';
  zone.style.webkitOverflowScrolling = 'touch';
  zone.style.paddingBottom = '80px';
  zone.style.scrollBehavior = 'auto';
};

const resetCahierForceScroll = () => {
  if (document.body.classList.contains('cahier-tab-active')) return;

  document.documentElement.style.overflow = '';
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

const runCahierScrollFix = () => {
  applyCahierForceScroll();
  resetCahierForceScroll();
};

const scheduleCahierScrollFix = () => window.requestAnimationFrame(runCahierScrollFix);

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', scheduleCahierScrollFix, { once: true });
} else {
  scheduleCahierScrollFix();
}

window.addEventListener('resize', scheduleCahierScrollFix);
window.addEventListener('orientationchange', scheduleCahierScrollFix);

new MutationObserver(scheduleCahierScrollFix).observe(document.body, {
  childList: true,
  subtree: true,
  attributes: true,
  attributeFilter: ['class', 'style']
});
