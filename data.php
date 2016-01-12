<?php
header('Content-type: application/json');
$json = file_get_contents("http://waterlevel.ie/geojson/latest/");
echo $json;
?>