(function(root) {
  'use strict';

  root.TrackList = React.createClass({
    getInitialState: function() {
      return {tracks: TrackStore.all()};
    },

    componentDidMount: function() {
      TrackStore.addEventHandler(this.updateTracks);
    },

    componentWillUnmount: function() {
      TrackStore.removeEventHandler(this.updateTracks);
    },

    updateTracks: function() {
      this.setState({tracks: TrackStore.all()});
    },

    render: function() {
      return (
        <ul className="track-list">
          <h2>Tracks</h2>
          {
            this.state.tracks.map(function(track, idx){
              return <li key={idx}><root.TrackPlayer track={track}/></li>;
            })
          }
        </ul>
      );}
  });

}(this));
