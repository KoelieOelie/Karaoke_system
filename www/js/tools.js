var Phonelog = {
    log: function() {
      var line = Array.prototype.slice.call(arguments).map(function(argument) {
        return typeof argument === 'string' ? argument : JSON.stringify(argument);
      }).join(' ');

      document.querySelector('#log').textContent += line + '\n';
    },

    clearLog: function() {
      document.querySelector('#log').textContent = '';
    },

    setStatus: function(status) {
      document.querySelector('#status').textContent = status;
    },

    setContent: function(newContent) {
      var content = document.querySelector('#content');
      while(content.hasChildNodes()) {
        content.removeChild(content.lastChild);
      }
      content.appendChild(newContent);
    }
  };
	if (!('mediaSession' in navigator)) {
	    Phonelog.setStatus('The Media Session API is not yet available. Try Chrome for Android.');
	  }

	  // This prevents unnecessary errors when Media Session API is not available.
	  navigator.mediaSession = navigator.mediaSession || {};
	  navigator.mediaSession.setActionHandler = navigator.mediaSession.setActionHandler || function() {};
	  window.MediaMetadata = window.MediaMetadata || function() {};

	  log = Phonelog.log;
