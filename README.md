# Piano Player
Piano player is a browser keyboard built using React.js with Flux
architecture to play, record and save tracks.

[Play Here!](pianoplayer.herokuapp.com)

## To Do
[] Hold shift to change octaves
[] Add feature to select which chords are played on bottom keys

## Current Features
- Play notes
- Play chords
- Record tracks
- Play tracks without saving them
- Save tracks
- Play saved tracks

## Code
- Uses a JavaScript set to store currently played keys in the KeyStore.
  While recording, KeyStore changes are emitted to the dispatcher and an
  action is triggered to add notes and a time slice to the track. Once recorded,
  a track can be played.

- The following code demonstrates how a track is played:

``` JavaScript
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
      //stop the track and clear interval if the roll is complete.
      delete this.interval;
      clearInterval(this.intervalId);
      TrackActions.stopTrack(this);
    }
  }.bind(this), this.interval);
```
