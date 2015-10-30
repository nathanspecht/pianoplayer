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
    var rollIndex = 0;

    this.intervalId = setInterval(function () {
      var currentTime = Date.now();
      var runTime = currentTime - playBackStartTime;

      if (this.roll[rollIndex]) {
        var startOfSet = this.roll[rollIndex].timeSlice;

        if ((runTime) >= startOfSet) { //play all of the notes in the set at this rollIndex if their start is greater than the runTime
          KeyActions.updateNotes(this.roll[rollIndex].notes); //stop previous notes and play current set
          rollIndex += 1; //move to next set of notes to be played at its start time
        }
      } else {
        //stop the track if the roll is complete; clear interval
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
