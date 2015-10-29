/* global React */

(function(root) {
  'use strict';
  root.Piano = React.createClass({
    render: function () {
      return(
        <div className="piano">
          <div className="key-container">
            {
              Object.keys(root.TONES).map(function(note) {
                return <root.Key key={note} noteName={note}/>;
              })
            }
          </div>
          <div className="chord-container">
            {
              Object.keys(root.CHORDS).map(function(chord) {
                return <root.Chord key={chord} chordName={chord}/>;
              })
            }
          </div>

        </div>
      );
    }
  });
}(this));
