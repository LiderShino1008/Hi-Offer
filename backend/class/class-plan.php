<?php
    class Plan{ //Nombre en camelc $nombre;
      /*Atributos*/
      private $nombre;
      private $precio;
      private $limitePromociones;
      private $descripcion;
      private $plazo;
      private $tiempoPruebaGratuita;
      private $diseno;
      

      /*contructor*/
      public function __construct($nombre,$precio,$limitePromociones,$descripcion,$plazo,$tiempoPruebaGratuita,$diseno){
              $this->nombre=$nombre;
              $this->precio=$precio;
              $this->limitePromociones=$limitePromociones;
              $this->descripcion=$descripcion;
              $this->plazo=$plazo;
              $this->tiempoPruebaGratuita=$tiempoPruebaGratuita;
              $this->diseno= $diseno;
      }

     
      public function getNombre()
      {
                  return $this->nombre;
      }

      
      public function setNombre($nombre)
      {
                  $this->nombre = $nombre;

                  return $this;
      }

  
      public function getPrecio()
      {
                  return $this->precio;
      }

      
      public function setPrecio($precio)
      {
                  $this->precio = $precio;

                  return $this;
      }

      public function getLimitePromociones()
      {
                  return $this->limitePromociones;
      }

      
      public function setLimitePromociones($limitePromociones)
      {
                  $this->limitePromociones = $limitePromociones;

                  return $this;
      }

       
      public function getDescripcion()
      {
                  return $this->descripcion;
      }

      
      public function setDescripcion($descripcion)
      {
                  $this->descripcion = $descripcion;

                  return $this;
      }

      
      public function getPlazo()
      {
                  return $this->plazo;
      }

      
      public function setPlazo($plazo)
      {
                  $this->plazo = $plazo;

                  return $this;
      }

     
      public function getTiempoPruebaGratuita()
      {
                  return $this->tiempoPruebaGratuita;
      }

      
      public function setTiempoPruebaGratuita($tiempoPruebaGratuita)
      {
                  $this->tiempoPruebaGratuita = $tiempoPruebaGratuita;

                  return $this;
      }

     
      public function getDiseno()
      {
                  return $this->diseno;
      }

      
      public function setDiseno($diseno)
      {
                  $this->diseno = $diseno;

                  return $this;
      }





        /************FUNCIONES DE GESTION DE INFORMACION********** */
    
     public function guardarPlan(){
        $contenido_archivo= file_get_contents("../data/planes.json");
        $planes=json_decode($contenido_archivo,true);
        $planes[]= array(
            "nombre"=>$this->nombre,
            "precio"=>$this->precio,
            "limitePromociones"=>$this->limitePromociones,
            "descripcion"=>$this->descripcion,
            "plazo"=>$this->plazo,
            "tiempoPruebaGratuita"=>$this->tiempoPruebaGratuita,
            "diseno"=>$this->diseno
         );

         $archivo=fopen("../data/planes.json","w");
         fwrite($archivo,json_encode($planes)); 
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


        public  function actualizarUnPlan($id){
            $contenido_archivo=file_get_contents("../data/planes.json");
            $planes=json_decode($contenido_archivo,true);
            $planes[$id]= array(
                "nombre"=>$this->nombre,
                "precio"=>$this->precio,
                "limitePromociones"=>$this->limitePromociones,
                "descripcion"=>$this->descripcion,
                "plazo"=>$this->plazo,
                "tiempoPruebaGratuita"=>$this->tiempoPruebaGratuita,
                "diseno"=>$this->diseno
             );
             $archivo=fopen("../data/planes.json","w");
             fwrite($archivo,json_encode($planes)); 
             fclose($archivo);
    

        }

        public static function eliminarPlan($id)
        {
            $contenido_archivo=file_get_contents("../data/planes.json");
            $planes=json_decode($contenido_archivo,true); 
            array_splice($planes,$id,1);
 
           $archivo=fopen("../data/planes.json","w");
          fwrite($archivo,json_encode($planes)); 
          fclose($archivo);
 
        } 
       
        




 }














   



    
   
?>
