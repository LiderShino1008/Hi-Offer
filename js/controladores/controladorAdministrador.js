/***************VARIABLES*********** */
let urlPlanes='../../Hi-Offer/backend/api/planes.php';
let urlCategorias='../../Hi-Offer/backend/api/categorias.php';
var planes=[];
var categorias=[];
var planSeleccionado;
var catSeleccionada;
var form=document.getElementById("form-subir");

document.addEventListener("DOMContentLoaded",()=>{
  let form=document.getElementById("form-subir");
  form.addEventListener("submit",function(event){
    event.preventDefault();
    console.log("hello");
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
function cambiarboton(){
  document.getElementById('btn-guardar').style.display="block";
  document.getElementById('btn-guardar-cambios').style.display="none";
  vaciarCamposModalPlanes();
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
  }).catch(error=>{console.error(error);
  });   
  }
  
 
}


  function vaciarCamposModalPlanes(){
    document.getElementById("nombre-plan").value="",
    document.getElementById("precio-plan").value="",
    document.getElementById("limite-productos").value="",
    document.getElementById("descripcion-plan").value="",
    document.getElementById("plazo").value="",
    document.getElementById("tiempoPrueba").value="",
    document.getElementById("diseno").value=""
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
     //obtenerPlanes();
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
    this.categorias=res.data;  
    generarCategorias();
}).catch(error=>{console.error(error);
});  
} obtenerCategorias();


function generarCategorias(){
  document.getElementById('list-cat').innerHTML="";
  for(let i=0; i<categorias.length;i++){
    document.getElementById('list-cat').innerHTML+=`
    <span  class="list-group-item list-group-item-action">${categorias[i].nombre_categoria}<span><i class="fas fa-ellipsis-v mr-auto " data-toggle="dropdown" onclick=""
              aria-haspopup="true" aria-expanded="false" style="float: right; cursor: pointer;"  ></i>
              <div class="dropdown-menu  dropdown-primary dropdown-menu-right" style="font-size:13px ;" id="hola">
                <a class="dropdown-item" data-toggle="modal" data-target="#modal-categorias" onclick="obtenerUnaCategoria(${i})" >Editar</a>
                <a class="dropdown-item" onclick="EliminarCategoria(${i})" >Eliminar</a>
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
  document.getElementById('btn-guardar-cambios2').style.display="none"
    }).catch(error=>{console.error(error);
    }); 
  }
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
          document.getElementById('visor-img').innerHTML+=
          '<img src="'+e.target.result+'" class="img-fluid " alt="zoom">'
          return true;
        }
        visor.readAsDataURL(archivoInput.files[0]);
        document.getElementById('img-invalid').style.display="none";
      }
  }
}




//document.getElementsByClassName('progress-bar').cssText = 'width:50% !important';



function subir_imagen(){
  
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
  })


  //enviar datos
  peticion.open('post','../../Hi-Offer/backend/GestionArchivos/subir_imagen.php');
  peticion.send(new FormData(form));
  // cancelar
  document.getElementById('btn-cancelar').addEventListener("click",()=>{
    peticion.abort();
  })


}