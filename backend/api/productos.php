
<?php
    
    include_once('../class/class-producto.php');
    header('Content-Type: application/json'); //main-type es el contenido de un archivo flujo

    switch($_SERVER['REQUEST_METHOD']){
        case 'POST':   //Guardar 
            $_POST=json_decode(file_get_contents('php://input'),true);
            
            $producto=new Producto($_POST["nombre"],$_POST["codigo"],$_POST["idCategoria"],$_POST["descripcion"],$_POST["precio"],$_POST["stock"],$_POST["imagen"],$_POST["empresa"]);
            $producto->guardarProducto($_POST["idEmpresa"]);
            $resultado["mensaje"] ="Guardar producto,informacion:". json_encode($_POST);
            echo json_encode($resultado);
            
        break;
        case 'GET':
        break;
        case 'PUT':
            $_PUT =json_decode(file_get_contents('php://input'),true);
            if(isset($_PUT['accion'])){
                Producto::eliminarProducto($_PUT['idEmp'],$_PUT['idPro']); 
            }else{
               
                $producto=new Producto($_PUT["nombre"],$_PUT["codigo"],$_PUT["idCategoria"],$_PUT["descripcion"],$_PUT["precio"],$_PUT["stock"],$_PUT["imagen"],$_PUT["empresa"]);
                $producto->actualizarProducto($_PUT["idEmpresa"], $_GET['id']);
            }
            
             
        break;
        case 'DELETE':
           
           
        break;
    } 
?>