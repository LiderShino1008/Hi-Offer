
<?php

    include_once('../class/class-empresas.php');
    include('../class/class-comentario.php');
    header('Content-Type: application/json'); //main-type es el contenido de un archivo flujo

    switch($_SERVER['REQUEST_METHOD']){
        case 'POST':   //Guardar 
           
                    $fecha_actual = date("d-m-Y");
                    $_POST=json_decode(file_get_contents('php://input'),true);
                    $comentario=new Comentario($_POST["nombre_usuario"],$_POST["perfil"], date("d-m-Y",strtotime($fecha_actual."- 1 days")),$_POST["comentario"],$_POST["indexUs"]);
                    $comentario->agregarComentarioEmpresa($_POST["indexEmp"]);
                    Comentario::actualizarEstadoComentariosEmp();          
        break;
        case 'GET':
            Comentario::actualizarEstadoComentariosEmp();
        break;
        case 'PUT':
        break;
        case 'DELETE':
           
        break;
    } 
?>