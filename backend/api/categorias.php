
<?php
    
    include_once('../class/class-categoria.php');
    header('Content-Type: application/json'); //main-type es el contenido de un archivo flujo

    switch($_SERVER['REQUEST_METHOD']){
        case 'POST':   //Guardar 
            $_POST=json_decode(file_get_contents('php://input'),true);
            
            $categoria=new Categoria($_POST["nombre_categoria"],$_POST["promociones"]);
            $categoria->guardarCategoria();
            $resultado["mensaje"] ="Guardar plan,informacion:". json_encode($_POST);
            echo json_encode($resultado);

        break;
        case 'GET':
            //obtener un plan
            if(isset($_GET['id'])){
                Categoria::obtenerUnaCategoria($_GET['id']); 
            }else{
                Categoria::obtenerCategorias(); 
            }
        break;
        case 'PUT':
             $_PUT =json_decode(file_get_contents('php://input'),true);
             $categoria=new Categoria($_PUT["nombre_categoria"],$_PUT["promociones"]);
             $categoria->actualizarUnaCategoria($_GET['id']);
             
        break;
        case 'DELETE':
            /*eliminar un plan*/
            Categoria::eliminarCategoria($_GET['id']); 
        break;
    } 
?>