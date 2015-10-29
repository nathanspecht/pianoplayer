/* global KeyActions */

(function (root) {
  root.addEventListener('keydown', function (e) {
    var key = String.fromCharCode(e.keyCode);
    if (!KeyStore.all().has(key)) {
      KeyActions.startNote(key);
    }
  });

  root.addEventListener('keyup', function (e) {
    var key = String.fromCharCode(e.keyCode);
    KeyActions.stopNote(key);
  });
}(this));
