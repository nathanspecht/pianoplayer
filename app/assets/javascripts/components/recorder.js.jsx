/* global React */
(function(root) {
  'use strict';
  root.Recorder = React.createClass({
    getInitialState: function (){
      return {
        isRecording: false,
        isPlaying: false,
        isSaved: false,
        track: null
      };
    },

    startRecording: function () {
      var track = new root.Track();
      track.startRecording();
      this.setState({ isRecording: true, track: track, isSaved: false });
    },

    stopRecording: function () {
      this.state.track.stopRecording();
      this.setState({ isRecording: false });
    },

    playTrack: function () {
      this.state.track.play();
      this.setState({isPlaying: true});
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
      this.setState({isSaved: true});
    },

    updateTrack: function () {
      if (CurrentTrackStore.currentTrack() != this.state.track){
        this.setState({isPlaying: false});
      }
    },

    componentDidMount: function () {
      KeyStore.addEventHandler(this.addNotesToTrack);
      CurrentTrackStore.addEventHandler(this.updateTrack);
    },

    componentWillUnmount: function() {
      KeyStore.removeEventHandler(this.addNotesToTrack);
      CurrentTrackStore.removeEventHandler(this.updateTrack);

    },

    render: function () {
      var saveButton = (this.state.isSaved ||
                        this.state.isRecording ||
                        !this.state.track) ?
                        <div className="gray"><button>Save</button></div> :
                        <button onClick={ this.saveTrack }>Save</button>;

      var playButton = (this.state.isPlaying ||
                        this.state.isRecording ||
                        !this.state.track) ?
                        <div className="gray"><button>Play</button></div> :
                        <button onClick={ this.playTrack }>Play</button>;

      return (
        <div className="playback">
          {
            this.state.isRecording ?
            <div className="is-recording">
              <button onClick={ this.stopRecording }>
                <div className="recording-status on"></div>
              </button>
            </div> :
            <button onClick={ this.startRecording }>
              <div className="recording-status off"></div>
            </button>
          }
          <div className="save-play-track-options">
            {playButton}
            {saveButton}
          </div>
        </div>
      );
    }
  });


}(this));
