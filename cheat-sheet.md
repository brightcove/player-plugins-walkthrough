# Player Plugins Workshop Reference

## Setup
To follow along, you'll need:
 * A computer
 * A terminal application with [CURL](http://curl.haxx.se)
 * A text editor
 * A webserver capable of hosting and serving html

Curl the in-page embed code for a player and create an HTML file from it:
```bash
curl http://players.brightcove.com/1655482059001/83f4546f-a296-43cb-8872-9c75d1c1cc21_default/in_page.embed > ~/workshop/plugin.html
```

####

Update the html to use proper syntax and size it to appear:
```html
<!DOCTYPE html>
<html>
<head>
<link href="//players.brightcove.com/1655482059001/83f4546f-a296-43cb-8872-9c75d1c1cc21_default/bc.min.css" rel="stylesheet">
<style>
.video-js{height:360px; width:480px;}
</style>
</head>
<body>
<video
  data-account="1655482059001"
  data-player="83f4546f-a296-43cb-8872-9c75d1c1cc21"
  data-embed="default"
  data-id=""
  class="video-js" controls></video>
<script src="//players.brightcove.com/1655482059001/83f4546f-a296-43cb-8872-9c75d1c1cc21_default/node_modules/video.js/dist/video-js/video.js"></script>
<script src="//players.brightcove.com/1655482059001/83f4546f-a296-43cb-8872-9c75d1c1cc21_default/bc.min.js"></script>
</body>
</html>
```

Style the "big play" button to make it a "big RED play" button
```html
<!DOCTYPE html>
<html>
<head>
<link href="//players.brightcove.com/1655482059001/83f4546f-a296-43cb-8872-9c75d1c1cc21_default/bc.min.css" rel="stylesheet">
<style>
.video-js{height:360px; width:480px;}
.vjs-big-play-button{background: #ff0000;}
</style>
</head>
<body>
<video
  data-account="1655482059001"
  data-player="83f4546f-a296-43cb-8872-9c75d1c1cc21"
  data-embed="default"
  data-id=""
  class="video-js" controls></video>
<script src="//players.brightcove.com/1655482059001/83f4546f-a296-43cb-8872-9c75d1c1cc21_default/node_modules/video.js/dist/video-js/video.js"></script>
<script src="//players.brightcove.com/1655482059001/83f4546f-a296-43cb-8872-9c75d1c1cc21_default/bc.min.js"></script>
</body>
</html>
```

Give the player an id so that we can reference it logically within the page:
```html
<!DOCTYPE html>
<html>
<head>
<link href="//players.brightcove.com/1655482059001/83f4546f-a296-43cb-8872-9c75d1c1cc21_default/bc.min.css" rel="stylesheet">
<style>
.video-js{height:360px; width:480px;}
.vjs-big-play-button{background: #ff0000;}
.vjs-control-bar{background: #ff0000;}
</style>
</head>
<body>
<video
  id="player"
  data-account="1655482059001"
  data-player="83f4546f-a296-43cb-8872-9c75d1c1cc21"
  data-embed="default"
  data-id=""
  class="video-js" controls></video>
<script src="//players.brightcove.com/1655482059001/83f4546f-a296-43cb-8872-9c75d1c1cc21_default/node_modules/video.js/dist/video-js/video.js"></script>
<script src="//players.brightcove.com/1655482059001/83f4546f-a296-43cb-8872-9c75d1c1cc21_default/bc.min.js"></script>
</body>
</html>
```


Open the web inspector console, and try these commands:
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

Add an overlay to appear onLoad with the following additional javascript and css:
```javascript
<script>
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
</script>
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
