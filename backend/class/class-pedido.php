
<?php
    class Pedido{ //Nombre en camelc $nombre;
      /*Atributos*/
      private $idPromocion;
      private $idCategoria;
      private $cantidad;
      private $datos;
      private $Norden;
      private $estado;
      /*contructor*/

      public function __construct($idPromocion,$idCategoria,$cantidad,$datos,$Norden,$estado){
              $this->idPromocion=$idPromocion;
              $this->idCategoria=$idCategoria;
              $this->cantidad=$cantidad;
              $this->datos=$datos;
              $this->Norden=$Norden;
              $this->estado=$estado;
      }

     

        /************FUNCIONES DE GESTION DE INFORMACION********** */
    
     public function guardarPedido($idEmpresa, $idUsuario){
       //guardar el pedido a la empresa
        $contenido_archivo= file_get_contents("../data/empresas.json");
        $empresas=json_decode($contenido_archivo,true);
        //verificar que el elemento no se agregue dos veces al carrito
        $empresas[$idEmpresa]["pedidos"][]=array(
          "idPromocion"=>$this->idPromocion,
          "idCategoria"=>$this->idCategoria,
          "cantidad"=>$this->cantidad,
          "datos"=>$this->datos,
          "Norden"=>$this->Norden,
          "estado"=>$this->estado,
          "idUsuario"=>(int)$idUsuario
        );
        //guardar pedido a el usuario
        $contenido_archivo2= file_get_contents("../data/usuarios.json");
        $usuarios=json_decode($contenido_archivo2,true);
        $usuarios[$idUsuario]["pedidos"][]=array(
          "idPromocion"=>$this->idPromocion,
          "idCategoria"=>$this->idCategoria,
          "cantidad"=>$this->cantidad,
          "datos"=>$this->datos,
          "Norden"=>$this->Norden,
          "estado"=>$this->estado
        );
          $archivo=fopen("../data/empresas.json","w");
          fwrite($archivo,json_encode($empresas)); 
          fclose($archivo);
          
          $archivo2=fopen("../data/usuarios.json","w");
          fwrite($archivo2,json_encode($usuarios)); 
          fclose($archivo2);
          $code=Array("padado"=>true);
          echo json_encode($code);
    }

  }
        
        

