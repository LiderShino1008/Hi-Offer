<?php
    class Categoria{ //Nombre en camelc $nombre;
      /*Atributos*/
      private $nombre_categoria;
      private $promociones=array();
    
      /*contructor*/
      public function __construct($nombre_categoria,$promociones){
              $this->nombre_categoria=$nombre_categoria;
              $this->promociones=$promociones;
              
      }
 

     /************FUNCIONES DE GESTION DE INFORMACION********** */
    
     public function guardarCategoria(){
        $contenido_archivo= file_get_contents("../data/categorias.json");
        $categorias=json_decode($contenido_archivo,true);
        $categorias[]= array(
            "nombre_categoria"=>$this->nombre_categoria,
            "promociones"=>$this->promociones
         );

         $archivo=fopen("../data/categorias.json","w");
         fwrite($archivo,json_encode($categorias)); 
         fclose($archivo);
         
    }

        public static function ObtenerCategorias(){
            $contenido_archivo=file_get_contents("../data/categorias.json");
            echo $contenido_archivo;

        }
        
        public static function obtenerUnaCategoria($id){
            $contenido_archivo=file_get_contents("../data/categorias.json");
            $categorias=json_decode($contenido_archivo,true);
            echo json_encode($categorias[$id]) ;
        }


        public  function actualizarUnaCategoria($id){
            $contenido_archivo=file_get_contents("../data/categorias.json");
            $categorias=json_decode($contenido_archivo,true);
            $categorias[$id]= array(
                "nombre_categoria"=>$this->nombre_categoria,
                "promociones"=>$this->promociones
              
             );
             $archivo=fopen("../data/categorias.json","w");
             fwrite($archivo,json_encode($categorias)); 
             fclose($archivo);

        }

        public static function eliminarCategoria($id)
        {
            $contenido_archivo=file_get_contents("../data/categorias.json");
            $categorias=json_decode($contenido_archivo,true); 
            array_splice($categorias,$id,1);
 
           $archivo=fopen("../data/categorias.json","w");
           fwrite($archivo,json_encode($categorias)); 
           fclose($archivo);
 
        } 
       
        





      /**
       * Get the value of nombre_categoria
       */ 
      public function getNombre_categoria()
      {
            return $this->nombre_categoria;
      }

      /**
       * Set the value of nombre_categoria
       *
       * @return  self
       */ 
      public function setNombre_categoria($nombre_categoria)
      {
            $this->nombre_categoria = $nombre_categoria;

            return $this;
      }
 }
