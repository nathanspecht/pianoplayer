(function(root) {
  'use strict';
  var _currentTrack;

  var updateCurrentTrack = function(track) {
    _currentTrack = track;
    CurrentTrackStore.changed();
  };

  root.CurrentTrackStore = $.extend({}, EventEmitter.prototype, {
    currentTrack: function() {
      return _currentTrack;
    },

    changed: function () {
      CurrentTrackStore.emit("CHANGE_EVENT");
    },

    addEventHandler: function(handler) {
      CurrentTrackStore.on("CHANGE_EVENT", handler);
    },

    removeEventHandler: function(handler) {
      CurrentTrackStore.removeListener("CHANGE_EVENT", handler);
    }
  });

  AppDispatcher.register(function(action){
    switch(action.actionType) {
      case MusicConstants.TRACK_STARTED:
        updateCurrentTrack(action.track);
        break;
      case MusicConstants.TRACK_STOPPED:
        updateCurrentTrack(null);
        break;
    }
  });
}(this));
