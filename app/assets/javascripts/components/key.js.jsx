/*global React*/
/*global KeyStore */

(function(root) {
  'use strict';

  root.Key = React.createClass({
    render: function(){
      var className = "key";
      if (this.state.pressed) {
        className += " pressed";
      }
      if (root.BLACK_KEYS.indexOf(this.props.noteName) !== -1) {
        className += " black";
      }
      className += " " + this.props.noteName;
      return (
        <div className={className}>
          <div className="key-label">
            {this.props.noteName}
          </div>
        </div>
      );
    },

    getInitialState: function () {
      return { pressed: false };
    },

    componentDidMount: function () {
      var freq = root.TONES[this.props.noteName];
      this.note = new root.Note(freq);

      KeyStore.addEventHandler(function(){
        if (KeyStore.all().has(this.props.noteName)) {
          this.note.start();
          this.setState({ pressed: true });
        } else {
          this.note.stop();
          this.setState({ pressed: false });
        }
      }.bind(this));
    }
  });

}(this));
