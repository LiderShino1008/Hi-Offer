
<?php
    class Carrito{ //Nombre en camelc $nombre;
      /*Atributos*/
      private $idCat;
      private $idPromo;
      private $cantidad;
      /*contructor*/
      public function __construct($idCat,$idPromo,$cantidad){
              $this->idCat=$idCat;
              $this->idPromo=$idPromo;
              $this->cantidad=$cantidad;
      }

     

        /************FUNCIONES DE GESTION DE INFORMACION********** */
    
     public function agregarAlCarrito($idUsuario){
        $contenido_archivo= file_get_contents("../data/usuarios.json");
        $usuarios=json_decode($contenido_archivo,true);
        //verificar que el elemento no se agregue dos veces al carrito
        $existe=false;
        if(sizeof($usuarios[$idUsuario]["carrito"])>0){
          for($i=0; $i<sizeof($usuarios[$idUsuario]["carrito"]);$i++){
            if($usuarios[$idUsuario]["carrito"][$i]["idCat"]==$this->idCat && $usuarios[$idUsuario]["carrito"][$i]["idPromo"]==$this->idPromo){
              $existe=true;
            }
          }
        }
        
        if($existe==false){
            $usuarios[$idUsuario]["carrito"][]=array(
                "idCat"=>$this->idCat,
                "idPromo"=>$this->idPromo,
                "idCantidad"=>$this->cantidad
            );
            $archivo=fopen("../data/usuarios.json","w");
            fwrite($archivo,json_encode($usuarios)); 
            fclose($archivo);
           
        }
        $estado=Array("estado"=>$existe);
        echo json_encode($estado);
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