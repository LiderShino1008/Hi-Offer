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
            private $plan=Array();

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
             public function guardarEmpresa(){
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
                       "total_ventas"=>0,
                       "total_seguidores"=>0,
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
                    "logotipo"=> $this->logotipo,
                    "Banner"=>$this->Banner,
                    "sucursales"=>$this->sucursales,
                    "productos"=>$this->productos,
                    "promociones"=> $this->promociones,
                    "plan"=> $this->plan,
                );
                $archivo=fopen("../data/empresas.json","w");
                fwrite($archivo,json_encode($empresas)); 
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



                                                            //OBTENER EMPRESAS
/*************************************************************************************************************************************** */


           public static function ObtenerEmpresas(){
            $contenido_archivo=file_get_contents("../data/empresas.json");
            echo $contenido_archivo;
        
        }


                                                          //OBTENER UNA EMPRESA
/*************************************************************************************************************************************** */

            public static function obtenerUnaEmpresa($id){
             $contenido_archivo=file_get_contents("../data/empresas.json");
             $empresas=json_decode($contenido_archivo,true);
             echo json_encode($empresas[$id]) ;
}



                                                          //ACTUALIZAR UNA EMPRESA
/*************************************************************************************************************************************** */
            public  function actualizarInformacion($id){
                $contenido_archivo=file_get_contents("../data/empresas.json");
                $empresas=json_decode($contenido_archivo,true);
                $empresas[$id]["nombre"]=$this->nombre_empresa;
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

            public static function actualizarLogotipo($id){
                $contenido_archivo=file_get_contents("../data/empresas.json");
                $empresas=json_decode($contenido_archivo,true);
                $empresas[$id]["logotipo"]= $this->logotipo;
            }

            public static function actualizarBanner($id){
                $contenido_archivo=file_get_contents("../data/empresas.json");
                $empresas=json_decode($contenido_archivo,true);
                $empresas[$id]["Banner"]= $this->Banner;
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
        }


        

?>