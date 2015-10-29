/* global KeyActions */

(function (root) {
  root.addEventListener('keydown', function (e) {
    var key = String.fromCharCode(e.keyCode);
    var octaveDown = e.shiftKey;

    if (!KeyStore.all().has(key)) {
      KeyActions.startNote(key, octaveDown);
    }
  });

  root.addEventListener('keyup', function (e) {
    var key = String.fromCharCode(e.keyCode);
    KeyActions.stopNote(key);
  });
}(this));
