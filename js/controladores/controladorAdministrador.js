$(document).ready(() => {
	// SideNav Button Initialization
  $(".button-collapse").sideNav();
  // SideNav Scrollbar Initialization
  var sideNavScrollbar = document.querySelector('.custom-scrollbar');
  var ps = new PerfectScrollbar(sideNavScrollbar);
});




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