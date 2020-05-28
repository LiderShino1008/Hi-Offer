
<?php

    include_once('class-persona.php');

    class Usuario extends Persona{ //Nombre en camelc $nombre;
      /*Atributos*/
     
      /*contructor*/
      public function __construct($nombre_usuario,$correo_electronico,$contrasena){
        parent::__construct($nombre_usuario, $correo_electronico,$contrasena);
      }

     

        /************FUNCIONES DE GESTION DE INFORMACION********** */
    
     public function guardarUsuario(){
        $contenido_archivo= file_get_contents("../data/usuarios.json");
        $usuarios=json_decode($contenido_archivo,true);
        $usuarios[]= array(
            "nombre_usuario"=>$this->nombre_usuario,
            "correo_electronico"=>$this->correo_electronico,
            "contrasena"=>sha1($this->contrasena),
            "imagen_perfil"=>0,
            "imagen_portada"=>0,
            "pedidos"=>[],
            "carrito"=>[],
            "guardado"=>[],
            "empresas_favoritas"=>[],
            "entrada"=>0,
            "comentarios"=>[]
         );
         $archivo=fopen("../data/usuarios.json","w");
         fwrite($archivo,json_encode($usuarios)); 
         fclose($archivo); 
    }

      
      public static function guardarPromocionFavorita($idUS,$idCat,$idPromo){
        $contenido_archivo= file_get_contents("../data/usuarios.json");
        $usuarios=json_decode($contenido_archivo,true);
         //verificar si ya guardo la promocion
         $existe=false;
         $id;
        if(sizeof($usuarios[$idUS]["guardado"])>0){
          for($i=0; $i<sizeof($usuarios[$idUS]["guardado"]);$i++){
            if($usuarios[$idUS]["guardado"][$i]["idCat"]==$idCat && $usuarios[$idUS]["guardado"][$i]["idPromo"]==$idPromo){
              $existe=true;
              $id=$i;
            }
          }
        }

        if(!$existe){ //sino existe se guarda
          $usuarios[$idUS]["guardado"][]=array(
              "idCat"=>$idCat,
              "idPromo"=>$idPromo,
          );
      }else{ //si existe se borra
        array_splice($usuarios[$idUS]["guardado"], $id,1);
        
      }
        $archivo=fopen("../data/usuarios.json","w");
        fwrite($archivo,json_encode($usuarios)); 
        fclose($archivo);

        $estado=Array("estado"=>$existe);
        echo json_encode($estado);

      }


  
        
        public static function obtenerUnUsuario($id){
            $contenido_archivo=file_get_contents("../data/usuarios.json");
            $usuarios=json_decode($contenido_archivo,true);
            echo json_encode($usuarios[$id]) ;
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

       
       

        
        




 }








