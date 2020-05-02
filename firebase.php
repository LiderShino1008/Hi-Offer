<?php
    require_once __DIR__.'/vendor/autoload.php'; //importar archivos externos
    //importa todas las clase s que se van a instalar

    use Kreait\Firebase\Factory; //asignando un alias a la clase Factory tiene el mismo nombre

    
    $factory=(new Factory) //retorns una referencia de la clase Factory
    ->withServiceAccount(__DIR__  .'/secret/hi-offer-caf48f9ed33f.json') //url del archivo de configuracion
    ->withDatabaseUri('https://hi-offer.firebaseio.com/');
     $database=$factory->createDatabase();

    $newPost=$database
    ->getReference('users')  //arreglo asociativo para guardarlo como json
    ->push([
        'firstName'=>'Gabriela',
        'lastName'=>'Yaneth'
    ]);
?>