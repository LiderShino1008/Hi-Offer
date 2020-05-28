
<?php
    
    include_once('../class/class-pedido.php');
    header('Content-Type: application/json'); //main-type es el contenido de un archivo flujo

    switch($_SERVER['REQUEST_METHOD']){
        case 'POST':   //Guardar 
            $_POST=json_decode(file_get_contents('php://input'),true);
            
            $pedido=new Pedido((int)($_POST["idPromocion"]),
            (int)($_POST["idCategoria"]),
            (int)($_POST["cantidad"]),
             $_POST["datos"],
            (int)($_POST["Norden"]),
            $_POST["estado"]);
            $pedido->guardarPedido((int)($_GET['idEmpresa']),(int)($_GET['idUsuario']));

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