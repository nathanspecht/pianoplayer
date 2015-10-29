/* global EventEmitter */
/* global KeyStore */
/* global AppDispatcher */
/* global MusicConstants */

(function(root) {
  'use strict';

  var _keys = new Set();

  var startKey = function (key) {
    _keys.add(key);
    KeyStore.changed();
  };

  var stopKey = function (key) {
    _keys.delete(key);
    KeyStore.changed();
  };

  var updateKeys = function(keys) {
    _keys = new Set(keys);
    KeyStore.changed();
  };

  root.KeyStore = $.extend({}, EventEmitter.prototype, {
    all: function () {
      return new Set(_keys);
    },

    changed: function () {
      KeyStore.emit("CHANGE_EVENT");
    },

    addEventHandler: function(handler) {
      KeyStore.on("CHANGE_EVENT", handler);
    },

    removeEventHandler: function(handler) {
      KeyStore.removeListener("CHANGE_EVENT", handler);
    }
  });

  KeyStore.setMaxListeners(50);

  AppDispatcher.register(function(action){
    switch(action.actionType) {
      case MusicConstants.START_KEY:
        startKey(action.key);
        break;
      case MusicConstants.STOP_KEY:
        stopKey(action.key);
        break;
      case MusicConstants.UPDATE_KEYS:
        updateKeys(action.keys);
        break;
    }
  });
}(this));
