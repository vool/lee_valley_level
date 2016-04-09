<?php

$ch = curl_init();

curl_setopt($ch, CURLOPT_AUTOREFERER, TRUE);
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_URL, "http://waterlevel.ie/geojson/latest/");
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, TRUE);

$data = curl_exec($ch);
curl_close($ch);

header('Content-type: application/json');
echo $data;
?>