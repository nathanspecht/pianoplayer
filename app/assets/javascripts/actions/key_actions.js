/* global AppDispatcher */
/* global MusicConstants */

var KeyActions = {
  startNote: function(key) {
    AppDispatcher.dispatch({
      actionType: MusicConstants.START_KEY,
      key: key
    });
  },

  stopNote: function(key) {
    AppDispatcher.dispatch({
      actionType: MusicConstants.STOP_KEY,
      key: key
    });
  },

  updateNotes: function(keys) {
    AppDispatcher.dispatch({
      actionType: MusicConstants.UPDATE_KEYS,
      keys: keys
    });
  }
};
