/*global React*/
/*global KeyStore */

(function(root) {
  'use strict';

  root.Chord = React.createClass({
    render: function(){
      var className = "chord";
      if (this.state.pressed) {
        className += " pressed";
      }
      return (<div className={className}></div>);
    },
    getInitialState: function () {
      return { pressed: false };
    },
    componentDidMount: function () {
      this.noteArray = [];
      root.CHORDS[this.props.chordName].forEach(function (freq) {
        this.noteArray.push(new root.Note(freq));
      }.bind(this));

      KeyStore.addEventHandler(function(){
        if (KeyStore.all().has(this.props.chordName)) {
          this.noteArray.forEach(function (note) {
            note.start();
          });
          this.setState({ pressed: true });
        } else {
          this.noteArray.forEach(function (note) {
            note.stop();
          });
          this.setState({ pressed: false });
        }
      }.bind(this));
    }
  });

}(this));
