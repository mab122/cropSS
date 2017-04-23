<?php
// $SITENAME = "ss.gallery";
$SITENAME = $_SERVER['HTTP_HOST'];
?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title><?php echo $SITENAME ?></title>
    <link rel="stylesheet" href="milligram/dist/milligram.css">
    <link rel="stylesheet" href="darkroomjs/build/darkroom.css">
    <link rel="stylesheet" href="main.css">
  </head>
  <body>
    <!-- <canvas style="border:1px solid grey;" id="my_canvas" width="300" height="300"></canvas> -->
    <header>
      <a class="" href="/">
        <h1><?php echo $SITENAME ?></h1>
        <h6>the screenshot gallery</h6>
      </a>
      <div class="">

      <ol>
        1. Press <span>Print Screen</span>.
      </ol>
      <ol>
        2. Click back on this webpage.
      </ol>
      <ol>
        3. Press <span>Ctrl + V</span> to see and edit the image.
      </ol>
      <ol>
        4. Click save button to get the link.
      </ol>
    </div>
    </header>
    <main>
      <span id="linkarea" type="text">Link will appear here after you save your screenshot.</span>
      <input id="pickedcolor" class="color-picker" value="#FFFFFF">
    </main>
    <footer>
      <ul class="contact-list">
        <li>Maciej Bator / mab122</li>
        <!-- <li><a href="//mab122.top">mab122.top</a></li> -->
        <li><a href="mailto:contact@mab122.top">contact@mab122.top</a></li>
        <li><a href="mailto:contact@readdamndocs.top">contact@readdamndocs.top</a></li>
      </ul>
    </footer>
    <script type="text/javascript">
      var SITENAME="<?php echo $SITENAME ?>";
    </script>
    <script src="fabric.js/dist/fabric.js" charset="utf-8"></script>
    <script src="darkroomjs/build/darkroom.js" charset="utf-8"></script>
    <script src="jquery.js" charset="utf-8"></script>
    <script src="colorPicker/colors.js" charset="utf-8"></script>
    <script src="colorPicker/colorPicker.data.js" charset="utf-8"></script>
    <script src="colorPicker/colorPicker.js" charset="utf-8"></script>
    <script src="colorPicker/javascript_implementation/jsColor.js" charset="utf-8"></script>
    <script src="main.js" charset="utf-8"></script>
  </body>
</html>
