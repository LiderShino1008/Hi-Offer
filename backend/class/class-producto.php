<?php

    class Producto{ //Nombre en camelc $nombre;
      /*Atributos*/
      private $nombre;
      private $codigo;
      private $nombreCategoria;
      private $idCategoria;
      private $descripcion;
      private $precio;
      private $stock;
      private $imagen;
      private $idEmpresa;
   
    
      /*contructor*/
      public function __construct($nombre,$codigo,$idCategoria,$descripcion,$precio,$stock,$imagen,$idEmpresa){
              $this->nombre=$nombre;
              $this->codigo=$codigo;
              $this->idCategoria=$idCategoria;
              $this->descripcion=$descripcion;
              $this->precio=$precio;
              $this->stock=$stock;
              $this->imagen=$imagen;
              $this->idEmpresa=$idEmpresa;
              
      }


        /************FUNCIONES DE GESTION DE INFORMACION********** */
    
     public function guardarProducto($idEmpresa){
        $contenido_archivo= file_get_contents("../data/empresas.json");
        $empresas=json_decode($contenido_archivo,true);
        $nombreEmpresa=$empresas[$idEmpresa]["nombre_empresa"];
        $empresas[$idEmpresa]["productos"][]=array(
            "nombre"=>$this->nombre,
            "codigo"=>$this->codigo,
            "idCategoria"=>$this->idCategoria,
            "descripcion"=>$this->descripcion,
            "precio"=>$this->precio,
            "stock"=>$this->stock,
            "imagen"=>'backend/archivos-subidos/empresas/empresa'.$idEmpresa.'/'.$this->imagen,
            "idEmpresa"=>$idEmpresa,
            "empresa"=>$nombreEmpresa
        );

         $archivo=fopen("../data/empresas.json","w");
         fwrite($archivo,json_encode($empresas)); 
         fclose($archivo);
    }


        
        

        public  function actualizarProducto($idEmp,$idProducto){
            $contenido_archivo= file_get_contents("../data/empresas.json");
            $empresas=json_decode($contenido_archivo,true);
            $nombreEmpresa=$empresas[$idEmp]["nombre_empresa"];
            if($this->imagen==""){
                  $temp= $empresas[$idEmp]["productos"][$idProducto]["imagen"];
                  $empresas[$idEmp]["productos"][$idProducto]=array(
                        "nombre"=>$this->nombre,
                        "codigo"=>$this->codigo,
                        "idCategoria"=>$this->idCategoria,
                        "descripcion"=>$this->descripcion,
                        "precio"=>$this->precio,
                        "stock"=>$this->stock,
                        "imagen"=>$temp,
                        "idEmpresa"=>$idEmp,
                        "empresa"=>$nombreEmpresa);
            }else{
                  $empresas[$idEmp]["productos"][$idProducto]=array(
                        "nombre"=>$this->nombre,
                        "codigo"=>$this->codigo,
                        "idCategoria"=>$this->idCategoria,
                        "descripcion"=>$this->descripcion,
                        "precio"=>$this->precio,
                        "stock"=>$this->stock,
                        "imagen"=>'backend/archivos-subidos/empresas/empresa'.$idEmp.'/'.$this->imagen,
                        "idEmpresa"=>$this->idEmpresa,
                        "empresa"=>$nombreEmpresa);
            }


         $archivo=fopen("../data/empresas.json","w");
         fwrite($archivo,json_encode($empresas)); 
         fclose($archivo);
    

        }

        public static function eliminarProducto($idEmp,$idProducto)
        {
            $contenido_archivo=file_get_contents("../data/empresas.json");
            $empresas=json_decode($contenido_archivo,true);
             
            array_splice($empresas[$idEmp]["productos"],$idProducto,1);
 
           $archivo=fopen("../data/empresas.json","w");
           fwrite($archivo,json_encode($empresas)); 
           fclose($archivo);
 
        } 
       
        




              public function getNombre()
              {
                            return $this->nombre;
              }

              public function setNombre($nombre)
              {
                            $this->nombre = $nombre;

                            return $this;
              }

              public function getCodigo()
              {
                            return $this->codigo;
              }

              public function setCodigo($codigo)
              {
                            $this->codigo = $codigo;

                            return $this;
              }

           
              public function getNombreCategoria()
              {
                            return $this->nombreCategoria;
              }

         
              public function setNombreCategoria($nombreCategoria)
              {
                            $this->nombreCategoria = $nombreCategoria;

                            return $this;
              }


      public function getDescripcion()
      {
            return $this->descripcion;
      }

      public function setDescripcion($descripcion)
      {
            $this->descripcion = $descripcion;

            return $this;
      }

    
      public function getPrecio()
      {
            return $this->precio;
      }

    
      public function setPrecio($precio)
      {
            $this->precio = $precio;

            return $this;
      }

    
      public function getStock()
      {
            return $this->stock;
      }

 
      public function setStock($stock)
      {
            $this->stock = $stock;

            return $this;
      }

     
      public function getImagen()
      {
            return $this->imagen;
      }

    
      public function setImagen($imagen)
      {
            $this->imagen = $imagen;

            return $this;
      }

     
      public function getEmpresa()
      {
            return $this->empresa;
      }


      public function setEmpresa($empresa)
      {
            $this->empresa = $empresa;

            return $this;
      }
 }