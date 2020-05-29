/********************************VARIABLES GLOBALES************************************* */

var cat;
var imagenes;


/************************************FUNCIONES PARA ANIMACION***************** */


$('.collapse').collapse()
/****************************************************************************** */


//peticiones al servidor php

axios({
  method:'GET',
  url:'../../Hi-Offer/backend/api/img_inicio.php',
  responseType:'json',
}).then(res=>{
  imagenes=res.data;
  console.log(imagenes)
  generarCarrucel()
}).catch(error=>{console.error(error);
}); 

////obtener promociones
axios({
  method:'GET',
  url:urlCategorias,
  responseType:'json',
}).then(res=>{
  cat=res.data;
  console.log("categorias" ,cat)
  generar_inicio();
}).catch(error=>{console.error(error);
}); 





//funciones para generar elementos 

function generarCarrucel(){
  document.getElementById('indicadores').innerHTML="";
  if(imagenes.length>0){
    for(let i=0; i<imagenes.length;i++){
      if(i==0){
        document.getElementById('indicadores').innerHTML+=`<li data-target="#carousel-example-2" data-slide-to="${i}" class="active"></li>`
        document.getElementById('carrucel-inicio').innerHTML+=`<div class="carousel-item active">
        <div class="view">
          <img class="d-block w-100" src="${imagenes[i].ruta}"
            alt="First slide">
          <div class="mask rgba-black-light"></div>
        </div>
        <div class="carousel-caption">
          <h3 class="h3-responsive">Te damos la Bienvenida</h3>
          <p>Encuentra los precios nunca antes vistos!</p>
        </div>
      </div>`
      }else{
        document.getElementById('indicadores').innerHTML+=` <li data-target="#carousel-example-2" data-slide-to="${i}"></li>`
        document.getElementById('carrucel-inicio').innerHTML+=`<div class="carousel-item ">
        <div class="view">
          <img class="d-block w-100" src="${imagenes[i].ruta}"
            alt="Third slide">
          <div class="mask rgba-black-light"></div>
        </div>
        <div class="carousel-caption">
          <h3 class="h3-responsive">Te damos la Bienvenida</h3>
          <p>Encuentra los precios nunca antes vistos!</p>
        </div>
      </div>`
      }

     
      
    }

    //

  }
  
}



function generar_inicio(){
  console.log("genando")
  let cantidad=0
    document.getElementById('inicio').innerHTML="";
    for(let i=0; i<cat.length;i++){
        document.getElementById('inicio').innerHTML+=`<div class="row filas wow slideInLeft" id="" style="margin-botton:50px!important">
        <h3 class="col-11 category-name" style="margin-top: 10px">${cat[i].nombre_categoria}</h3>
        <a class="ver-mas col-1" onclick="verCategoria(${i});">ver mas <i class="fas fa-arrow-right"></i></a>
        </div><div id="${i}"  class="row fila-p wow slideInLeft" style="margin-bottom:50px!important" ></div>`;
        if(cat[i].promociones.length>0){
          if(cat[i].promociones.length>6){
            cantidad=6
          }else{
            cantidad=cat[i].promociones.length
          }
        for(let j=0; j<cantidad;j++){
            document.getElementById(i).innerHTML+=` 
            <div class="col-lg-2 col-md-6 mb-1" onclick="verProducto(${i},${j})" style="height:100px!imortant">
              <div class="card card-ecommerce" style="">
                <div class="view overlay">
                  <img src="${cat[i].promociones[j].imagen}" class="img-fluid"alt="">
                  <a><div class="mask rgba-white-slight"></div></a>
                </div>
                <div class="card-body">
                  <h5 class="card-title mb-1">
                    <strong><a href="" class="dark-grey-text">${cat[i].promociones[j].nombre}</a>
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
                      <strong style="font-size:20px">L.${cat[i].promociones[j].precio_descuento}</strong>
                    </span>
                    <span class="grey-text">
                      <small>
                        <s style="font-size:15px">L.${cat[i].promociones[j].precio_real}</s>
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
    
}

