var  urlEmpresa='../../Hi-Offer/backend/api/empresas.php';
var urlPlanes='../../Hi-Offer/backend/api/planes.php';
var urlPlataforma='../../Hi-Offer/backend/api/plataforma.php';
var plan;
var indexEmpresa;
var empresa;

/*
console.log("mes",moment().format("YYYY-MM-DD"));
fecha=moment().add(1, 'months').format("YYYY-MM-DD")
console.log(fecha)
*/

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

/***********************************FUNCIONES INICIALES************************************************ */


function iniciar() {
  document.getElementById('item-dashboard').classList.add('seleccionar');
  document.getElementById('dashboard').classList.remove('d-none');
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
      console.log(res.data);
      cuentaEmpresa=res.data;
     // console.log(cuentaEmpresa);
      obtenerPlan();
      verificarEntrada();
      verificarPrueba();
      generarDashboard();
      llenarSidebar();
     
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
    console.log(res.data.tiempoPruebaGratuita);
    llenarModalInfoPlan();
    llenarModalPagoPlan();
    generarPlanDash();
}).catch(error=>{console.error(error);
}); 
}

function verificarPrueba(){
var fecha_actual=moment().format("YYYY-MM-DD");
var fechaRegistro=moment(cuentaEmpresa.estado.diaReg);
var fechaHoy=moment(fecha_actual);
console.log(RegistroDate,fecha_actual);
var diferencia=fechaHoy.diff(fechaRegistro, 'days');
console.log("la diferencia es:", diferencia);
  //diasPrueba
  if(diferencia>=diasPrueba && !(precioPlan==0)){
    $('#modalDiscount').modal({backdrop: 'static', keyboard: false});
    $('#modalDiscount').modal('show');
   
  }else{
    console.log("todavia tiene Tiempo")
  }
}





function llenarModalInfoPlan(){
    document.getElementById("info").innerHTML="";
    document.getElementById("info").innerHTML+=`
    <h3 class="font-weight-bold">Información</h3>
              <p class="text-muted">Has adquirido el plan:${plan.nombre}</p> 
              <p>Límite de promociones a registrar: ${plan.limitePromociones}</p>
              <p>Plazos de pago:${plan.plazo}</p> 
              <p>Tiempo de prueba gratuita:${plan.tiempoPruebaGratuita}</p>`
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

//validar tarjeta
function cardFormValidate(){
  var cardValid = 0;

  //card number validation
  $('#cc-number123').validateCreditCard(function(result){
      if(result.valid){
          $("#numeroTarjeta").removeClass('d-block');
          cardValid = 1;
      }else{
        $("#numeroTarjeta").addClass('d-block');
          cardValid = 0;
      }
  });
  
  /*
  //card details validation
  var cardName = $("#name_on_card").val();
  var expMonth = $("#expiry_month").val();
  var expYear = $("#expiry_year").val();
  var cvv = $("#cvv").val();
  var regName = /^[a-z ,.'-]+$/i;
  var regMonth = /^01|02|03|04|05|06|07|08|09|10|11|12$/;
  var regYear = /^2017|2018|2019|2020|2021|2022|2023|2024|2025|2026|2027|2028|2029|2030|2031$/;
  var regCVV = /^[0-9]{3,3}$/;
  if (cardValid == 0) {
      $("#card_number").addClass('required');
      $("#card_number").focus();
      return false;
  }else if (!regMonth.test(expMonth)) {
      $("#card_number").removeClass('required');
      $("#expiry_month").addClass('required');
      $("#expiry_month").focus();
      return false;
  }else if (!regYear.test(expYear)) {
      $("#card_number").removeClass('required');
      $("#expiry_month").removeClass('required');
      $("#expiry_year").addClass('required');
      $("#expiry_year").focus();
      return false;
  }else if (!regCVV.test(cvv)) {
      $("#card_number").removeClass('required');
      $("#expiry_month").removeClass('required');
      $("#expiry_year").removeClass('required');
      $("#cvv").addClass('required');
      $("#cvv").focus();
      return false;
  }else if (!regName.test(cardName)) {
      $("#card_number").removeClass('required');
      $("#expiry_month").removeClass('required');
      $("#expiry_year").removeClass('required');
      $("#cvv").removeClass('required');
      $("#name_on_card").addClass('required');
      $("#name_on_card").focus();
      return false;
  }else{
      $("#card_number").removeClass('required');
      $("#expiry_month").removeClass('required');
      $("#expiry_year").removeClass('required');
      $("#cvv").removeClass('required');
      $("#name_on_card").removeClass('required');
      return true;
  } */
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

function editarPerfil(){
  console.log("entre");
  document.getElementById('editar').style.display="none";
  document.getElementById('guardar').style.display="block";
  document.getElementById('editar-portada').style.display="block";
  document.getElementById('editar-perfil').style.display="block";
  document.getElementById('editar-informacion').style.display="block";
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

// Doughnut
var ctxD = document.getElementById("doughnutChart").getContext('2d');
var myLineChart = new Chart(ctxD, {
  type: 'doughnut',
  data: {
    labels: ["Vendidos", "Añadidos al carrito"],
    datasets: [{
      data: [100, 50],
      backgroundColor: ["#8BD0ED", "#546991"],
      hoverBackgroundColor: ["#8BD0ED", "#54699"]
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

// Minimalist charts

//bar
var ctxB = document.getElementById("barChart").getContext('2d');
var myBarChart = new Chart(ctxB, {
  type: 'bar',
  data: {
    labels: ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes","Sábado"],
    datasets: [{
      label: '# De ventas',
      data: [12, 19, 3, 5, 2, 3,50],
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
    porcentaje2=(total_seguidores_mes_pasado/total_seguidores_mes_actual)*100;
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
    

}

function generarPlanDash(){
  document.getElementById('cont-name-plan').innerHTML="";
  if(plan.diseno=="Básico"){
    document.getElementById('cont-name-plan').innerHTML=`<label style="font-size: 13px; color: #B8BEC2; margin-top: -10px;" for="dash">Plan ${plan.nombre}</label>`;
  }else{
    document.getElementById('cont-name-plan').innerHTML=` <span class="badge badge-danger mb-2 ">${plan.nombre}</span>`
  }
}









