/* global EventEmitter */
/* global KeyStore */
/* global AppDispatcher */
/* global MusicConstants */

(function(root) {
  'use strict';

  var _tracks = [];

  var addTrack = function (track) {
    track.name = "Track " + _tracks.length;
    _tracks.push(track);
    TrackStore.changed();
  };

  var addTracks = function (tracks) {
    _tracks = _tracks.concat(tracks);
    TrackStore.changed();
  };

  root.TrackStore = $.extend({}, EventEmitter.prototype, {
    all: function () {
      return _tracks.slice();
    },

    changed: function () {
      TrackStore.emit("CHANGE_EVENT");
    },

    addEventHandler: function(handler) {
      TrackStore.on("CHANGE_EVENT", handler);
    },

    removeEventHandler: function(handler) {
      TrackStore.removeListener("CHANGE_EVENT", handler);
    }
  });

  TrackStore.setMaxListeners(50);

  AppDispatcher.register(function(action){
    switch(action.actionType) {
      case MusicConstants.TRACK_SAVED:
        addTrack(action.track);
        break;
      case MusicConstants.TRACKS_RECEIVED:
        addTracks(action.tracks);
        break;
    }
  });
}(this));
