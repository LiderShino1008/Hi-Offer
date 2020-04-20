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

function iniciar() {
  document.getElementById('dashboard').classList.remove('d-none');
  document.getElementById('item-dashboard').classList.add('seleccionar');
  document.getElementById('item-perfil').classList.remove('seleccionar');
  document.getElementById('perfil-empresarial').classList.add('d-none');
}iniciar();

//Controlador 
function dashboard(){
  document.getElementById('dashboard').classList.remove('d-none');
  document.getElementById('item-dashboard').classList.add('seleccionar');
  document.getElementById('item-perfil').classList.remove('seleccionar');
  document.getElementById('perfil-empresarial').classList.add('d-none')
}

function perfil(){
  document.getElementById('dashboard').classList.add('d-none');
  document.getElementById('item-dashboard').classList.remove('seleccionar');
  document.getElementById('item-perfil').classList.add('seleccionar');
  document.getElementById('perfil-empresarial').classList.remove('d-none');
}

/* FUNCION PARA GENERAR MAPA*/
function generarMapa(){
  let latitud;
  let longitud;
  var coord={latitud, longitud}
  var map=new google.map.Map(documen.getElementById(''),{
    zoom: 10,
    center:coord

  }) //donde vamos a ubicar el mapa

}