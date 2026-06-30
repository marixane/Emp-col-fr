function fixExercisePointParentheses() {
  document.querySelectorAll('.exercise-title-controls').forEach(function (title) {
    var spans = title.querySelectorAll('.points-decoration');
    if (spans.length >= 2) {
      if (spans[0].textContent !== '(') spans[0].textContent = '(';
      if (spans[1].textContent !== ')') spans[1].textContent = ')';
    }
  });
}

fixExercisePointParentheses();
setTimeout(fixExercisePointParentheses, 100);
setTimeout(fixExercisePointParentheses, 400);
setInterval(fixExercisePointParentheses, 300);

new MutationObserver(function () {
  fixExercisePointParentheses();
}).observe(document.body, { childList: true, subtree: true, characterData: true });
