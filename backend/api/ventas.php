
<?php

   // echo date("W");
    //echo date("j")-1;
  // echo date("w")-1;
  
    //Este REST API controlara las ventas por semana de la empresa
    include_once('../class/class-empresas.php');
    header('Content-Type: application/json'); //main-type es el contenido de un archivo flujo

    Empresa::ActualizarDiaSemana($_GET['id'],date("w")-1);  //llamar a una funcion para que actualize el dia de la semana siempre

    switch($_SERVER['REQUEST_METHOD']){
        case 'POST':   //Guardar 
        break;
        case 'GET': 
        break;
        case 'PUT':
            $_PUT =json_decode(file_get_contents('php://input'),true);
                $dia_semana=date("w")-1;
                $numero_semana_actual=date("W");
                $semana_empresa=Empresa::obtenerSemana($_GET['id']);
                Empresa::incrementarVentas($_GET['id'],$_PUT['cantidad']);
                if($numero_semana_actual==($semana_empresa+1)){ //si es igual, es porque ya empezo una nueva semana
                    Empresa::iniciarSemana($_GET['id']);
                }
                switch($dia_semana){
                    
                    case 0: //domingo
                        Empresa::incrementarVentasDomingo($_GET['id'],$_PUT['cantidad']);
                    break;
                    case 1;
                        Empresa::incrementarVentasLunes($_GET['id'],$_PUT['cantidad']);
                    break;
                    case 2:
                        Empresa::incrementarVentasMartes($_GET['id'],$_PUT['cantidad']);
                    break;
                    case 3:
                        Empresa::incrementarVentasMiercoles($_GET['id'],$_PUT['cantidad']);
                    break;
                    case 4:
                        Empresa::incrementarVentasJueves($_GET['id'],$_PUT['cantidad']);
                    break;
                    case 5:
                        Empresa::incrementarVentasViernes($_GET['id'],$_PUT['cantidad']);
                    break;
                    case -1:
                        Empresa::incrementarVentasSabado($_GET['id'],$_PUT['cantidad']);
                    break;

                }



                //obtener el dia de la semana *
                //depende de este se guardara *
                //obtener la semana de la empresa (crear funcion) *
                //si semana actual= semanaEmpresa+7 
                //iniciar semana


              //  $numero_semana_actual=date("W");
                //obtener la semana de la empresa
                //si semana actual= semanaEmpresa+7 
                //iniciar semana

                



            
            

        break;
        case 'DELETE':
            Empresa::eliminarEmpresa($_GET['id']); 
        break;
    } 
?>