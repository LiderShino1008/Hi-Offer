<?php

        class Empresa{
            private $nombre_empresa;
            private $correoElectronico;
            private $eslogan;
            private $descripcion;
            private $direccion;
            private $pais;
            private $latitud;
            private $longitud;
            private $facebook;
            private $instagram;
            private $twitter;
            private $numeroTelefono;
            private $administradores=Array();
            private $estado=Array();
            private $comentarios=Array();
            private $logotipo;
            private $Banner;
            private $sucursales=Array();
            private $productos=Array();
            private $promociones=Array();
            private $plan;

            public function  __construct($nombre_empresa,$correoElectronico,$eslogan,$descripcion,$direccion,$pais,$latitud, $longitud,$facebook,
                 $instagram,$twitter,$numeroTelefono
             ){
                $this->nombre_empresa = $nombre_empresa;
                $this->correoElectronico = $correoElectronico;
                $this->eslogan = $eslogan;
                $this->descripcion = $descripcion;
                $this->direccion = $direccion;
                $this->pais = $pais;
                $this->latitud = $latitud;
                $this->longitud = $longitud;
                $this->facebook = $facebook;
                $this->instagram = $instagram;
                $this->twitter = $twitter;
                $this->numeroTelefono = $numeroTelefono;
           
                
             }
                                                            //GUARDAR UNA EMPRESA
/*************************************************************************************************************************************** */
                            /*Incluir el dia de registro en el dashboard */
             public function guardarEmpresa($diaReg,$mes){
               $contenido_archivo= file_get_contents("../data/empresas.json");
               $empresas=json_decode($contenido_archivo,true);
               $empresas[]= array(
                   "nombre_empresa"=>$this->nombre_empresa,
                   "correoElectronico"=>$this->correoElectronico,
                   "eslogan"=> $this->eslogan,
                   "descripcion"=> $this->descripcion,
                   "direccion"=> $this->direccion,
                   "pais"=> $this->pais,
                   "latitud"=> $this->latitud,
                   "longitud"=>$this->longitud,
                   "facebook"=> $this->facebook,
                   "instagram"=>$this->instagram,
                   "twitter"=> $this->twitter,
                   "numeroTelefono"=> $this->numeroTelefono,
                   "administradores"=>[],
                   "estado"=>array(
                       "diaReg"=>$diaReg,
                       "entrada"=>0,
                       "total_ventas"=>0,
                       "total_ventas_mes"=>0,
                       "mes"=>$mes, //actualizar este mes cuando la empresa se registre o cuando haya un cambio de mes
                       "total_seguidoresPasado"=>0,
                       "total_seguidores"=>0,
                       "visitas"=>0,
                       "pago"=>0,
                       "visitaspasado"=>0,
                       "estado_promociones"=>array(
                           "vendidas"=>0,
                           "carrito"=>0 ),
                        "ventas_semana"=>array(
                            "info"=>array(
                                "num_semana"=>date("W"),
                                "dia_semana"=>date("w")-1,
                                "total_semana"=>0
                            ),
                            "domingo"=>0,
                            "lunes"=>0,
                            "martes"=>0,
                            "miercoles"=>0,
                            "jueves"=>0,
                            "viernes"=>0,
                            "sabado"=>0
                        ),
                        "inventario"=>array(
                            "registrados"=>0,
                            "promocion"=>0,
                            "exis_baja"=>0,
                        )
                    ),
                    "comentarios"=>[],
                    "logotipo"=> "img/logoPerfil.png",
                    "Banner"=>0,
                    "sucursales"=>[],
                    "productos"=>[],
                    "promociones"=> [],
                    "plan"=>0
                );
                $indexEmp=sizeof($empresas)-1;
                $archivo=fopen("../data/empresas.json","w");
                fwrite($archivo,json_encode($empresas)); 
                fclose($archivo);

                $contenido_archivol=file_get_contents("../data/plataforma.json");
                $plataforma=json_decode($contenido_archivol,true);
                $plataforma[0]["empresaActual"]=$indexEmp;
                $archivo=fopen("../data/plataforma.json","w");
                fwrite($archivo,json_encode($plataforma)); 
                fclose($archivo);
                mkdir("../archivos-subidos/empresas/empresa".$indexEmp, 0700);
               

                
           } 

           public  static function guardarLogotipo($id,$logotipo){
       
            $contenido_archivo=file_get_contents("../data/empresas.json");
            $empresas=json_decode($contenido_archivo,true);
            $empresas[$id]["logotipo"]=$logotipo;
            
            $archivo=fopen("../data/empresas.json","w");
            fwrite($archivo,json_encode($empresas)); 
            fclose($archivo);
            
       }

            public  static function guardarBanner($id,$Banner){
            
                $contenido_archivo=file_get_contents("../data/empresas.json");
                $empresas=json_decode($contenido_archivo,true);
                $empresas[$id]["Banner"]=$Banner;
                $archivo=fopen("../data/empresas.json","w");
                fwrite($archivo,json_encode($empresas)); 
                fclose($archivo);
             }


             public static function guardarIndexPlan($indexPlan){
                $contenido_archivo= file_get_contents("../data/empresas.json");
                $empresas=json_decode($contenido_archivo,true);
                $indexEmp=sizeof($empresas)-1;
                $empresas[$indexEmp]["plan"]=$indexPlan;
                $archivo=fopen("../data/empresas.json","w");
                fwrite($archivo,json_encode($empresas)); 
                fclose($archivo);
        
            }

           
                                                            //OBTENER EMPRESAS
/*************************************************************************************************************************************** */


           public static function ObtenerEmpresas(){
            $contenido_archivo=file_get_contents("../data/empresas.json");
            echo $contenido_archivo;
        
          }

          public static function ObtenerIndice(){
            $contenido_archivo= file_get_contents("../data/empresas.json");
            $empresas=json_decode($contenido_archivo,true);
            $indexEmpresa=Array("indexEmpresa"=>sizeof($empresas)-1);
            echo json_encode($indexEmpresa);
          }

          

                                                          //OBTENER UNA EMPRESA
/*************************************************************************************************************************************** */

            public static function obtenerUnaEmpresa($id){
             //Empresa::actualizarComentarios();
             $contenido_archivo=file_get_contents("../data/empresas.json");
             $empresas=json_decode($contenido_archivo,true);
             echo json_encode($empresas[$id]);
             }


             

             public static function actualizarComentarios(){

               $contenido_archivo= file_get_contents("../data/empresas.json");
                $empresas=json_decode($contenido_archivo,true);
                

                for($i=0; $i<sizeof($empresas); $i++){
                    //echo sizeof($empresas);
                    for($j=0; $j<sizeof($empresas[$i]["comentarios"]);$j++){
                        $fecha_post=$empresas[$i]["comentarios"][$j]["fecha_entrada"];
                        $fecha_actual=date("d")."-".date("m")."-".date("Y");
                        //Convierto ambas fechas en un objeto DateTime.
                        $fecha_post=date_create($fecha_post);
                        $fecha_actual=date_create($fecha_actual);
                        //Comparo la diferencia que hay entre ambas fechas
                        $resultado=$fecha_actual->diff($fecha_post);
                        $resultado=$resultado->d;
                       
                        if(($resultado-1)<=1){
                            switch($resultado-1){
                                case 0:
                                $empresas[$i]["comentarios"][$j]["estado"]=" hoy ";
                                break;
                                case 1:
                                $empresas[$i]["comentarios"][$j]["estado"]=" Ayer ";
                            }
                        }else{
                            $empresas[$i]["comentarios"][$j]["estado"]="hace ".($resultado-1)." dias";
                        }
                        
                        $resultado=0;
                    }
                }
                $archivo=fopen("../data/empresas.json","w");
                fwrite($archivo,json_encode($empresas)); 
                fclose($archivo);

             }
            
               //GET (cada vez que se obtiene la empresa se actualiza el total de las ventas de los productos que tiene)
               public static function generarTotalVentas($id)
               {
                $contenido_archivo=file_get_contents("../data/empresas.json");
                $empresas=json_decode($contenido_archivo,true);
                $total=0;
                echo sizeof($empresas[$id]["promociones"]);
                for($i=0; $i<sizeof($empresas[$id]["promociones"]); $i++){
                    $total+=$empresas[$id]["promociones"][$i]["precio_descuento"];
                }
                $empresas[$id]["estado"]["total_ventas"]=$total;
                $archivo=fopen("../data/empresas.json","w");
                fwrite($archivo,json_encode($empresas)); 
                fclose($archivo);
                
               }

               public static function generarTotalPromociones($id)
               {
                $contenido_archivo=file_get_contents("../data/empresas.json");
                $empresas=json_decode($contenido_archivo,true);
                $total=0;
                echo sizeof($empresas[$id]["promociones"]);
                if(sizeof($empresas[$id]["promociones"])>0){
                    for($i=0; $i<sizeof($empresas[$id]["promociones"]); $i++){
                        $total+=$empresas[$id]["promociones"][$i]["stock"];
                    }
                }
                $empresas[$id]["estado"]["inventario"]["promocion"]=$total;
                $archivo=fopen("../data/empresas.json","w");
                fwrite($archivo,json_encode($empresas)); 
                fclose($archivo);
                
               }

               public static function generarTotalProductos($id)
               {
                $contenido_archivo=file_get_contents("../data/empresas.json");
                $empresas=json_decode($contenido_archivo,true);
                $total=0;
                if(sizeof($empresas[$id]["productos"])>0){
                    for($i=0; $i<sizeof($empresas[$id]["productos"]); $i++){
                        $total+=$empresas[$id]["productos"][$i]["stock"];
                    }
                }
                $empresas[$id]["estado"]["inventario"]["registrados"]=$total;
                $archivo=fopen("../data/empresas.json","w");
                fwrite($archivo,json_encode($empresas)); 
                fclose($archivo);
                
               }


               public static function generarProductosBajaExistencia($id)
               {
                $contenido_archivo=file_get_contents("../data/empresas.json");
                $empresas=json_decode($contenido_archivo,true);
                $total=0;
                if(sizeof($empresas[$id]["productos"])>0){
                    for($i=0; $i<sizeof($empresas[$id]["productos"]); $i++){
                        if($empresas[$id]["productos"][$i]["stock"]<10){
                            $total++;
                        }

                       
                    }
                }
                $empresas[$id]["estado"]["inventario"]["exis_baja"]=$total;
                $archivo=fopen("../data/empresas.json","w");
                fwrite($archivo,json_encode($empresas)); 
                fclose($archivo);
                
               }



               public static function obtenerSemana($id)
                {
                   $contenido_archivo=file_get_contents("../data/empresas.json");
                   $empresas=json_decode($contenido_archivo,true);
                   return $empresas[$id]["estado"]["ventas_semana"]["info"]["num_semana"];
                }


                                                          //ACTUALIZAR UNA EMPRESA
/*************************************************************************************************************************************** */
            public  function actualizarInformacion($id){
                $contenido_archivo=file_get_contents("../data/empresas.json");
                $empresas=json_decode($contenido_archivo,true);
                $empresas[$id]["nombre_empresa"]=$this->nombre_empresa;
                $empresas[$id]["correoElectronico"]=$this->correoElectronico;
                $empresas[$id]["eslogan"]= $this->eslogan;
                $empresas[$id]["descripcion"]= $this->descripcion;
                $empresas[$id][ "direccion"]=$this->direccion;
                $empresas[$id][ "pais"]=$this->pais;
                $empresas[$id]["latitud"]= $this->latitud;
                $empresas[$id]["longitud"]=$this->longitud;
                $empresas[$id]["facebook"]=$this->facebook;
                $empresas[$id]["instagram"]=$this->instagram;
                $empresas[$id]["twitter"]=$this->twitter;
                $empresas[$id]["numeroTelefono"]=$this->numeroTelefono;
                $archivo=fopen("../data/empresas.json","w");
                fwrite($archivo,json_encode($empresas)); 
                fclose($archivo);
               
            }

            public static function actualizarLogotipo($id,$logotipo){
                $contenido_archivo=file_get_contents("../data/empresas.json");
                $empresas=json_decode($contenido_archivo,true);
                $temp=$empresas[$id]["logotipo"];
                $empresas[$id]["logotipo"]='backend/archivos-subidos/empresas/empresa'.$id.'/'.$logotipo;
                $archivo=fopen("../data/empresas.json","w");
                fwrite($archivo,json_encode($empresas)); 
                fclose($archivo);
                //eliminar archivo anterior
                
                unlink("../archivos-subidos/empresas/empresa".$id.'/'.$temp);
            }

            public static function actualizarBanner($id,$Banner){
                $contenido_archivo=file_get_contents("../data/empresas.json");
                $empresas=json_decode($contenido_archivo,true);
                $empresas[$id]["Banner"]='backend/archivos-subidos/'.$Banner;
                $archivo=fopen("../data/empresas.json","w");
                fwrite($archivo,json_encode($empresas)); 
                fclose($archivo);
            }

            public static function actualizarEntrada($id,$entrada){
                $contenido_archivo=file_get_contents("../data/empresas.json");
                $empresas=json_decode($contenido_archivo,true);
                $empresas[$id]["estado"]["entrada"]= $entrada;
                $archivo=fopen("../data/empresas.json","w");
                fwrite($archivo,json_encode($empresas)); 
                fclose($archivo);
            }

            public static function actualizarPago($id,$entrada){
                sleep(10);
                $contenido_archivo=file_get_contents("../data/empresas.json");
                $empresas=json_decode($contenido_archivo,true);
                $empresas[$id]["estado"]["pago"]= $entrada;
                $archivo=fopen("../data/empresas.json","w");
                fwrite($archivo,json_encode($empresas)); 
                fclose($archivo);
            }
            
             //PUT
             public static function incrementarVentas($indexEmp,$cantidad){
                $contenido_archivo= file_get_contents("../data/empresas.json");
                $empresas=json_decode($contenido_archivo,true);
                $temp= $empresas[$indexEmp]["estado"]["total_ventas_mes"];
                $empresas[$indexEmp]["estado"]["total_ventas_mes"]=$temp+$cantidad;
                $archivo=fopen("../data/empresas.json","w");
                fwrite($archivo,json_encode($empresas)); 
                fclose($archivo);
             }

            

             //PUT
            //Este metodo  incrementa la cantidad de seguidores cada vez que se hacer una peticion y verifica con que mes esta trabajando
             public static function incrementarSeguidores($indexEmp){
                $contenido_archivo2= file_get_contents("../data/plataforma.json");
                $plataforma=json_decode($contenido_archivo2,true);
                $mes_actual=$plataforma[0]["mes_actual"];
                $contenido_archivo2= file_get_contents("../data/empresas.json");
                $empresas=json_decode($contenido_archivo2,true);
                $mes_trabajando=$empresas[$indexEmp]["estado"]["mes"];
                $temp1= $empresas[$indexEmp]["estado"]["total_seguidoresPasado"];
                $temp2= $empresas[$indexEmp]["estado"]["total_seguidores"];

                if(!($mes_trabajando==$mes_actual)){ //cambio de mes
                    $empresas[$indexEmp]["estado"]["total_seguidoresPasado"]=$temp2;
                    $empresas[$indexEmp]["estado"]["total_seguidores"]=0;
                    $empresas[$indexEmp]["estado"]["mes"]=$mes_actual;
                }

                $empresas[$indexEmp]["estado"]["total_seguidores"]+=1;
                $archivo=fopen("../data/empresas.json","w");
                fwrite($archivo,json_encode($empresas)); 
                fclose($archivo);
             }

             //Este metodo  incrementa las visitas cada vez que se hacer una peticion y verifica con que mes esta trabajando

             public static function incrementarVisitas($indexEmp){
                $contenido_archivo2= file_get_contents("../data/plataforma.json");
                $plataforma=json_decode($contenido_archivo2,true);
                $mes_actual=$plataforma[0]["mes_actual"];
                $contenido_archivo2= file_get_contents("../data/empresas.json");
                $empresas=json_decode($contenido_archivo2,true);
                $mes_trabajando=$empresas[$indexEmp]["estado"]["mes"];
                $temp1= $empresas[$indexEmp]["estado"]["visitaspasado"];
                $temp2= $empresas[$indexEmp]["estado"]["visitas"];

                if(!($mes_trabajando==$mes_actual)){ //cambio de mes
                    $empresas[$indexEmp]["estado"]["visitaspasado"]=$temp2;
                    $empresas[$indexEmp]["estado"]["visitas"]=0;
                    $empresas[$indexEmp]["estado"]["mes"]=$mes_actual;
                }

                $empresas[$indexEmp]["estado"]["visitas"]+=1;
                $archivo=fopen("../data/empresas.json","w");
                fwrite($archivo,json_encode($empresas)); 
                fclose($archivo);
             }
             
             public static function incrementarCarrito($indexEmp){
                $contenido_archivo= file_get_contents("../data/empresas.json");
                $empresas=json_decode($contenido_archivo,true);
                $temp= $empresas[$indexEmp]["estado"]["estado_promociones"]["carrito"];
                $empresas[$indexEmp]["estado"]["estado_promociones"]["carrito"]=$temp+1;
                $archivo=fopen("../data/empresas.json","w");
                fwrite($archivo,json_encode($empresas)); 
                fclose($archivo);
             }

             public static function incrementarVendidos($indexEmp){
                $contenido_archivo= file_get_contents("../data/empresas.json");
                $empresas=json_decode($contenido_archivo,true);
                $temp= $empresas[$indexEmp]["estado"]["estado_promociones"]["carrito"];
                $empresas[$indexEmp]["estado"]["estado_promociones"]["carrito"]=$temp+1;
                $archivo=fopen("../data/empresas.json","w");
                fwrite($archivo,json_encode($empresas)); 
                fclose($archivo);
             }

             public static function incrementarVentasDomingo($indexEmp,$cantidad){
                $contenido_archivo= file_get_contents("../data/empresas.json");
                $empresas=json_decode($contenido_archivo,true);
                $temp= $empresas[$indexEmp]["estado"]["ventas_semana"]["domingo"];
                $empresas[$indexEmp]["estado"]["ventas_semana"]["domingo"]=$temp+$cantidad;
                $temp_total=$empresas[$indexEmp]["estado"]["ventas_semana"]["info"]["total_semana"];
                $empresas[$indexEmp]["estado"]["ventas_semana"]["info"]["total_semana"]=$temp_total+$cantidad;
                $archivo=fopen("../data/empresas.json","w");
                fwrite($archivo,json_encode($empresas)); 
                fclose($archivo);
             }

             public static function incrementarVentasLunes($indexEmp,$cantidad){
                $contenido_archivo= file_get_contents("../data/empresas.json");
                $empresas=json_decode($contenido_archivo,true);
                $temp= $empresas[$indexEmp]["estado"]["ventas_semana"]["lunes"];
                $empresas[$indexEmp]["estado"]["ventas_semana"]["lunes"]=$temp+$cantidad;
                $temp_total=$empresas[$indexEmp]["estado"]["ventas_semana"]["info"]["total_semana"];
                $empresas[$indexEmp]["estado"]["ventas_semana"]["info"]["total_semana"]=$temp_total+$cantidad;
                $archivo=fopen("../data/empresas.json","w");
                fwrite($archivo,json_encode($empresas)); 
                fclose($archivo);
             }

             public static function incrementarVentasMartes($indexEmp,$cantidad){
                $contenido_archivo= file_get_contents("../data/empresas.json");
                $empresas=json_decode($contenido_archivo,true);
                $temp= $empresas[$indexEmp]["estado"]["ventas_semana"]["martes"];
                $empresas[$indexEmp]["estado"]["ventas_semana"]["martes"]=$temp+$cantidad;
                $temp_total=$empresas[$indexEmp]["estado"]["ventas_semana"]["info"]["total_semana"];
                $empresas[$indexEmp]["estado"]["ventas_semana"]["info"]["total_semana"]=$temp_total+$cantidad;
                $archivo=fopen("../data/empresas.json","w");
                fwrite($archivo,json_encode($empresas)); 
                fclose($archivo);
             }

             public static function incrementarVentasMiercoles($indexEmp,$cantidad){
                $contenido_archivo= file_get_contents("../data/empresas.json");
                $empresas=json_decode($contenido_archivo,true);
                $temp= $empresas[$indexEmp]["estado"]["ventas_semana"]["miercoles"];
                $empresas[$indexEmp]["estado"]["ventas_semana"]["miercoles"]=$temp+$cantidad;
                $temp_total=$empresas[$indexEmp]["estado"]["ventas_semana"]["info"]["total_semana"];
                $empresas[$indexEmp]["estado"]["ventas_semana"]["info"]["total_semana"]=$temp_total+$cantidad;
                $archivo=fopen("../data/empresas.json","w");
                fwrite($archivo,json_encode($empresas)); 
                fclose($archivo);
             }

             public static function incrementarVentasJueves($indexEmp,$cantidad){
                $contenido_archivo= file_get_contents("../data/empresas.json");
                $empresas=json_decode($contenido_archivo,true);
                $temp= $empresas[$indexEmp]["estado"]["ventas_semana"]["jueves"];
                $empresas[$indexEmp]["estado"]["ventas_semana"]["jueves"]=$temp+$cantidad;
                $archivo=fopen("../data/empresas.json","w");
                $temp_total=$empresas[$indexEmp]["estado"]["ventas_semana"]["info"]["total_semana"];
                $empresas[$indexEmp]["estado"]["ventas_semana"]["info"]["total_semana"]=$temp_total+$cantidad;
                fwrite($archivo,json_encode($empresas)); 
                fclose($archivo);
             }

             public static function incrementarVentasViernes($indexEmp,$cantidad){
                $contenido_archivo= file_get_contents("../data/empresas.json");
                $empresas=json_decode($contenido_archivo,true);
                $temp= $empresas[$indexEmp]["estado"]["ventas_semana"]["viernes"];
                $empresas[$indexEmp]["estado"]["ventas_semana"]["viernes"]=$temp+$cantidad;
                $temp_total=$empresas[$indexEmp]["estado"]["ventas_semana"]["info"]["total_semana"];
                $empresas[$indexEmp]["estado"]["ventas_semana"]["info"]["total_semana"]=$temp_total+$cantidad;
                $archivo=fopen("../data/empresas.json","w");
                fwrite($archivo,json_encode($empresas)); 
                fclose($archivo);
             }

             public static function incrementarVentasSabado($indexEmp,$cantidad){
                $contenido_archivo= file_get_contents("../data/empresas.json");
                $empresas=json_decode($contenido_archivo,true);
                $temp= $empresas[$indexEmp]["estado"]["ventas_semana"]["domingo"];
                $empresas[$indexEmp]["estado"]["ventas_semana"]["domingo"]=$temp+$cantidad;
                $temp_total=$empresas[$indexEmp]["estado"]["ventas_semana"]["info"]["total_semana"];
                $empresas[$indexEmp]["estado"]["ventas_semana"]["info"]["total_semana"]=$temp_total+$cantidad;
                $archivo=fopen("../data/empresas.json","w");
                fwrite($archivo,json_encode($empresas)); 
                fclose($archivo);
             }


             public static function iniciarSemana($indexEmp){
                $contenido_archivo= file_get_contents("../data/empresas.json");
                $empresas=json_decode($contenido_archivo,true);
                $empresas[$indexEmp]["estado"]["ventas_semana"]["info"]["total_semana"]=0;
                $empresas[$indexEmp]["estado"]["ventas_semana"]["domingo"]=0;
                $empresas[$indexEmp]["estado"]["ventas_semana"]["lunes"]=0;
                $empresas[$indexEmp]["estado"]["ventas_semana"]["martes"]=0;
                $empresas[$indexEmp]["estado"]["ventas_semana"]["miercoles"]=0;
                $empresas[$indexEmp]["estado"]["ventas_semana"]["jueves"]=0;
                $empresas[$indexEmp]["estado"]["ventas_semana"]["viernes"]=0;
                $empresas[$indexEmp]["estado"]["ventas_semana"]["sabado"]=0;
                $empresas[$indexEmp]["estado"]["ventas_semana"]["info"]["num_semana"]=date("W");
                $archivo=fopen("../data/empresas.json","w");
                fwrite($archivo,json_encode($empresas)); 
                fclose($archivo);
             }

             public static function ActualizarDiaSemana($indexEmp,$dia){
                $contenido_archivo= file_get_contents("../data/empresas.json");
                $empresas=json_decode($contenido_archivo,true);
                $empresas[$indexEmp]["estado"]["ventas_semana"]["info"]["dia_semana"]=$dia;
                $archivo=fopen("../data/empresas.json","w");
                fwrite($archivo,json_encode($empresas)); 
                fclose($archivo);
             }
             

            


                                                          //ELIMINAR UNA EMPRESA
/*************************************************************************************************************************************** */
            public static function eliminarEmpresa($id)
            {
                $contenido_archivo=file_get_contents("../data/empresas.json");
                $empresas=json_decode($contenido_archivo,true); 
                array_splice($empresas,$id,1);
                 $archivo=fopen("../data/empresas.json","w");
                 fwrite($archivo,json_encode($empresas)); 
                 fclose($archivo);

            } 

            public static function cancelarRegistro()
            {
                $contenido_archivo=file_get_contents("../data/empresas.json");
                $empresas=json_decode($contenido_archivo,true); 
                $id=sizeof($empresas)-1;
                array_splice($empresas,$id,1);
                $archivo=fopen("../data/empresas.json","w");
                fwrite($archivo,json_encode($empresas)); 
                fclose($archivo);

            }

            public static function DecrementarCarrito($indexEmp){
                $contenido_archivo= file_get_contents("../data/empresas.json");
                $empresas=json_decode($contenido_archivo,true);
                $temp= $empresas[$indexEmp]["estado"]["estado_promociones"]["carrito"];
                $empresas[$indexEmp]["estado"]["estado_promociones"]["carrito"]=$temp-1;
                $archivo=fopen("../data/empresas.json","w");
                fwrite($archivo,json_encode($empresas)); 
                fclose($archivo);
             }
            
            

        }


        

?>