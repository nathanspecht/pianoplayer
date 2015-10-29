var TrackActions = {
  saveTrack: function(track) {
    AppDispatcher.dispatch({
      actionType: MusicConstants.TRACK_SAVED,
      track: track
    });
  },

  startTrack: function(track) {
    AppDispatcher.dispatch({
      actionType: MusicConstants.TRACK_STARTED,
      track: track
    });
  },

  stopTrack: function(track) {
    AppDispatcher.dispatch({
      actionType: MusicConstants.TRACK_STOPPED
    });
  }
};
