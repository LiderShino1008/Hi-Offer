
<?php
    
    include_once('../class/class-usuario.php');
    header('Content-Type: application/json'); //main-type es el contenido de un archivo flujo

    switch($_SERVER['REQUEST_METHOD']){
        case 'POST':   //Guardar 
            $_POST=json_decode(file_get_contents('php://input'),true);
            if(isset($_POST['guardarPromo'])){
                Usuario::guardarPromocionFavorita($_POST['idUS'],$_POST['idCat'],$_POST['idPromo']);
            }else{ 
                $usuario=new Usuario($_POST["nombre_usuario"],$_POST["correo_electronico"],$_POST["contrasena"]);
                $usuario->guardarUsuario();
            }
        break;
        case 'GET':
            if(isset($_GET['id'])){
                Usuario::obtenerUnUsuario($_GET['id']); 
            }else{
                if(isset($_GET['correo'])){///enviar un correo y retornar el codigo de verificaion
                Usuario::VerificarCuentaCorreo($_GET['correo']);
                }else{
                    //Plan::obtenerPlanes(); 
                }

                
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