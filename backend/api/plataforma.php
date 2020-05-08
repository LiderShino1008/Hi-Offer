
<?php
    
    include_once('../class/class-plataforma.php');
    header('Content-Type: application/json'); //main-type es el contenido de un archivo flujo

    switch($_SERVER['REQUEST_METHOD']){
        case 'POST':  
            $_POST =json_decode(file_get_contents('php://input'),true);
             //Plataforma::guardarEmpresaActual($_POST['empresaActual']);
        break;
        case 'GET':
                
                Plataforma::ObtenerInformacion();

        break;
        case 'PUT':
            $_PUT =json_decode(file_get_contents('php://input'),true);
              /* para actualizar la informacion todo dependera del "id" que se envie */
            /* si no hay id= se actualiza la informacion de las empresas,usuarios,planes y categorias */
            if(isset($_GET['id'])){
                switch($_GET['id']){
                    case 1;
                    Plataforma::IncrementoVisitas();
                    break;
                    case 2;
                    Plataforma::IncrementoGanancias($_PUT["ganancias"]);
                    break;
                    case 3;
                    Plataforma::actualizarMes($_PUT["mes_actual"]);
                }
              
                
            }else{
                Plataforma::CantidadEmpresas();
                Plataforma::CantidadUsuarios();
                Plataforma::CantidadCategorias();
                Plataforma::CantidadPlanes();
            }
             
        break;
        case 'DELETE':
        
        break;
    } 
?>