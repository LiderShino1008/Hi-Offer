
<?php
    class Promocion{ //Nombre en camelc $nombre;
      /*Atributos*/
      private $idProducto;
      private $precioDescuento;
      private $sucursales=[];
      private $fecha_inicial;
      private $fecha_final;
      private $porcentaje_descuento;
      private $calificacion;
      private $comentarios;
      

      /*contructor*/
      public function __construct($idProducto,$precioDescuento,$sucursales,$fecha_inicial,$fecha_final,$porcentaje_descuento){
             $this->idProducto=$idProducto;
             $this->precioDescuento=$precioDescuento;
             $this->sucursales=$sucursales;
             $this->$fecha_inicial=$fecha_inicial;
             $this->fecha_final=$fecha_final;
             $this->porcentaje_descuento=$porcentaje_descuento;
      }

    

        /************FUNCIONES DE GESTION DE INFORMACION********** */
    
     public function guardarPromocion($idEmp){
         //agregando promocion a la empresa
        $contenido_archivo= file_get_contents("../data/empresas.json");
        $empresas=json_decode($contenido_archivo,true);
        $empresas[$idEmp]["promociones"][]=array(
            "idProducto"=>$this->idProducto,
            "precio_descuento"=>$this->precioDescuento,
            "sucursales"=>$this->sucursales,
            "fecha_inicial"=>$this->fecha_final,
            "fecha_final"=>$this->fecha_final,
            "porcentaje_descuento"=>$this->porcentaje_descuento,
            "comentarios"=>[]

         );
         
         //agregar la promocion a las categorias
         $contenido_archivo= file_get_contents("../data/categorias.json");
         $categorias=json_decode($contenido_archivo,true);
         $idCategoria=$empresas[$idEmp]["productos"][$this->idProducto]["idCategoria"];
         $categorias[$idCategoria]["promociones"][]=array(
             "nombre"=>$empresas[$idEmp]["productos"][$this->idProducto]["nombre"],
             "precio_descuento"=>$this->precioDescuento,
             "precio_real"=>$empresas[$idEmp]["productos"][$this->idProducto]["precio"],
             "calificacion"=>0,
             "descripcion"=>$empresas[$idEmp]["productos"][$this->idProducto]["descripcion"],
             "stock"=>$empresas[$idEmp]["productos"][$this->idProducto]["stock"],
             "categoria"=>$categorias[ $idCategoria]["nombre_categoria"],
             "Distribuidor"=>$empresas[$idEmp]["nombre_empresa"],
             "comentarios"=>[]
         );
         $archivo1=fopen("../data/empresas.json","w");
         fwrite($archivo1,json_encode($empresas)); 
         fclose($archivo1);
         $archivo2=fopen("../data/categorias.json","w");
         fwrite($archivo2,json_encode($categorias)); 
         fclose($archivo2);
         
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
