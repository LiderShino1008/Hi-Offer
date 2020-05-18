
<?php
    
    include_once('../class/class-sucursal.php');
    header('Content-Type: application/json'); //main-type es el contenido de un archivo flujo

    switch($_SERVER['REQUEST_METHOD']){
        case 'POST':   //Guardar 
            $_POST=json_decode(file_get_contents('php://input'),true);
            
            $sucursal=new Sucursal($_POST["nombre"],$_POST["latitud"],$_POST["longitud"],$_POST["ciudad"]);
            $sucursal->guardarSucursal($_POST["idEmpresa"]);
            $resultado["mensaje"] ="Guardar sucursal,informacion:". json_encode($_POST);
            echo json_encode($resultado);
            
        break;
        case 'GET':
        break;
        case 'PUT':
            $_PUT =json_decode(file_get_contents('php://input'),true);
            if(isset($_PUT['accion'])){
                Sucursal::eliminarSucursal($_PUT['idEmp'],$_PUT['idPro']); 
            }else{
                $sucursal=new Sucursal($_PUT["nombre"],$_PUT["latitud"],$_PUT["longitud"],$_PUT["ciudad"]);
                $sucursal->actualizarSucursal($_PUT["idEmpresa"], $_GET['id']);
            }
            
             
        break;
        case 'DELETE':
           
           
        break;
    } 
?>