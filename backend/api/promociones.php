
<?php
    
    include('../class/class-promocion.php');
    header('Content-Type: application/json'); //main-type es el contenido de un archivo flujo

    switch($_SERVER['REQUEST_METHOD']){
        case 'POST':   //Guardar 
            $_POST=json_decode(file_get_contents('php://input'),true);
            $promocion=new Promocion($_POST["idProducto"],$_POST["precio_descuento"],$_POST["sucursales"],$_POST["fecha_inicial"],$_POST["fecha_final"],$_POST["porcentaje_descuento"]);
            $promocion->guardarPromocion($_POST["idEmp"]);
           
        break;
        case 'GET':
            //Promocion::eliminarPromocionesVencidas();
            if(isset($_GET['idCat']) && isset($_GET['idPromo'])){
                Promocion::obtenerPromocion($_GET['idCat'],$_GET['idPromo']);
            }else{
                if(isset($_GET['idPromo'])){
                    Promocion::generarQR($_GET['idPromo'],$_GET['idEmp']); 
                }
            }
            
           
            
        break;
        case 'PUT':
             $_PUT =json_decode(file_get_contents('php://input'),true);
             if(isset($_PUT['accion'])){
                 Promocion::eliminarPromocion($_PUT["idEmp"],$_GET['id']);
             }else{
                $promocion=new Promocion($_PUT["idProducto"],$_PUT["precio_descuento"],$_PUT["sucursales"],$_PUT["fecha_inicial"],$_PUT["fecha_final"],$_PUT["porcentaje_descuento"]);
                $promocion->actualizarPromocion($_GET["id"],$_GET["idEmp"]);
             }
        
        break;
        case 'DELETE':
         
        break;
    } 
?>