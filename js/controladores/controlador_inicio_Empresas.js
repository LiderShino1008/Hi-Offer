var  urlEmpresa='../../Hi-Offer/backend/api/empresas.php';
var urlPlanes='../../Hi-Offer/backend/api/planes.php';
var urlPlataforma='../../Hi-Offer/backend/api/plataforma.php';
var urlComentarios='../../Hi-Offer/backend/api/comentarios.php';
var plan;
var indexEmpresa;
var empresa;


/*
console.log("mes",moment().format("YYYY-MM-DD"));
fecha=moment().add(1, 'months').format("YYYY-MM-DD")
console.log(fecha)
*/


document.addEventListener("DOMContentLoaded",()=>{
  var form_banner=document.getElementById("form-subir");
  form_banner.addEventListener("submit",function(event){
    event.preventDefault();
    subir_banner(this);
  });
});


document.addEventListener("DOMContentLoaded",()=>{
  var form_logotipo=document.getElementById("form-logotipo");
  form_banner.addEventListener("submit",function(event){
    event.preventDefault();
    subirLogotipo(this);
  });
});

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
     }
  
} 

function  mostrarinfoPlan(){
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
  $('#centralModalSm').modal({backdrop: 'static', keyboard: false});
  $('#centralModalSm').modal('show');
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
    console.log("entrada no actualizada")
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
  console.log("entre");
  document.getElementById('grafico').classList.remove('d-none');
  document.getElementById('grafico').classList.add('d-block');
  console.log("sali");
}

function mostrarformulario(){
  document.getElementById('form-admin').classList.remove('d-none');
  document.getElementById('form-admin').classList.add('d-block');

}


function generarMapa(){
  document.getElementById('map-container-google-1').classList.remove('d-none');
  document.getElementById('map-container-google-1').classList.add('d-block');

}

//$('#modalInicio').modal('show'); 
/* FUNCION PARA GENERAR MAPA*/

function generarMapa1(){ 
  let latitud;
  let longitud;
  var coord={latitud, longitud}
  var map=new google.map.Map(documen.getElementById(''),{
    zoom: 10,
    center:coord

  }) //donde vamos a ubicar el mapa
  

}



var ctxD = document.getElementById("porcentaje-descuento").getContext('2d');
var myLineChart = new Chart(ctxD, {
  type: 'doughnut',
  data: {
    labels: ["Precio total", "descuento"],
    datasets: [{
      data: [100, 50],
      backgroundColor: ["#C1BFC2", "#57CDFF"],
      hoverBackgroundColor: ["#C1BFC2", "#57CDFF"]
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



/***************************************GENERANDO DASHBOARD****************************************************** */

    function generarDashboard(){
      
            total_inventario=cuentaEmpresa.estado.total_ventas;
            total_vendido=cuentaEmpresa.estado.total_ventas_mes;
            porcentaje=(total_vendido/total_inventario)*100
            console.log("porcentaje", porcentaje); 
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
          if( total_seguidores_mes_actual>total_seguidores_mes_pasado){
            porcentaje2=100-((total_seguidores_mes_pasado/total_seguidores_mes_actual)*100);
          }else{
            porcentaje2=0;
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
          if( total_visitas_mes_actual>total_visitas_mes_pasado){
            porcentaje3=100-((total_visitas_mes_pasado/total_visitas_mes_actual)*100);
          }else{
            porcentaje3=0;
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
        
        //porcentajes
        let porcentaje_vendidos=(promociones_vendidas/total_promociones)*100;
        let porcentaje_carrito=(promociones_carrito/total_promociones)*100;
        let porcentaje_inactivos=(cantidad_inactivos/total_promociones)*100;

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
                          
                          

       //generar seccion de nuevos comentarios
       document.getElementById('cont-nuevos-comentarios').innerHTML="";
       var comentarios=cuentaEmpresa.comentarios;
       console.log(comentarios);
       var reversed = comentarios.reverse();
       for(let i=0; i<2; i++){
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

     // const reversed = comentarios.reverse();
     

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
       }
 
       
    }





function generarPlanDash(){
  document.getElementById('cont-name-plan').innerHTML="";
  if(plan.diseno=="Básico"){
    document.getElementById('cont-name-plan').innerHTML=`<label style="font-size: 13px; color: #B8BEC2; margin-top: -10px;" for="dash">Plan ${plan.nombre}</label>`;
  }else{
    document.getElementById('cont-name-plan').innerHTML=` <span class="badge badge-danger mb-2 ">${plan.nombre}</span>`
  }


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
    console.log(res.data);
    cuentaEmpresa=res.data;
    generarPerfil();
    llenarSidebar();
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


  function generarPerfil(){
    if(cuentaEmpresa.Banner!=0){
      //var urString=
      document.getElementById("visor-banner").style.backgroundImage=`url(${cuentaEmpresa.Banner})`;
      
    }if(!(cuentaEmpresa.logotipo==0)){
      document.getElementById('cont-logotipo').innerHTML=`<img id="img-perfil" class=" avatar rounded-circle foto-perfil2 z-depth-1"src="${cuentaEmpresa.logotipo}" style="width: 200px!important; margin-bottom: 30px; height: 200px; margin-top: 50px!important;" alt="avatar" ></img>
      `
    }

    document.getElementById('div-general').innerHTML=`<div class="col-12 " style="text-align: center; color: white!important;" ><h6 class="nombre-emp " style=" color: white!important;" >${cuentaEmpresa.nombre_empresa}</h6>
    <p class="col-12" style="margin-bottom:10px" >"${cuentaEmpresa.eslogan}"</p></div>`

    
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