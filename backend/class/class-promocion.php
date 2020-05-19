
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


        public  function actualizarPromocion($idEmp,$idPromocion){
            $contenido_archivo= file_get_contents("../data/empresas.json");
            $empresas=json_decode($contenido_archivo,true);
            $tempComentarios=$empresas[$idEmp]["promociones"][$idPromocion]["comentarios"];
            $empresas[$idEmp]["promociones"][$idPromocion]=array(
                "idProducto"=>$this->idProducto,
                "precio_descuento"=>$this->precioDescuento,
                "sucursales"=>$this->sucursales,
                "fecha_inicial"=>$this->fecha_final,
                "fecha_final"=>$this->fecha_final,
                "porcentaje_descuento"=>$this->porcentaje_descuento,
             );
             $empresas[$idEmp]["promociones"][$idPromocion]["comentarios"]=$tempComentarios;
             //editar en las categorias
             $contenido_archivo= file_get_contents("../data/categorias.json");
             $categorias=json_decode($contenido_archivo,true);
             $idCategoria=$empresas[$idEmp]["productos"][$this->idProducto]["idCategoria"];
             $tempComentarios2=$categorias[$idCategoria]["promociones"][$idPromocion]["comentarios"];
             $categorias[$idCategoria]["promociones"][]=array(
                 "nombre"=>$empresas[$idEmp]["productos"][$this->idProducto]["nombre"],
                 "precio_descuento"=>$this->precioDescuento,
                 "precio_real"=>$empresas[$idEmp]["productos"][$this->idProducto]["precio"],
                 "calificacion"=>0,
                 "descripcion"=>$empresas[$idEmp]["productos"][$this->idProducto]["descripcion"],
                 "stock"=>$empresas[$idEmp]["productos"][$this->idProducto]["stock"],
                 "categoria"=>$categorias[ $idCategoria]["nombre_categoria"],
                 "Distribuidor"=>$empresas[$idEmp]["nombre_empresa"],
                 "comentarios"=>$tempComentarios2
             );
             $archivo1=fopen("../data/empresas.json","w");
             fwrite($archivo1,json_encode($empresas)); 
             fclose($archivo1);
             $archivo2=fopen("../data/categorias.json","w");
             fwrite($archivo2,json_encode($categorias)); 
             fclose($archivo2);
        }

        public static function eliminarPromocion($idEmp,$idPromocion)
        {
           //eliminar de la categoria
            $contenido_archivo= file_get_contents("../data/empresas.json");
            $empresas=json_decode($contenido_archivo,true);
            $idPro=$empresas[$idEmp]["promociones"][$idPromocion]["idProducto"];
            $idCategoria=$empresas[$idEmp]["productos"][$idPro]["idCategoria"];
            $contenido_archivo= file_get_contents("../data/categorias.json");
            $categorias=json_decode($contenido_archivo,true);
            array_splice($categorias[$idCategoria]["promociones"],$idPromocion,1);
            array_splice($empresas[$idEmp]["promociones"],$idPromocion,1);
            $archivo1=fopen("../data/empresas.json","w");
            fwrite($archivo1,json_encode($empresas)); 
            fclose($archivo1);
            $archivo2=fopen("../data/categorias.json","w");
            fwrite($archivo2,json_encode($categorias)); 
            fclose($archivo2);
        } 
       
        




 }














   



    
   
?>
