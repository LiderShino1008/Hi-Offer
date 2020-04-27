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


/* *******************************FUNCIONES DE VALIDACION******************************************* */ 
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












