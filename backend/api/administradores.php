<?php

    include_once("../class/class-administrador.php");
    header('Content-Type: application/json'); //main-type es el contenido de un archivo flujo
    sleep(0);
    switch($_SERVER['REQUEST_METHOD']){
        /*El cliente envia un json, para poblar el arreglo debemos convertirlo */
        case 'POST':   //Guardar 
            $_POST=json_decode(file_get_contents('php://input'),true);
            if(isset($_POST["accion"])=="r"){
                $admin=new Administrador($_POST["nombre_usuario"],$_POST["correo_electronico"],$_POST["contrasena"]);
                $admin->agregarAdminEmpresaRegistro();
            }
           
           $resultado["mensaje"] ="Guardar admin,informacion:". json_encode($_POST);
            echo json_encode($resultado);
        break;
        case 'GET':
            //si viene el id debemos retornar un usuario y si no, todos los usuario
            //echo "Parametro GET:".$_GET['id']; //enviar la informacion desde la url
            if(isset($_GET['correo'])){
                 Administrador::VerificarCuentaCorreo($_GET['correo']);
            }else{
               // Usuario::obtenerUsuarios(); //metodos o atributos estaticos
            } 
        break;
        case 'PUT':
            
             $_PUT =json_decode(file_get_contents('php://input'),true);
             $admin=new Administrador($_PUT["nombre_usuario"],$_PUT["correo_electronico"],$_PUT["contrasena"]);
             $admin->ActualizarAdmin($_GET['id']);
             $resultado["mensaje"]="Actualizar un usuario con el id:".$_GET['id']."Informacion a actualizar: ".json_encode($_PUT);
             echo json_encode($resultado); 
        break;
        case 'DELETE':
            /*
            Usuario::eliminarUsuario($_GET['id']); 
            //necesitamos el id del usuario no la informacion
            $resultado["mensaje"]="Eliminar el usuario con el id:".$_GET['id'];
            echo json_encode($resultado); */
        break;
    } 
?>