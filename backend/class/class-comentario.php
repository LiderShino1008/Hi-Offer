<?php
    class Comentario{ //Nombre en camelc $nombre;
      /*Atributos*/
      private $nombre_usuario;
      private $perfil;
      private $fecha_entrada;
      private $estado;
      private $comentario;
      private $indexUs; //el indice del usuario que hizo el comentario
      private $calificacion;

      /*contructor*/
      public function __construct($nombre_usuario,$perfil,$fecha_entrada,$comentario,$indexUs){
              $this->nombre_usuario=$nombre_usuario;
              $this->perfil=$perfil;
              $this->fecha_entrada=$fecha_entrada;
              $this->comentario=$comentario;
              $this->indexUs=$indexUs;
      }


     
        /************FUNCIONES DE GESTION DE INFORMACION********** */
    
     public function agregarComentarioEmpresa($indexEmp){
        $contenido_archivo= file_get_contents("../data/empresas.json");
        $empresas=json_decode($contenido_archivo,true);
        $empresas[$indexEmp]["comentarios"][]=Array(
            "nombre_usuario"=>$this->nombre_usuario,
            "perfil"=>$this->perfil,
            "fecha_entrada"=>$this->fecha_entrada,
            "estado"=>"hoy",
            "comentario"=>$this->comentario,
            "indexUs"=>$this->indexUs
        );
         $archivo=fopen("../data/empresas.json","w");
         fwrite($archivo,json_encode($empresas)); 
         fclose($archivo);

    }

    public static function actualizarEstadoComentariosEmp()
    {
        $contenido_archivo= file_get_contents("../data/empresas.json");
        $empresas=json_decode($contenido_archivo,true);
        

        for($i=0; $i<sizeof($empresas); $i++){
            for($j=0; $j<sizeof($empresas[$i]["comentarios"]);$j++){
                $fecha_post=$empresas[$i]["comentarios"][$j]["fecha_entrada"];
                $fecha_actual=date("d")."-".date("m")."-".date("Y");
                //Convierto ambas fechas en un objeto DateTime.
                $fecha_post=date_create($fecha_post);
                $fecha_actual=date_create($fecha_actual);
                //Comparo la diferencia que hay entre ambas fechas
                $resultado=$fecha_actual->diff($fecha_post);
                $resultado=$resultado->d;
                
               
                if(($resultado-1)<=1){
                    switch($resultado-1){
                        case 0:
                        $empresas[$i]["comentarios"][$j]["estado"]=" hoy ";
                        break;
                        case 1:
                        $empresas[$i]["comentarios"][$j]["estado"]=" Ayer ";
                        
                    }
                }else{
                    $empresas[$i]["comentarios"][$j]["estado"]="hace ".($resultado-1)." dias";
                    
                }
                
                $resultado=0;
            }
        }
         $archivo=fopen("../data/empresas.json","w");
         fwrite($archivo,json_encode($empresas)); 
         fclose($archivo);

    

    }

/*
        public static function ObtenerComentariosEmp(){
            $contenido_archivo=file_get_contents("../data/empresas.json");
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
       
    */

      /**
       * Get the value of nombre_usuario
       */ 
      public function getNombre_usuario()
      {
            return $this->nombre_usuario;
      }

      /**
       * Set the value of nombre_usuario
       *
       * @return  self
       */ 
      public function setNombre_usuario($nombre_usuario)
      {
            $this->nombre_usuario = $nombre_usuario;

            return $this;
      }

      /**
       * Get the value of fecha
       */ 
      public function getFecha()
      {
            return $this->fecha;
      }

      /**
       * Set the value of fecha
       *
       * @return  self
       */ 
      public function setFecha($fecha)
      {
            $this->fecha = $fecha;

            return $this;
      }

      /**
       * Get the value of comentario
       */ 
      public function getComentario()
      {
            return $this->comentario;
      }

      /**
       * Set the value of comentario
       *
       * @return  self
       */ 
      public function setComentario($comentario)
      {
            $this->comentario = $comentario;

            return $this;
      }

      /**
       * Get the value of indexUs
       */ 
      public function getIndexUs()
      {
            return $this->indexUs;
      }

      /**
       * Set the value of indexUs
       *
       * @return  self
       */ 
      public function setIndexUs($indexUs)
      {
            $this->indexUs = $indexUs;

            return $this;
      }
 }

?>
