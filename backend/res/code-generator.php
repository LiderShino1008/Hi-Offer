<?php
    require '../lib/phpqrcode/qrlib.php';

    $dir= '../lib/temp/';
    if(!file_exists($dir)){
        mkdir($dir);
    }
    $filename=$dir.'test.png';
    $tamanio=10;
    $level='Q';
    $frameSize=3;
    $contenido='hola mundo';
    QRcode::png($contenido,$filename,$level,$tamanio,$frameSize);
?>