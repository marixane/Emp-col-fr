const BAR_MARK_MIN_GAP = 24;
const BAR_MARK_MIN_X_GAP = 46;

function numberValue(node) {
  const value = parseFloat(String(node.style.top || '').replace('px', ''));
  return Number.isFinite(value) ? value : node.offsetTop || 0;
}

function xValue(node) {
  const value = parseFloat(String(node.style.left || '').replace('px', ''));
  return Number.isFinite(value) ? value : node.offsetLeft || 0;
}

function keepBarMarksSeparated() {
  document.querySelectorAll('.exam-exercise').forEach(function (exercise) {
    const marks = Array.from(exercise.querySelectorAll('.bar-mark'));
    if (marks.length < 2) return;

    const sorted = marks
      .map(function (node) { return { node: node, top: numberValue(node), left: xValue(node) }; })
      .sort(function (a, b) { return a.top - b.top || a.left - b.left; });

    for (let i = 1; i < sorted.length; i += 1) {
      const previous = sorted[i - 1];
      const current = sorted[i];
      const closeVertically = current.top - previous.top < BAR_MARK_MIN_GAP;
      const closeHorizontally = Math.abs(current.left - previous.left) < BAR_MARK_MIN_X_GAP;

      if (closeVertically && closeHorizontally) {
        const nextTop = previous.top + BAR_MARK_MIN_GAP;
        current.top = nextTop;
        current.node.style.top = nextTop + 'px';
      }
    }
  });
}

window.addEventListener('mousemove', function () {
  window.requestAnimationFrame(keepBarMarksSeparated);
});

window.addEventListener('mouseup', function () {
  setTimeout(keepBarMarksSeparated, 0);
  setTimeout(keepBarMarksSeparated, 80);
});

document.addEventListener('click', function () {
  setTimeout(keepBarMarksSeparated, 0);
  setTimeout(keepBarMarksSeparated, 80);
});

setInterval(keepBarMarksSeparated, 300);
window.keepBarMarksSeparated = keepBarMarksSeparated;
