<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>hi-Offer</title>
    <link rel="stylesheet" type="text/css" media="screen" href="css/bootstrap.min.css"/>
    
    <link rel="stylesheet" href="css/Style-Usuarios.css">
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,700,800&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Montserrat&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Nunito+Sans&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.11.2/css/all.css">
    <!-- Material Design Bootstrap -->
     <link rel="stylesheet" href="css/mdb.min.css">

</head>
<body style="background-color: #FFFFFF;" >
    <!--Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light " style="background-color:#FFFFFF;">
        <a class="navbar-brand" href="#"><img  class="logo" src="img/logo2.png" ></a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse navUsuario" id="navbarNavDropdown" style="margin-top: 10px; margin-left: 50px;">
          <ul class="navbar-nav">
            <li class="nav-item active">
                <div class="input-group mb-3 categoria"  style=" margin-right:30px;">
                    <div class="input-group-prepend"> 
                      <label class="input-group-text" for="inputGroupSelect0" style="background-color: #546991;"><i style="color: aliceblue;" class="fas fa-bars"></i></label>
                    </div>
                    <a class="custom-select"  id="inputGroupSelect01"  role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Categorias</a>
                    <div  id="categoriasMenu" class="dropdown-menu " aria-labelledby="navbarDropdownMenuLink" >
                        
                      </div>
                  </div>
            </li>
            <li class="nav-item active ">
                <div class="input-group mb-3 seach">
                    <input type="text" class="form-control" placeholder="Buscar " style="width:100px!important"  saria-label="Recipient's username" aria-describedby="basic-addon2">
                    <div class="input-group-append" >
                      <span class="input-group-text" id="basic-addon2" style="background-color: #546991;"><i style="color: aliceblue;" class="fas fa-search"></i></span>
                    </div>
                  </div>
            </li>
            <li class="nav-item">
                <button type="button" onclick="todasLasEmpresas()"  class="boton"><i class="fas fa-building"></i> Empresas</button>
             </li>
            <li class="nav-item">
               <div style="text-align: center; "><i style="color: #546991; font-size: 20px; padding-top: 8px; margin-left: 50px;" class="fas fa-shopping-cart"></i></div> 
            </li>
            
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i style="color:#546991; font-size: 20px; float: right;" class="fas fa-user"></i>
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <a class="dropdown-item" onclick="window.location='perfil.html'" href="#">Mi Perfil</a>
                <a class="dropdown-item" href="index.html">Cerrar Sesión</a>
              </div>
            </li>
          </ul>
        </div>
      </nav>
  <!--/.Navbar -->

<div id="contenedor-principal" style="background-color: #FFFFFF;">
<!--Carousel Wrapper-->
<div id="carousel-example-2" class="carousel slide " data-ride="carousel">
  <!--Indicators-->
  <ol class="carousel-indicators" id="indicadores">
    <li data-target="#carousel-example-2" data-slide-to="1"></li>
    <li data-target="#carousel-example-2" data-slide-to="2"></li>
  </ol>
  <!--/.Indicators-->
  <!--Slides-->
  <div class="carousel-inner" role="listbox" id="carrucel-inicio">
    <div class="carousel-item">
      <!--Mask color-->
      <div class="view">
        <img class="d-block w-100" src="img/PORTADA1.jpg"
          alt="Third slide">
        <div class="mask rgba-black-slight"></div>
      </div>
      <div class="carousel-caption">
      <h3 class="h3-responsive">Te damos la Bienvenida</h3>
        <p>Encuentra los precion nunca antes vistos!</p>
      </div>
    </div>
  </div>
  <!--/.Slides-->
  <!--Controls-->
  <a class="carousel-control-prev" href="#carousel-example-2" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carousel-example-2" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
  <!--/.Controls-->
</div>
<!--/.Carousel Wrapper-->

<!-- menu-->
<!-- Inicio --> <!--Contiene las categorias-->
<div id="inicio-cat" >
  <div class="container-fluid" style="padding-left: 80px;padding-right: 100px; padding-top:50px;" id="inicio" >
    
</div>
</div>

<div id="div-mostrarProductos" style="background-color:#FFFFFF;"  >
  <div class="container-fluid" id="ver-producto"  style="background-color: #EEEEEE; padding: 50px;">
    
</div>
</div>
<!--------------------------------------------------------------->





<!-------------------------------------------------VER UN PRODUCTO------------------------------------------------->
<div class="container-fluid" id="ver-un-producto" style="background-color: #FFFFFF">

</div>
<!------------------------------------------------------------------------------------------------------------------>














<?php
      include('perfil/seccion_carrito.php');
?>










<!--/////-->

<div class="container-fluid" id="border" >
  <div class="row">
     <div style="background-color: #8bd0ed;" class="rectangulo col-2"></div>
     <div style="background-color: #b8cccb;" class="rectangulo col-2"></div>
     <div style="background-color: #536f97;" class="rectangulo col-2"></div>
     <div style="background-color: #aec1e9;" class="rectangulo col-2"></div>
     <div style="background-color: #918eab;" class="rectangulo col-2"></div>
     <div style="background-color: #8bd0ed;" class="rectangulo col-2"></div>
  </div>
</div>


  <!-- Footer -->
<footer class="page-footer font-small  darken-3" style="background-color: #184F78;">
<div class="container-fluid">
  <!-- Grid row-->
  <div class="row">
    <!-- Grid column -->
    <div class="col-md-12 py-5">
       <!-- Footer Links -->
<div class="container-fluid text-center text-md-left">
  <!-- Grid row -->
  <div class="row">
    <!-- Grid column -->
    <div class="col-md-6 mt-md-0 mt-3">
      <!-- Content -->
      <h5 class="text-uppercase">Hi-Offer</h5>
      <p>La plataforma diseñada para tu economía,obten los mejores precios y la mejor calidad en tus productos.</p>

    </div>
    <!-- Grid column -->

    <hr class="clearfix w-100 d-md-none pb-3">

    <!-- Grid column -->
    <div class="col-md-3 mb-md-0 mb-3">

      <!-- Links -->
      <h5 class="text-uppercase">Inicio</h5>

      <ul class="list-unstyled">
        <li>
          <a href="#!">Como funciona</a>
        </li>
        <li>
          <a href="#!">Marcas</a>
        </li>
        <li>
          <a href="#!">Productos</a>
        </li>
        <li>
          <a href="#!">Regístrate</a>
        </li>
      </ul>

    </div>
    <!-- Grid column -->
    <!-- Grid column -->
    <div class="col-md-3 mb-md-0 mb-3">

      <!-- Links -->
      <h5 class="text-uppercase">soporte técnico</h5>

      <ul class="list-unstyled">
        <li>
          <a href="#!">soporte_hi-offer@outlook.com</a>
        </li>
        <li>
          <a href="#!">+50497126519</a>
        </li>
        <li>
          <a href="#!">Edificio Astro,Tegucigalpa,Honduras.</a>
        </li>
        <li>
          <a href="#!"></a>
        </li>
      </ul>

    </div>
    <!-- Grid column -->

  </div>
  <!-- Grid row -->
      <div class="mb-5 flex-center" style="margin-top: 50px;">
        <!-- Facebook -->
        <a class="fb-ic">
          <i class="fab fa-facebook-f fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
        </a>
        <!-- Twitter -->
        <a class="tw-ic">
          <i class="fab fa-twitter fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
        </a>
        <!-- Google +-->
        <a class="gplus-ic">
          <i class="fab fa-google-plus-g fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
        </a>
        <!--Instagram-->
        <a class="ins-ic">
          <i class="fab fa-instagram fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
        </a>
        <!--Pinterest-->
        <a class="pin-ic">
          <i class="fab fa-pinterest fa-lg white-text fa-2x"> </i>
        </a>
      </div>
    </div>
    <!-- Grid column -->

  </div>
</div>
</div>
<div class="footer-copyright text-center py-3">© 2020 Copyright:
  <a href="https://mdbootstrap.com/">Hi-Offer.com</a>
</div>
</footer>
<!-- Footer -->

<script type="text/javascript" src="js/librerias/jquery.min.js"></script>
<!-- Bootstrap tooltips -->
<script type="text/javascript" src="js/librerias/popper.min.js"></script>
<!-- Bootstrap core JavaScript -->
<script type="text/javascript" src="js/librerias/bootstrap.min.js"></script>
<!-- MDB core JavaScript -->
<script type="text/javascript" src="js/librerias/mdb.min.js"></script>
<script src="js/librerias/axios.min.js"></script>
  <!-- Your custom scripts (optional) -->
  
  <script src="js/controladores/controladorGeneralUsuarios.js"></script>
  <script src="js/controladores/controlador_Inicio_Usuarios.js"></script>

    <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
    <script src="js/controladores/controladorUsuarios.js"></script>
    
    <script>
     $(document).ready(function() {
      new WOW().init();
   });
    </script>
   

    <script>
   
    </script>

    
</body>
</html>