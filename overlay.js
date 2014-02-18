(function(vjs) {
  overlayPlugin = function(options) {
    var 
      player = this,
      overlay = document.createElement('div');
    overlay.className = 'overlay vjs-hidden';
    overlay.innerHTML = 'much text';
    player.on('ended', function() {
      // if the overlay isn't already showing, show it
      if (/vjs-hidden/.test(overlay.className)) {
        overlay.className = overlay.className.replace(/\s?vjs-hidden/, '');
      }
      player.el().appendChild(overlay);
    });

    player.on('playing', function() {
      // if the overlay isn't already hidden, hide it
      if (!(/vjs-hidden/).test(overlay.className)) {
        overlay.className += ' vjs-hidden';
      }
    });
  };
  vjs.plugin('overlayPlugin', overlayPlugin);
})(window.videojs);
