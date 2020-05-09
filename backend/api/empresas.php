
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
                  if($_POST['accion']==1){
                    Empresa::guardarBanner($_GET['id'],$_POST['Banner']);   
                  }
                }

            }else{
                if(isset($_POST['accion'])){
                    if($_POST['accion']==2){
                        Empresa::guardarIndexPlan($_POST['indexPlan']);
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
                    $_POST["numeroTelefono"] );
                    $empresa->guardarEmpresa($_POST["diaReg"],$_POST["mes"]);
                }
               
                   
           
               
                $resultado["mensaje"] ="Guardar empresa,informacion:". json_encode($_POST);
                echo json_encode($resultado);

            }  
        break;
        case 'GET':
            //obtener un plan
           // 
            if(isset($_GET['accion'])){
                switch(($_GET['accion'])){
                 case 0: //obtener un indice
                    Empresa::ObtenerIndice();
                 break;
                }
            }else{
                if(isset($_GET['id'])){
                    //Empresa::generarTotalVentas($_GET['id']);
                    Empresa::obtenerUnaEmpresa($_GET['id']); 
                }else{
                    Empresa::ObtenerEmpresas(); 
                }
            }

           

          

            
        break;
        case 'PUT':
            $_PUT =json_decode(file_get_contents('php://input'),true);
            if(isset($_PUT['accion'])){
                
                switch($_PUT['accion']){
                  case 0:
                    Empresa::actualizarLogotipo($_GET['id'],$_PUT['logotipo']);
                  break;
                  case 1:
                    Empresa::actualizarBanner($_GET['id'],$_PUT['Banner']); 
                  break; 
                  case 2:
                    Empresa::actualizarEntrada($_GET['id'],$_PUT['entrada']);
                  break;
                  case 3: 
                    Empresa::incrementarVentas($_GET['id'],$_PUT['cantidad']);
                  break;
                  case 4: //actualizar informacion
                    Empresa::generarTotalVentas($_GET['id']);
                    Empresa::generarTotalPromociones($_GET['id']);
                    Empresa::generarTotalProductos($_GET['id']);
                    Empresa::generarProductosBajaExistencia($_GET['id']);
                  break;
                  case 5:
                  Empresa::incrementarSeguidores($_GET['id']);
                  break;
                  case 6;
                  Empresa::incrementarVisitas($_GET['id']);
                  break;
                  case 7;
                  Empresa::incrementarCarrito($_GET['id']);
                  break;
                  case 8;
                  Empresa::incrementarVendidos($_GET['id']);
                  break;
                  case 9;
                  Empresa::DecrementarCarrito($_GET['id']);
                  break; 
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
            Empresa::eliminarEmpresa($_GET['id']); 
        break;
    } 
?>