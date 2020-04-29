
<?php
    
    include_once('../class/class-plan.php');
    header('Content-Type: application/json'); //main-type es el contenido de un archivo flujo

    switch($_SERVER['REQUEST_METHOD']){
        case 'POST':   //Guardar 
            $_POST=json_decode(file_get_contents('php://input'),true);
            
            $plan=new Plan($_POST["nombre"],$_POST["precio"],$_POST["limitePromociones"],$_POST["descripcion"],$_POST["plazo"],$_POST["tiempoPruebaGratuita"],$_POST["diseno"]);
            $plan->guardarPlan();
            $resultado["mensaje"] ="Guardar plan,informacion:". json_encode($_POST);
            echo json_encode($resultado);

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