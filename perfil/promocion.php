<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hi-Offer</title>
    <link rel="stylesheet" type="text/css" media="screen" href="../css/bootstrap.min.css"/>
    
    <link rel="stylesheet" href="../css/Style-Usuarios.css">
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,700,800&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Montserrat&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Nunito+Sans&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.11.2/css/all.css">
    <link rel="stylesheet" type="text/css" href="../css/star-rating-svg.css">
    <!-- Material Design Bootstrap -->
     <link rel="stylesheet" href="../css/mdb.min.css">
    <!-- Your custom styles (optional) -->
   
</head>
<body style="margin:0!important">
    <?php
      include('navbar.php');
    ?>
    <?php
      include('notificacion.php');
    ?>

<div class="container-fluid" id="verProducto" style=" ">
    <div class="container my-3 mb-10 py-5  col-lg-9 col-12 px-2" id="producto" style="background-color: white; margin-bottom: 50px; padding-right: 10px; padding-left: 10px;">
        <section class="text-center">
          <h4 class="font-weight-bold mb-5 px-20" >Detalles del producto
          <div id="estado-guardado"><a class="col-lg-3" onclick="guardarPromocion()" style="font-size:15px; float: right;">Guardar<i style="font-size: 20px;"  class=" ml-2 far fa-bookmark"></i></a></div></h4>
          <div class="row">
            <div class="col-lg-5">
              <div id="carousel-thumb1" class="carousel slide carousel-fade carousel-thumbnails mb-5 pb-4" data-ride="carousel">
                <div class="carousel-inner text-center text-md-left" role="listbox">
                  <div class="carousel-item active" id="visor-img">
                    
                  </div>
                </div>
                <!--/.Slides-->
                <!--Thumbnails-->
                <a class="carousel-control-prev" href="#carousel-thumb1" role="button" data-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carousel-thumb1" role="button" data-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="sr-only">Next</span>
                </a>
              </div>
              <!--/.Carousel Wrapper-->
            </div>
      
            <div class="col-lg-5 text-center text-md-left" id="info">
              <div id="info-2"></div>
              
              <h3 class="h3-responsive text-center text-md-left mb-2 ml-xl-0 ml-4" id="info-3">

              </h3>
              
              <p class="ml-xl-0 ml-4 text-md-left mb-2 ml-xl-0 ml-4 ">
                <strong style="font-weight: bold;">Calificación:</strong><ul class="rating  form-inline">
                <div class="my-rating-4" ></div>
                </ul></p>
              <div id="info-4"></div>
              <input type="number" id="input-cant" value="2" aria-label="Search" class="form-control" style="width: 100px">
              <div class="font-weight-normal" >
                <div class="mt-5">
                  <div class="row mt-3 mb-4">
                    <div class="col-md-12 container text-center text-md-left text-md-right" id="botones">
                      
                    </div>
                    
                  </div>
                </div>
      
              </div>
      
            </div>
          </div>
      
        </section>
        <hr>

        <div class="row">
                <div class="col-12">
                  <ul class="nav md-pills flex-center flex-wrap mx-0 float-left" role="tablist">
                    <li class="nav-item">
                      <a class="nav-link  font-weight-bold text-uppercase" style="" data-toggle="tab" href="#panelComentarios" role="tab">Comentarios</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link font-weight-bold text-uppercase" data-toggle="tab" href="#panelSucursales" role="tab">Sucursales</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="tab-content mb-5">
              <div class="tab-pane fade show in active container-fluid row" id="panelComentarios" role="tabpanel" style="padding-top:50px;">
                        <!---------------------------COMENTARIOS---------------------------------------->
                        <section class="dark-grey-text mb-5 col-10 mx-auto">
                          <h5 class="font-weight-bold text-center mb-5">Comentarios</h5>
                          <div class="media mb-3">
                            <img class="card-img-100 rounded-circle z-depth-1-half d-flex mr-3" src="https://mdbootstrap.com/img/Photos/Avatars/img (8).jpg" alt="Generic placeholder image">
                            <div class="media-body">
                              <a>
                                <h6 class="user-name font-weight-bold">John Doe</h6>
                              </a>
                              <!-- Rating -->
                              <ul class="rating  form-inline" style="font-size: 14px;">
                              <i class="fas fa-star  " style="color:#F8C501"></i>
                              <i class="fas fa-star " style="color:#F8C501"></i>
                              <i class="fas fa-star " style="color:#F8C501"></i>
                              <i class="fas fa-star " style="color:#F8C501"></i>
                              <i class="fas fa-star " style="color:#F8C501"></i>
                            </ul>
                              <div class="card-data">
                                <ul class="list-unstyled mb-1">
                                  <li class="comment-date font-small grey-text">
                                    <i class="far fa-clock"></i> 05/10/2015</li>
                                </ul>
                              </div>
                              <p class="dark-grey-text article " style="font-size: 14px;">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                aliquip ex ea commodo
                                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                                nulla pariatur. Excepteur sint occaecat cupidatat non proident.</p>
                            </div>
                          </div>
                          
                          <div class="media mb-3">
                            <img class="card-img-100 rounded-circle z-depth-1-half d-flex mr-3" src="https://mdbootstrap.com/img/Photos/Avatars/img (8).jpg" alt="Generic placeholder image">
                            <div class="media-body">
                              <a>
                                <h6 class="user-name font-weight-bold">John Doe</h6>
                              </a>
                              <!-- Rating -->
                              <ul class="rating  form-inline" style="font-size: 14px;">
                              <i class="fas fa-star  " style="color:#F8C501"></i>
                              <i class="fas fa-star " style="color:#F8C501"></i>
                              <i class="fas fa-star " style="color:#F8C501"></i>
                              <i class="fas fa-star " style="color:#F8C501"></i>
                              <i class="fas fa-star " style="color:#F8C501"></i>
                            </ul>
                              <div class="card-data">
                                <ul class="list-unstyled mb-1">
                                  <li class="comment-date font-small grey-text">
                                    <i class="far fa-clock"></i> 05/10/2015</li>
                                </ul>
                              </div>
                              <p class="dark-grey-text article " style="font-size: 14px;">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                aliquip ex ea commodo
                                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                                nulla pariatur. Excepteur sint occaecat cupidatat non proident.</p>
                            </div>
                          </div>
                          
                          <div class="media mb-3">
                            <img class="card-img-100 rounded-circle z-depth-1-half d-flex mr-3" src="https://mdbootstrap.com/img/Photos/Avatars/img (8).jpg" alt="Generic placeholder image">
                            <div class="media-body">
                              <a>
                                <h6 class="user-name font-weight-bold">John Doe</h6>
                              </a>
                              <!-- Rating -->
                              <ul class="rating  form-inline" style="font-size: 14px;">
                              <i class="fas fa-star  " style="color:#F8C501"></i>
                              <i class="fas fa-star " style="color:#F8C501"></i>
                              <i class="fas fa-star " style="color:#F8C501"></i>
                              <i class="fas fa-star " style="color:#F8C501"></i>
                              <i class="fas fa-star " style="color:#F8C501"></i>
                            </ul>
                              <div class="card-data">
                                <ul class="list-unstyled mb-1">
                                  <li class="comment-date font-small grey-text">
                                    <i class="far fa-clock"></i> 05/10/2015</li>
                                </ul>
                              </div>
                              <p class="dark-grey-text article " style="font-size: 14px;">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                aliquip ex ea commodo
                                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                                nulla pariatur. Excepteur sint occaecat cupidatat non proident.</p>
                            </div>
                          </div>
                          <a style="float: right;">ver mas</a>
                          <p class="comment-date font-small grey-text">
                            ¡Cuentanos tu experiencia!</p>
                          
                            <h6 class="user-name font-weight-bold">Calificar:</h6> <ul class="rating  form-inline" style="font-size: 14px;">
                                <i class="fas fa-star  " style="color:#F8C501"></i>
                                <i class="fas fa-star " style="color:#F8C501"></i>
                                <i class="fas fa-star " style="color:#F8C501"></i>
                                <i class="fas fa-star " style="color:#F8C501"></i>
                                <i class="fas fa-star " style="color:#F8C501"></i>
                              </ul>
                          </a>
                          <div class="modal-footer">
                            <img src="https://mdbootstrap.com/img/Photos/Avatars/avatar-6.jpg" alt="avatar" class="avatar rounded-circle mr-1 ml-0 z-depth-1 col-1" style="height: 40px;">
                            <div class="white col-8">
                              <div class="form-group basic-textarea">
                                <textarea class="form-control pl-1 my-0" id="exampleFormControlTextarea2" rows="2" placeholder="Agrega un comentario"></textarea>
                              </div>
                            </div>
                            <button type="button" class="btn btn-primary btn-x btn-rounded btn-sm waves-effect waves-light float-right" style="background-color: #546991!important;">Enviar</button>
                          </ul>
                          </div>
                          </section>
                     
    
             </div><!---->
             <div class="tab-pane fade show in container-fluid row" id="panelSucursales" role="tabpanel" style="padding-top:50px;">
               mapa
             </div>
               
              </div>
     
      </div>
  
      <?php
      include('modal_pago.php');
    ?>

 
  <!-- Footer -->
  <?php
      include('seccion_carrito.php');
    ?>

  <?php
      include('footer.php');
    ?>

<script type="text/javascript" src="../js/librerias/jquery.min.js"></script>
<!-- Bootstrap tooltips -->
<script type="text/javascript" src="../js/librerias/popper.min.js"></script>
<!-- Bootstrap core JavaScript -->
<script type="text/javascript" src="../js/librerias/bootstrap.min.js"></script>
<!-- MDB core JavaScript -->
<script type="text/javascript" src="../js/librerias/mdb.min.js"></script>

  <!-- Your custom scripts (optional) -->
  <script src="../js/librerias/axios.min.js"></script>
  <script src="../js/librerias/jquery.star-rating-svg.js"></script>
  <script src="../js/controladores/controlador_ver_promocion.js"></script>
  <script src="../js/librerias/jquery.star-rating-svg.js"></script>
    <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
 
   
   
    
    <script>
     $(document).ready(function() {
      new WOW().init();
   });
    </script>
   

    <script>
   
    </script>
    
</body>
</html>