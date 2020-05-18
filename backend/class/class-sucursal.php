<?php
    class Sucursal{ //Nombre en camelc $nombre;
      /*Atributos*/
      private $nombre;
      private $latitud;
      private $longitud;
      private $ciudad;

      public function __construct($nombre,$latitud,$longitud,$ciudad){
              $this->nombre=$nombre;
              $this->latitud=$latitud;
              $this->longitud=$longitud;
              $this->ciudad=$ciudad;
      }

     /************FUNCIONES DE GESTION DE INFORMACION********** */
    
     public function guardarSucursal($idEmpresa){
        $contenido_archivo= file_get_contents("../data/empresas.json");
        $empresas=json_decode($contenido_archivo,true);
        $empresas[$idEmpresa]["sucursales"][]=array(
            "nombre"=>$this->nombre,
            "latitud"=>$this->latitud,
            "longitud"=>$this->longitud,
            "ciudad"=>$this->ciudad
        );
         $archivo=fopen("../data/empresas.json","w");
         fwrite($archivo,json_encode($empresas)); 
         fclose($archivo);

         
    }


        public static function ObtenerPlanes(){
            $contenido_archivo=file_get_contents("../data/planes.json");
            echo $contenido_archivo;

        }
        
        public static function obtenerUnPlan($id){
            $contenido_archivo=file_get_contents("../data/planes.json");
            $planes=json_decode($contenido_archivo,true);
            echo json_encode($planes[$id]) ;
        }


        public  function actualizarSucursal($idEmpresa,$idSucursal){
            $contenido_archivo= file_get_contents("../data/empresas.json");
            $empresas=json_decode($contenido_archivo,true);
            $empresas[$idEmpresa]["sucursales"][$idSucursal]=array(
                "nombre"=>$this->nombre,
                "latitud"=>$this->latitud,
                "longitud"=>$this->longitud,
                "ciudad"=>$this->ciudad
            );
             $archivo=fopen("../data/empresas.json","w");
             fwrite($archivo,json_encode($empresas)); 
             fclose($archivo);
    

        }

        public static function eliminarSucursal($idEmp,$idSucursal)
        {
            $contenido_archivo=file_get_contents("../data/empresas.json");
            $empresas=json_decode($contenido_archivo,true);
            array_splice($empresas[$idEmp]["sucursales"],$idSucursal,1);
 
           $archivo=fopen("../data/empresas.json","w");
           fwrite($archivo,json_encode($empresas)); 
           fclose($archivo);
 
        } 
       
       
        




 }