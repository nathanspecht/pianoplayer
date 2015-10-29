/* global React */
(function(root) {
  'use strict';
  root.TrackPlayer = React.createClass({
    getInitialState: function() {
      return {isPlaying: false};
    },

    playTrack: function () {
      this.props.track.play();
      this.setState({isPlaying: true});
    },

    stopTrack: function () {
      this.props.track.stop();
      this.setState({isPlaying: false});
    },

    updateTrack: function () {
      if (CurrentTrackStore.currentTrack() != this.props.track){
        this.setState({isPlaying: false});
      }
    },

    componentDidMount: function() {
      CurrentTrackStore.addEventHandler(this.updateTrack);
    },

    componentWillUnmount: function() {
      CurrentTrackStore.removeEvenHandler(this.updateTrack);
    },

    render: function () {
      return (
        <div className="track-player">
          {this.state.isPlaying ?
            <div className="gray">
              <button onClick={ this.stopTrack }>{this.props.track.name}</button>
            </div>
            :
            <div>
              <button onClick={ this.playTrack }>{this.props.track.name}</button>
            </div>}
        </div>
      );
    }
  });


}(this));
