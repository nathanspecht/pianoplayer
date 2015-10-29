/* global React */
(function(root) {
  'use strict';
  root.Recorder = React.createClass({
    getInitialState: function (){
      return {
        isRecording: false,
        track: new root.Track()
      };
    },

    startRecording: function () {
      this.state.track.startRecording();
      this.setState({ isRecording: true });
    },

    stopRecording: function () {
      this.state.track.stopRecording();
      this.setState({ isRecording: false });
    },

    playTrack: function () {
      this.state.track.play();
    },

    addNotesToTrack: function() {
      if (this.state.isRecording) {
        this.state.track.addNotes(KeyStore.all());
      }
    },

    saveTrack: function() {
      var track = new Track();
      track.roll = this.state.track.roll.slice();
      track.startTime = this.state.track.startTime;
      TrackActions.saveTrack(track);
    },

    componentDidMount: function () {
      KeyStore.addEventHandler(this.addNotesToTrack);
    },

    componentWillUnmount: function() {
      KeyStore.removeEventHandler(this.addNotesToTrack);
    },

    render: function () {
      return (
        <div>
          <button onClick={ this.startRecording }>Start</button>
          <button onClick={ this.stopRecording }>Stop</button>
          <button onClick={ this.playTrack }>Play</button>
          <button onClick={ this.saveTrack }>Save</button>
          {this.state.isRecording ? <div>Recording</div> : <div></div>}
        </div>
      );
    }
  });


}(this));
