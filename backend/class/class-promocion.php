
<?php
include('class-comentario.php');
require '../lib/phpqrcode/qrlib.php';
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
             $this->fecha_inicial=$fecha_inicial;
             $this->fecha_final=$fecha_final;
             $this->porcentaje_descuento=$porcentaje_descuento;
      }

    

        /************FUNCIONES DE GESTION DE INFORMACION********** */
    
     public function guardarPromocion($idEmp){
         //agregando promocion a la empresa
        $contenido_archivo= file_get_contents("../data/empresas.json");
        $empresas=json_decode($contenido_archivo,true);
        $contenido_archivo2= file_get_contents("../data/categorias.json");
        $categorias=json_decode($contenido_archivo2,true);
        $idCategoria=$empresas[$idEmp]["productos"][$this->idProducto]["idCategoria"];

     
    
        $empresas[$idEmp]["promociones"][]=array(
            "idProducto"=>$this->idProducto,
            "precio_descuento"=>$this->precioDescuento,
            "sucursales"=>$this->sucursales,
            "fecha_inicial"=>$this->fecha_inicial,
            "fecha_final"=>$this->fecha_final,
            "porcentaje_descuento"=>$this->porcentaje_descuento,
            "comentarios"=>[],
            "idCategoria"=>$idCategoria,
            "refUbicacionCat"=>sizeof($categorias[$idCategoria]["promociones"])
         );
         
         //agregar la promocion a las categorias
         
         $categorias[$idCategoria]["promociones"][]=array(
             "nombre"=>$empresas[$idEmp]["productos"][$this->idProducto]["nombre"],
             "precio_descuento"=>$this->precioDescuento,
             "precio_real"=>$empresas[$idEmp]["productos"][$this->idProducto]["precio"],
             "calificacion"=>0,
             "descripcion"=>$empresas[$idEmp]["productos"][$this->idProducto]["descripcion"],
             "stock"=>$empresas[$idEmp]["productos"][$this->idProducto]["stock"],
             "categoria"=>$categorias[ $idCategoria]["nombre_categoria"],
             "Distribuidor"=>$empresas[$idEmp]["nombre_empresa"],
             "comentarios"=>[],
             "idEmpresa"=>$idEmp,
             "sucursales"=>$this->sucursales,
             "fecha_inicial"=>$this->fecha_inicial,
             "fecha_final"=>$this->fecha_final,
             "imagen"=>$empresas[$idEmp]["productos"][$this->idProducto]["imagen"],
             "idproducto"=>$this->idProducto,
             "porcentaje_descuento"=>$this->porcentaje_descuento,
             "codigo"=>$empresas[$idEmp]["productos"][$this->idProducto]["codigo"]
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
            $contenido_archivo2= file_get_contents("../data/categorias.json");
            $categorias=json_decode($contenido_archivo2,true);
            $idCategoria=$empresas[$idEmp]["productos"][$this->idProducto]["idCategoria"];
            $tempIdPromoEditarcat=$empresas[$idEmp]["promociones"][$idPromocion]["refUbicacionCat"];
            $tempComentarios=$empresas[$idEmp]["promociones"][$idPromocion]["comentarios"];
            $empresas[$idEmp]["promociones"][$idPromocion]=array(
                "idProducto"=>$this->idProducto,
                "precio_descuento"=>$this->precioDescuento,
                "sucursales"=>$this->sucursales,
                "fecha_inicial"=>$this->fecha_inicial,
                "fecha_final"=>$this->fecha_final,
                "porcentaje_descuento"=>$this->porcentaje_descuento,
                "idCategoria"=>$idCategoria,
                "refUbicacionCat"=>$tempIdPromoEditarcat
             );
             $empresas[$idEmp]["promociones"][$idPromocion]["comentarios"]=$tempComentarios;
             //editar en las categorias
             $nombre_categoria= $categorias[$idCategoria]["nombre_categoria"];
             $tempComentarios2=$categorias[$idCategoria]["promociones"][$tempIdPromoEditarcat]["comentarios"];
             $categorias[$idCategoria]["promociones"][$tempIdPromoEditarcat]=array(
                 "nombre"=>$empresas[$idEmp]["productos"][$this->idProducto]["nombre"],
                 "precio_descuento"=>$this->precioDescuento,
                 "precio_real"=>$empresas[$idEmp]["productos"][$this->idProducto]["precio"],
                 "calificacion"=>0,
                 "descripcion"=>$empresas[$idEmp]["productos"][$this->idProducto]["descripcion"],
                 "stock"=>$empresas[$idEmp]["productos"][$this->idProducto]["stock"],
                 "categoria"=>$nombre_categoria,
                 "Distribuidor"=>$empresas[$idEmp]["nombre_empresa"],
                 "comentarios"=>0,
                 "idEmpresa"=>(int)$idEmp,
                 "sucursales"=>$this->sucursales,
                 "fecha_inicial"=>$this->fecha_inicial,
                 "fecha_final"=>$this->fecha_final,
                 "imagen"=>$empresas[$idEmp]["productos"][$this->idProducto]["imagen"],
                 "idproducto"=>$this->idProducto,
                 "porcentaje_descuento"=>$this->porcentaje_descuento,
                 "codigo"=>$empresas[$idEmp]["productos"][$this->idProducto]["codigo"]
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
            $contenido_archivo2= file_get_contents("../data/categorias.json");
            $categorias=json_decode($contenido_archivo2,true);
            $tempIdPromoEditarcat2=$empresas[$idEmp]["promociones"][$idPromocion]["refUbicacionCat"];
            array_splice($categorias[$idCategoria]["promociones"], $tempIdPromoEditarcat2,1);
           
            array_splice($empresas[$idEmp]["promociones"],$idPromocion,1);
            $archivo1=fopen("../data/empresas.json","w");
            fwrite($archivo1,json_encode($empresas)); 
            fclose($archivo1);
            $archivo2=fopen("../data/categorias.json","w");
            fwrite($archivo2,json_encode($categorias)); 
            fclose($archivo2);
        } 


        public static function generarQR($idPromo,$idEmp)
        {
            $contenido_archivo= file_get_contents("../data/empresas.json");
            $empresas=json_decode($contenido_archivo,true);
            $idProducto=$empresas[$idEmp]["promociones"][$idPromo]["idProducto"];
            ///////
            $idCategoria=$empresas[$idEmp]["productos"][$idProducto]["idCategoria"];

            $dir= '../lib/temp/';
            if(!file_exists($dir)){
                mkdir($dir);
            }

            $filename=$dir.'QRcodePromo.png';
            $tamanio=10;
            $level='Q';
            $frameSize=3;
            $contenido='http://localhost/Hi-Offer/perfil/promocion.php?cat='.$idCategoria.'&id='.$idPromo;
            QRcode::png($contenido,$filename,$level,$tamanio,$frameSize);
            
            $ruta='backend/lib/temp/QRcodePromo.png';
            $rutaQr=[
                "ruta"=>$ruta
            ];
          
            
            echo json_encode($rutaQr);
            
        }
       
        

        public static function eliminarPromocionesVencidas()
        {
            $contenido_archivo= file_get_contents("../data/empresas.json");
            $empresas=json_decode($contenido_archivo,true);
            for($i=0;$i<sizeof($empresas);$i++){
                for($j=0;$j<sizeof($empresas[$i]["promociones"]);$j++){
                    $fecha2=$empresas[$i]["promociones"][$j]["fecha_final"];//fecha final
                    $fecha1=date("d")."-".date("m")."-".date("Y");//fecha catual
                        //Convierto ambas fechas en un objeto DateTime.
                    $fecha_final=date_create($fecha2);
                    $fecha_actual=date_create($fecha1);
                    $resultado=$fecha_actual->diff($fecha_final);
                    $resultado=$resultado->d;
                   
                    if($resultado==1){
                        Promocion::eliminarPromocion($i,$j);
                       
                    }
                }
            }
          
        }


        public static function obtenerPromocion($idCat,$idPromo){
                $contenido_archivo=file_get_contents("../data/categorias.json");
                $categorias=json_decode($contenido_archivo,true);
                //Comentario::actualizarComentarioPromocion();
                echo json_encode($categorias[$idCat]["promociones"][$idPromo]) ;
        }


 }














   



    
   
?>
