<?php

define("ADDRESS", "127.0.0.1"); // server address
define("PORT", 55555); // server port

$requestFunc = $_GET['func'];
$requestParams = $_GET['params'];

try{
    if(($socket = socket_create(AF_INET, SOCK_DGRAM, 0)) === false){
        throw new Exception("Unable to create connection socket.");
    }
}catch(Exception $err){
    echo "Error: " . $err->getMessage() . "\n";
}

$parsedRequest = $requestFunc;
if(isset($requestParams) && !empty($requestParams) && $requestParams !== 'undefined'){
    $parsedRequest .= "-";
    $parsedRequest .= $requestParams;
}

socket_sendto($socket, $parsedRequest, strlen($parsedRequest), 0, ADDRESS, PORT);
socket_recv($socket, $buffer, 2048, 0);
echo $buffer;

socket_close($socket);
?>