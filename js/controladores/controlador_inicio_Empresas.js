
var  urlEmpresa='../../Hi-Offer/backend/api/empresas.php';
var urlPlanes='../../Hi-Offer/backend/api/planes.php';
var urlPlataforma='../../Hi-Offer/backend/api/plataforma.php';
var urlComentarios='../../Hi-Offer/backend/api/comentarios.php';
var urlCategorias='../../Hi-Offer/backend/api/categorias.php';
var urlProductos='../../Hi-Offer/backend/api/productos.php';
var urlSucursales='../../Hi-Offer/backend/api/sucursales.php';
var urlPromociones='../../Hi-Offer/backend/api/promociones.php';
var urlAdministrador='../../Hi-Offer/backend/api/administradores.php';
var plan;
var indexEmpresa;
var empresa;
var categorias=[];
var catSelecc;
var arraySucursales=[];

$( '.micheckbox' ).on( 'click', function() {
  if( $(this).is(':checked') ){
      // Hacer algo si el checkbox ha sido seleccionado
      alert("El checkbox con valor " + $(this).val() + " ha sido seleccionado");
  } else {
      // Hacer algo si el checkbox ha sido deseleccionado
      alert("El checkbox con valor " + $(this).val() + " ha sido deseleccionado");
  }
});
/*
console.log("mes",moment().format("YYYY-MM-DD"));
fecha=moment().add(1, 'months').format("YYYY-MM-DD")
console.log(fecha)
*/

/*
document.addEventListener("DOMContentLoaded",()=>{
  var form_banner=document.getElementById("form-subir");
  form_banner.addEventListener("submit",function(event){
    event.preventDefault();
    subir_banner(this);
  });
});
*/


/*
$('.starrr').starrr({
  rating: 5,
  change: function(e, value){
    if (value) {
      
    } else {
      
    }
  }
});
*/


$('.starrr').starrr({
  rating: 5
})
$('.starrr').on('starrr:change', function(e, value){
  alert('new rating is ' + value)
})




var d = new Date();
var month = new Array();
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";
var n = month[d.getMonth()];
console.log("mes", n);

//siempre actualizar el mes de la plataforma para el buen funcionamiento de las graficas

function actualizarPlataforma(){
  axios({
      method:'PUT',
      url:urlPlataforma+`?id=${3}`,
      responseType:'json',
      data: {
        "mes_actual":n
      },
    }).then(res=>{
    }).catch(error=>{console.error(error);
    });   
   
}actualizarPlataforma();

//actualizar comentarios

axios({
  method:'GET',
  url:urlComentarios,
  responseType:'json',
}).then(res=>{
}).catch(error=>{console.error(error);
}); 


/***********************************FUNCIONES INICIALES************************************************ */


function iniciar() {
  document.getElementById('item-dashboard').classList.add('seleccionar');
  
  document.getElementById('item-perfil').classList.remove('seleccionar');
  document.getElementById('perfil-empresarial').classList.add('d-none');
  document.getElementById('contenido').classList.add('d-none');
  document.getElementById('productos').classList.add('d-none');
  document.getElementById('productos').classList.remove('d-block');
  document.getElementById('productos').classList.add('d-none');
  document.getElementById('item-promociones').classList.remove('seleccionar');
  document.getElementById('promociones').classList.remove('d-block');
  document.getElementById('promociones').classList.add('d-none');
  document.getElementById('item-sucursales').classList.remove('seleccionar');
 
}iniciar();


var info=[];
var RegistroDate;
/*********************FUNCION PARA OBTENER UNA EMPRESA*****************************/
var cuentaEmpresa=[];
function obtenerInformacionGeneral(){
  axios({
      method:'GET',
      url:urlPlataforma,
      responseType:'json',
  }).then(res=>{
     info=res.data;
     indexEmpresa=info[0].empresaActual;
     console.log("indice",indexEmpresa);
     actualizarEmpresa(indexEmpresa);
     axios({
      method:'GET',
      url:urlEmpresa+`?id=${indexEmpresa}`,
      responseType:'json',
  }).then(res=>{
    try {
      console.log(res.data);
      cuentaEmpresa=res.data;

      document.getElementById("Loading").style.display="none";
      document.getElementById('dashboard').classList.remove('d-none');
     // console.log(cuentaEmpresa);
      obtenerPlan();
      verificarEntrada();
      verificarPrueba();
      generarDashboard();
      llenarSidebar();
      generarPerfil();
      generarCategorias();
      generarSeccionProductos();
      generarSucursales();
      llenarSelectProductos();
      generarPromociones();
      llenarModalListSucursales();
      obtenerPlanes1();
      generarNombreAdmin();
      generarInfoAdmin();
      llenarInfoEmpModal();
      llenarModalperfilSucursales();
      if(cuentaEmpresa.promociones.length>0){
        generarPromoPerfil();
      }
    }
    catch(error) {
      document.getElementById("div-error").classList.remove('d-none');
      document.getElementById("div-error").classList.add('d-block');
      document.getElementById('dashboard').classList.remove('d-block');
      document.getElementById('dashboard').classList.add('d-none');

    }




     
  }).catch(error=>{console.error(error);
  }); 
  }).catch(error=>{console.error(error);
  });
}obtenerInformacionGeneral();

function actualizarEmpresa(id){
  axios({
      method:'PUT',
      url:urlEmpresa+`?id=${id}`,
      responseType:'json',
      data: {
         "accion": 4
      },
    }).then(res=>{
    }).catch(error=>{console.error(error);
    });   
   
}//
/*******************************FUNCION PARA VERIFICAR SI ESTA ENTRANDO A SU CUENTA POR PRIMERA VEZ******************* */
function verificarEntrada(){
    if(cuentaEmpresa.estado.entrada==0){
      $('#modalInicio').modal('show');
      axios({
        method:'POST',
        url:urlSucursales,
        responseType:'json',
        data:{
          "nombre":"Principal",
          "latitud": cuentaEmpresa.latitud,
          "longitud":cuentaEmpresa.longitud,
          "ciudad": cuentaEmpresa.pais,
          "idEmpresa":indexEmpresa
        }
      }).then(res=>{
       
      }).catch(error=>{console.error(error);
      });  

     }
  
} 

function mostrarinfoPlan(){
    $('#modalInicio').modal('hide');
    $('#modalInicioPlan').modal('show');
    actualizarEntrada();
}

function actualizarEntrada(){
     let peticion={
      "entrada":1,
      "accion":2
    }
      axios({
        method:'PUT',
        url:urlEmpresa+`?id=${indexEmpresa}`,
        responseType:'json',
        data:peticion
    }).then(res=>{
     
    }).catch(error=>{console.error(error);
      console.log("entrada no actualizada")
    }); 

}


/****************FUNCION PARA OBTENER UN PLAN Y LLENAR MODAL INFORMACION (en caso de ser su primera entrada)************* */

var diasPrueba;
var precioPlan;
function obtenerPlan(){
  let idPlan=cuentaEmpresa.plan;
  
  axios({
    method:'GET',
    url:urlPlanes+`?id=${idPlan}`,
    responseType:'json',
}).then(res=>{
    plan=res.data;
    precioPlan=res.data.precio;
    diasPrueba=res.data.tiempoPruebaGratuita;
    verificarPrueba();
    console.log(res.data.tiempoPruebaGratuita);
    llenarModalInfoPlan();
    llenarModalPagoPlan();
    generarPlanDash();
    generarPerfil();
    generarSeccionProductos();
    generarConfigPlanes();
    

}).catch(error=>{console.error(error);
}); 
}




function verificarPrueba(){
  if(cuentaEmpresa.estado.pago==0){
    var fecha_actual=moment().format("YYYY-MM-DD");
var fechaRegistro=moment(cuentaEmpresa.estado.diaReg);
var fechaHoy=moment(fecha_actual);
console.log(RegistroDate,fecha_actual);
var diferencia=fechaHoy.diff(fechaRegistro, 'days');
console.log("la diferencia es:", diferencia);
  //diasPrueba
  if(diferencia>=diasPrueba && (precioPlan!=0)){
    $('#modalDiscount').modal({backdrop: 'static', keyboard: false});
    $('#modalDiscount').modal('show');
   
  }else{
    console.log("todavia tiene Tiempo")
  }
  }

}





function llenarModalInfoPlan(){
    document.getElementById("info").innerHTML="";
    document.getElementById("info").innerHTML+=`
    <h3 class="font-weight-bold">Información</h3>
              <p class="text-muted">Has adquirido el plan: ${plan.nombre}</p> 
              <p>Límite de promociones a registrar: ${plan.limitePromociones}</p>
              <p>Plazos de pago: ${plan.plazo}</p> 
              <p>Tiempo de prueba gratuita: ${plan.tiempoPruebaGratuita} días</p>`
}
 
//Realizar pago del plan

function llenarModalPagoPlan(){
  document.getElementById("plan").innerHTML="";
  document.getElementById("plan").innerHTML+=`<dl class="row">
  <dd class="col-sm-8">
   ${plan.nombre}
  </dd>
  <dd class="col-sm-4">
  ${plan.precio}
  </dd>
</dl>`
}

function Pagar(){
  $('#modalDiscount').modal('hide');
  $('#modal-pago-plan').modal({backdrop: 'static', keyboard: false});
  $('#modal-pago-plan').modal('show');
}



function llenarSidebar(){
  if(!(cuentaEmpresa.logotipo==0)){
    document.getElementById('cont-img-perfil').innerHTML="";
    document.getElementById('cont-img-perfil').innerHTML=` <img class="mx-auto avatar rounded-circle foto-perfil2 z-depth-1"  style="height: 100px; width: 100px;" src="${cuentaEmpresa.logotipo}" id="logo-empresa" ></div>    
    `;
  }
  document.getElementById('cont-nombre').innerHTML="";
  document.getElementById('cont-nombre').innerHTML=`<label for="logo-empresa" id="nombre_empresa" style="margin-botton:50px" >${cuentaEmpresa.nombre_empresa}</label>`;
}
/* *******************************FUNCIONES DE VALIDACION******************************************* */ 

function select1(){
  $("radioWithGap5").removeAttr("checked");
  $("#radioWithGap5").prop('checked', false);
  $("#radioWithGap6").prop('checked', false);
}

function select2(){
  $("#radioWithGap6").prop('checked', false);
  $("#radioWithGap4").prop('checked', false);
}

function select3(){
  $("#radioWithGap4").prop('checked', false);
  $("#radioWithGap5").prop('checked', false);
}

/*
$('#btn-one').click(function() {
  $('#btn-one').html('<span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>Autorizando...').addClass('disabled');
}); */
//validar tarjeta

function cardFormValidate(){
  var estado=false;
  console.log( $("#radioWithGap4").is(":checked"));
 
  if($("#radioWithGap4").is(":checked") || $("#radioWithGap5").is(":checked") ||  $("#radioWithGap6").is(":checked") ){
    estado=true;
    $("#pay-form").removeClass('d-block');
    $("#pay-form").addClass('d-none');
  }else{
    $("#pay-form").addClass('d-block');
    estado=false;
  }

  if($("#cc-name123").val()==""){
    estado=false;
    $("#camp-nombre-tarjet-vacio").addClass('d-block');
  }else{
    $("#camp-nombre-tarjet-vacio").removeClass('d-block');
    $("#camp-nombre-tarjet-vacio").addClass('d-none');
    estado=true;
  }

  console.log("number", $("#cc-number123").val())
  if($("#cc-number123").val()==""){
    $("#numeroTarjetaVacio").addClass('d-block');
    $("#numeroTarjeta").removeClass('d-block');
    $("#numeroTarjeta").addClass('d-none');
    estado=false;
  }else{
    var re=/^4\d{3}-?\d{4}-?\d{4}-?\d{4}$/;
    if(!(re.test($("#cc-number123").val()))){
      $("#numeroTarjeta").removeClass('d-none');
      $("#numeroTarjeta").addClass('d-block');
      $("#numeroTarjetaVacio").removeClass('d-block');
      $("#numeroTarjetaVacio").addClass('d-none');
      estado=false;
    }else{
      $("#numeroTarjeta").removeClass('d-block');
      $("#numeroTarjeta").addClass('d-none');
      $("#numeroTarjetaVacio").removeClass('d-block');
      $("#numeroTarjetaVacio").addClass('d-none');
      estado=true;
      console.log("numero exitoso")
    }
  
} 


  if($("#cc-expiration123").val()==""){
    $("#cc-expired-null").removeClass('d-none');
    $("#cc-expired-null").addClass('d-block');
    $("#cc-expired-invalid").removeClass('d-block');
    $("#cc-expired-invalid").addClass('d-none');
    estado=false;
  }else{
    var re1=/^\d{2}\/\d{2}$/;
    if(!(re1.test($("#cc-expiration123").val()))){
      $("#cc-expired-null").removeClass('d-block');
      $("#cc-expired-null").addClass('d-none');
      $("#cc-expired-invalid").removeClass('d-none');
      $("#cc-expired-invalid").addClass('d-block');
      estado=false;
    }else{
      $("#cc-expired-null").removeClass('d-block');
      $("#cc-expired-null").addClass('d-none');
      $("#cc-expired-invalid").removeClass('d-block');
      $("#cc-expired-invalid").addClass('d-none');
      estado=true;
    }
  }

  if($("#cc-cvv123").val()==""){
    $("#cvv-null").removeClass('d-none');
    $("#cvv-null").addClass('d-block');
    estado=false;
  }else{
    var re2=/^[0-9]{3,4}$/;
    if(!(re2.test($("#cc-cvv123").val()))){
      $("#cvv-null").removeClass('d-block');
      $("#cvv-null").addClass('d-none');
      $("#cvv-invalid").removeClass('d-none');
      $("#cvv-invalid").addClass('d-block');
      estado=false;
  }else{
    $("#cvv-null").removeClass('d-block');
    $("#cvv-null").addClass('d-none');
    $("#cvv-invalid").removeClass('d-block');
      $("#cvv-invalid").addClass('d-none');
    estado=true;
  }
  }

  if(estado){
    $('#btn-one').click(function() {
      $('#btn-one').html('<span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>Autorizando...').addClass('disabled');
    });

    axios({
      method:'PUT',
      url:urlPlataforma+`?id=${2}`,
      responseType:'json',
      data:{
        "ganancias":plan.precio
      }
  }).then(res=>{
    $('#btn-one').addClass('d-none');
    $('#pay-exit').removeClass('d-none');
    $('#pay-exit').addClass('d-block');
    $('#btn-next').removeClass('d-none');
    $('#btn-next').addClass('d-block');
    //PETICION PARA ACTUALIZAR PAGO EN LA EMPRESA
    axios({
      method:'PUT',
      url:urlEmpresa+`?id=${indexEmpresa}`,
      responseType:'json',
      data:{
        "accion":10,
        "estado":1

      }
  }).then(res=>{
   
  }).catch(error=>{console.error(error);
    
  }); 

  }).catch(error=>{console.error(error);
    $('#btn-one').addClass('d-none');
    $('#pay-error').removeClass('d-none');
    $('#pay-error').addClass('d-block');
    setTimeout(console.log.bind(null, 'Two second later'), 8000);
    $('#centralModalSm').modal('hide');
    $('#modalDiscount').modal({backdrop: 'static', keyboard: false});
    $('#modalDiscount').modal('show');
  }); 

  }
 
    
} 


function continuar(){
  $('#centralModalSm').modal('hide');
}



$(document).ready(function() {
  //card validation on input fields
  $('#paymentForm input[type=text]').on('keyup',function(){
      cardFormValidate();
  });
});

//FUNCION PARA VALIDAR CAMPOS VACIOS DEL ADMINISTRADOR
function validacionCampos(){
  let  respuesta= validacionUsuario();  
}







/***********************FUNCIONES DE GRAFICOS Y FUNCIONES DE ANIMACION****************************** */
function generarGrafico(){
  document.getElementById('grafico').classList.remove('d-none');
  document.getElementById('grafico').classList.add('d-block');
 
}




//$('#modalInicio').modal('show'); 
/* FUNCION PARA GENERAR MAPA*/
/*
function generarMapa1(){ 
  var coord={lat:-40.75793, lng:-73.98551};
  var map=new google.maps.Map(document.getElementById('mapa'),{
    zoom: 10,
    center:coord
  }); //donde vamos a ubicar el mapa
  

}

*/
/*
function iniciarMap(){
  var coord = {lat:-34.5956145 ,lng: -58.4431949};
  var map = new google.maps.Map(document.getElementById('google-map'),{
    zoom: 10,
    center: coord
  });
  var marker = new google.maps.Marker({
    position: coord,
    map: map
  });
}
*/






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

$('#item-productos').onclick(function(){

  $('.count-up').counter();
  $('.count1').counter();
  $('.count2').counter();
  $('.count3').counter();
  
  new WOW().init();
  
  setTimeout(function () {
    $('.count5').counter();
  }, 3000);
});


//line



//Controlador 
function dashboard(){
  document.getElementById('dashboard').classList.remove('d-none');
  document.getElementById('item-dashboard').classList.add('seleccionar');
  document.getElementById('item-sucursales').classList.remove('seleccionar');
  document.getElementById('item-perfil').classList.remove('seleccionar');
  document.getElementById('perfil-empresarial').classList.add('d-none');
  document.getElementById('contenido').classList.add('d-none');
  document.getElementById('productos').classList.add('d-none');
  document.getElementById('productos').classList.remove('d-block');
  document.getElementById('productos').classList.add('d-none');
  document.getElementById('item-promociones').classList.remove('seleccionar');
  document.getElementById('promociones').classList.remove('d-block');
  document.getElementById('promociones').classList.add('d-none');
  document.getElementById('item-sucursales').classList.remove('seleccionar');
  document.getElementById('item-productos').classList.remove('seleccionar');
  document.getElementById('sucursales').classList.remove('d-block');
  document.getElementById('sucursales').classList.add('d-none');
}
function productos(){
  document.getElementById('dashboard').classList.add('d-none');
  document.getElementById('perfil-empresarial').classList.add('d-none');
  document.getElementById('productos').classList.remove('d-none');
  document.getElementById('productos').classList.add('d-block');
  document.getElementById('productos').style.display="block";
  document.getElementById('contenido').classList.add('d-none');
  document.getElementById('item-promociones').classList.remove('seleccionar');
  document.getElementById('promociones').classList.remove('d-block');
  document.getElementById('promociones').classList.add('d-none');
  document.getElementById('item-productos').classList.add('seleccionar');
  document.getElementById('item-dashboard').classList.remove('seleccionar');
  document.getElementById('item-perfil').classList.remove('seleccionar');
  document.getElementById('item-sucursales').classList.remove('seleccionar');
  document.getElementById('sucursales').classList.remove('d-block');
  document.getElementById('sucursales').classList.add('d-none');
  document.getElementById('item-dashboard').classList.add('item-sidebar');

}

function perfil(){
  document.getElementById('dashboard').classList.add('d-none');
  document.getElementById('item-dashboard').classList.remove('seleccionar');
  document.getElementById('item-dashboard').classList.add('item-sidebar');
  document.getElementById('item-promociones').classList.remove('seleccionar');
  document.getElementById('item-perfil').classList.add('seleccionar');
  document.getElementById('perfil-empresarial').classList.remove('d-none');
  document.getElementById('contenido').classList.remove('d-none');
  document.getElementById('productos').classList.remove('d-block');
  document.getElementById('productos').classList.add('d-none');
  document.getElementById('promociones').classList.remove('d-block');
  document.getElementById('promociones').classList.add('d-none');
  document.getElementById('sucursales').classList.remove('d-block');
  document.getElementById('sucursales').classList.add('d-none');
  document.getElementById('item-sucursales').classList.remove('seleccionar');
  document.getElementById('item-productos').classList.remove('seleccionar');
}

function promociones(){
  document.getElementById('dashboard').classList.add('d-none');
  document.getElementById('item-dashboard').classList.remove('seleccionar');
  document.getElementById('item-promociones').classList.add('seleccionar');
  document.getElementById('item-perfil').classList.remove('seleccionar');
  document.getElementById('item-sucursales').classList.remove('seleccionar');
  document.getElementById('perfil-empresarial').classList.remove('d-block');
  document.getElementById('perfil-empresarial').classList.add('d-none');
  document.getElementById('contenido').classList.add('d-none');
  document.getElementById('productos').classList.remove('d-block');
  document.getElementById('productos').classList.add('d-none');
  document.getElementById('promociones').classList.remove('d-none');
  document.getElementById('promociones').classList.add('d-block');
  document.getElementById('item-productos').classList.remove('seleccionar');
  document.getElementById('sucursales').classList.remove('d-block');
  document.getElementById('sucursales').classList.add('d-none');

}



function mostrarFormDescuento(){
  document.getElementById('form-descuento').classList.remove('d-none');
  document.getElementById('form-descuento').classList.add('d-block');
  document.getElementById('form-descuento').classList.add('d-block');
  document.getElementById('grafico').classList.add('d-none');
 
  
  
  new WOW().init();
}
 function  mostrarFormSucursal(){
  document.getElementById('form-sucursal').classList.remove('d-none');
  document.getElementById('form-sucursal').classList.add('d-block');
 
  new WOW().init();
}

function sucursales(){
  console.log("entre");
  document.getElementById('sucursales').classList.remove('d-none');
  document.getElementById('sucursales').classList.add('d-block');
  document.getElementById('item-sucursales').classList.add('seleccionar');
  document.getElementById('item-dashboard').classList.remove('seleccionar');
  document.getElementById('item-perfil').classList.remove('seleccionar');
  document.getElementById('item-promociones').classList.remove('seleccionar');
  document.getElementById('item-productos').classList.remove('seleccionar');
  document.getElementById('productos').classList.remove('d-block');
  document.getElementById('productos').classList.add('d-none');
  document.getElementById('promociones').classList.remove('d-block');
  document.getElementById('promociones').classList.add('d-none');
  document.getElementById('perfil-empresarial').classList.remove('d-block');
  document.getElementById('perfil-empresarial').classList.add('d-none');
  document.getElementById('dashboard').classList.remove('d-block');
  document.getElementById('dashboard').classList.add('d-none');
  document.getElementById('contenido').classList.remove('d-block');
  document.getElementById('contenido').classList.add('d-none');
}

/********************************************GENERANDO PERFIL****************************************************** */

function generarPerfil(){
  
  if(cuentaEmpresa.Banner!=0){
    //var urString=
    document.getElementById("visor-banner").style.backgroundImage=`url(${cuentaEmpresa.Banner})`;
    
  }if(!(cuentaEmpresa.logotipo==0)){
    document.getElementById('cont-logotipo').innerHTML=`<img id="img-perfil" class=" avatar rounded-circle foto-perfil2 z-depth-1"src="${cuentaEmpresa.logotipo}" style="width: 200px!important; margin-bottom: 30px; height: 200px; margin-top: 50px!important;" alt="avatar" ></img>
    ` }
  document.getElementById('div-general').innerHTML=`<div class="col-12 " style="text-align: center; color: white!important;" ><h6 class="nombre-emp " style=" color: white!important;" >${cuentaEmpresa.nombre_empresa}</h6>
  <p class="col-12" style="margin-bottom:10px" >"${cuentaEmpresa.eslogan}"</p></div>`

  document.getElementById('descripcion-empresa').innerHTML=`<p>${cuentaEmpresa.descripcion}</p>`
  document.getElementById('info-contacto').innerHTML="";
  if(cuentaEmpresa.correoElectronico)
  document.getElementById('info-contacto').innerHTML+=` <li class="list-group-item"><i class="fas fa-envelope mr-2"></i>${cuentaEmpresa.correoElectronico}</li>`
  if(cuentaEmpresa.numeroTelefono)
  document.getElementById('info-contacto').innerHTML+=` <li class="list-group-item"><i class="fas fa-phone-alt mr-2"></i>${cuentaEmpresa.numeroTelefono}</li>`
  if(cuentaEmpresa.direccion)
  document.getElementById('info-contacto').innerHTML+=` <li class="list-group-item"><i class="fas fa-map-marker-alt mr-2"></i>${cuentaEmpresa.direccion}</li>`
  if(cuentaEmpresa.instagram)
  document.getElementById('info-contacto').innerHTML+=`<li class="list-group-item"><i class="fab fa-instagram mr-2"></i>${cuentaEmpresa.instagram}</li>`
  if(cuentaEmpresa.facebook)
  document.getElementById('info-contacto').innerHTML+=` <li class="list-group-item"><i class="fab fa-facebook-f mr-2"></i>${cuentaEmpresa.facebook}</li>`
  if(cuentaEmpresa.twitter)
  document.getElementById('info-contacto').innerHTML+=` <li class="list-group-item"><i class="fab fa-twitter mr-2"></i>${cuentaEmpresa.twitter}</li>`
  
  
  let nuevosComentarios=cuentaEmpresa.comentarios;
  let reverse1= nuevosComentarios.reverse();
  console.log("hola", nuevosComentarios.length-1);
  
 //for(let i=(nuevosComentarios.length-1);i>=(nuevosComentarios.length-1); i--){
   if(nuevosComentarios.length>1){
    document.getElementById('cont-newC').innerHTML="";
  document.getElementById('cont-newC').innerHTML+=`<li class="d-flex justify-content-between mb-1 mt-0 pb-2 pr-3 pl-3 pt-2">
  <img src="${nuevosComentarios[nuevosComentarios.length-1].perfil}" alt="avatar" class="avatar rounded-circle mr-2 ml-0 z-depth-1" style="height: 55px; width:55px">
  <div class="chat-body white p-2 ml-2 z-depth-1" style=" width: 100%;">
    <div class="header">
      <strong class="primary-font">${nuevosComentarios[nuevosComentarios.length-1].nombre_usuario}</strong>
      <small class="pull-right text-muted"><i class="far fa-clock"></i>  ${nuevosComentarios[nuevosComentarios.length-1].estado}</small>
    </div>
    <hr class="w-100" style="margin-top: -1px;">
    <p class="mb-0" style="margin-top: -5px; font-size: 13px; ;">
    ${nuevosComentarios[nuevosComentarios.length-1].comentario}
    </p>
  </div>
</li>`
document.getElementById('cont-newC').innerHTML+=`<li class="d-flex justify-content-between mb-1 mt-0 pb-2 pr-3 pl-3 pt-2">
  <img src="${nuevosComentarios[nuevosComentarios.length-2].perfil}" alt="avatar" class="avatar rounded-circle mr-2 ml-0 z-depth-1" style="height: 55px; width:55px">
  <div class="chat-body white p-2 ml-2 z-depth-1" style=" width: 100%;">
    <div class="header">
      <strong class="primary-font">${nuevosComentarios[nuevosComentarios.length-2].nombre_usuario}</strong>
      <small class="pull-right text-muted"><i class="far fa-clock"></i>  ${nuevosComentarios[nuevosComentarios.length-2].estado}</small>
    </div>
    <hr class="w-100" style="margin-top: -1px;">
    <p class="mb-0" style="margin-top: -5px; font-size: 13px; ;">
    ${nuevosComentarios[nuevosComentarios.length-2].comentario}
    </p>
  </div>
</li>`

  }
  

  generarMapa('map-tienda-principall',cuentaEmpresa.latitud,cuentaEmpresa.longitud);
// }
  
}


function generarPlanDash(){
  document.getElementById('cont-name-plan').innerHTML="";
  if(plan.diseno=="Básico"){
    document.getElementById('cont-name-plan').innerHTML=`<label style="font-size: 13px; color: #B8BEC2; margin-top: -10px;" for="dash">Plan ${plan.nombre}</label>`;
  }else{
    document.getElementById('cont-name-plan').innerHTML=` <span class="badge badge-danger mb-2 ">${plan.nombre}</span>`
  }


}




function llenarInfoEmpModal(){
  document.getElementById("informacion-empresa").innerHTML+=`
  <div class="col-4">
  <div style=" text-align: center; " class="container-fluid" id="cont-img-perfil2">
    <img class="mx-auto avatar rounded-circle foto-perfil2 z-depth-1"  style="height: 100px; width: 100px;" src="${cuentaEmpresa.logotipo}" id="logo-empresa" ></div>    
    <div style=" text-align: center; " id="cont-nombre2" class="container-fluid">${cuentaEmpresa.nombre_empresa}</div>
</div>
<div class="col-6 mr-auto" style="float:left!important" >
  <table style="margin-left:20px;">
    <tr><td ><span style="font-weight:strong;">"${cuentaEmpresa.eslogan}"</span></td></tr>
    <tr><td >${cuentaEmpresa.descripcion}</td></tr>
    <tr><td >${cuentaEmpresa.direccion}</td></tr>
  </table>
  <div id="info-contacto-2"></div>
  `

  if(cuentaEmpresa.correoElectronico)
  document.getElementById('info-contacto-2').innerHTML+=` <li class="list-group-item"><i class="fas fa-envelope mr-2"></i>${cuentaEmpresa.correoElectronico}</li>`
  if(cuentaEmpresa.numeroTelefono)
  document.getElementById('info-contacto-2').innerHTML+=` <li class="list-group-item"><i class="fas fa-phone-alt mr-2"></i>${cuentaEmpresa.numeroTelefono}</li>`
  if(cuentaEmpresa.direccion)
  document.getElementById('info-contacto-2').innerHTML+=` <li class="list-group-item"><i class="fas fa-map-marker-alt mr-2"></i>${cuentaEmpresa.direccion}</li>`
  if(cuentaEmpresa.instagram)
  document.getElementById('info-contacto-2').innerHTML+=`<li class="list-group-item"><i class="fab fa-instagram mr-2"></i>${cuentaEmpresa.instagram}</li>`
  if(cuentaEmpresa.facebook)
  document.getElementById('info-contacto-2').innerHTML+=` <li class="list-group-item"><i class="fab fa-facebook-f mr-2"></i>${cuentaEmpresa.facebook}</li>`
  if(cuentaEmpresa.twitter)
  document.getElementById('info-contacto-2').innerHTML+=` <li class="list-group-item"><i class="fab fa-twitter mr-2"></i>${cuentaEmpresa.twitter}</li>`
  
}

/****************************************************FUNCIONES PARA GENERAR RECURSOS******************************************************* */
//FUNCION PARA GENERAR UN MAPA
function generarMapa(id,latitud,longitud){

  document.getElementById(id).innerHTML = "<div id='map' style='width: 100%; height: 100%;'></div>";
  const tilesProvider='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
let myMap=L.map('map').setView([latitud,-longitud],8);
L.tileLayer(tilesProvider,{
    maxZoom:18
}).addTo(myMap);

let marker=L.marker([latitud,longitud]).addTo(myMap);
marker.bindPopup("<b>Hola!</b><br>Esta es nuestra sucursal principal.").openPopup();
}

/**********************************FUNCIONES PARA ACTUALIZAR PERFIL****************************************************** */

function test(){
  console.log("esta es una prueba");
}


function validarBanner(){
  console.log("validando imagen");
  var archivoBanner=document.getElementById('input-Banner');
  var rutaBanner=archivoBanner.value;
  var exPermitidas=/(.PNG|.JPG)$/i;
  console.log(archivoBanner.files[0].name);
  if(!exPermitidas.exec(rutaBanner)){
    document.getElementById('img-invalid').style.display="block";
    archivoInput.value="";
    return false; 
  }else{
      if(archivoBanner.files && archivoBanner.files[0]){
        var portada=new FileReader();
        portada.onload=function(e){
          document.getElementById('visor-img').innerHTML=
          '<img src="'+e.target.result+'" class="img-fluid " alt="zoom">'
           return true;
        }
        portada.readAsDataURL(archivoBanner.files[0]);
        document.getElementById('img-invalid').style.display="none";
        document.getElementById("footer").style.display="block";
       banner_guardar= archivoBanner.files[0].name;
      }
  }
}



function resetModalBanner(){
  console.log("entre");
   var archivoBanner=document.getElementById('input-Banner');
   var clone=archivoBanner.cloneNode();
   clone.value="";
   archivoBanner.parentNode.replaceChild(clone, archivoBanner);
   document.getElementById('img-invalid').style.display="none";
   console.log("sali");
   document.getElementById('visor-img').innerHTML=
  '<img src="img/banner-default.png" class="img-fluid " alt="zoom">'
  document.getElementById("footer").style.display="none";
  document.getElementById('barra').style.width="0%";
  document.getElementById("btn-guardar-cambios3").style.display="none";
  document.getElementById("btn-guardar3").style.display="block";
  
}

function resetModalLogotipo(){
  console.log("entre");
   var archivoBanner=document.getElementById('input-Banner');
   var clone=archivoBanner.cloneNode();
   clone.value="";
   archivoBanner.parentNode.replaceChild(clone, archivoBanner);
   document.getElementById('img-invalid').style.display="none";
   console.log("sali");
   document.getElementById('visor-img').innerHTML=
  '<img src="img/logotipo-subir.png" class="img-fluid " alt="zoom">'
  document.getElementById("footer-lg").style.display="none";
  document.getElementById('barra1').style.width="0%";
  document.getElementById("btn-guardar-cambios").style.display="none";
  document.getElementById("btn-guardar").style.display="block";
  
}



//subir banner al servidor

function subir_banner(accion){
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
      document.getElementById('input-Banner').value="";
      if(accion==0){
        guardar_banner();
      }else{
       // editarBanner();
      }
      
    })
    //enviar datos
    peticion.open('post',`../../Hi-Offer/backend/GestionArchivos/directory_controllerEmp.php?id=${indexEmpresa}`);
    peticion.send(new FormData(document.getElementById("form-subir")));
  
    // cancelar
    document.getElementById('btn-cancelar').addEventListener("click",()=>{
      peticion.abort();
    })
  } 



function guardar_banner(){
     axios({
      method:'PUT',
      url:urlEmpresa+`?id=${indexEmpresa}`,
      responseType:'json',
      data:{
        "accion":1,
        "Banner":banner_guardar
      }
    }).then(res=>{
      obtenerEmpActualizada();
     // generarPerfil();
    }).catch(error=>{console.error(error);
    }); 
}


function obtenerEmpActualizada(){
   axios({
    method:'GET',
    url:urlEmpresa+`?id=${indexEmpresa}`,
    responseType:'json',
}).then(res=>{
  try {
    cuentaEmpresa=res.data;
    generarPerfil();
    llenarSidebar();
    generarSeccionProductos();
    generarSucursales();
    generarPromociones();
    llenarModalListSucursales();
    generarConfigPlanes();
    obtenerPlanes1();
    generarNombreAdmin();
    generarInfoAdmin();
    llenarInfoEmpModal();
    llenarModalperfilSucursales();
    if(cuentaEmpresa.promociones.length>0){
      generarPromoPerfil();
    }
    }
   
  catch(error) {
    document.getElementById("div-error").classList.remove('d-none');
    document.getElementById("div-error").classList.add('d-block');
    document.getElementById('dashboard').classList.remove('d-block');
    document.getElementById('dashboard').classList.add('d-none');

  }
  
}).catch(error=>{console.error(error);
});

}


 

  function vistaLogotipo(){
    var archivoLog=document.getElementById("input-Logotipo");
    var ruta=archivoLog.value;
    let respuesta=validarImagen("input-Logotipo" );
    if(!respuesta){
      document.getElementById('img-invalid1').style.display="block";
    }else{
      var visor=new FileReader();
      visor.onload=function(e){
        document.getElementById('visor-logotipo').innerHTML=` <img id="img-perfil" class=" avatar rounded-circle foto-perfil2 z-depth-1"src="${e.target.result}" style="width: 200px!important; height: 200px; margin-top: 30px!important;" alt="avatar" >
        `   
      }
      visor.readAsDataURL(archivoLog.files[0]);
      document.getElementById('img-invalid1').style.display="none";
      document.getElementById("footer-lg").style.display="block";
      
      
    }
  }


  function subirLogotipo(){
      document.getElementById('barra1').style.width="0%";
      document.getElementById('barra1').style.backgroundColor="white";
      //peticion
      let peticion=new XMLHttpRequest();
      //progreso
      peticion.upload.addEventListener("progress",(event)=>{
        /*para obtener el porcentaje de suida*/
        /*total de bytes cargados entre el total*/
        var porcentaje =Math.round((event.loaded/event.total)*100);
        document.getElementById('barra1').style.width=porcentaje+"%";
        document.getElementById('barra1').style.backgroundColor="#546991";
        document.getElementById('progreso1').innerHTML=porcentaje+"%";
      
      });
        peticion.addEventListener("load",()=>{
          /* cuando termine*/
          document.getElementById('progreso1').innerHTML="Proceso completado";
          document.getElementById('input-Logotipo').value="";
         
          
        })
        //enviar datos
        peticion.open('post',`../../Hi-Offer/backend/GestionArchivos/directory_controllerEmp.php?id=${indexEmpresa}`);
        peticion.send(new FormData(document.getElementById("form-logotipo")));
        
        //peticion axios para guardar la referencia a la imagen en la infromacion de la empresa
        axios({
          method:'PUT',
          url:urlEmpresa+`?id=${indexEmpresa}`,
          responseType:'json',
          data:{
            "accion":0,
            "logotipo":document.getElementById("input-Logotipo").files[0].name
          }
        }).then(res=>{
          obtenerEmpActualizada();
         // generarPerfil();
        }).catch(error=>{console.error(error);
        }); 

        // cancelar
        document.getElementById('btn-cancelar').addEventListener("click",()=>{
          peticion.abort();
        })
  } 

  



//los parametros que recibe(id-input,)
function validarImagen(idInput){
  var archivo=document.getElementById(idInput);
  var ruta=archivo.value;
  var exPermitidas=/(.PNG|.JPG)$/i;
  if(!exPermitidas.exec(ruta)){
    archivo.value="";
    return false; 
  }else{
      if(archivo.files && archivo.files[0]){
           return  true;

        //banner_guardar= archivoBanner.files[0].name;
      }
  }
}




          /***************************************GENERANDO DASHBOARD****************************************************** */

          function generarDashboard(){
                
            total_inventario=cuentaEmpresa.estado.total_ventas;
            total_vendido=cuentaEmpresa.estado.total_ventas_mes;
            if(total_vendido==0 && total_inventario==0){
              porcentaje=0
            }else{
              porcentaje=Math.round((total_vendido/total_inventario)*100)
             console.log("porcentaje", porcentaje); 
            }
            
            document.getElementById("cont-card-ventas").innerHTML="";
            document.getElementById("cont-card-ventas").innerHTML+=`
            <div class="card mt-3">
            <div class="">
              <i class="far fa-money-bill-alt fa-lg  z-depth-2 p-4 ml-3 mt-n3 rounded text-white" style="background-color:#8BD0ED;"></i>
              <div class="float-right text-right p-3">
                <p class="text-uppercase text-muted mb-1"><small>Ventas</small></p>
                <h4 class="font-weight-bold mb-0">L ${total_vendido}</h4>
              </div>
            </div>
            <div class="card-body pt-0">
              <div class="progress md-progress">
                <div class="progress-bar bg-success" role="progressbar" style="width: ${porcentaje}%;" aria-valuenow="0" aria-valuemin="0"
                  aria-valuemax="100"></div>
              </div>
              <p class="card-text">Has alcanzado el ${porcentaje}% de la ventas en este mes</p>
            </div>
          </div>`;

          let porcentaje2
          total_seguidores_mes_actual=cuentaEmpresa.estado.total_seguidores;
          total_seguidores_mes_pasado=cuentaEmpresa.estado.total_seguidoresPasado;

          if( total_seguidores_mes_actual==0 && total_seguidores_mes_pasado==0){
            porcentaje2=0;
          }else{
            if( total_seguidores_mes_actual>total_seguidores_mes_pasado){
              porcentaje2=100-((total_seguidores_mes_pasado/total_seguidores_mes_actual)*100);
            }else{
              porcentaje2=0;
            }
  
          }
        

          console.log("porcentaje Seguidores",porcentaje2);

          document.getElementById("cont-card-seguidores").innerHTML="";
          document.getElementById("cont-card-seguidores").innerHTML+=`<div class="card mt-3">
          <div class="">
            <i class="fas fa-chart-line fa-lg  z-depth-2 p-4 ml-3 mt-n3 rounded text-white" style="background-color:#8BD0ED;"></i>
            <div class="float-right text-right p-3">
              <p class="text-uppercase text-muted mb-1"><small>Seguidores</small></p>
              <h4 class="font-weight-bold mb-0">${total_seguidores_mes_actual}</h4>
            </div>
          </div>

          <div class="card-body pt-0">
            <div class="progress md-progress">
              <div class="progress-bar bg-success" role="progressbar" style="width: ${porcentaje2}%;background-color:#B8CCCB" aria-valuenow="0" aria-valuemin="0"
                aria-valuemax="100"></div>
            </div>
            <p class="card-text">Has superado un ${porcentaje2}% los seguidores del mes anterior </p>
          </div>
          </div>`
            
          let porcentaje3;
          total_visitas_mes_actual=cuentaEmpresa.estado.visitas;
          total_visitas_mes_pasado=cuentaEmpresa.estado.visitaspasado;

          if(total_visitas_mes_actual==0 && total_visitas_mes_pasado==0){
            porcentaje3=0;
          }else{
            if( total_visitas_mes_actual>total_visitas_mes_pasado){
              porcentaje3=100-((total_visitas_mes_pasado/total_visitas_mes_actual)*100);
            }else{
              porcentaje3=0;
            }
          }
         
         

          document.getElementById("cont-card-visitas").innerHTML="";
          document.getElementById("cont-card-visitas").innerHTML+=`<div class="card mt-3">
          <div class="">
          <i class="fas fa-chart-pie fa-lg  z-depth-2 p-4 ml-3 mt-n3 rounded text-white" style="background-color:#8BD0ED;"></i>
          <div class="float-right text-right p-3">
            <p class="text-uppercase text-muted mb-1"><small>Visitas</small></p>
            <h4 class="font-weight-bold mb-0">${total_visitas_mes_actual}</h4>
          </div>
          </div>
          <div class="card-body pt-0">
          <div class="progress md-progress">
            <div class="progress-bar bg-success" role="progressbar" style="width: ${porcentaje3}%" aria-valuenow="0" aria-valuemin="0"
              aria-valuemax="100"></div>
          </div>
          <p class="card-text">Las visitas al perfil han aumentado en un  ${porcentaje3} %</p>
          </div>

          </div>`;



          /************GENERANDO GRAFICO DE EL ESTADO DE LOS PRODUCTOS******************************* */
          let promociones_vendidas=cuentaEmpresa.estado.estado_promociones.vendidas;
          let promociones_carrito=cuentaEmpresa.estado.estado_promociones.carrito;
          let total_promociones=cuentaEmpresa.estado.inventario.promocion;

          let cantidad_inactivos= total_promociones-promociones_carrito-promociones_vendidas;
          console.log("inactivos",cantidad_inactivos);


          // generar grafico
          var ctxD = document.getElementById("doughnutChart").getContext('2d');
          var myLineChart = new Chart(ctxD, {
          type: 'doughnut',
          data: {
            labels: ["Vendidos", "Añadidos al carrito","Sin actividad"],
            datasets: [{
              data: [ promociones_vendidas,promociones_carrito,cantidad_inactivos],
              backgroundColor: ["#8BD0ED", "#536F97"],
              hoverBackgroundColor: ["#8BD0ED", "#536F97"]
            }]
          },
          options: {
            responsive: true,
            legend: {
              position: 'right',
              align: 'center',
              labels: {
                padding: 20
              }
            }
          }
          });
          let porcentaje_vendidos
          let porcentaje_carrito
          let porcentaje_inactivos
          //porcentajes
          if(promociones_vendidas==0 && promociones_carrito==0 && cantidad_inactivos==0){
             porcentaje_vendidos=0;
             porcentaje_carrito=0;
             porcentaje_inactivos=0;
          }else{
            porcentaje_vendidos=(promociones_vendidas/total_promociones)*100;
            porcentaje_carrito=(promociones_carrito/total_promociones)*100;
            porcentaje_inactivos=(cantidad_inactivos/total_promociones)*100;
          }

           

          document.getElementById("cont-porcentajes").innerHTML="";
          document.getElementById("cont-porcentajes").innerHTML+=`<a href="#!" class="list-group-item list-group-item-action rounded-0 border-left-0 border-right-0 d-flex justify-content-between align-items-center">Vendidos
          <span class="text-danger" style="color:#8BD0ED!important;font-weight:bold"> ${porcentaje_vendidos}%</span>
          </a>
          <a href="#!" class="list-group-item list-group-item-action rounded-0 border-left-0 border-right-0 d-flex justify-content-between align-items-center">Añadidos al carrito
          <span class="text-success" style="color:#536F97!important;font-weight:bold">${porcentaje_carrito}%</span>
          </a>
          <a href="#!" class="list-group-item list-group-item-action rounded-0 border-left-0 border-right-0 d-flex justify-content-between align-items-center">Sin actividad
          <span class="text-success" style="color:#706F6F!important;font-weight:bold">${porcentaje_inactivos}%</span>
          </a>`;

          //generar grafico por semana

          var ctxB = document.getElementById("barChart").getContext('2d');
          var myBarChart = new Chart(ctxB, {
          type: 'bar',
          data: {
            labels: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes","Sábado"],
            datasets: [{
              label: '#cantidad vendida',
              data: [cuentaEmpresa.estado.ventas_semana.domingo, cuentaEmpresa.estado.ventas_semana.lunes,
                      cuentaEmpresa.estado.ventas_semana.martes, cuentaEmpresa.estado.ventas_semana.miercoles,
                      cuentaEmpresa.estado.ventas_semana.jueves, cuentaEmpresa.estado.ventas_semana.viernes,cuentaEmpresa.estado.ventas_semana.jueves],
              backgroundColor: [
                '#8BD0ED',
                '#B8CCCB',
                '#536F97',
                '#AEC1E9',
                '#918EAB',
                '#184F78'
              ],
              borderColor: [
                '#8BD0ED',
                '#B8CCCB',
                '#536F97',
                '#AEC1E9',
                '#918EAB',
                '#184F78'
              ],
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }
          });

          if(cuentaEmpresa.estado.ventas_semana.info.total_semana!=0){
            document.getElementById("porcentajes-semana").innerHTML="";
          document.getElementById("porcentajes-semana").innerHTML+=`<a href="#" style="font-size: 13px; padding: 1px; text-align: center; float: inline-start;" class=" d-flex justify-content-between align-items-center">Esta Semana
          <span class="">|  Total L. ${cuentaEmpresa.estado.ventas_semana.info.total_semana}</span>
          </a>
          <a href="#!" style="font-size: 13px; padding: 1px;  font-weight:bold" class="list-group-item list-group-item-action rounded-0 mb-1 border-left-0 border-right-0 d-flex justify-content-between align-items-center">Domingo
          <span class=""> ${Math.round((cuentaEmpresa.estado.ventas_semana.domingo/cuentaEmpresa.estado.ventas_semana.info.total_semana)*100)}% | L.${cuentaEmpresa.estado.ventas_semana.domingo}</span>
          </a>
          <a href="#" style="font-size: 13px; padding: 1px; font-weight:bold" class="list-group-item list-group-item-action rounded-0 mb-1 border-left-0 border-right-0 d-flex justify-content-between align-items-center">Lunes
          <span class=""> ${Math.round((cuentaEmpresa.estado.ventas_semana.lunes/cuentaEmpresa.estado.ventas_semana.info.total_semana)*100)}% | L.${cuentaEmpresa.estado.ventas_semana.lunes}</span>
          </a>
          <a href="#" style="font-size: 13px; padding: 1px; font-weight:bold" class="list-group-item list-group-item-action rounded-0 mb-1 border-left-0 border-right-0 d-flex justify-content-between align-items-center">Martes
          <span class=""> ${Math.round((cuentaEmpresa.estado.ventas_semana.martes/cuentaEmpresa.estado.ventas_semana.info.total_semana)*100)}% | L.${cuentaEmpresa.estado.ventas_semana.martes}</span>
          </a>
          <a href="#" style="font-size: 13px; padding: 1px; font-weight:bold" class="list-group-item list-group-item-action rounded-0 mb-1 border-left-0 border-right-0 d-flex justify-content-between align-items-center">Miércoles
          <span class=""> ${Math.round((cuentaEmpresa.estado.ventas_semana.miercoles/cuentaEmpresa.estado.ventas_semana.info.total_semana)*100)}% | L.${cuentaEmpresa.estado.ventas_semana.miercoles}</span>
          </a>
          <a href="#" style="font-size: 13px; padding: 1px; font-weight:bold" class="list-group-item list-group-item-action rounded-0 mb-1 border-left-0 border-right-0 d-flex justify-content-between align-items-center">Jueves
          <span class=""> ${Math.round((cuentaEmpresa.estado.ventas_semana.jueves/cuentaEmpresa.estado.ventas_semana.info.total_semana)*100)}% | L.${cuentaEmpresa.estado.ventas_semana.jueves}</span>
          </a>
          <a href="#" style="font-size: 13px; padding: 1px; font-weight:bold" class="list-group-item list-group-item-action rounded-0 mb-1 border-left-0 border-right-0 d-flex justify-content-between align-items-center">Viernes
          <span class=""> ${Math.round((cuentaEmpresa.estado.ventas_semana.viernes/cuentaEmpresa.estado.ventas_semana.info.total_semana)*100)}% | L.${cuentaEmpresa.estado.ventas_semana.viernes}</span>
          </a>
          <a href="#" style="font-size: 13px; padding: 1px; font-weight:bold" class="list-group-item list-group-item-action rounded-0 mb-1 border-left-0 border-right-0 d-flex justify-content-between align-items-center">Sábado
          <span class=""> ${Math.round((cuentaEmpresa.estado.ventas_semana.sabado/cuentaEmpresa.estado.ventas_semana.info.total_semana)*100)}% | L.${cuentaEmpresa.estado.ventas_semana.sabado}</span>
          </a>`;
          }
          

          //generar el resumen de inventario
          document.getElementById('cont-res-inventario').innerHTML="";
          document.getElementById('cont-res-inventario').innerHTML+=`
          <a href="#!" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">Productos registrados (Stock)
                            <span class="badge badge-info badge-pill">${cuentaEmpresa.estado.inventario.registrados}</span>
                          </a>
                          <a href="#!" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">Productos en promocion (Stock)
                            <span class="badge badge-success badge-pill">${cuentaEmpresa.estado.inventario.promocion}</span>
                          </a>
                          <a href="#!" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">productos con existencia baja
                            <span class="badge badge-danger badge-pill">${cuentaEmpresa.estado.inventario.exis_baja}</span>
                          </a>`;   
                          
                          
          /*
          //generar seccion de nuevos comentarios
          document.getElementById('cont-nuevos-comentarios').innerHTML="";
          var comentarios=cuentaEmpresa.comentarios;
          console.log(comentarios);
          var reversed = comentarios.reverse();
          for(let i=0; i<3; i++){
          document.getElementById("cont-nuevos-comentarios").innerHTML+=`
          <li class="d-flex justify-content-between mb-1 mt-0 pb-2 pr-3 pl-3 pt-2">
          <img src="${reversed[i].perfil}" alt="avatar" class="avatar rounded-circle mr-2 ml-0 z-depth-1" style="height: 55px; width:55px!important" >
          <div class="chat-body white p-2 ml-2 z-depth-1 " style="width:100%">
          <div class="header">
            <strong class="primary-font" style="font-size:14px; font-weight:bold">${reversed[i].nombre_usuario}</strong>
            <small class="pull-right text-muted"><i class="far fa-clock"></i> ${reversed[i].estado}</small>
          </div>
          <hr class="w-100" style="margin-top: -1px;">
          <p class="mb-0" style="margin-top: -5px; font-size: 13px;">
          ${reversed[i].comentario}
          </p>
          </div>
          </li>`
          // const reversed = comentarios.reverse()
          }

          var comentarios2=cuentaEmpresa.comentarios;
          comentarios2=comentarios2.reverse();
          document.getElementById('cont-comentarios').innerHTML="";
          for(let j=0; j<cuentaEmpresa.comentarios.length; j++){
          document.getElementById('cont-comentarios').innerHTML+=`
          <li class="d-flex justify-content-between mb-1 mt-0 pb-2 pr-1 pl-1 pt-2" style="width:100%">
              <img src="${comentarios2[j].perfil}" alt="avatar" class="avatar rounded-circle mr-2 ml-0 z-depth-1" style="height: 55px; width:55px!important">
              <div class="chat-body white p-2 ml-2 z-depth-1" style="width:100%">
                <div class="header">
                  <strong class="primary-font" style="font-size:14px; font-weight:bold">${comentarios2[j].nombre_usuario}</strong>
                  <small class="pull-right text-muted"><i class="far fa-clock"></i> ${comentarios2[j].estado}</small>
                </div>
                <hr class="w-100" style="margin-top: -1px;">
                <p class="mb-0" style="margin-top: -5px; font-size: 13px;">
                ${comentarios2[j].comentario}
                </p>
              </div>
            </li>
          `;
         

          }*/


          }

/*****************************************FUNCIONES PARA EDITAR INFORMACION DE LA EMPRESA********************************************** */

//FUNCION PARA MOSTRAR LA INFORMACION DE LA EMPRESA EN LA VENTANA MODAL

function  mostrarInfo(){
  $('#NombreDeLaEmpresa').val(cuentaEmpresa.nombre_empresa);
  $('#correoEmpresa').val(cuentaEmpresa.correoElectronico);
  $('#eslogan').val(cuentaEmpresa.eslogan);
  $('#direccion').val(cuentaEmpresa.direccion);
  $('#descripcion').val(cuentaEmpresa.descripcion);
  $('#pais').val(cuentaEmpresa.pais);
  $('#latitud').val(cuentaEmpresa.latitud);
  $('#longitud').val(cuentaEmpresa.longitud);
  $('#telefono').val(cuentaEmpresa.numeroTelefono);
  $('#facebook').val(cuentaEmpresa.facebook);
  $('#instagram').val(cuentaEmpresa.instagram);
  $('#twiter').val(cuentaEmpresa.twitter);
}

function ActualizarInfo(){
  let permiso=validarEmpresa();
  if(permiso){
      //guardar la empresa*/
      empresa={
              "nombre_empresa": document.getElementById("NombreDeLaEmpresa").value,
              "correoElectronico":document.getElementById("correoEmpresa").value,
              "eslogan":document.getElementById("eslogan").value,
              "descripcion":document.getElementById("descripcion").value,
              "direccion":document.getElementById("direccion").value,
               "pais": document.getElementById("pais").value,
               "latitud":  document.getElementById("latitud").value,
              "longitud":document.getElementById("longitud").value,
              "facebook":document.getElementById("facebook").value,
              "instagram":document.getElementById("instagram").value,
              "twitter":document.getElementById("twiter").value,
              "numeroTelefono":document.getElementById("telefono").value
      }

          //peticion axios para actualizar la informacion de la empresa
          axios({
            method:'PUT',
            url:urlEmpresa+`?id=${indexEmpresa}`,
            responseType:'json',
            data:empresa
          }).then(res=>{
            obtenerEmpActualizada();
            document.getElementById('cont-newC').innerHTML="";
            generarPerfil();
            $('#Modal-editar-info-empresas').modal('hide');
          }).catch(error=>{console.error(error);
          }); 
   
        }
      }



      function validarEmpresa(){
        let estado_vacio_NombreEmp=validarCampoVacio('NombreDeLaEmpresa');
        let estado_vacio_correoEmp=validarCampoVacio('correoEmpresa');
        let estado_vacio_esloganEmp=validarCampoVacio('eslogan');
        let estado_vacio_descripcionEmp=validarCampoVacio('descripcion');
        let estado_vacio_direccionEmp=validarCampoVacio('direccion');
        let estado_vacio_paisEmp= validarCampoVacioSelect('pais','Pais');
        let estado_vacio_latitudEmp=validarCampoVacio('latitud');
        let estado_vacio_longitudEmp=validarCampoVacio('longitud');
       /* let estado_vacio_facebookEmp=validarCampoVacio('facebook');
        let estado_vacio_instagramEmp=validarCampoVacio('instagram');
        let estado_vacio_twiterEmp=validarCampoVacio('twiter'); */
        let estado_vacio_telefono=validarCampoVacio('telefono');
      
        let validar_cordenadas=isValidCoordinates(document.getElementById("latitud").value, document.getElementById("longitud").value)
    
        let correo_valido_emp=validarEmail(document.getElementById('correoEmpresa'));
       
        //control de nombre empresa
        if(estado_vacio_NombreEmp){
            document.getElementById('camp-vacio-nombreEmpresa').classList.add('d-block');
            document.getElementById('NombreDeLaEmpresa').classList.add('is-invalid');
            document.getElementById('NombreDeLaEmpresa').classList.remove('botton');
        }else{
            document.getElementById('camp-vacio-nombreEmpresa').classList.remove('d-block');
            document.getElementById('NombreDeLaEmpresa').classList.remove('is-invalid');
          
        }
        if(estado_vacio_telefono){
            document.getElementById('camp-vacio-telefono').classList.add('d-block');
            document.getElementById('telefono').classList.add('is-invalid');
        }else{
            document.getElementById('camp-vacio-telefono').classList.remove('d-block');
            document.getElementById('telefono').classList.remove('is-invalid');
            
    
        }
    
        //control correo empresa, campo vacio y direccion de correo invalida
        if(estado_vacio_correoEmp){
            document.getElementById('camp-vacio-correo').classList.add('d-block');
            document.getElementById('correoEmpresa').classList.add('is-invalid');
        }else{
            if(correo_valido_emp==false){
                document.getElementById('invalid-correo').classList.add('d-block');
                document.getElementById('correoEmpresa').classList.add('is-invalid');
                document.getElementById('camp-vacio-correo').classList.remove('d-block');
                }else{
                    document.getElementById('correoEmpresa').classList.remove('is-invalid');
                   document.getElementById('camp-vacio-correo').classList.remove('d-block');
                 
                   document.getElementById('invalid-correo').classList.remove('d-block');
                }
        }
    
        //control eslogan empresa
        if(estado_vacio_esloganEmp){
            document.getElementById('camp-vacio-eslogan').classList.add('d-block');
            document.getElementById('eslogan').classList.add('is-invalid');
        }else{
            document.getElementById('camp-vacio-eslogan').classList.remove('d-block');
            document.getElementById('eslogan').classList.remove('is-invalid');
      
        }
    
    
         //control descripcion empresa
         if(estado_vacio_descripcionEmp){
            document.getElementById('camp-vacio-descripcion').classList.add('d-block');
            document.getElementById('descripcion').classList.add('is-invalid');
        }else{
            document.getElementById('camp-vacio-descripcion').classList.remove('d-block');
            document.getElementById('descripcion').classList.remove('is-invalid');
            
          
        }
    
         //control direccion empresa
         if(estado_vacio_direccionEmp){
            document.getElementById('camp-vacio-direccion').classList.add('d-block');
            document.getElementById('direccion').classList.add('is-invalid');
        }else{
            document.getElementById('camp-vacio-direccion').classList.remove('d-block');
            document.getElementById('direccion').classList.remove('is-invalid');
           
        }
    
         //control pais empresa
         if(estado_vacio_paisEmp){
            document.getElementById('camp-vacio-pais').classList.add('d-block');
            
        }else{
            document.getElementById('camp-vacio-pais').classList.remove('d-block');
           
           
        }
        
        if(estado_vacio_latitudEmp){
            document.getElementById('camp-vacio-latitud').classList.add('d-block');
            document.getElementById('latitud').classList.add('is-invalid');
        }else{
            if(validar_cordenadas==false){
                document.getElementById('camp-vacio-latitud').classList.remove('d-block');
                document.getElementById('latitud').classList.add('is-invalid');
                document.getElementById('latitud-invalida').classList.add('d-block');
            }else{
                document.getElementById('camp-vacio-latitud').classList.remove('d-block');
                document.getElementById('latitud').classList.remove('is-invalid'); 
                document.getElementById('latitud-invalida').classList.remove('d-block');
            }
              
        }
        
        if(estado_vacio_longitudEmp){
            document.getElementById('camp-vacio-longitud').classList.add('d-block');
            document.getElementById('longitud').classList.add('is-invalid');
        }else{
            if(!validar_cordenadas){
            document.getElementById('camp-vacio-longitud').classList.remove('d-block');
            document.getElementById('longitud').classList.add('is-invalid');
            document.getElementById('longitud-invalida').classList.add('d-block');
            }
            document.getElementById('camp-vacio-longitud').classList.remove('d-block');
            document.getElementById('longitud').classList.remove('is-invalid');
            document.getElementById('longitud-invalida').classList.remove('d-block');
        }
    
      /*  if(estado_vacio_facebookEmp){
            document.getElementById('facebook').classList.add('is-invalid');
        }else{
            document.getElementById('facebook').style.borderColor="#ced4da";
            document.getElementById('facebook').classList.remove('is-invalid');
           
    
    
        }
    
        if(estado_vacio_instagramEmp){
            document.getElementById('instagram').classList.add('is-invalid');
        }else{
            document.getElementById('instagram').classList.remove('is-invalid');
          
            
        }
    
        //
        if(estado_vacio_twiterEmp){
            document.getElementById('twiter').classList.add('is-invalid');
        }else{
            document.getElementById('twiter').classList.remove('is-invalid');
           
        }*/
        //validacion de Admin
        
       
        console.log(validar_cordenadas);
        if((validar_cordenadas)&&(estado_vacio_NombreEmp==false)&&(estado_vacio_correoEmp==false)&&(estado_vacio_esloganEmp==false)&&(estado_vacio_descripcionEmp==false)&&(estado_vacio_direccionEmp==false)&&(estado_vacio_paisEmp==false)&&(estado_vacio_latitudEmp==false)&&(estado_vacio_longitudEmp==false)&&(correo_valido_emp)){
          
           return true;
        }else{
            return false;
        }
        
    
    }
    
    
    
    
    function isValidCoordinates1(coordinates){
        if (!coordinates.match(/^[-]?\d+[\.]?\d*, [-]?\d+[\.]?\d*$/)) {
            return false;
        }
        const [latitude, longitude]=coordinates.split(",");
        return (latitude>-90 && latitude<90 && longitude>-180 && longitude<180);
    }
    
    function isValidCoordinates(latitude,longitude){
        let validlat=false;
        let validlong=false;
        var re1=/^[-]?\d+[\.]?\d*$/;
        if(re1.test(latitude)){
            validlat=true;
        }
        var re2=/^[-]?\d+[\.]?\d*$/;
        if(re2.test(longitude)){
            validlong=true;
        }
        
        return (latitude>-90 && latitude<90 && longitude>-180 && longitude<180 && validlat && validlong);
    }
    


    /*****************************************FUNCIONES PARA LA GESTION DE PRODUCTOS*********************************************************** */

    function generarSeccionProductos(){
      console.log(cuentaEmpresa);
     document.getElementById('content-table').innerHTML="";
     for(let i=0; i<cuentaEmpresa.productos.length;i++){
      document.getElementById('content-table').innerHTML+=` <tr>
      <th scope="row" style="padding-bottom: 0; margin-bottom: 0px;">
          <img src="${cuentaEmpresa.productos[i].imagen}" alt=""
            class="img-fluid z-depth-0" style="width:200px!important">
      </th>
      <td style="width:200px">
        <h5 class="mt-3">
          <strong>${cuentaEmpresa.productos[i].nombre}</strong>
        </h5>
        <p class="text-muted">${cuentaEmpresa.productos[i].descripcion}</p>
      </td>
      <td>${cuentaEmpresa.productos[i].codigo}</td>
      <td></td>
      <td>${cuentaEmpresa.productos[i].stock}</td>
      <td class="font-weight-bold">
        <strong>L. ${cuentaEmpresa.productos[i].precio}</strong>
      </td>
      <td>
        <div class="row"> <i class="fas fa-edit mr-3 ml-3 " onclick="editarProductoVista(${i})" style="cursor:pointer"></i>
          <i class="fas fa-trash-alt  " onclick="modificarSeleccionado(${i})" data-toggle="modal" data-target=".bd-example-modal-sm" style="cursor:pointer"></i></div>
       
      </td>
    </tr>`
     }


      document.getElementById('cont-productos').innerHTML="";
      document.getElementById('cont-productos').innerHTML+=`
      <div class="card chart-card col-12 col-lg-12" id="inventario-vertical" style="margin-right: 10px; margin-top: 50px; height: 600px;">
      <div class="card-body pb-0">
      <h5 class="card-title font-weight-bold">Inventario</h5>
      <p class="card-text mb-4">Fecha y hora</p>
      <div class="col-md-12 col-lg-12 mb-4 text-center">
       <h4 class="h1 font-weight-normal mb-3">
         <i class="fas fa-file-alt " style="color: #6A7998;"></i>
         <span class="d-inline-block count-registrados" data-from="0" data-to="${cuentaEmpresa.estado.inventario.registrados}" data-time="2000">${cuentaEmpresa.estado.inventario.registrados}</span>
       </h4>
       <p class="font-weight-normal text-muted">Registrados (Stock)</p>
     </div>

     <div class="col-md-12 col-lg-12 mb-4 text-center">
       <h4 class="h1 font-weight-normal mb-3">
         <i class="fas fa-cart-arrow-down " style="color: #6A7998;"></i>
         <span class="d-inline-block count-promo" data-from="0" data-to="${cuentaEmpresa.estado.inventario.promocion}" data-time="2000">${cuentaEmpresa.estado.inventario.promocion}</span>
       </h4>
       <p class="font-weight-normal text-muted">Promociones (Stock)</p>
     </div>

     <div class="col-md-12 col-lg-12 mb-4 text-center">
       <h4 class="h1 font-weight-normal mb-3">
         <i class="fas fa-exclamation-triangle" style="color: #6A7998;"></i>
         <span class="d-inline-block count-exis" data-from="0" data-to="${cuentaEmpresa.estado.inventario.exis_baja}" data-time="2000">${cuentaEmpresa.estado.inventario.exis_baja}</span>
       </h4>
       <p class="font-weight-normal text-muted">Productos con existencia baja</p>
     </div>
     <button type="button" class="btn mt-0 mb-0 " onclick="resetModalProducto()" data-toggle="modal" data-target="#modal-producto" style="background-color: #536F97; color: #ffffff; margin-left:60px">
       <i class="far fa-file-alt pr-2" aria-hidden="true" onclick="resetModalProducto()" ></i>Nuevo</button>
     </div>
 </div>
`     
        $('.count-registrados').counter();
        $('.count-promo').counter();
        $('.count-exis').counter();
        new WOW().init();


        document.getElementById('cont-inventario-horizontal').innerHTML="";
        document.getElementById('cont-inventario-horizontal').innerHTML+=`<div class="card chart-card col-11 mx-auto mt-20 mb-10" style="margin-top: 20px; display: none;" id="inventario" >
        <div class="card-body pb-0">
        <h5 class="card-title font-weight-bold" >Inventario</h5>
        <p class="card-text mb-4">Fecha y hora</p>
        <div class="col-md-4 col-lg-4 mb-4 text-center" style="float: left;">
         <h4 class="h1 font-weight-normal mb-3">
           <i class="fas fa-file-alt " style="color: #6A7998;"></i>
           <span class="d-inline-block count-registrados-1" data-from="0" data-to="${cuentaEmpresa.estado.inventario.registrados}" data-time="2000">${cuentaEmpresa.estado.inventario.registrados}</span>
         </h4>
         <p class="font-weight-normal text-muted">Registrados</p>
       </div>
 
       <div class="col-md-4 col-lg-4 mb-4 text-center" style="float: left;">
         <h4 class="h1 font-weight-normal mb-3">
           <i class="fas fa-cart-arrow-down " style="color: #6A7998;"></i>
           <span class="d-inline-block count-promo-1" data-from="0" data-to="${cuentaEmpresa.estado.inventario.promocion}" data-time="2000">${cuentaEmpresa.estado.inventario.promocion}</span>
         </h4>
         <p class="font-weight-normal text-muted">Promociones</p>
       </div>
 
       <div class="col-md-4 col-lg-4 mb-4 text-center" style="float: left;">
         <h4 class="h1 font-weight-normal mb-3">
           <i class="fas fa-exclamation-triangle" style="color: #6A7998;"></i>
           <span class="d-inline-block count-exis-1" data-from="0" data-to="${cuentaEmpresa.estado.inventario.exis_baja}" data-time="2000">${cuentaEmpresa.estado.inventario.exis_baja}</span>
         </h4>
         <p class="font-weight-normal text-muted">Productos con existencia baja</p>
       </div>
       <div class=" col-12">
        <button type="button" onclick="resetModalProducto()" class="btn mt-0 mb-30 mx-auto col-12 col-lg-2" data-toggle="modal" data-target="#modal-producto" style="margin-left: 200px; text-align: center; background-color: #536F97; color: #ffffff;">
          <i class="far fa-file-alt pr-2" aria-hidden="true" ></i>Nuevo</button>
        </div>
       </div>
       
   </div>`

        $('.count-registrados-1').counter();
        $('.count-promo-1').counter();
        $('.count-exis-1').counter();
        new WOW().init();

    }

    function validarProducto(){
      let permiso;
      
      
      if($('#form-nombre-producto-p').val()==""){
        $('#camp-vacio-nombre-producto').removeClass('d-none');
        $('#camp-vacio-nombre-producto').addClass('d-block');
        permiso=false;
      }else{
        $('#camp-vacio-nombre-producto').removeClass('d-block');
        $('#camp-vacio-nombre-producto').addClass('d-none');
        permiso=true;
      } 
      if($('#form-codigo-producto').val()==""){
        $('#camp-vacio-codigo').removeClass('d-none');
        $('#camp-vacio-codigo').addClass('d-block');
        permiso=false;
      }else{
        $('#camp-vacio-codigo').removeClass('d-block');
        $('#camp-vacio-codigo').addClass('d-none');
        permiso=true;
      } 
      console.log("categoria",$('#categoria').val() )
      if($('#categoria').val()==null){
        $('#camp-vacio-categoria-1').removeClass('d-none');
        $('#camp-vacio-categoria-1').addClass('d-block');
        permiso=false;
      }else{
        $('#camp-vacio-categoria-1').removeClass('d-block');
        $('#camp-vacio-categoria-1').addClass('d-none');
        permiso=true;
      } 
      if($('#form-descripcion-producto').val()==""){
        $('#camp-vacio-descripcion-producto').removeClass('d-none');
        $('#camp-vacio-descripcion-producto').addClass('d-block');
        permiso=false;
      }else{
        $('#camp-vacio-descripcion-producto').removeClass('d-block');
        $('#camp-vacio-descripcion-producto').addClass('d-none');
        permiso=true;
      } 
      if($('#form-precio-producto').val()==""){
        $('#camp-vacio-precio').removeClass('d-none');
        $('#camp-vacio-precio').addClass('d-block');
        permiso=false;
      }else{
        $('#camp-vacio-precio').removeClass('d-block');
        $('#camp-vacio-precio').addClass('d-none');
        permiso=true;
      } 
      if($('#form-stock-producto').val()==""){
        $('#camp-vacio-stock').removeClass('d-none');
        $('#camp-vacio-stock').addClass('d-block');
        permiso=false;
      }else{
        $('#camp-vacio-stock').removeClass('d-block');
        $('#camp-vacio-stock').addClass('d-none');
        permiso=true;
      } 
     
      
     return permiso;
    }

    function guardarProducto(){
     let acceso=validarProducto();
     if($('#img-producto').val()==""){
      $('#img-producto-vacia').removeClass('d-none');
      $('#img-producto-vacia').addClass('d-block');
      acceso=false;
    }else{
      $('#img-producto-vacia').removeClass('d-block');
      $('#img-producto-vacia').addClass('d-none');
      acceso=true;
    } 
      if(acceso ){
        console.log("acceso",acceso)
        //subir la imagen al servidor
        let peticion=new XMLHttpRequest();
          peticion.open('post',`../../Hi-Offer/backend/GestionArchivos/directory_controllerEmp.php?id=${indexEmpresa}`);
          peticion.send(new FormData(document.getElementById("form-imagen-producto1")));
          //peticion axios para guaradar el producto
         // console.log(($('#form-precio-producto').val()).toFixed(2))
           axios({
            method:'POST',
            url:urlProductos,
            responseType:'json',
            data:{
              "nombre": $('#form-nombre-producto-p').val(),
              "codigo":$('#form-codigo-producto').val(),
              "idCategoria":parseInt($('#categoria').val()),
              "descripcion":$('#form-descripcion-producto').val(),
              "precio":parseFloat($('#form-precio-producto').val()),
              "stock":parseInt($('#form-stock-producto').val()),
              "imagen":document.getElementById("img-producto").files[0].name,
              "empresa":cuentaEmpresa.nombre_empresa,
              "idEmpresa":indexEmpresa
            }
          }).then(res=>{
            $('#modal-producto').modal('hide');
            obtenerEmpActualizada();
          }).catch(error=>{console.error(error);
          });  
           
      }else{
        console.log("fallo");
      }
        
      
    }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    function generateUUID() {
      var d = new Date().getTime();
      var uuid = 'X4XYXX'.replace(/[XY]/g, function (c) {
          var r = (d + Math.random() * 16) % 16 | 0;
          d = Math.floor(d / 16);
          return (c == 'X' ? r : (r & 0x3 | 0x8)).toString(16);
      });
      return uuid;
  }
   
    function generarCodigo(){
      $('#form-codigo-producto').val(generateUUID().toUpperCase());
    }


    function generarCategorias(){
      document.getElementById('categoria').innerHTML=""
    axios({
      method:'GET',
      url:urlCategorias,
      responseType:'json',
    }).then(res=>{
      categorias=res.data;
    document.getElementById('categoria').innerHTML+=`<option  disabled selected>Seleccione una categoria</option>
    `
    console.log(categorias.length)
    for(let i=0;i<categorias.length;i++){
      document.getElementById('categoria').innerHTML+=`<option onchange="categoriaSeleccionada(${i})" value="${i}">${categorias[i].nombre_categoria}</option>`
    }
    }).catch(error=>{console.error(error);
    }); 


    }

    
    function categoriaSeleccionada(id){
      catSelecc=id;
      console.log("categoria Seleccionda", catSelecc);
    }


    function vistaProducto(){
      let validacion=false;
      let archivoImg=document.getElementById("img-producto");
      let ruta=archivoImg.value;
      let respuesta=validarImagen("img-producto");
      if(!respuesta){
        $('#img-producto-invalid').removeClass('d-none');
        $('#img-producto-invalid').addClass('d-block');
        validacion=false;
      }else{
        var visor=new FileReader();
        visor.onload=function(e){
          document.getElementById('visor-img-producto').innerHTML=`<img src="${e.target.result}" alt="thumbnail"  class="img-thumbnail col-12"
          style=" height:250px;"> `   
        }
        visor.readAsDataURL(archivoImg.files[0]);
        
        $('#img-producto-invalid').removeClass('d-block');
        $('#img-producto-invalid').addClass('d-none');
        validacion=true;
      }

      return validacion;

    }



    function resetModalProducto(){
      $('#form-nombre-producto-p').val("");
      $('#form-codigo-producto').val("");
      $('#categoria').val("Seleccione una categoria");
      $('#form-descripcion-producto').val("");
      $('#form-precio-producto').val("");
      $('#form-stock-producto').val("");
      let archivoimagen=document.getElementById('img-producto');
      let clone=archivoimagen.cloneNode();
      clone.value="";
      archivoimagen.parentNode.replaceChild(clone, archivoimagen);
      
      document.getElementById("visor-img-producto").innerHTML=`<img src="img/logotipo-subir.png" alt="thumbnail" class="img-thumbnail col-12"
      style=" height:250px; object-fit: cover;
      object-position: center center; ">`

      $('#btn-guardar-cambios-producto').removeClass('d-block');
      $('#btn-guardar-cambios-producto').addClass('d-none');
      $('#btn-guardar-producto').removeClass('d-none');
      $('#btn-guardar-producto').addClass('d-block');
      $('#anuncio').removeClass('d-none');
      $('#anuncio').addClass('d-block');
      $('#exampleModalLabel').removeClass('d-none');
      $('#exampleModalLabel').addClass('d-block');
      $('#titulo-editar').removeClass('d-block');
      $('#titulo-editar').addClass('d-none');

    }

    var producto_seleccionado;

    function editarProductoVista(id){
      generarCategorias()
      producto_seleccionado=id;
      console.log("producto seleccionado",producto_seleccionado)
      $('#modal-producto').modal('show');
      console.log(cuentaEmpresa.productos[id].imagen)
      //preparar modal para edicion
      $('#form-nombre-producto-p').val(cuentaEmpresa.productos[id].nombre);
      $('#form-codigo-producto').val(cuentaEmpresa.productos[id].codigo);
     // $('#categoria').val(categorias[cuentaEmpresa.productos[i].idCategoria].nombre_categoria);
      $('#form-descripcion-producto').val(cuentaEmpresa.productos[id].descripcion);
      $('#form-precio-producto').val(cuentaEmpresa.productos[id].precio);
      $('#form-stock-producto').val(cuentaEmpresa.productos[id].stock);
      document.getElementById('visor-img-producto').innerHTML= `<img src="${cuentaEmpresa.productos[id].imagen}" alt="thumbnail"  class="img-thumbnail col-12"
      style=" height:250px;"> `
    //  $('#btn-guardar-producto').addClass('d-none');
      
      let archivoimagen=document.getElementById('img-producto');
      let clone=archivoimagen.cloneNode();
      clone.value="";
      archivoimagen.parentNode.replaceChild(clone, archivoimagen);
      $('#btn-guardar-cambios-producto').removeClass('d-none');
      $('#btn-guardar-cambios-producto').addClass('d-block');
      $('#btn-guardar-producto').removeClass('d-block');
      $('#btn-guardar-producto').addClass('d-none');
      $('#anuncio').removeClass('d-block');
      $('#anuncio').addClass('d-none');
      $('#exampleModalLabel').removeClass('d-block');
      $('#exampleModalLabel').addClass('d-none');
      $('#titulo-editar').removeClass('d-none');
      $('#titulo-editar').addClass('d-block');
    }
    function categoriaEditar(){
      console.log(parseInt($('#categoria').val()))
    }

    function editarProducto(){ //ARREGLAR CODIGO
      $('#categoria').val();
      let acceso=validarProducto();
      var img_editar;
      if(acceso){
        //subir la imagen al servidor
        if(($('#img-producto').val()=="")){
          axios({
            method:'PUT',
            url:urlProductos+`?id=${producto_seleccionado}`,
            responseType:'json',
            data:{
              "nombre": $('#form-nombre-producto-p').val(),
              "codigo":$('#form-codigo-producto').val(),
              "idCategoria":parseInt($('#categoria').val()),
              "descripcion":$('#form-descripcion-producto').val(),
              "precio":parseFloat($('#form-precio-producto').val()),
              "stock":parseInt($('#form-stock-producto').val()),
              "imagen":"",
              "empresa":cuentaEmpresa.nombre_empresa,
              "idEmpresa":indexEmpresa
            }
          }).then(res=>{
            $('#modal-producto').modal('hide');
            obtenerEmpActualizada();
           
          }).catch(error=>{console.error(error);
          });  
    
        }else{
          let peticion=new XMLHttpRequest();
          peticion.open('post',`../../Hi-Offer/backend/GestionArchivos/directory_controllerEmp.php?id=${indexEmpresa}`);
          peticion.send(new FormData(document.getElementById("form-imagen-producto1")));
         // console.log(($('#form-precio-producto').val()).toFixed(2))
           axios({
            method:'PUT',
            url:urlProductos+`?id=${producto_seleccionado}`,
            responseType:'json',
            data:{
              "nombre": $('#form-nombre-producto-p').val(),
              "codigo":$('#form-codigo-producto').val(),
              "idCategoria":$('#categoria').val(),
              "descripcion":$('#form-descripcion-producto').val(),
              "precio":parseFloat($('#form-precio-producto').val()),
              "stock":parseInt($('#form-stock-producto').val()),
              "imagen":document.getElementById("img-producto").files[0].name,
              "empresa":cuentaEmpresa.nombre_empresa,
              "idEmpresa":indexEmpresa
            }
          }).then(res=>{
            $('#modal-producto').modal('hide');
             obtenerEmpActualizada();

          }).catch(error=>{console.error(error);
          });  
        } 
        $('#btn-guardar-cambios-producto').removeClass('d-block');
            $('#btn-guardar-cambios-producto').addClass('d-none');
            $('#btn-guardar-producto').removeClass('d-none');
            $('#btn-guardar-producto').addClass('d-block');
            $('#anuncio').removeClass('d-none');
            $('#anuncio').addClass('d-block');
            $('#exampleModalLabel').removeClass('d-none');
            $('#exampleModalLabel').addClass('d-block');
            $('#titulo-editar').removeClass('d-block');
            $('#titulo-editar').addClass('d-none');
           
      }else{
        console.log("fallo");
      }
        
      
    }


    function modificarSeleccionado(index){
      producto_seleccionado=index;
    }



    function eliminarProducto(){
      axios({
        method:'PUT',
        url:urlProductos,
        responseType:'json',
        data:{
          "accion":0,
          "idEmp":indexEmpresa,
          "idPro":producto_seleccionado
        }
      }).then(res=>{
       $('.bd-example-modal-sm').modal('hide');
         obtenerEmpActualizada();

      }).catch(error=>{console.error(error);
      });  
    }



    /***********************************************************FUNCIONES PARA LA GESTION DE SUCURSALES****************************************************************************** */

    function validarSucursal(){
      let confirmacion=false;
      if($('#form-nombre-sucursal').val()==""){
        $('#camp-vacio-nombreSucursal').removeClass('d-none');
        $('#camp-vacio-nombreSucursal').addClass('d-block');
        confirmacion=false;
      }else{
        $('#camp-vacio-nombreSucursal').removeClass('d-block');
        $('#camp-vacio-nombreSucursal').addClass('d-none');
        confirmacion=true;
      }
      if($('#form-ciudad-sucursal').val()==""){
        $('#camp-vacio-ciudad').removeClass('d-none');
        $('#camp-vacio-ciudad').addClass('d-block');
        confirmacion=false;
      }else{
        $('#camp-vacio-ciudad').removeClass('d-block');
        $('#camp-vacio-ciudad').addClass('d-none');
        confirmacion=true;
      }
      
      if($('#form-latitud-sucursal').val()==""){
        $('#camp-vacio-latitud-sucursal').removeClass('d-none');
        $('#camp-vacio-latitud-sucursal').addClass('d-block');
        confirmacion=false;
      }else{
        $('#camp-vacio-latitud-sucursal').removeClass('d-block');
        $('#camp-vacio-latitud-sucursal').addClass('d-none');
        confirmacion=true;
      }

      if($('#form-longitud-sucursal').val()==""){
        $('#camp-vacio-longitud-sucursal').removeClass('d-none');
        $('#camp-vacio-longitud-sucursal').addClass('d-block');
        confirmacion=false;
      }else{
        $('#camp-vacio-longitud-sucursal').removeClass('d-block');
        $('#camp-vacio-longitud-sucursal').addClass('d-none');
        confirmacion=true;
      }

      let validar_coordenadas=isValidCoordinates($('#form-latitud-sucursal').val(),$('#form-longitud-sucursal').val());
      if(!validar_coordenadas){
        $('#cord-invalid').removeClass('d-none');
        $('#cord-invalid').addClass('d-block');
        confirmacion=false;
      }else{
        $('#cord-invalid').removeClass('d-block');
        $('#cord-invalid').addClass('d-none');
        confirmacion=true;
      }
      return confirmacion;
  
    }

    
function isValidCoordinates(latitude,longitude){
  let validlat=false;
  let validlong=false;
  var re1=/^[-]?\d+[\.]?\d*$/;
  if(re1.test(latitude)){
      validlat=true;
  }
  var re2=/^[-]?\d+[\.]?\d*$/;
  if(re2.test(longitude)){
      validlong=true;
  }
  
  return (latitude>-90 && latitude<90 && longitude>-180 && longitude<180 && validlat && validlong);
}


function guardarSucursal(){
  let confirmacion=validarSucursal();
  if(confirmacion){
    axios({
      method:'POST',
      url:urlSucursales,
      responseType:'json',
      data:{
        "nombre":$('#form-nombre-sucursal').val(),
        "latitud":$('#form-latitud-sucursal').val(),
        "longitud":$('#form-longitud-sucursal').val(),
        "ciudad":$('#form-ciudad-sucursal').val(),
        "idEmpresa":indexEmpresa
      }
    }).then(res=>{
     $('#form-sucursales').modal('hide');
       obtenerEmpActualizada();

    }).catch(error=>{console.error(error);
    });  
  }
  else{
    console.log("ha fallado");
  }
}
////////////////////////////////////////////////////////////////////////////////////////////
  function generarMapa2(idCont,idNw,latitud,longitud,titulo,body){
    
    document.getElementById(idCont).innerHTML = `<div id='${idNw}' style='width: 100%; height: 100%;'allowfullscreen></div>`;
    const tilesProvider='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  let myMap=L.map(idNw).setView([latitud,-longitud],15);
  L.tileLayer(tilesProvider,{
      maxZoom:20
  }).addTo(myMap);

  let marker=L.marker([latitud,longitud]).addTo(myMap);
  marker.bindPopup(`<b>${titulo}</b><br>${body}.`).openPopup();
}
//////////////////////////////////////////////////////////////////////////////////////////////


function vistaPrevia(){
  let confirmacion=validarSucursal();
  if(confirmacion){
    generarMapa2('map-container-google--','view',$('#form-latitud-sucursal').val(),$('#form-longitud-sucursal').val(),
    $('#form-nombre-sucursal').val(),$('#form-ciudad-sucursal').val());
  }else{
    console.log("ha fallado");
  }
}



function generarSucursales(){
  
  document.getElementById("content-sucursales").innerHTML="";
  for(let i=0; i<cuentaEmpresa.sucursales.length;i++){
    document.getElementById("content-sucursales").innerHTML+=`<div class="card col-12 col-md-7 pr-0 pl-0 mt-10 mx-auto" style="margin-top: 30px; margin-bottom: 5px;">
    <div class="col-12 head-car">
      <i class="fas fa-ellipsis-v mr-auto " data-toggle="dropdown" onclick=""
      aria-haspopup="true" aria-expanded="false" style="float: right; cursor: pointer;" ></i>
      <div class="dropdown-menu  dropdown-primary dropdown-menu-right" style="font-size:13px ;" id="hola">
        <a class="dropdown-item" onclick="editarSucursalVista(${i})" href="#">Editar</a>
        <a class="dropdown-item" onclick="eliminarSucursal(${i})"   href="#">Eliminar</a>
      </div>
    </div>
    <hr>
        <div class="card-body">
          <div class=" container-fluid">
            <div class="row">
            <strong class="primary-font col-6">${cuentaEmpresa.sucursales[i].nombre}</strong>
            <small class="pull-right col-6 text-muted"><i class="fas fa-city"></i> ${cuentaEmpresa.sucursales[i].ciudad}</small></div>
            
            <div id="sucursal-${i}" col-12 row " class="z-depth-1-half col-md-12 col-12 map-container" style="height: 300px; padding:0px!important ">
          </div>
          </div>
      </div>
        </div>`
     

  }
  generarMapas();
  
}

function generarMapas(){
  var idNw;
  var lat;
  var long;
  var titulo;
  var body;
  var contador=0;
  for(let j=0; j<cuentaEmpresa.sucursales.length;j++){
    contador++;
    idGen=`sucursal-${j}`;
    idNw=`map-${j}`
    lat=cuentaEmpresa.sucursales[j].latitud;
    long=cuentaEmpresa.sucursales[j].longitud;
    titulo=cuentaEmpresa.sucursales[j].nombre;
    body=cuentaEmpresa.sucursales[j].ciudad;
    console.log(idGen,idNw,lat,long,titulo,body)
    generarMapa2(idGen,idNw,lat,long,titulo,body);
   
 }
}

var sucursalSleccionada;
function editarSucursalVista(id){
  sucursalSleccionada=id;
  $('#form-sucursales').modal('show');
  $('#form-nombre-sucursal').val(cuentaEmpresa.sucursales[id].nombre);
  $('#form-latitud-sucursal').val(cuentaEmpresa.sucursales[id].latitud);
  $('#form-longitud-sucursal').val(cuentaEmpresa.sucursales[id].longitud);
  $('#form-ciudad-sucursal').val(cuentaEmpresa.sucursales[id].ciudad);
  vistaPrevia();
  $('#btn-editar-sucursal').removeClass('d-none');
  $('#btn-editar-sucursal').addClass('d-block');
  $('#btn-guardar-sucursal').addClass('d-none');
}


function resetModalSurcursal(){
  $('#form-nombre-sucursal').val("");
  $('#form-latitud-sucursal').val("");
  $('#form-longitud-sucursal').val("");
  $('#form-ciudad-sucursal').val("");
  document.getElementById('map-container-google--').innerHTML=` <img src="img/icon-map.png" class="img-fluid mx-auto" style="height: 200px; margin-top: 50px;">`
  $('#btn-editar-sucursal').removeClass('d-block');
  $('#btn-editar-sucursal').addClass('d-none');
  $('#btn-guardar-sucursal').removeClass('d-none');
  $('#btn-guardar-sucursal').addClass('d-block');
}


function ActualizarSucursal(){
  let confirmacion=validarSucursal();
  if(confirmacion){
    axios({
      method:'PUT',
      url:urlSucursales+`?id=${sucursalSleccionada}`,
      responseType:'json',
      data:{
        "nombre":$('#form-nombre-sucursal').val(),
        "latitud":$('#form-latitud-sucursal').val(),
        "longitud":$('#form-longitud-sucursal').val(),
        "ciudad":$('#form-ciudad-sucursal').val(),
        "idEmpresa":indexEmpresa
      }
    }).then(res=>{
     $('#form-sucursales').modal('hide');
       obtenerEmpActualizada();
    }).catch(error=>{console.error(error);
    });  
  }
  else{
    console.log("ha fallado");
  }
}

function eliminarSucursal(id){
  axios({
    method:'PUT',
    url:urlSucursales,
    responseType:'json',
    data:{
      "accion":0,
      "idEmp":indexEmpresa,
      "idPro":id
    }
  }).then(res=>{
     obtenerEmpActualizada();

  }).catch(error=>{console.error(error);
  });  
}



function llenarSelectProductos(){
  document.getElementById('slect-producto').innerHTML="";
  document.getElementById('slect-producto').innerHTML=`<option value="-" disabled selected>Seleccione un producto</option>`
  for(let i=0;i<cuentaEmpresa.productos.length;i++){
    document.getElementById('slect-producto').innerHTML+=`
    <option value="${i}">${cuentaEmpresa.productos[i].nombre}</option>`
  }
 
}



function validarPromocion(){
  let permiso=false;
  if($('#slect-producto').val()=="-"){
    $('#camp-vacio-select').removeClass('d-none');
    $('#camp-vacio-select').addClass('d-block');
    permiso=false;
  }else{
    $('#camp-vacio-select').removeClass('d-block');
    $('#camp-vacio-select').addClass('d-none');
    permiso=true;
  } 

  if($('#precio-descuento').val()==""){
    $('#camp-vacio-precio-descuento').removeClass('d-none');
    $('#camp-vacio-precio-descuento').addClass('d-block');
    $('#descuento-invalid').removeClass('d-block');
    $('#descuento-invalid').addClass('d-none');
    permiso=false;
  }else{
    if($('#slect-producto').val()!="-"){
      let Pdescuento = parseFloat($('#precio-descuento').val());
      let indexPro=$('#slect-producto').val();
      let precioPro=parseFloat(cuentaEmpresa.productos[indexPro].precio) ;
      if(Pdescuento>precioPro){
        $('#descuento-invalid').removeClass('d-none');
        $('#descuento-invalid').addClass('d-block');
        $('#camp-vacio-precio-descuento').removeClass('d-block');
        $('#camp-vacio-precio-descuento').addClass('d-none');
        permiso=false;
      }else{
        $('#descuento-invalid').removeClass('d-block');
        $('#descuento-invalid').addClass('d-none');
        $('#camp-vacio-precio-descuento').removeClass('d-block');
        $('#camp-vacio-precio-descuento').addClass('d-none');
        permiso=true;

      }
    }
    $('#camp-vacio-select').removeClass('d-block');
    $('#camp-vacio-select').addClass('d-none');
    permiso=true;
  }
    let seleccionado=false
    if(arraySucursales.length==0){
      seleccionado=false
    }else{
      seleccionado=true
    }
    
    if(!seleccionado){
      $('#sucursal-vacio').removeClass('d-none');
      $('#sucursal-vacio').addClass('d-block');
    }else{
      $('#sucursal-vacio').removeClass('d-block');
      $('#sucursal-vacio').addClass('d-none');
    }

    if($('#fecha-inicial').val()==""){
      $('#fecha-inicial-vacia').removeClass('d-none');
      $('#fecha-inicial-vacia').addClass('d-block');
      permiso=false;
    }else{
      $('#fecha-inicial-vacia').removeClass('d-block');
      $('#fecha-inicial-vacia').addClass('d-none');
      permiso=true;
    } 
    if($('#fecha-final').val()==""){
      $('#fecha-final-vacia').removeClass('d-none');
      $('#fecha-final-vacia').addClass('d-block');
      $('#fecha-final-invalida').removeClass('d-block');
      $('#fecha-final-invalida').addClass('d-none');
      permiso=false;
    }else{
      let actual=moment().format('DD-MM-YYYY');
      if(moment($('#fecha-final').val()).isSame(moment(actual))){
        console.log("no")
        $('#fecha-final-vacia').removeClass('d-block');
        $('#fecha-final-vacia').addClass('d-none');
        $('#fecha-final-invalida').removeClass('d-none');
        $('#fecha-final-invalida').addClass('d-block');
        permiso=false;
      }else{
        $('#fecha-final-vacia').removeClass('d-block');
      $('#fecha-final-vacia').addClass('d-none');
      $('#fecha-final-invalida').removeClass('d-block');
      $('#fecha-final-invalida').addClass('d-none');
      permiso=true;
      }

      if($('sucursal-0').is(':checked')){
        console.log("mjum");
      }
      
  
      
    } 
    
  return permiso;
}

$( '#sucursal-0' ).on( 'click', function() {
  if( $(this).is(':checked') ){
      // Hacer algo si el checkbox ha sido seleccionado
      alert("El checkbox con valor " + $(this).val() + " ha sido seleccionado");
  } else {
      // Hacer algo si el checkbox ha sido deseleccionado
      alert("El checkbox con valor " + $(this).val() + " ha sido deseleccionado");
  }
});


var porcentaje;


function guardarPromocion(){
  let permiso=validarPromocion();
  if(permiso){
    console.log("limite",parseInt(plan.limitePromociones));
    console.log("promo",cuentaEmpresa.promociones.length);
    let limite=parseInt(plan.limitePromociones);
    let promo=cuentaEmpresa.promociones.length;
    if(promo<limite){
      
    axios({
      method:'POST',
      url:urlPromociones,
      responseType:'json',
      data:{
        "idProducto":parseInt($('#slect-producto').val()),
        "precio_descuento":parseFloat($('#precio-descuento').val()),
        "sucursales":arraySucursales,
        "fecha_inicial":$('#fecha-inicial').val(),
        "fecha_final":$('#fecha-final').val(),
        "porcentaje_descuento":porcentaje,
        "idEmp":indexEmpresa
      }
    }).then(res=>{
       obtenerEmpActualizada();
      $('#centralModalSmPromo').modal('hide');
    }).catch(error=>{console.error(error);
    });  
    }else{
      $('#centralModalSmPromo').modal('hide');
      console.log("ya cumplio el limite de promociones");
      $('#modal-limite-promo').modal('show');
    }
    
  }
}

function guardarPorcentaje(porcentaje1){
  porcentaje=porcentaje1
 
}


function generarPorcentaje(){
  if($('#precio-descuento').val()==""){
    $('#camp-vacio-precio-descuento').removeClass('d-none');
    $('#camp-vacio-precio-descuento').addClass('d-block');
    $('#descuento-invalid').removeClass('d-block');
    $('#descuento-invalid').addClass('d-none');
   
  }else{
    if($('#slect-producto').val()!="-"){
      var Pdescuento = parseFloat($('#precio-descuento').val());
      let indexPro=$('#slect-producto').val();
      console.log("producto ", indexPro)
      let precioPro=parseFloat(cuentaEmpresa.productos[indexPro].precio);
      if(Pdescuento>precioPro){
        $('#descuento-invalid').removeClass('d-none');
        $('#descuento-invalid').addClass('d-block');
        $('#camp-vacio-precio-descuento').removeClass('d-block');
        $('#camp-vacio-precio-descuento').addClass('d-none');
       
      }else{
        $('#descuento-invalid').removeClass('d-block');
        $('#descuento-invalid').addClass('d-none');
        $('#camp-vacio-precio-descuento').removeClass('d-block');
        $('#camp-vacio-precio-descuento').addClass('d-none');
        if($('#slect-producto').val()!="-"){
          let idpro=$('#slect-producto').val();
          var ctxD = document.getElementById("porcentaje-descuento").getContext('2d');
          var precioReal=parseFloat(cuentaEmpresa.productos[idpro].precio);
          let precioDescuento=parseFloat($('#precio-descuento').val());
          var porcentaje_descuento= Math.round(100-((Pdescuento/precioReal)*100));
          guardarPorcentaje(porcentaje_descuento);
          var porcentaje_restante=precioReal-precioDescuento;
          let myLineChart = new Chart(ctxD, {
            type: 'doughnut',
            data: {
              labels: ["% descuento", "precio real"],
              datasets: [{
                data: [porcentaje_restante,precioDescuento],
                backgroundColor: ["#8BD0ED", "#536F97"],
                hoverBackgroundColor: ["#8BD0ED","#536F97" ]
              }]
            },
            options: {
              responsive: true,
              legend: {
                position: 'right',
                align: 'center',
                labels: {
                  padding: 20
                }
              }
            }
          });
        }
       
        document.getElementById('texto-descuento').innerHTML="";
        document.getElementById('texto-descuento').innerHTML=`<p class="my-2" style="color: #80767A; font-size: 12px;">Se ha generado un descuento del ${porcentaje_descuento}%</p>`

      }
    }
  }
  
  
  }


  function generarPromociones(){
    document.getElementById('content-promociones').innerHTML="";
    console.log()
    for( let j=0; j<cuentaEmpresa.promociones.length;j++){
      var id=parseInt(cuentaEmpresa.promociones[j].idProducto) ;
   
      document.getElementById('content-promociones').innerHTML+=`<div class="card col-12  col-lg-2 col-md-4 pr-0 pl-0 mt-10 mx-2" style="margin-top: 30px; margin-bottom: 5px; float:left; ">
      <div class="col-12 head-car">
        <i class="fas fa-ellipsis-v mr-auto " data-toggle="dropdown" onclick=""
        aria-haspopup="true" aria-expanded="false" style="float: right; cursor: pointer;"  ></i>
        <div class="dropdown-menu  dropdown-primary dropdown-menu-right" style="font-size:13px ;" id="hola">
          <a class="dropdown-item" data-toggle="modal" data-target="#ficha-promocional-" onclick="generarQR(${j})">Generar ficha</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" data-toggle="modal" onclick="editarModalPromoVista(${j})" data-target="#centralModalSmPromo" href="#">Editar</a>
          <a class="dropdown-item" onclick="eliminarPromo(${j})">Eliminar</a>
        </div>
      </div>
      <hr>
          <div class="view overlay">
            <img src="${cuentaEmpresa.productos[id].imagen}" class="img-fluid"alt="" style="margin-top:0">
            <a><div class="mask rgba-white-slight"></div></a>
          </div>
          <div class="card-body">
            <h5 class="card-title mb-1">
              <strong><a href="" class="dark-grey-text">${cuentaEmpresa.productos[id].nombre}</a>
              </strong>
            </h5>
            <span class="badge badge-danger mb-2">Promoción</span><br>
            <div class='starrr'  style="color:blue!important"></div>
            
            <div class="card-footer pb-0">
          <div class="row mb-0" height:200px!important>
            <h5 class="mb-0 pb-0 mt-1 font-weight-bold">
              <span class="red-text">
                <strong style="font-size:20px">L.${cuentaEmpresa.promociones[j].precio_descuento}</strong>
              </span>
              <span class="grey-text">
                <small>
                  <s style="font-size:15px">L.${cuentaEmpresa.productos[id].precio}</s>
                </small>
              </span>
            </h5>
            <span class="float-right">
              <a class="" data-toggle="tooltip" data-placement="top" title="Add to Cart">
                <i class="fas fa-shopping-cart ml-3"></i>
              </a>
            </span>
          </div>
        </div>
          </div>
  </div>`
    }
    
$('.starrr').starrr({
  rating: 5,
 // readOnly: true
})
  }


  var promo_slec;
  function editarModalPromoVista(id){
    promo_slec=id;
    console.log("id",id)
    document.getElementById('slect-producto').innerHTML="";
    document.getElementById('slect-producto').innerHTML=`<option value="-" disabled selected>Seleccione un producto</option>`
    for(let i=0;i<cuentaEmpresa.productos.length;i++){
      document.getElementById('slect-producto').innerHTML+=`
      <option value="${i}">${cuentaEmpresa.productos[i].nombre}</option>`
    }
    document.getElementById("slect-producto").value = cuentaEmpresa.promociones[id].idProducto;
    $('#precio-descuento').val(cuentaEmpresa.promociones[id].precio_descuento);
    arraySucursales=cuentaEmpresa.promociones[id].sucursales;
    llenarListSucursalesAdd();
    $('#fecha-inicial').val(cuentaEmpresa.promociones[id].fecha_inicial);
    $('#fecha-final').val(cuentaEmpresa.promociones[id].fecha_final);
    generarPorcentaje();
    $('#btn-guardar-promo').removeClass('d-block');
    $('#btn-guardar-promo').addClass('d-none');
    $('#btn-editar-promo').removeClass('d-none');
    $('#btn-editar-promo').addClass('d-block');
    $('#fecha-inicial').val(moment().format('DD-MM-YYYY'));
  }


  function editarPromocion(){
    let permiso=validarPromocion();
    if(permiso){
      axios({
        method:'PUT',
        url:urlPromociones+`?id=${promo_slec}`+`&idEmp=${indexEmpresa}`,
        responseType:'json',
        data:{
          "idProducto":parseInt($('#slect-producto').val()),
          "precio_descuento":parseFloat($('#precio-descuento').val()).toFixed(2),
          "sucursales":arraySucursales,
          "fecha_inicial":$('#fecha-inicial').val(),
          "fecha_final":$('#fecha-final').val(),
          "porcentaje_descuento":porcentaje,
          "idEmp":indexEmpresa
        }
      }).then(res=>{
        obtenerEmpActualizada();
        $('#centralModalSmPromo').modal('hide');
      }).catch(error=>{console.error(error);
      });  
      
    }
  }


  $(document).ready(function () {
    $('.stepper').mdbStepper();
    })
    
    function someFunction21() {
    setTimeout(function () {
    $('#horizontal-stepper').nextStep();
    }, 2000);
    }

  
  function llenarModalListSucursales(){
    document.getElementById("list-sucursales").innerHTML="";
    for(let i=0;i<cuentaEmpresa.sucursales.length;i++){
      document.getElementById("list-sucursales").innerHTML+=`<span  class="list-group-item  list-group-item-action "  style="background-color: white; ">
      <strong style="font-weight: bold;">${cuentaEmpresa.sucursales[i].nombre}</strong><span onclick="agregarSucursalArray(${i})" class="z-depth-5"><i class=" z-depth-5 fas fa-plus-square mr-auto example hoverable " style="color: #536F97; font-size: 20px;float: right; cursor: pointer;"  ></i>
     </span>
    </span>
    <br>`
    }
  }


  function abrirModalSuc(){
    $('#centralModalSmPromo').modal("hide");
    $('#centralModalSmh').modal("show");

  }

  function agregarSucursalArray(id){
    let tempName=cuentaEmpresa.sucursales[id].nombre;
    console.log("array longitud",arraySucursales.length)
      if(arraySucursales.length>=1){
        let variable;
        for(let i=0;i<arraySucursales.length;i++){
          if(arraySucursales[i].nombre==tempName){
            variable=true;
            break;
          }
           
        }
        if(variable){
          console.log("ya existe");
        }else{
          arraySucursales.push(cuentaEmpresa.sucursales[id])
        }
      }else{
        arraySucursales.push(cuentaEmpresa.sucursales[id])
      }
    console.log("sucursales",arraySucursales);
    $('#centralModalSmh').modal("hide");
    $('#centralModalSmPromo').modal("show");
    llenarListSucursalesAdd();
 
  }


  function llenarListSucursalesAdd(){
    document.getElementById('list').innerHTML="";
    for(let i=0;i<arraySucursales.length;i++){
      document.getElementById('list').innerHTML+=` <span class="list-group-item list-group-item-action">${arraySucursales[i].nombre}<span><i class="far fa-trash-alt mr-auto " 
      aria-haspopup="true" aria-expanded="false" onclick="elmiminarListSuc(${i})" style="float: right; cursor: pointer;"  ></i>
     </span></span>`
    }
  }

  function elmiminarListSuc(id){
    arraySucursales.splice(id,1);
    llenarListSucursalesAdd();
  }

  function eliminarPromo(id){
    axios({
      method:'PUT',
      url:urlPromociones+`?id=${id}`,
      responseType:'json',
      data:{
        "accion":1,
        "idEmp":indexEmpresa
      }
    }).then(res=>{
      obtenerEmpActualizada();
     
    }).catch(error=>{console.error(error);
    }); 
  }


  function resetModalPromo(){
    arraySucursales=[];
    llenarSelectProductos();
    $('#fecha-inicial').val(moment().format('DD-MM-YYYY'));
    console.log(moment().format('DD-mm-YYYY'));
    llenarListSucursalesAdd();
    $('#fecha-final').val("");
    $('#precio-descuento').val("")
    generarPorcentaje();
    $('#btn-editar-promo').removeClass('d-block');
    $('#btn-editar-promo').addClass('d-none');
    $('#btn-guardar-promo').removeClass('d-none');
    $('#btn-guardar-promo').addClass('d-block');
    
  }
  

  //////////////////////////////////////////////////FUNCIONES PARA LA CONFIGURACION//////////////////////////////////////////////////////
  function generarConfigPlanes(){
    document.getElementById('info-plan').innerHTML="";
    document.getElementById('info-plan').innerHTML+=`Actualmente cuentas con el plan ${plan.nombre}.`

  }


  var planes1=[];
  function obtenerPlanes1(){
    axios({
      method:'GET',
      url:'../../Hi-Offer/backend/api/planes.php',
      responseType:'json',
      
  }).then(res=>{
      this.planes1=res.data;
      generarPlanes1();
  }).catch(error=>{console.error(error);
  });  
  };


  function generarPlanes1(){
    document.getElementById('planes-cambiar').innerHTML="";
    for (let i=0; i<planes1.length; i++){
      if(planes1[i].diseno=="Básico"){

        document.getElementById('planes-cambiar').innerHTML+=` <div class="col-md-5 col-xl-3  col-lg-3 col-8 col-xl-3   mx-auto mb-4 p-2">
        <div class="card text-center">
          <div class="card-header white" style="padding: 2px ;">
            <h4 class="h4 my-2" style="color: #546991; ">${planes1[i].nombre}</h4>
          </div>
          <div>
            <h1 class="card-title  pricing-card-title" style="margin-top: 30px; font-size:30px!important;">L ${planes1[i].precio} <small class="text-muted">/ ${planes1[i].plazo}</small></h1>
          </div>
          <div class="card-body">
            <p class="card-text "><h5 style="font-size: 14px; font-weight: bold; color: #546991;">Podras registrar ${planes1[i].limitePromociones} promociones</h5>
            ${planes1[i].descripcion}
            </p>
            <p> ${planes1[i].tiempoPruebaGratuita} días de prueba gratuita</p>

          </div>
          <div class="card-footer white">
              <a  onclick="cammbiarPlan(${i})"  class="btn btn-outline-indigo btn-md" href="#" role="button">Cambiar</a>
          </div>
        </div>
      </div>`
      }else{
        document.getElementById('planes-cambiar').innerHTML+=`
        
        <div class="col-md-5 col-xl-3  col-lg-3 col-8 mx-auto mb-4 p-2" >
        <div class="card text-center" style="background-color: #546991; border:0">
          <div class="card-header " style="padding: 2px ;">
            <h4 class="h4 white-text my-2">${planes1[i].nombre}</h4>
          </div>
          <div class="white">
            <h1 class="card-title  pricing-card-title" style="margin-top: 30px;  font-size:30px!important;">L ${planes1[i].precio} <small class="">/ ${planes1[i].plazo}</small></h1>
          </div>
          <div class="card-body white">
            <p class="card-text "><h5 style="font-size: 14px; font-weight: bold; color: #546991;">Podras registrar ${planes1[i].limitePromociones} promociones</h5>
            ${planes1[i].descripcion}
            </p>
            <p>${planes1[i].tiempoPruebaGratuita} días de prueba gratuita</p>

          </div>
          <div class="card-footer white">
              <a class="btn btn-md" onclick="cammbiarPlan(${i})" style="background-color: #51668C!important; color: white!important;" href="#" role="button">CAMBIAR</a>
          </div>
        </div>
      </div>`
      }
    }
  }

  function cammbiarPlan(id){
    console.log("cambiando plan")
    axios({
      method:'PUT',
      url:urlEmpresa+`?id=${indexEmpresa}`,
      responseType:'json',
      data:{
        "accion":11,
        "idPlan":id
      }
    }).then(res=>{
      axios({
        method:'PUT',
        url:urlEmpresa+`?id=${indexEmpresa}`,
        responseType:'json',
        data:{
          "accion":10,
          "estado":0
        }
    }).then(res=>{
      axios({
        method:'PUT',
        url:urlEmpresa+`?id=${indexEmpresa}`,
        responseType:'json',
        data:{
          "accion":12,
          "diaReg":moment().format("YYYY-MM-DD")
        }
        
    }).then(res=>{
      
    }).catch(error=>{console.error(error);
    });

    }).catch(error=>{console.error(error);
    }); 
    }).catch(error=>{console.error(error);
    }); 


    $('#centralModalSml').modal('hide');
    obtenerInformacionGeneral();
    $('#modalInicioPlan').modal('show');
   
  }


  function cerrarModalInfo(){
    $('#modalInicioPlan').modal('hide');
  }

  /*
  obtenerEmpActualizada();
      $('#centralModalSml').modal('hide')
  */



  /**********************FUNCIOBES PARA LA GESTION DE LA INFO DEL ADMINISTRADOR DE LA EMPRESA******************************** */
  function generarNombreAdmin(){
    document.getElementById('nombre-admin').innerHTML="";
    document.getElementById('nombre-admin').innerHTML+=`Admin. ${cuentaEmpresa.administradores[0].nombre_usuario}`;
    
  }

  function generarInfoAdmin(){
    document.getElementById('admin').innerHTML=cuentaEmpresa.administradores[0].nombre_usuario;
    document.getElementById('correo_admin').innerHTML=cuentaEmpresa.administradores[0].correo_Electronico;
  }


  function mostrarformulario(){
    document.getElementById('form-admin').classList.remove('d-none');
    document.getElementById('form-admin').classList.add('d-block');
    //asignar los valores
    $('#usuario').val(cuentaEmpresa.administradores[0].nombre_usuario);
    $('#email-usuario').val(cuentaEmpresa.administradores[0].correo_Electronico);
    $('#contraseña').val("");
    $('#contraseña2').val("");
    
  }

  function editarAdmin(){
    let permiso=validarAdmin();
    if(permiso){
      axios({
        method:'PUT',
        url:urlAdministrador+`?id=${indexEmpresa}`,
        responseType:'json',
        data:{
          "nombre_usuario":document.getElementById("usuario").value,
           "correo_electronico":document.getElementById("email-usuario").value,
           "contrasena":document.getElementById("contraseña2").value
        }
      }).then(res=>{
        document.getElementById('form-admin').classList.remove('d-block');
        document.getElementById('form-admin').classList.add('d-none');
        obtenerEmpActualizada();
      }).catch(error=>{console.error(error);
      }); 
  }
}



  function validarAdmin(){
    let permiso=false;
    if( $("#usuario").val()==""){
      document.getElementById('usuario').classList.add('is-invalid');
      document.getElementById('camp-vacio-us').style.marginTop="px";
      document.getElementById('camp-vacio-us').classList.add('d-block');
      permiso=false;
    }else{
      document.getElementById('usuario').classList.remove('is-invalid');
      document.getElementById('camp-vacio-us').classList.remove('d-block');
      permiso=true;
    }

    if($('#email-usuario').val()==""){
      document.getElementById('email-usuario').classList.add('is-invalid');
      document.getElementById('camp-vacio-correo-us').classList.add('d-block');
      permiso=false;
      let validar_email=validarEmail(document.getElementById('email-usuario'));
      if(!(validar_email)){
        document.getElementById('email-usuario').classList.add('is-invalid');
        document.getElementById('correo-invalido-us').classList.add('d-block');
        document.getElementById('camp-vacio-correo-us').classList.remove('d-block');
        permiso=false;
      }else{
        document.getElementById('email-usuario').classList.remove('is-invalid');
        document.getElementById('camp-vacio-correo-us').classList.remove('d-block');
        document.getElementById('correo-invalido-us').classList.remove('d-block');
        permiso=true;
      }
     
    }

    if($('#contraseña').val()==""){
      document.getElementById('contraseña').classList.add('is-invalid');
      document.getElementById('camp-vacio-contra-us').classList.add('d-block');
      permiso=false;
    }else{
      if($('#contraseña').val()!=cuentaEmpresa.administradores[0].contrasena){
        document.getElementById('contraseña').classList.add('is-invalid');
        document.getElementById('camp-vacio-contra-us').classList.remove('d-block');
        document.getElementById('contraseña-incorrecta').classList.add('d-block');
        permiso=false;
    }else{
      document.getElementById('contraseña-incorrecta').classList.remove('d-block');
      document.getElementById('contraseña').classList.remove('is-invalid');
      document.getElementById('camp-vacio-contra-us').classList.remove('d-block');
      permiso=true;
      }
    }

    
    if($('#contraseña2').val()==""){
      document.getElementById('contraseña2').classList.add('is-invalid');
      document.getElementById('campo-obligatorio').classList.add('d-block');
      permiso=false;
  }else{
    let validar_contrasena=validarContraseña('contraseña2');
      if(!validar_contrasena){
          document.getElementById('contraseña2').classList.add('is-invalid');
          document.getElementById('campo-obligatorio').classList.remove('d-block');
          document.getElementById('contra-invalida').classList.add('d-block');
          permiso=false
      }else{
          document.getElementById('contra-invalida').classList.remove('d-block');
          document.getElementById('contraseña2').classList.remove('is-invalid');
           document.getElementById('campo-obligatorio').classList.remove('d-block');
           permiso=true;
      }
      
  }
    return permiso;
   
  }



  function llenarModalperfilSucursales(){
    document.getElementById("content-sucursales-perfil").innerHTML="";
      for(let i=0; i<cuentaEmpresa.sucursales.length;i++){
        document.getElementById("content-sucursales-perfil").innerHTML+=`<li class="d-flex justify-content-between mb-1 mt-0 pb-2 pr-1 pl-1 pt-2 col-12">
        <div class="header container-fluid">
          <div class="row">
          <strong class="primary-font col-6">${cuentaEmpresa.sucursales[i].nombre}</strong>
          <small class="pull-right col-6 text-muted"><i class="fas fa-city"></i> ${cuentaEmpresa.sucursales[i].ciudad}</small></div>
          <hr>
          <div id="sucursal-modal-${i}" col-12 row " class="z-depth-1-half col-md-12 col-12 map-container" style="height: 300px; padding:0px!important ">
        </div>
    </li>`         
    }
    generarMapasModal();
  }


  function generarMapasModal(){
    var idNw;
    var lat;
    var long;
    var titulo;
    var body;
    var contador=0;
    for(let j=0; j<cuentaEmpresa.sucursales.length;j++){
      contador++;
      idGen=`sucursal-modal-${j}`;
      idNw=`map-suc-${j}`
      lat=cuentaEmpresa.sucursales[j].latitud;
      long=cuentaEmpresa.sucursales[j].longitud;
      titulo=cuentaEmpresa.sucursales[j].nombre;
      body=cuentaEmpresa.sucursales[j].ciudad;
      console.log(idGen,idNw,lat,long,titulo,body)
      generarMapa2(idGen,idNw,lat,long,titulo,body);
   }
  }
  
  function cerrarModalAdvertencia(){
    $('#modal-limite-promo').modal('hide');
  }


  function generarQR(idPromocion){
    let rutaQR
    axios({
      method:'GET',
      url:urlPromociones+`?idPromo=${idPromocion}&idEmp=${indexEmpresa}`,
      responseType:'json',
    }).then(res=>{
      rutaQR=res.data.ruta
      console.log(res.data.ruta);
      generarFicha(idPromocion,rutaQR)
    }).catch(error=>{console.error(error);
    }); 


    //generar ficha promocional
  }


function generarFicha(idPromocion,rutaQR){
  document.getElementById('content-ficha').innerHTML="";
  var idP=parseInt(cuentaEmpresa.promociones[idPromocion].idProducto)
  document.getElementById('content-ficha').innerHTML+=`<div class="col-lg-6 col-12">
    <div class="col-12 p-0">
      <img class="img-fluid" src="${rutaQR}">
    </div>
  </div>
  <div class="col-12 col-lg-6 pt-3"> 
    <h6>${cuentaEmpresa.productos[idP].nombre}</h6>
    <span class="red-text">
      <strong style="font-size:40px">${cuentaEmpresa.promociones[idPromocion].porcentaje_descuento}%</strong>
      <strong style="font-size:15px"> de descuento</strong>
      <span class="grey-text">
        <small>
          <s style="font-size:15px">L.${cuentaEmpresa.productos[idP].precio}</s>
        </small>
      </span>
      <span class="">
        <strong style="font-size:20px; font-weight: bold; color: black;">L.${cuentaEmpresa.promociones[idPromocion].precio_descuento}</strong>
      </span>
      
    </span>
    <h6 style="font-size:13px">Promoción vence: ${cuentaEmpresa.promociones[idPromocion].fecha_final}<h6>

  </div>`
}



function imprim1(){
  var printContents = document.getElementById("content-ficha").innerHTML;
          w = window.open();
          w.document.write(printContents);
          w.document.close(); // necessary for IE >= 10
          w.focus(); // necessary for IE >= 10
      w.print();
      w.close();
       return true;}



///metodo para generar promociones en el perfil

function generarPromoPerfil(){
  document.getElementById('cont-promo-perfil').innerHTML="";
      document.getElementById('cont-promo-perfil').innerHTML+=`<div class="row filas wow slideInLeft" >
      <h6 class="font-weight-bold mb-md-0 mb-4 mt-2 pt-1 col-lg-11 col-md-8 " style="color: #546991!important;"> <i class="fas fa-street-view mr-3 ml-5"></i>Lo más nuevo</h6>
      <a class="ver-mas col-lg-1 col-md-" onclick="verCategoria();">ver mas <i class="fas fa-arrow-right"></i></a>
      </div><div id="fila"  class="row fila-p wow slideInLeft"></div>`;
     
      for(let j=0; j<cuentaEmpresa.promociones.length;j++){
        var id=parseInt(cuentaEmpresa.promociones[j].idProducto) ;
          document.getElementById('fila').innerHTML+=` 
          <div class="card col-12  col-lg-2 col-md-4 pr-0 pl-0 mt-10 mx-2" style="margin-top: 30px; margin-bottom: 5px; float:left">
          <div class="view overlay">
            <img src="${cuentaEmpresa.productos[id].imagen}" class="img-fluid"alt="" style="margin-top:0">
            <a><div class="mask rgba-white-slight"></div></a>
          </div>
          <div class="card-body">
            <h5 class="card-title mb-1">
              <strong><a href="" class="dark-grey-text">${cuentaEmpresa.productos[id].nombre}</a>
              </strong>
            </h5>
            <span class="badge badge-danger mb-2">Promoción</span><br>
            <div class='starrr'  style="color:blue!important"></div>
            
            <div class="card-footer pb-0">
          <div class="row mb-0">
            <h5 class="mb-0 pb-0 mt-1 font-weight-bold">
              <span class="red-text">
                <strong style="font-size:20px">L.${cuentaEmpresa.promociones[j].precio_descuento}</strong>
              </span>
              <span class="grey-text">
                <small>
                  <s style="font-size:15px">L.${cuentaEmpresa.productos[id].precio}</s>
                </small>
              </span>
            </h5>
            <span class="float-right">
              <a class="" data-toggle="tooltip" data-placement="top" title="Add to Cart">
                <i class="fas fa-shopping-cart ml-3"></i>
              </a>
            </span>
          </div>
        </div>
          </div>
  </div>`;
      }
  
      $('.starrr').starrr({
        rating: 5,
        readOnly: true
      })
  
}
