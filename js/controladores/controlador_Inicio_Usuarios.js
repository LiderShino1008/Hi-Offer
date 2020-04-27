/************************************FUNCIONES PARA ANIMACION***************** */


$('.collapse').collapse()
/****************************************************************************** */


function generar_inicio(){
    document.getElementById('inicio').innerHTML="";
    for(let i=0; i<categorias.length;i++){
        document.getElementById('inicio').innerHTML+=`<div class="row filas wow slideInLeft" id="">
        <h3 class="col-11 category-name" style="margin-top: 10px">${categorias[i].nombreCategoria}</h3>
        <a class="ver-mas col-1" onclick="verCategoria(${i});">ver mas <i class="fas fa-arrow-right"></i></a>
        </div><div id="${i}"  class="row fila-p wow slideInLeft"></div>`;
        console.log(categorias[i].productosEnPromocion.length);
        for(let j=0; j<6;j++){
            document.getElementById(i).innerHTML+=` 
            <div class="col-lg-2 col-md-6 mb-1" onclick="verProducto(${i},${j})">
              <div class="card card-ecommerce">
                <div class="view overlay">
                  <img src="${categorias[i].productosEnPromocion[j].imagenes[0]}" class="img-fluid"alt="">
                  <a><div class="mask rgba-white-slight"></div></a>
                </div>
                <div class="card-body">
                  <h5 class="card-title mb-1">
                    <strong><a href="" class="dark-grey-text">${categorias[i].productosEnPromocion[j].nombreProducto}</a>
                    </strong>
                  </h5>
                  <span class="badge badge-danger mb-2">Promoción</span>
                  <!-- Rating -->
                  <ul class="rating text-left form-inline">
                    <i class="fas fa-star blue-text "></i>
                    <i class="fas fa-star blue-text"></i>
                    <i class="fas fa-star blue-text"></i>
                    <i class="fas fa-star blue-text"></i>
                    <i class="fas fa-star blue-text"></i>
                  </ul>
                  <!-- Card footer -->
                  <div class="card-footer pb-0">
                <div class="row mb-0">
                  <h5 class="mb-0 pb-0 mt-1 font-weight-bold">
                    <span class="red-text">
                      <strong style="font-size:20px">$${categorias[i].productosEnPromocion[j].preciopromocion}</strong>
                    </span>
                    <span class="grey-text">
                      <small>
                        <s style="font-size:15px">$${categorias[i].productosEnPromocion[j].precionormal}</s>
                      </small>
                    </span>
                  </h5>
                  <span class="float-right">
                    <a class="" data-toggle="tooltip" data-placement="top" title="Añadir al carrito">
                      <i class="fas fa-shopping-cart ml-3"></i>
                    </a>
                  </span>
                </div>
              </div>
                <!-- Card content -->
              </div>
            </div>`;
        }
    
    }
    
}
generar_inicio();








/*
 function verProducto(categoria,producto){
  document.getElementById('empresas-favoritas').style.display="none";
  document.getElementById('carousel-example-2').style.display="none";
  document.getElementById('inicio-cat').style.display="none";
  document.getElementById('div-perfil').style.display="none";
  document.getElementById('div-mostrarProductos').style.display="none";
  document.getElementById('promociones-guardadas').style.display="none";
  document.getElementById('ver-un-producto').style.display="block";
  document.getElementById('ver-un-producto').innerHTML="";
    document.getElementById('ver-un-producto').innerHTML+=`<div class="container my-5 py-5 z-depth-1"  style="background-color:#ffffff">
    <!--Section: Content-->
    <section class="text-center ">
      <h3 class="font-weight-bold mb-5">Detalles del producto</h3>
      <div class="row">
        <div class="col-lg-6">
          <div id="carousel-thumb1" class="carousel slide carousel-fade carousel-thumbnails mb-5 pb-4" data-ride="carousel">
            <!--Slides-->
            <div class="carousel-inner text-center text-md-left form-inline" role="listbox">
              <div class="carousel-item active">
                <img src="${categorias[categoria].productosEnPromocion[producto].imagenes[0]}" alt="First slide" class="img-fluid">
              </div>
              <div class="carousel-item">
                <img src="${categorias[categoria].productosEnPromocion[producto].imagenes[1]}"
                  alt="Second slide" class="img-fluid">
              </div>
              <div class="carousel-item">
                <img src="${categorias[categoria].productosEnPromocion[producto].imagenes[2]}"
                  alt="Third slide" class="img-fluid">
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
            <!--/.Thumbnails-->
  
          </div>
          <!--/.Carousel Wrapper-->
          
          <div class="row mb-4">
            <div class="col-md-12">
              <div id="mdb-lightbox-ui"></div>
              <div class="mdb-lightbox no-margin form-inline">
                <figure class="col-md-4">
                  <a href="${categorias[categoria].productosEnPromocion[producto].imagenes[0]}"
                    data-size="1600x1067">
                    <img src="${categorias[categoria].productosEnPromocion[producto].imagenes[0]}"
                      class="img-fluid">
                  </a>
                </figure>
                <figure class="col-md-4">
                  <a href="${categorias[categoria].productosEnPromocion[producto].imagenes[1]}"
                    data-size="1600x1067">
                    <img src="${categorias[categoria].productosEnPromocion[producto].imagenes[1]}"
                      class="img-fluid">
                  </a>
                </figure>
                <figure class="col-md-4">
                  <a href="${categorias[categoria].productosEnPromocion[producto].imagenes[2]}"
                    data-size="1600x1067">
                    <img src="${categorias[categoria].productosEnPromocion[producto].imagenes[2]}"
                      class="img-fluid">
                  </a>
                </figure>
              </div>
            </div>
          </div>
          
        </div>
  
        <div class="col-lg-5 text-center text-md-left">
          <h2 class="h2-responsive text-center text-md-left product-name font-weight-bold dark-grey-text mb-1 ml-xl-0 ml-4">${categorias[categoria].productosEnPromocion[producto].nombreProducto}</h2>
          <span class="badge badge-danger product mb-4 ml-xl-0 ml-4">Promoción</span>
          <h3 class="h3-responsive text-center text-md-left mb-2 ml-xl-0 ml-4">
            <span class="red-text font-weight-bold">
              <strong>$${categorias[categoria].productosEnPromocion[producto].preciopromocion}</strong>
            </span>
            <span class="grey-text">
              <small>
                <s>$${categorias[categoria].productosEnPromocion[producto].preciopromocion}</s>
              </small>
            </span>
          
          </h3>
          <div class="font-weight-normal">
          <p class="ml-xl-0 ml-4">
          <ul class="rating text-left form-inline">
          <i class="fas fa-star" style="color:yellow" ></i>
          <i class="fas fa-star" style="color:yellow" ></i>
          <i class="fas fa-star" style="color:yellow" ></i>
          <i class="fas fa-star" style="color:yellow "></i>
          <i class="fas fa-star" style="color:yellow" ></i>
        </ul></p>
            <p class="ml-xl-0 ml-4">${categorias[categoria].productosEnPromocion[producto].descripcion}</p>
            <p class="ml-xl-0 ml-4">
              <strong>ID: </strong>${categorias[categoria].productosEnPromocion[producto].id}</p>
            <p class="ml-xl-0 ml-4">
              <strong>Stock: </strong>${categorias[categoria].productosEnPromocion[producto].stock}</p>
            <p class="ml-xl-0 ml-4">
              <strong>Distribuidor: </strong>${categorias[categoria].productosEnPromocion[producto].empresa}</p>
              <h3><strong><i class="fas fa-share-alt" style="margin-right:20px"></i></strong><strong><i class="far fa-heart"></i></strong></h3>
          <span></span>
            </span>
              <div class="row mt-3 mb-4">
                <div class="col-md-12 text-center text-md-left text-md-right">
                  <button class="btn btn-primary btn-rounded">
                    <i class="fas fa-cart-plus mr-2" aria-hidden="true"></i>Añadir al carrito</button>
                    <button class="btn btn-success btn-rounded">comprar ahora</button>
                </div>
              </div>
            </div>
  
          </div>
  
        </div>
      </div>
  
    </section>
    <!--Section: Content-->
  
  
  </div>`
  

  
 }*/

 