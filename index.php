<?php
//require 'client.php';

echo '<input id="USER_ID" style="display:none" value="'.$_GET['id'].'"/>';
?>
<!DOCTYPE html>
<html>
<head>
<title>websockets UDP chat</title>
<link rel="stylesheet" type="text/css" href="css/layout.css"/>
</head>
<body style="margin:0">
    <canvas id="screen" width="400" height="400" style="position:absolute;border:solid 1px"></canvas>
    <script src="main.js"></script>
</body>
</html>