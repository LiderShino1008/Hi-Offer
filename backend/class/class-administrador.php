<?php

    include_once('class-persona.php');
    class Administrador extends Persona{
       
    public function __construct($nombre_usuario, $correo_electronico,$contrasena){
       parent::__construct($nombre_usuario, $correo_electronico,$contrasena);
    }
 
    
    public function agregarAdminEmpresaRegistro(){
        $contenido_archivo= file_get_contents("../data/empresas.json");
        $empresas=json_decode($contenido_archivo,true);
        $indexEmp=sizeof($empresas)-1;
        $empresas[$indexEmp]["administradores"][]=Array(
            "nombre_usuario"=>$this->nombre_usuario,
            "correo_Electronico"=>$this->correo_electronico,
            "contrasena"=>sha1($this->contrasena)
        );
    
    $archivo=fopen("../data/empresas.json","w");
    fwrite($archivo,json_encode($empresas)); 
    fclose($archivo);

    }


    public function ActualizarAdmin($indexEmp){
        $contenido_archivo= file_get_contents("../data/empresas.json");
        $empresas=json_decode($contenido_archivo,true);
        $empresas[$indexEmp]["administradores"][0]=Array(
            "nombre_usuario"=>$this->nombre_usuario,
            "correo_Electronico"=>$this->correo_electronico,
            "contrasena"=>sha1($this->contrasena)
        );
    
    $archivo=fopen("../data/empresas.json","w");
    fwrite($archivo,json_encode($empresas)); 
    fclose($archivo);
    }



   
   


  }


?>