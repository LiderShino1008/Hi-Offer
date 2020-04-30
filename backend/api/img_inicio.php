
<?php
    
    include_once('../class/class-img-inicio.php');
    header('Content-Type: application/json'); //main-type es el contenido de un archivo flujo

    switch($_SERVER['REQUEST_METHOD']){
        case 'POST':   //Guardar 
            $_POST=json_decode(file_get_contents('php://input'),true);
            
            $imagen=new Imagen($_POST["ruta"]);
            $imagen->guardarImagen();
            $resultado["mensaje"] ="Guardar imagen,informacion:". json_encode($_POST);
            echo json_encode($resultado);

        break;
        case 'GET':
            //obtener un plan
            if(isset($_GET['id'])){
                Imagen::obtenerUnaImagen($_GET['id']); 
            }else{
                Imagen::obtenerImagenes(); 
            }
        break;
        case 'PUT':
             $_PUT =json_decode(file_get_contents('php://input'),true);
             $imagen=new Imagen($_PUT["ruta"]);
             $imagen->actualizarUnaImagen($_GET['id']);
             
        break;
        case 'DELETE':
            /*eliminar un plan*/
            Imagen::eliminarImagen($_GET['id']); 
        break;
    } 
?>