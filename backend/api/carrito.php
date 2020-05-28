<?php
    
    include_once('../class/class-carrito.php');
    header('Content-Type: application/json'); //main-type es el contenido de un archivo flujo

    switch($_SERVER['REQUEST_METHOD']){
        case 'POST':   //Guardar 
            $_POST=json_decode(file_get_contents('php://input'),true);
            $carrito=new Carrito($_POST['idCat'],$_POST['idPromo'],$_POST['cantidad']);
            $carrito->agregarAlCarrito($_GET['idUsuario']);
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