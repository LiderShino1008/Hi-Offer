
function mostrarGuardado(){
  window.location='perfil/promociones_guardadas.html';
}

function mostrarEmpresasFav(){
  window.location='perfil/empresas_favoritas.html';
}

function buscarPromociones(){
  window.location='perfil/buscar_promociones.html';
}

function todasLasEmpresas(){
  window.location='perfil/todas_las_empresas.html';
}

// popovers Initialization
function editarPerfil(){
  console.log("entre");
 
 
  document.getElementById('editar-portada').style.display="block";
  document.getElementById('editar-perfil').style.display="block";
  document.getElementById('editar-informacion').style.display="block";
}

function guardarCambios(){
 
 
  document.getElementById('editar-portada').style.display="none";
  document.getElementById('editar-portada').classList.add('d-none');
  document.getElementById('editar-perfil').style.display="none";
  document.getElementById('editar-informacion').style.display="none";

  console.log("entre");

}

  
  
   



  