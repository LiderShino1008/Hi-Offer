
<?php
    
    include_once('../class/class-promocion.php');
    header('Content-Type: application/json'); //main-type es el contenido de un archivo flujo

    switch($_SERVER['REQUEST_METHOD']){
        case 'POST':   //Guardar 
            $_POST=json_decode(file_get_contents('php://input'),true);
            $promocion=new Promocion($_POST["idProducto"],$_POST["precio_descuento"],$_POST["sucursales"],$_POST["fecha_inicial"],$_POST["fecha_final"],$_POST["porcentaje_descuento"]);
            $promocion->guardarPromocion($_POST["idEmp"]);
        break;
        case 'GET':
            //obtener un plan
            if(isset($_GET['id'])){
                Plan::obtenerUnPlan($_GET['id']); 
            }else{
                Plan::obtenerPlanes(); 
            }
        break;
        case 'PUT':
             $_PUT =json_decode(file_get_contents('php://input'),true);
             $plan=new Plan($_PUT["nombre"],$_PUT["precio"],$_PUT["limitePromociones"],$_PUT["descripcion"],$_PUT["plazo"],$_PUT["tiempoPruebaGratuita"],$_PUT["diseno"]);
             $plan->actualizarUnPlan($_GET['id']);
             
        break;
        case 'DELETE':
            /*eliminar un plan*/
            Plan::eliminarPlan($_GET['id']); 
        break;
    } 
?>