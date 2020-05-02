
<?php
    
    include_once('../class/class-empresas.php');
    header('Content-Type: application/json'); //main-type es el contenido de un archivo flujo

    switch($_SERVER['REQUEST_METHOD']){
        case 'POST':   //Guardar 
            $_POST=json_decode(file_get_contents('php://input'),true);
            

            if(isset($_GET['id'])){
                if($_POST['accion']==0){
                    Empresa::guardarLogotipo($_GET['id'],$_POST['logotipo']);
                }else{
                    Empresa::guardarBanner($_GET['id'],$_POST['Banner']);   
                }

            }else{
                $empresa=new Empresa($_POST["nombre_empresa"],
                $_POST["correoElectronico"],
                $_POST["eslogan"],
                $_POST["descripcion"],
                $_POST["direccion"],
                $_POST["pais"],
                $_POST["latitud"],
                $_POST["longitud"],
                $_POST["facebook"],
                $_POST["instagram"],
                $_POST["twitter"],
                $_POST["numeroTelefono"],
                $_POST["administradores"],
                $_POST["estado"],
                $_POST["comentarios"],
                $_POST["logotipo"],
                $_POST["Banner"],
                $_POST["sucursales"],
                $_POST["productos"],
                $_POST["promociones"],
                $_POST["plan"],
            );
                $empresa->guardarEmpresa();
                $resultado["mensaje"] ="Guardar empresa,informacion:". json_encode($_POST);
                echo json_encode($resultado);

            }  
        break;
        case 'GET':
            //obtener un plan
            if(isset($_GET['id'])){
                Empresa::obtenerUnaEmpresa($_GET['id']); 
            }else{
                Empresa::ObtenerEmpresas(); 
            }
        break;
        case 'PUT':
            $_PUT =json_decode(file_get_contents('php://input'),true);
            if(isset($_PUT['accion'])){
                if($_PUT['accion']==0){
                    Empresa::actualizarLogotipo($_GET['id'],$_PUT['logotipo']);
                }else{
                    Empresa::guardarBanner($_GET['id'],$_PUT['Banner']);   
                }
            }else{ //sino, lo que se actualizara es la informacion
                $empresa=new Empresa($_PUT["nombre_empresa"],
                $_PUT["correoElectronico"],
                $_PUT["eslogan"],
                $_PUT["descripcion"],
                $_PUT["direccion"],
                $_PUT["pais"],
                $_PUT["latitud"],
                $_PUT["longitud"],
                $_PUT["facebook"],
                $_PUT["instagram"],
                $_PUT["twitter"],
                $_PUT["numeroTelefono"],
            );
                $empresa->actualizarInformacion($_GET['id']);
            }

        break;
        case 'DELETE':
            /*eliminar un una empresa*/
            Empresa::eliminarEmpresa($_GET['id']); 
        break;
    } 
?>