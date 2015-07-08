<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Content-Type: application/json');
// just echo the available themes for now
echo '{"DefaultTheme":"LittleMachines","Themes":{"No Theme":{"name":"No Theme","stylesheet":false,"script":false},"LittleMachines":{"name":"LittleMachines","stylesheet":true,"script":true},"TheListening":{"name":"TheListening","stylesheet":false,"script":true},"Siberia":{"name":"Siberia","script":true,"stylesheet":false},"LittleMachines-Official":{"name":"LittleMachines-Official","script":true,"stylesheet":false}}}';
?>