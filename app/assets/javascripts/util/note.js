(function(root) {

  'use strict';
  var AudioContext = root.AudioContext || root.webkitAudioContext;
  var ctx = new AudioContext();

  var createOscillator = function(freq) {
    var osc = ctx.createOscillator();
    osc.frequency.value = freq;
    osc.detune.value = 0;
    osc.start(ctx.currentTime);
    return osc;
  };

  var createGainNode = function () {
    var gainNode = ctx.createGain();
    gainNode.gain.value = 0;
    gainNode.connect(ctx.destination);
    return gainNode;
  };

  var Note = root.Note = function (frequency) {
    this.oscillatorNode = createOscillator(frequency);
    this.gainNode = createGainNode();
    this.oscillatorNode.connect(this.gainNode);
  };

  Note.prototype.start = function() {
    this.gainNode.gain.value = 0.3;
  };

  Note.prototype.stop = function () {
    this.gainNode.gain.value = 0;
  };

}(this));
