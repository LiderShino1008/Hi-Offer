<?php
    class Imagen{ //Nombre en camelc $nombre;
      /*Atributos*/
      private $ruta;

    
      /*contructor*/
      public function __construct($ruta){
              $this->ruta=$ruta;
      }
 

     /************FUNCIONES DE GESTION DE INFORMACION********** */
    
     public function guardarImagen(){
        $contenido_archivo= file_get_contents("../data/img-inicio.json");
        $imagenes=json_decode($contenido_archivo,true);
        $imagenes[]= array(
            "ruta"=>"backend/archivos-subidos/".$this->ruta,
         );

         $archivo=fopen("../data/img-inicio.json","w");
         fwrite($archivo,json_encode($imagenes)); 
         fclose($archivo);

         
    }

        public static function ObtenerImagenes(){
            $contenido_archivo=file_get_contents("../data/img-inicio.json");
            echo $contenido_archivo;

        }
        
        public static function obtenerUnaImagen($id){
            $contenido_archivo=file_get_contents("../data/img-inicio.json");
            $imagenes=json_decode($contenido_archivo,true);
            echo json_encode($imagenes[$id]) ;
        }


        public  function actualizarUnaImagen($id){
            $contenido_archivo=file_get_contents("../data/img-inicio.json");
            $imagenes=json_decode($contenido_archivo,true);
            $imagenes[$id]= array(
                "ruta"=>"backend/archivos-subidos/".$this->ruta
             );
             $archivo=fopen("../data/img-inicio.json","w");
             fwrite($archivo,json_encode($imagenes)); 
             fclose($archivo);

        }

        public static function eliminarImagen($id)
        {
            $contenido_archivo=file_get_contents("../data/img-inicio.json");
            $imagenes=json_decode($contenido_archivo,true); 
            array_splice($imagenes,$id,1);
 
           $archivo=fopen("../data/img-inicio.json","w");
           fwrite($archivo,json_encode($imagenes)); 
           fclose($archivo);
 
        } 
       
        






              /**
               * Get the value of ruta
               */ 
              public function getRuta()
              {
                            return $this->ruta;
              }

              /**
               * Set the value of ruta
               *
               * @return  self
               */ 
              public function setRuta($ruta)
              {
                            $this->ruta = $ruta;

                            return $this;
              }
 }
