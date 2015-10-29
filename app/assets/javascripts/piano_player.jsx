(function(root) {
  'use strict';

  root.PianoPlayer = React.createClass({
    render: function() {
      return (
        <div>
        <root.Recorder />
        <root.TrackList />
        <root.Piano />
        </div>
      );
    }
  });
}(this));
