<?php
// require_once 'PHP-file-upload-class/upload.php';
//
// if (!empty($_POST['screen'])) {
//
// 	$upload = Upload::factory('screens');
// 	$upload->file($_POST['screen']);
//   // $upload->set_allowed_mime_types(array('image.png'));
// 	$results = $upload->upload();
//
// 	var_dump($results);
//
// }

require_once("humanhash/humanhash.php");
$name = humanhasher::humanize(hash("sha512",$_POST['screen']),4);
$data = str_replace("data:image/png;base64,","",$_POST['screen']);
// file_put_contents($name . ".html","<img src=\"" . strval($_POST['screen']) . "\"/>");
file_put_contents("screens/" . $name . ".png",base64_decode($data));
echo $name;
// data:image/png;base64, //note the comma
