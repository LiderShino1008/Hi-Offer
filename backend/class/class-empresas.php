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
                       "visitaspasado"=>0,
                       "estado_promociones"=>array(
                           "vendidas"=>0,
                           "carrito"=>0 ),
                        "ventas_semana"=>array(
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
                    "logotipo"=> 0,
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
             $contenido_archivo=file_get_contents("../data/empresas.json");
             $empresas=json_decode($contenido_archivo,true);
             echo json_encode($empresas[$id]);
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
                $empresas[$id]["logotipo"]= $logotipo;
                $archivo=fopen("../data/empresas.json","w");
                fwrite($archivo,json_encode($empresas)); 
                fclose($archivo);
            }

            public static function actualizarBanner($id,$Banner){
                $contenido_archivo=file_get_contents("../data/empresas.json");
                $empresas=json_decode($contenido_archivo,true);
                $empresas[$id]["Banner"]= $Banner;
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
            
            

        }


        

?>