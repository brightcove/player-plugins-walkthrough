# Player Plugins Workshop Reference

## Setup
To follow along, you'll need:
 * A computer
 * A terminal application with [CURL](http://curl.haxx.se)
 * A text editor
 * Familiarity with HTML/CSS/Javascript
 * A webserver capable of hosting and serving html

## Documentation
 * [Player Service Tour](http://docs.brightcove.com/en/video-cloud/players/guides/playertour.html)
 * [Using CURL](http://curl.haxx.se/docs/manpage.html)
 * [VideoJS Designer](http://designer.videojs.com/)
 * [VideoJS Plugins](https://github.com/videojs/video.js/blob/master/docs/guides/plugins.md)

Curl the in-page embed code for a player and create an HTML file from it:
```bash
mkdir ~/workshop
curl http://players.brightcove.com/1655482059001/76c5a59b-c481-4554-b28e-e1fb81eb5ea5_default/in_page.embed > ~/workshop/plugin.html
```

Update the html page created to use proper html syntax and size the player with CSS:
```html
<!DOCTYPE html>
<html>
<head>
<link href="//players.brightcove.com/1655482059001/76c5a59b-c481-4554-b28e-e1fb81eb5ea5_default/bc.min.css" rel="stylesheet">
<style>
.video-js{height:360px; width:480px;}
</style>
</head>
<body>
<video
  data-account="1655482059001"
  data-player="76c5a59b-c481-4554-b28e-e1fb81eb5ea5"
  data-embed="default"
  data-id=""
  class="video-js" controls></video>
<script src="//players.brightcove.com/1655482059001/76c5a59b-c481-4554-b28e-e1fb81eb5ea5_default/node_modules/video.js/dist/video-js/video.js"></script>
<script src="//players.brightcove.com/1655482059001/76c5a59b-c481-4554-b28e-e1fb81eb5ea5_default/bc.min.js"></script>
</body>
</html>
```

Style the "big play button", progress bar, and volume control to make them orange.
```html
<!DOCTYPE html>
<html>
<head>
<link href="//players.brightcove.com/1655482059001/76c5a59b-c481-4554-b28e-e1fb81eb5ea5_default/bc.min.css" rel="stylesheet">
<style>
.video-js{height:360px; width:480px;}
.vjs-big-play-button {
  opacity: 0.7;
}
.vjs-play-progress, .vjs-volume-level, .vjs-big-play-button {
  background-color: #ffad00;
}
</style>
</head>
<body>
<video
  data-account="1655482059001"
  data-player="76c5a59b-c481-4554-b28e-e1fb81eb5ea5"
  data-embed="default"
  data-id=""
  class="video-js" controls></video>
<script src="//players.brightcove.com/1655482059001/76c5a59b-c481-4554-b28e-e1fb81eb5ea5_default/node_modules/video.js/dist/video-js/video.js"></script>
<script src="//players.brightcove.com/1655482059001/76c5a59b-c481-4554-b28e-e1fb81eb5ea5_default/bc.min.js"></script>
</body>
</html>
```

Give the player an id so that we can reference it logically within the page:
```html
<!DOCTYPE html>
<html>
<head>
<link href="//players.brightcove.com/1655482059001/76c5a59b-c481-4554-b28e-e1fb81eb5ea5_default/bc.min.css" rel="stylesheet">
<style>
.video-js{height:360px; width:480px;}
.vjs-big-play-button {
  opacity: 0.7;
}
.vjs-play-progress, .vjs-volume-level, .vjs-big-play-button {
  background-color: #ffad00;
}
</style>
</head>
<body>
<video
  id="player"
  data-account="1655482059001"
  data-player="76c5a59b-c481-4554-b28e-e1fb81eb5ea5"
  data-embed="default"
  data-id=""
  class="video-js" controls></video>
<script src="//players.brightcove.com/1655482059001/76c5a59b-c481-4554-b28e-e1fb81eb5ea5_default/node_modules/video.js/dist/video-js/video.js"></script>
<script src="//players.brightcove.com/1655482059001/76c5a59b-c481-4554-b28e-e1fb81eb5ea5_default/bc.min.js"></script>
</body>
</html>
```

Serve your [new html page](http://brightcove.github.io/player-plugins-walkthrough/player-stylin.html) up using a webserver and open the web inspector console.  Interact with the player using these
commands:
```javascript
//Get a reference to the player
var player = videojs('player');
//Start playback
player.play();
//Pause playback
player.pause();
//Seek to 40 seconds in
player.currentTime(40);
//Set the volume to 50%
player.volume(0.5);
```

Add an overlay to appear on html5 video tag's 'loadstart' event by adding the following additional javascript and css:
```javascript
  var 
    player = videojs('player'),
    overlay = document.createElement('div');
  overlay.className = 'overlay vjs-hidden';
  overlay.innerHTML = 'much text';
  player.on('loadstart', function() {
    // if the overlay isn't already showing, show it
    if (/vjs-hidden/.test(overlay.className)) {
      overlay.className = overlay.className.replace(/\s?vjs-hidden/, '');
    }
    player.el().appendChild(overlay);
  });
```
```css
.overlay {
  height:50px; 
  width:480px;
  text-align:center;
  font-size:24pt;
  color: #ff0000;
}
```

You should now see the overlay appear immediately on load of the player content in your [hosted page](http://brightcove.github.io/player-plugins-walkthrough/load-start.html).

Now change the event your listening for so that it appears at the end and disappears on replay.
```javascript
  var 
    player = videojs('player'),
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
```

Great, now you've created something interesting and should have an html page that resembles [this](http://brightcove.github.io/player-plugins-walkthrough/in-page-plugin.html).

But, suppose you want to re-use this same code in all your players.  Adding this to every page would be a pain.
Let's make this code re-usable by coverting it into a vjs plugin instead.  It's really simple. Just wrap your 
script in a function that takes a an optional 'options' object and gets a reference to the player through 
`this`. Once its ready, you let the player know by calling back with your plugins name. You're resulting script 
would look like the following:
```javascript
(function(vjs) {
  overlayPlugin = function(options) {
    var 
      player = this
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
```

Save the above javascript in a file (or you can download this [file](http://brightcove.github.io/player-plugins-walkthrough/overlay.js)).  Now, update your html page to
source this file and invoke the plugin.  Your html becomes [this](http://brightcove.github.io/player-plugins-walkthrough/vjs-plugin.html):
```html
<!DOCTYPE html>
<html>
<head>
<link href="//players.brightcove.com/1655482059001/76c5a59b-c481-4554-b28e-e1fb81eb5ea5_default/bc.min.css" rel="stylesheet">
<style>
.video-js{height:360px; width:480px;}
.vjs-big-play-button {
  opacity: 0.7;
}
.vjs-play-progress, .vjs-volume-level, .vjs-big-play-button{
  background-color: #ffad00;
}
.overlay {
  height:50px; 
  width:480px;
  text-align:center;
  font-size:24pt;
  color: #ff0000;
}
</style>
</head>
<body>
<video 
  id="player"
  data-account="1655482059001"
  data-player="76c5a59b-c481-4554-b28e-e1fb81eb5ea5"
  data-embed="default"
  data-id=""
  class="video-js" controls></video>
<script src="//players.brightcove.com/1655482059001/76c5a59b-c481-4554-b28e-e1fb81eb5ea5_default/node_modules/video.js/dist/video-js/video.js"></script>
<script src="//players.brightcove.com/1655482059001/76c5a59b-c481-4554-b28e-e1fb81eb5ea5_default/bc.min.js"></script>
<script src="./overlay.js"></script>
<script>
  videojs('player').overlayPlugin();
</script>
</body>
</html>
```

Now you've got a re-usable videoJS plugin that can be added to any Brightcove player.