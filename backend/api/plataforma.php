
<?php
    
    include_once('../class/class-plataforma.php');
    header('Content-Type: application/json'); //main-type es el contenido de un archivo flujo

    switch($_SERVER['REQUEST_METHOD']){
        case 'POST':  

        break;
        case 'GET':
        
                Plataforma::ObtenerInformacion();
        break;
        case 'PUT':
              /* para actualizar la informacion todo dependera del "id" que se envie */
            /* si no hay id= se actualiza la informacion de las empresas,usuarios,planes y categorias */
            if(isset($_GET['id'])){
               if($_GET['id']==1){  //IncrementarVisitas
                 Plataforma::IncrementoVisitas();
               }else{
                $_PUT =json_decode(file_get_contents('php://input'),true);
                Plataforma::IncrementoGanancias($_PUT["ganancias"]);
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