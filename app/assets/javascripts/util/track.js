(function(root) {
  'use strict';

  var Track = root.Track = function(attributes) {};

  Track.prototype.startRecording = function () {
    this.roll = [];
    this.startTime = new Date();
    this.name = "";
  };

  Track.prototype.addNotes = function(notes) {
    var newNotes = {
      timeSlice: (Date.now() - this.startTime),
      notes: notes
    };
    this.roll.push(newNotes);
  };

  Track.prototype.stopRecording = function () {
    this.addNotes([]);
  };

  Track.prototype.play = function () {
    if (this.interval) {
      return;
    }
    TrackActions.startTrack(this);
    this.interval = 1;
    var playBackStartTime = Date.now();
    var currentNote = 0;

    this.intervalId = setInterval(function () {
      var currentTime = Date.now();

      if (this.roll[currentNote]) {
        if ((currentTime - playBackStartTime) >= this.roll[currentNote].timeSlice) {
          KeyActions.updateNotes(this.roll[currentNote].notes);
          currentNote += 1;
        }
      } else {
        delete this.interval;
        clearInterval(this.intervalId);
        TrackActions.stopTrack(this);
      }
    }.bind(this), this.interval);
  };

  Track.prototype.stop = function () {
    KeyActions.updateNotes(new Set());
    delete this.interval;
    clearInterval(this.intervalId);
  };

}(this));
