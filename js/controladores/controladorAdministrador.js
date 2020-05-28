/***************VARIABLES*********** */
let urlPlanes='../../Hi-Offer/backend/api/planes.php';
let urlCategorias='../../Hi-Offer/backend/api/categorias.php';
let urlImagenes='../../Hi-Offer/backend/api/img_inicio.php';
let urlPlataforma='../../Hi-Offer/backend/api/plataforma.php';
let urlEmpresas='../../Hi-Offer/backend/api/empresas.php';
var planes=[];
var categ=[];
var banners=[];
var informacion=[];
var planSeleccionado;
var catSeleccionada;
var form=document.getElementById("form-subir");
var img_guardar;
var imgSelec;



(function ($){
  $.fn.counter = function() {
    const $this = $(this),
    numberFrom = parseInt($this.attr('data-from')),
    numberTo = parseInt($this.attr('data-to')),
    delta = numberTo - numberFrom,
    deltaPositive = delta > 0 ? 1 : 0,
    time = parseInt($this.attr('data-time')),
    changeTime = 10;
    
    let currentNumber = numberFrom,
    value = delta*changeTime/time;
    var interval1;
    const changeNumber = () => {
      currentNumber += value;
      //checks if currentNumber reached numberTo
      (deltaPositive && currentNumber >= numberTo) || (!deltaPositive &&currentNumber<= numberTo) ? currentNumber=numberTo : currentNumber;
      this.text(parseInt(currentNumber));
      currentNumber == numberTo ? clearInterval(interval1) : currentNumber;  
    }

    interval1 = setInterval(changeNumber,changeTime);
  }
}(jQuery));

$(document).ready(() => {

  $('.count-up').counter();
  $('.count1').counter();
  $('.count2').counter();
  $('.count3').counter();
  $('.count4').counter();

  
  new WOW().init();
  
});








document.addEventListener("DOMContentLoaded",()=>{
  let form=document.getElementById("form-subir");
  form.addEventListener("submit",function(event){
    event.preventDefault();
    
    subir_imagen(this);
  });
});
/****************************FUNCIONES DE ANIMACION Y ENTRADA***************************/
$(document).ready(() => {
	// SideNav Button Initialization
  $(".button-collapse").sideNav();
  // SideNav Scrollbar Initialization
  var sideNavScrollbar = document.querySelector('.custom-scrollbar');
  var ps = new PerfectScrollbar(sideNavScrollbar);
});

//
function resetModalP(){
  document.getElementById('btn-guardar').style.display="block";
  document.getElementById('btn-guardar-cambios').style.display="none";
  removeInvalid();
  vaciarCamposModalPlanes();
}


function removeInvalid(){
  document.getElementById("camp-vacio-nombre").style.display="none";
  document.getElementById("nombre-plan").classList.remove('invalid');
  document.getElementById("camp-vacio-precio").style.display="none";
  document.getElementById("precio-plan").classList.remove('invalid');
  document.getElementById("camp-vacio-limite").style.display="none";
  document.getElementById("limite-productos").classList.remove('invalid');
  document.getElementById("camp-vacio-descripcion").style.display="none";
  document.getElementById("descripcion-plan").classList.remove('invalid');
  document.getElementById("camp-vacio-plazo").style.display="none";
  document.getElementById("plazo").classList.remove('invalid');
  document.getElementById("camp-vacio-tiempo").style.display="none";
  document.getElementById("tiempoPrueba").classList.remove('invalid');
  document.getElementById("camp-vacio-diseno").style.display="none";
  document.getElementById("diseno").classList.remove('invalid');
}

function iniciar(){
  document.getElementById('dash').style.display="block";
  document.getElementById('planes').style.display="none";
  document.getElementById('empresas').style.display="none";
  document.getElementById('categorias').style.display="none";
  document.getElementById('Banners').style.display="none";

}

iniciar();
function verPlanes(){
  document.getElementById('dash').style.display="none";
  document.getElementById('planes').style.display="block";
  document.getElementById('empresas').style.display="none";
  document.getElementById('categorias').style.display="none";
  document.getElementById('Banners').style.display="none";
}


function verBanners(){
  document.getElementById('dash').style.display="none";
  document.getElementById('planes').style.display="none";
  document.getElementById('empresas').style.display="none";
  document.getElementById('categorias').style.display="none";
  document.getElementById('Banners').style.display="block";
}

function verEmpresas(){
  document.getElementById('dash').style.display="none";
  document.getElementById('planes').style.display="none";
  document.getElementById('empresas').style.display="block";
  document.getElementById('categorias').style.display="none";
  document.getElementById('Banners').style.display="none";
}

function verCategorias(){
  document.getElementById('dash').style.display="none";
  document.getElementById('planes').style.display="none";
  document.getElementById('Banners').style.display="none";
  document.getElementById('empresas').style.display="none";
  document.getElementById('categorias').style.display="block";
}

function verDash(){
  document.getElementById('dash').style.display="block";
  document.getElementById('planes').style.display="none";
  document.getElementById('Banners').style.display="none";
  document.getElementById('empresas').style.display="none";
  document.getElementById('categorias').style.display="none";

}



function obtenerInformacionGeneral(){
  axios({
      method:'GET',
      url:urlPlataforma,
      responseType:'json',
  }).then(res=>{
      this.informacion=res.data; 
      console.log("info",informacion) 
      generarDashboard();
  }).catch(error=>{console.error(error);
  });
}obtenerInformacionGeneral();





function generarDashboard(){
  document.getElementById("Dashboard").innerHTML="";
  document.getElementById("Dashboard").innerHTML+=`
  <h2 class="mb-4">Dashboard</h2>
  <div class="container-fluid ">
    <div class="row">
      <div class=" card z-depth-1 col-lg-3 col-md-5 col-12 container-fluid" style="height: 150px; margin-top: 50px;">
         <div class="row" >
            <div class="col-6" style="background-color:#7DA8CA;height: 150px; text-align: center; padding: 30px;">
              <i style="color: #eeeeee; font-size: 60px; " class="far fa-building"></i>
            </div>
            <div class="col-6" style="background-color:#eeeeee; text-align: center; padding: 10px;">
                <h1 class="count-up" data-from="0" data-to="${informacion[0].empresas}" data-time="2000">${informacion[0].empresas}</h1>
                <p style="font-size: 12px;">Empresas Registradas</p>
            </div>
         </div>
      </div>
      <div class="col-1"></div>
      <div class=" card z-depth-1 col-lg-3 col-md-5 col-12 container-fluid" style="height: 150px; margin-top: 50px;">
        <div class="row" >
           <div class="col-6" style="background-color:#54C1D6;height: 150px; text-align: center; padding: 30px;">
             <i style="color: #eeeeee; font-size: 60px; " class="fa fa-user-friends"></i>
           </div>
           <div class="col-6" style="background-color:#eeeeee; text-align: center; padding: 10px;">
               <h1 class="count1" data-from="0" data-to="${informacion[0].usuarios}" data-time="2000">${informacion[0].usuarios}</h1>
               <p style="font-size: 12px;">Usuarios Registrados</p>
           </div>
        </div>
     </div>
     <div class="col-1"></div>
     <div class=" card z-depth-1 col-lg-3 col-md-5 col-12  container-fluid" style="height: 150px; margin-top: 50px;">
      <div class="row" >
         <div class="col-6" style="background-color:#8BD0ED;height: 150px; text-align: center; padding: 30px;">
           <i style="color: #eeeeee; font-size: 60px; " class="far fa-window-restore"></i>
         </div>
         <div class="col-6" style="background-color:#eeeeee; text-align: center; padding: 10px;">
             <h1 class="count2" data-from="0" data-to="${informacion[0].visitas}" data-time="2000">${informacion[0].visitas}</h1>
             <p style="font-size: 12px;">Nuevas visitas</p>
         </div>
      </div>
   </div>
   <div class="col-1"></div>      
      <div class=" card z-depth-1 col-lg-3 col-md-5 col-12 container-fluid " style="height: 150px; margin-top: 50px;">
         <div class="row" >
            <div class="col-6" style="background-color:#B8CCCB;height: 150px; text-align: center; padding: 30px;">
              <i style="color: #eeeeee; font-size: 60px; " class="fa fa-money-check"></i>
            </div><i class="fas "></i>
            <div class="col-6" style="background-color:#eeeeee; text-align: center; padding: 10px;">
                <h1 > L. ${informacion[0].ganancias}</h1>
                <p style="font-size: 12px;">Ganancias</p>
            </div>
         </div>
      </div>
      <div class="col-1"></div>
      <div class=" card z-depth-1 col-lg-3 col-md-5 col-12 container-fluid" style="height: 150px; margin-top: 50px;">
        <div class="row" >
           <div class="col-6" style="background-color:#99D5DD;height: 150px; text-align: center; padding: 30px;">
             <i style="color: #eeeeee; font-size: 60px; " class="fa fa-table"></i>
           </div>
           <div class="col-6" style="background-color:#eeeeee; text-align: center; padding: 10px;">
               <h1 class="count4" data-from="0" data-to="${informacion[0].categorias}" data-time="2000">${informacion[0].categorias}</h1>
               <p style="font-size: 12px;">Categorias registradas</p>
           </div>
        </div>
     </div>
     <div class="col-1"></div>
     <div class=" card z-depth-1 col-lg-3 col-md-5 col-12 container-fluid" style="height: 150px; margin-top: 50px;">
      <div class="row" >
         <div class="col-6" style="background-color:#AEC1E9;height: 150px; text-align: center; padding: 30px;">
           <i style="color: #eeeeee; font-size: 60px; " class="fa fa-sticky-note"></i>
         </div>
         <div class="col-6" style="background-color:#eeeeee; text-align: center; padding: 10px;">
             <h1 class="count3" data-from="0" data-to="${informacion[0].planes}" data-time="2000">${informacion[0].planes}</h1>
             <p style="font-size: 12px;">Planes Registrados</p>
         </div>
      </div>
   </div>
   <div class="col-1"></div>
    </div>
  </div>`
}




/*funcion para validar los datos de un plan*/

function validarPlan(){
  let nombrePlan=validarCampoVacio("nombre-plan");
  let precio=validarCampoVacio("precio-plan");
  let limiteProductos= validarCampoVacio("limite-productos");
  let descripcionPlan=validarCampoVacio("descripcion-plan");
  let plazo=validarCampoVacioSelect("plazo","seleccione");
  let tiempoPrueba=validarCampoVacioSelect("tiempoPrueba","seleccione");
  let diseno=validarCampoVacioSelect("diseno","seleccione");


  if(nombrePlan){
    document.getElementById("camp-vacio-nombre").style.display="block";
    document.getElementById("nombre-plan").classList.add('invalid');
  }else{
    document.getElementById("camp-vacio-nombre").style.display="none";
    document.getElementById("nombre-plan").classList.remove('invalid');
  }

  if(precio){
    document.getElementById("camp-vacio-precio").style.display="block";
    document.getElementById("precio-plan").classList.add('invalid');
  }else{
    document.getElementById("camp-vacio-precio").style.display="none";
    document.getElementById("precio-plan").classList.remove('invalid');
  }

  if(limiteProductos){
    document.getElementById("camp-vacio-limite").style.display="block";
    document.getElementById("limite-productos").classList.add('invalid');
  }else{
    document.getElementById("camp-vacio-limite").style.display="none";
    document.getElementById("limite-productos").classList.remove('invalid');
  }

  if(descripcionPlan){
    document.getElementById("camp-vacio-descripcion").style.display="block";
    document.getElementById("descripcion-plan").classList.add('invalid');
  }else{
    document.getElementById("camp-vacio-descripcion").style.display="none";
    document.getElementById("descripcion-plan").classList.remove('invalid');
  }

  if(plazo){
    document.getElementById("camp-vacio-plazo").style.display="block";
    document.getElementById("plazo").classList.add('invalid');
  }else{
    document.getElementById("camp-vacio-plazo").style.display="none";
    document.getElementById("plazo").classList.remove('invalid');
  }

  if(tiempoPrueba){
    document.getElementById("camp-vacio-tiempo").style.display="block";
    document.getElementById("tiempoPrueba").classList.add('invalid');
  }else{
    document.getElementById("camp-vacio-tiempo").style.display="none";
    document.getElementById("tiempoPrueba").classList.remove('invalid');
  }

  if(diseno){
    document.getElementById("camp-vacio-diseno").style.display="block";
    document.getElementById("diseno").classList.add('invalid');
  }else{
    document.getElementById("camp-vacio-diseno").style.display="none";
    document.getElementById("diseno").classList.remove('invalid');
  }

  if((nombrePlan==false)&&(precio==false)&&(limiteProductos==false)&&(descripcionPlan==false)&&(plazo==false)&&(tiempoPrueba==false)&&(diseno==false)){

      return true;
  }
      return false;
}




function agregarPlan(){
  let permiso=validarPlan();
  if(permiso){
    /*Enviar datos al servidor*/
  let plan={
    nombre: document.getElementById("nombre-plan").value,
    precio: document.getElementById("precio-plan").value,
    limitePromociones: document.getElementById("limite-productos").value,
    descripcion: document.getElementById("descripcion-plan").value,
    plazo: document.getElementById("plazo").value,
    tiempoPruebaGratuita: document.getElementById("tiempoPrueba").value,
    diseno: document.getElementById("diseno").value

  }
  axios({
    method:'POST',
    url:urlPlanes,
    responseType:'json',
    data:plan
  }).then(res=>{
    console.log("exito")
    vaciarCamposModalPlanes();
    $('#modal-plan').modal('hide');
     obtenerPlanes();
     obtenerInformacionGeneral();
     actualizarPlataforma();
    obtenerInformacionGeneral();
  }).catch(error=>{console.error(error);
  });   
  }
  
 
}


  function vaciarCamposModalPlanes(){
    document.getElementById("nombre-plan").value="";
    document.getElementById("precio-plan").value="";
    document.getElementById("limite-productos").value="";
    document.getElementById("descripcion-plan").value="";
    document.getElementById("plazo").value="seleccione";
    document.getElementById("tiempoPrueba").value="seleccione";
    document.getElementById("diseno").value="seleccione";
  }


  function obtenerPlanes(){
    axios({
      method:'GET',
      url:urlPlanes,
      responseType:'json',
      
  }).then(res=>{
      this.planes=res.data;
      generarPlanes();
  }).catch(error=>{console.error(error);
  });  
  } obtenerPlanes();


  function generarPlanes(){
    document.getElementById('contenido-planes').innerHTML="";
    for (let i=0; i<planes.length; i++){
      if(planes[i].diseno=="Básico"){
        document.getElementById('contenido-planes').innerHTML+=`  <div class="col-lg-4 col-md-6 col-12 mx-auto mb-4 p-2">
        <div class="card text-center">
          <div class="card-header white">
            <i class="fas fa-ellipsis-v mr-auto " data-toggle="dropdown" onclick=""
            aria-haspopup="true" aria-expanded="false" style="float: right; cursor: pointer;"  ></i>
            <div class="dropdown-menu  dropdown-primary dropdown-menu-right" style="font-size:13px ;" id="hola">
              <a class="dropdown-item" data-toggle="modal"  data-target="#modal-plan" onclick=" obtenerUnPlan(${i}) " >Editar</a>
              <a class="dropdown-item" onclick=" eliminarUnPlan(${i})"  >Eliminar</a>
            </div>
          </div>
          <div class="card-header white" style="padding: 2px ;">
            <h4 class="h4 my-2" style="color: #546991;">${planes[i].nombre}</h4>
          </div>
          <div>
            <h1 class="card-title  pricing-card-title" style="margin-top: 30px;">L ${planes[i].precio} <small class="text-muted">/ ${planes[i].plazo}</small></h1>
          </div>
          <div class="card-body">
            <p class="card-text "><h5 style="font-size: 14px; font-weight: bold; color: #546991;">Podras registrar ${planes[i].limitePromociones} promociones</h5>
            ${planes[i].descripcion}
            </p>
            <p> ${planes[i].tiempoPruebaGratuita} días de prueba gratuita</p>

          </div>
          <div class="card-footer white">
              <a class="btn btn-outline-indigo btn-md" href="#" role="button">Comenzar</a>
          </div>
        </div>
      </div>`
      }else{
        document.getElementById('contenido-planes').innerHTML+=`
        
        <div class="col-lg-4 col-md-6 col-12 mx-auto mb-4 p-2" >
        <div class="card text-center" style="background-color: #546991;">
          <div class="card-header white">
            <i class="fas fa-ellipsis-v mr-auto " data-toggle="dropdown" onclick=""
            aria-haspopup="true" aria-expanded="false" style="float: right; cursor: pointer; font-weight: bold;"  ></i>
            <div class="dropdown-menu  dropdown-primary dropdown-menu-right" style="font-size:13px; " id="hola">
              <a class="dropdown-item" data-toggle="modal"  data-target="#modal-plan" onclick=" obtenerUnPlan(${i})"  href="#">Editar</a>
              <a class="dropdown-item" onclick=" eliminarUnPlan(${i}) " >Eliminar</a>
            </div>
          </div>
          <div class="card-header " style="padding: 2px ;">
            <h4 class="h4 white-text my-2">${planes[i].nombre}</h4>
          </div>
          <div class="white">
            <h1 class="card-title  pricing-card-title" style="margin-top: 30px;">L ${planes[i].precio} <small class="">/ ${planes[i].plazo}</small></h1>
          </div>
          <div class="card-body white">
            <p class="card-text "><h5 style="font-size: 14px; font-weight: bold; color: #546991;">Podras registrar ${planes[i].limitePromociones} promociones</h5>
            ${planes[i].descripcion}
            </p>
            <p>${planes[i].tiempoPruebaGratuita} días de prueba gratuita</p>

          </div>
          <div class="card-footer white">
              <a class="btn btn-md" style="background-color: #51668C!important; color: white;" href="#" role="button">Comenzar</a>
          </div>
        </div>
      </div>`
      }
    }
  }


  function obtenerUnPlan(index){
    planSeleccionado=index;
    //llenar los campos
    axios({
      method:'GET',
      url:urlPlanes+`?id=${index}`,
      responseType:'json',
  }).then(res=>{
    document.getElementById("nombre-plan").value=res.data.nombre,
    document.getElementById("precio-plan").value=res.data.precio,
    document.getElementById("limite-productos").value=res.data.limitePromociones,
    document.getElementById("descripcion-plan").value=res.data.descripcion,
    document.getElementById("plazo").value=res.data.plazo,
    document.getElementById("tiempoPrueba").value=res.data.tiempoPruebaGratuita,
    document.getElementById("diseno").value=res.data.diseno
    document.getElementById('btn-guardar').style.display="none";
    document.getElementById('btn-guardar-cambios').style.display="block";
  }).catch(error=>{console.error(error);
  }); 
    
  }


  function actualizar(){
    let permiso2=validarPlan();
   if(permiso2){
    let plan={
      nombre: document.getElementById("nombre-plan").value,
      precio: document.getElementById("precio-plan").value,
      limitePromociones: document.getElementById("limite-productos").value,
      descripcion: document.getElementById("descripcion-plan").value,
      plazo: document.getElementById("plazo").value,
      tiempoPruebaGratuita: document.getElementById("tiempoPrueba").value,
      diseno: document.getElementById("diseno").value
  
    }
    axios({
      method:'PUT',
      url:urlPlanes+`?id=${planSeleccionado}`,
      responseType:'json',
      data:plan
    }).then(res=>{
      vaciarCamposModalPlanes();
      $('#modal-plan').modal('hide');
       obtenerPlanes();
       actualizarPlataforma();
      obtenerInformacionGeneral(); 
    }).catch(error=>{console.error(error);
    });   
   }
   
      
   }
    
   
  


  function  eliminarUnPlan(index){
    planSeleccionado=index;
    axios({
      method:'DELETE',
      url:urlPlanes+`?id=${index}`,
      responseType:'json',
      
  }).then(res=>{
    obtenerPlanes();
    obtenerInformacionGeneral();
     actualizarPlataforma();
    obtenerInformacionGeneral();
  }).catch(error=>{console.error(error);
  });
  }


  
function validarCategoria(){
  let nombre_cat=validarCampoVacio('nombre-categoria');
  console.log(nombre_cat);
  if(nombre_cat){
      document.getElementById('camp-vacio-categoria').style.display="block";
      document.getElementById('nombre-categoria').classList.add("invalid");
      return false;
  }else{
    document.getElementById('camp-vacio-categoria').style.display="none";
      document.getElementById('nombre-categoria').classList.remove("invalid");
      return true;
  }
}


function agregarCategoria(){
  let acceso=validarCategoria();
  if(acceso){
   let categoria={
    nombre_categoria: document.getElementById('nombre-categoria').value,
    promociones: [] 
   
   }

   axios({
    method:'POST',
    url:urlCategorias,
    responseType:'json',
    data:categoria
  }).then(res=>{
    console.log("exito")
    //vaciarCamposModalPlanes();
    resetModalCategorias()
    $('#modal-categorias').modal('hide');
    obtenerCategorias();
    actualizarPlataforma();
    obtenerInformacionGeneral();
  }).catch(error=>{console.error(error);
  });   
  }
}


function resetModalCategorias(){
  document.getElementById('nombre-categoria').value="";
  document.getElementById('btn-guardar2').style.display="block";
}




function obtenerCategorias(){
  axios({
    method:'GET',
    url:urlCategorias,
    responseType:'json',
}).then(res=>{
    this.categ=res.data;  
    generarCategorias();
}).catch(error=>{console.error(error);
});  
} obtenerCategorias();

function generarCategorias(){
  console.log("estas son las categorias",categ.length);
  document.getElementById('list').innerHTML="";
  for(let j=0; j<categ.length;j++){
    
    document.getElementById('list').innerHTML+=`
    <span class="list-group-item list-group-item-action">${categ[j].nombre_categoria}<span><i class="fas fa-ellipsis-v mr-auto " data-toggle="dropdown" onclick=""
              aria-haspopup="true" aria-expanded="false" style="float: right; cursor: pointer;"  ></i>
              <div class="dropdown-menu  dropdown-primary dropdown-menu-right" style="font-size:13px ;" id="hola">
                <a class="dropdown-item" data-toggle="modal" data-target="#modal-categorias" onclick="obtenerUnaCategoria(${j})" >Editar</a>
                <a class="dropdown-item" onclick="EliminarCategoria(${j})" >Eliminar</a>
              </div></span></span>`
  }
}

function obtenerUnaCategoria(index){
  catSeleccionada=index;
  //llenar los campos
  axios({
    method:'GET',
    url:urlCategorias+`?id=${index}`,
    responseType:'json',
}).then(res=>{
  document.getElementById("nombre-categoria").value=res.data.nombre_categoria;
  cambiarbtn();
}).catch(error=>{console.error(error);
}); 
  
}


function cambiarbtn(){
  document.getElementById('btn-guardar2').style.display="none";
  document.getElementById('btn-guardar-cambios2').style.display="block"
}

function editarCategoria(){
  let accesp2=validarCategoria();

  if(validarCategoria){
    let categoria={
      nombre_categoria: document.getElementById('nombre-categoria').value,
      promociones: [] 
     
     }
  
     axios({
      method:'PUT',
      url:urlCategorias+`?id=${catSeleccionada}`,
      responseType:'json',
      data:categoria
    }).then(res=>{
      resetModalCategorias()
      $('#modal-categorias').modal('hide');
      obtenerCategorias();
      document.getElementById('btn-guardar2').style.display="block";
      document.getElementById('btn-guardar-cambios2').style.display="none";
      actualizarPlataforma();
    obtenerInformacionGeneral();
    }).catch(error=>{console.error(error);
    }); 
  }
}

function EliminarCategoria(index){
  catSeleccionada=index;
  axios({
    method:'DELETE',
    url:urlCategorias+`?id=${index}`,
    responseType:'json',
    
}).then(res=>{
  obtenerCategorias();
  obtenerInformacionGeneral();
  actualizarPlataforma();
 obtenerInformacionGeneral();
}).catch(error=>{console.error(error);
});
}



function abrirModal(){
  $("#modal-banners").modal();
}


/**********BANNERS*********** */
function validarImg(){
  var archivoInput=document.getElementById('archivoInput');
  var archivoRuta=archivoInput.value;
  console.log(archivoInput.files[0].name);
  var exPermitidas=/(.PNG|.JPG)$/i;
  

  if(!exPermitidas.exec(archivoRuta)){
    document.getElementById('img-invalid').style.display="block";
    archivoInput.value="";
    return false; 
  }else{
      if(archivoInput.files && archivoInput.files[0]){
        var visor=new FileReader();
        visor.onload=function(e){
          document.getElementById('visor-img').innerHTML=
          '<img src="'+e.target.result+'" class="img-fluid " alt="zoom">'
          return true;
        }
        visor.readAsDataURL(archivoInput.files[0]);
        document.getElementById('img-invalid').style.display="none";
        document.getElementById("footer").style.display="block";
        img_guardar= archivoInput.files[0].name;
      }
  }
}



function resetModalBanner(){
  console.log("entre");
   var archivoInput=document.getElementById('archivoInput');
   var clone=archivoInput.cloneNode();
   clone.value="";
   archivoInput.parentNode.replaceChild(clone, archivoInput);
   document.getElementById('img-invalid').style.display="none";
   console.log("sali");
   document.getElementById('visor-img').innerHTML=
  '<img src="img/img.jpg" class="img-fluid " alt="zoom">'
  document.getElementById("footer").style.display="none";
  document.getElementById('barra').style.width="0%";
  document.getElementById("btn-guardar-cambios3").style.display="none";
  document.getElementById("btn-guardar3").style.display="block";
  
}

//document.getElementsByClassName('progress-bar').cssText = 'width:50% !important';



function subir_imagen(accion){
  
document.getElementById('barra').style.width="0%";
document.getElementById('barra').style.backgroundColor="white";

//peticion
let peticion=new XMLHttpRequest();

//progreso
peticion.upload.addEventListener("progress",(event)=>{
  /*para obtener el porcentaje de suida*/
  /*total de bytes cargados entre el total*/
  var porcentaje =Math.round((event.loaded/event.total)*100);
  console.log(porcentaje);
  document.getElementById('barra').style.width=porcentaje+"%";
  document.getElementById('barra').style.backgroundColor="#546991";
  document.getElementById('progreso').innerHTML=porcentaje+"%";

});

  peticion.addEventListener("load",()=>{
    /* cuando termine*/
    document.getElementById('progreso').innerHTML="Proceso completado";
    document.getElementById('archivoInput').value="";
    if(accion==0){
      guardarImagen();
    }else{
      editarBanner();
    }
    
  })


  //enviar datos
  peticion.open('post','../../Hi-Offer/backend/GestionArchivos/subir_imagen.php');
  peticion.send(new FormData(form));

  // cancelar
  document.getElementById('btn-cancelar').addEventListener("click",()=>{
    peticion.abort();
  })



}

/*
function subir_imagen(){
  
  var FormData=new FormData();
  var imagefile=document.getElementById('archivoInput');
  FormData.append("image",imagefile.files[0]);
  axios.post("form-subir",FormData,{
    headers:{
      'Content-Type':'multipart/form-Data'
    }
  });
  
  
  }*/


function guardarImagen(){
  console.log(img_guardar);
  let rut='backend/archivos-subidos/'+img_guardar;
  console.log(rut);
  let imagen={
    ruta: img_guardar
   }

   axios({
    method:'POST',
    url:urlImagenes,
    responseType:'json',
    data:imagen
  }).then(res=>{
    console.log("exito");
    obtenerBanners();
  
    //obtenerCategorias();
  }).catch(error=>{console.error(error);
  });   
}



function obtenerBanners(){
  axios({
    method:'GET',
    url:urlImagenes,
    responseType:'json',
}).then(res=>{
    this.banners=res.data;  
   // console.log(banners);
    generarBanners();
}).catch(error=>{console.error(error);
});  
} obtenerBanners();

function  generarBanners(){
  document.getElementById("cont-banners").innerHTML="";
  for(let i=0; i<banners.length;i++){
    document.getElementById('cont-banners').innerHTML+=`  <div class="card" style="margin-bottom: 50px;">
    <div class="card-header white">
      <i class="fas fa-ellipsis-v mr-auto " data-toggle="dropdown" onclick=""
      aria-haspopup="true" aria-expanded="false" style="float: right; cursor: pointer; font-weight: bold;"  ></i>
      <div class="dropdown-menu  dropdown-primary dropdown-menu-right" style="font-size:13px; " id="hola">
        <a class="dropdown-item" data-toggle="modal" data-target=".bd-example-modal-xl" onclick="obtenerUnBanner(${i})" >Editar</a>
        <a class="dropdown-item" onclick="eliminarUnBanner(${i})" >Eliminar</a>
      </div>
    </div>
    <div class="card-body white">
      <div class="view overlay zoom">
        <img src="${banners[i].ruta}" class="img-fluid " alt="zoom">
    
     </div>
    </div>
  </div>`
  }
}


function obtenerUnBanner(index){
  imgSelec=index;
  axios({
    method:'GET',
    url:urlImagenes+`?id=${index}`,
    responseType:'json',
}).then(res=>{
  document.getElementById('visor-img').innerHTML=
  `<img src="${res.data.ruta}" class="img-fluid " alt="zoom">`
  // cambiarbtn();
  document.getElementById("btn-guardar-cambios3").style.display="block";
  document.getElementById("btn-guardar3").style.display="none";
}).catch(error=>{console.error(error);
}); 
}



function editarBanner(){
  
  let imagen={
    ruta: img_guardar
   }
     axios({
      method:'PUT',
      url:urlImagenes+`?id=${imgSelec}`,
      responseType:'json',
      data:imagen
    }).then(res=>{
      obtenerBanners();
      document.getElementById("btn-guardar-cambios3").style.display="none";
      document.getElementById("btn-guardar3").style.display="block";
    }).catch(error=>{console.error(error);
    }); 
  
}


function  eliminarUnBanner(index){
  axios({
    method:'DELETE',
    url:urlImagenes+`?id=${index}`,
    responseType:'json',
    
}).then(res=>{
  obtenerBanners();
  document.getElementById("btn-guardar-cambios3").style.display="none";
  document.getElementById("btn-guardar3").style.display="block";
}).catch(error=>{console.error(error);
});
}


/*****************************************SECCION DE EMPRESAS********************************************************************* */
var empresas=[];
function obtenerEmpresas(){
  axios({
      method:'GET',
      url:urlEmpresas,
      responseType:'json',
  }).then(res=>{
     empresas=res.data; 
      console.log("empresas",res.data) 
      generarEmpresas();
  }).catch(error=>{console.error(error);
  });
}obtenerEmpresas();



function generarEmpresas(){
  document.getElementById('empresas1').innerHTML="";
  for(let i=0; i<empresas.length;i++){
    document.getElementById('empresas1').innerHTML+=`<div class="col-md-12  col-lg-3">
    <img class="mx-auto hoverable avatar rounded-circle  mb-4 foto-perfil2 z-depth-1" onclick="modalDatosEmpresa(${i})" data-toggle="modal" data-target="#basicExampleModal"  style="height: 200px; width: 200px; cursor: pointer;"  src="${empresas[i].logotipo}" id="logo-empresa" >
  </div>`
  }
  
}

function modalDatosEmpresa(id){
  document.getElementById('empresas1').innerHTML="";
  document.getElementById('content-empresa').innerHTML+=`
 

<div class="row view overlay zoom portada " style="height: 300px; width: 100%; margin-left:0px!important;margin-right:0px!important;margin-top:10px!important">
  <div class="col-12">
  <button type="button" class="close" data-dismiss="modal" aria-label="Close" style="color:white;margin-right:10px">
  <span aria-hidden="true" style="color:white">&times;</span></button>
    <div class="view rounded-right portada ">
      <img class="img-fluid" src="${empresas[id].Banner}" alt="Sample image" style="width: 100%;">
    </div>
    
  </div>
</div>
<div class="row">
  <div class="col-md-6 py-5 pl-5">
    <h5 class="font-weight-normal mb-3">${empresas[id].nombre_empresa}</h5>
    <p style="font-weight:bold">"${empresas[id].eslogan}"</p>
    <p class="text-muted">${empresas[id].descripcion}.</p>
    
  </div>
  <div class="col-6">
    <ul class="list-unstyled font-small mt-5">
      <li>
        <p class="text-uppercase mb-2"><strong>Dirección</strong></p>
        <p class="text-muted mb-4">${empresas[id].direccion}</p>
      </li>

      <li>
        <p class="text-uppercase mb-2"><strong>Correo electrónico</strong></p>
        <p class="text-muted mb-4">${empresas[id].correoElectronico}</p>
      </li>

      <li>
        <p class="text-uppercase mb-2"><strong>Teléfono</strong></p>
        <p class="text-muted mb-4">${empresas[id].numeroTelefono}</p>
      </li>
    </ul>
  </div>

</div>`;
}