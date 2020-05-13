<?php
    class Plataforma{ //Nombre en camelc $nombre;
      /*Atributos*/
      private $empresas;
      private $usuarios;
      private $visitas;
      private $ganancias;
      private $categorias;
      private $planes;
      private $correo;
      private $contrasena;
      

      /*contructor*/
      public function __construct($empresas,$usuarios,$visitas,$ganancias,$categorias,$planes,$correo,$contrasena){
              $this->empresas=$empresas;
              $this->usuarios=$usuarios;
              $this->visitas=$visitas;
              $this->ganancias=$ganancias;
              $this->categorias=$categorias;
              $this->planes=$planes;
              $this->correo= $correo;
              $this->contrasena= $contrasena;
      }

     /*Esta funcion se debera ejecutar siempre*/
      public static function ActualizarDatos()
      {
            CantidadEmpresas();
            CantidadUsuarios();
            CantidadCategorias();
            CantidadPlanes();
      }

      public static  function CantidadEmpresas(){
        $contenido_archivo1=file_get_contents("../data/empresas.json");
        $empresas=json_decode($contenido_archivo1,true);
        
        $cantidadEmp=sizeof($empresas);
        $contenido_archivo2=file_get_contents("../data/plataforma.json");
        $plataforma=json_decode($contenido_archivo2,true);
        $temp=$plataforma;
        $plataforma[0]["empresas"]=$cantidadEmp;
         $archivo=fopen("../data/plataforma.json","w");
         fwrite($archivo,json_encode($plataforma)); 
         fclose($archivo);

    }

    public static  function CantidadUsuarios(){
        $contenido_archivo1=file_get_contents("../data/usuarios.json");
        $usuarios=json_decode($contenido_archivo1,true);
        $cantidadUs=sizeof($usuarios);
        $contenido_archivo2=file_get_contents("../data/plataforma.json");
        $plataforma=json_decode($contenido_archivo2,true);
        $plataforma[0]["usuarios"]=$cantidadUs;
         $archivo=fopen("../data/plataforma.json","w");
         fwrite($archivo,json_encode($plataforma)); 
         fclose($archivo);

    }

    public static  function IncrementoVisitas(){
        $contenido_archivo=file_get_contents("../data/plataforma.json");
        $plataforma=json_decode($contenido_archivo,true);
        $newVisit= $plataforma[0]["visitas"]+1;
        $plataforma[0]["visitas"]=$newVisit;
         $archivo=fopen("../data/plataforma.json","w");
         fwrite($archivo,json_encode($plataforma)); 
         fclose($archivo);
    }

    public static  function IncrementoGanancias($ganancias){
        sleep(10);
        $contenido_archivo=file_get_contents("../data/plataforma.json");
        $plataforma=json_decode($contenido_archivo,true);
        $total= $plataforma[0]["ganancias"]+$ganancias;
        $plataforma[0]["ganancias"]=$total;
         $archivo=fopen("../data/plataforma.json","w");
         fwrite($archivo,json_encode($plataforma)); 
         fclose($archivo);
    }

    public static  function CantidadCategorias(){
        $contenido_archivo1=file_get_contents("../data/categorias.json");
        $categorias=json_decode($contenido_archivo1,true);
        $cantidadCat=sizeof($categorias);
        $contenido_archivo2=file_get_contents("../data/plataforma.json");
        $plataforma=json_decode($contenido_archivo2,true);
        $plataforma[0]["categorias"]=$cantidadCat;
         $archivo=fopen("../data/plataforma.json","w");
         fwrite($archivo,json_encode($plataforma)); 
         fclose($archivo);

    }

    public static  function CantidadPlanes(){
        $contenido_archivo1=file_get_contents("../data/planes.json");
        $planes=json_decode($contenido_archivo1,true);
        $cantidadPlan=sizeof($planes);
        $contenido_archivo2=file_get_contents("../data/plataforma.json");
        $plataforma=json_decode($contenido_archivo2,true);
        $plataforma[0]["planes"]=$cantidadPlan;
         $archivo=fopen("../data/plataforma.json","w");
         fwrite($archivo,json_encode($plataforma)); 
         fclose($archivo);

    }
    
    public static  function ObtenerInformacion(){
        Plataforma::CantidadEmpresas();
        Plataforma::CantidadUsuarios();
        Plataforma::CantidadCategorias();
        Plataforma::CantidadPlanes();
        $contenido_archivo=file_get_contents("../data/plataforma.json");
        echo $contenido_archivo;
    }

    public static function actualizarMes($mes)
    {
        $contenido_archivo=file_get_contents("../data/plataforma.json");
        $plataforma=json_decode($contenido_archivo,true);
        $plataforma[0]["mes_actual"]=$mes;
         $archivo=fopen("../data/plataforma.json","w");
         fwrite($archivo,json_encode($plataforma)); 
         fclose($archivo);
    }

   /* public static function guardarEmpresaActual($empresa){
        $contenido_archivo1=file_get_contents("../data/plataforma.json");
        $plataforma=json_decode($contenido_archivo1,true);
        $plataforma[0]["empresaActual"]=$empresa;
        $archivo=fopen("../data/plataforma.json","w");
        fwrite($archivo,json_encode($plataforma)); 
        fclose($archivo);
    } */


        




 }














   



    
   
?>
