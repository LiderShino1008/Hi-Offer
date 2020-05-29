/*controlador para gestionar la informacion de lo usuarios*/
//consultar al servidor cual es el usuario actual
//////////////////////////////////SECCION DE URL////////////////////////////////////////////////
var urlCategorias='../../Hi-Offer/backend/api/categorias.php';
var urlUsuarios='../../Hi-Offer/backend/api/usuarios.php';
////////////////////////SECCION DE VARIABLES GLOBALES////////////////////////////////////////
var listcategorias;
var indexUsuario;
var usuario;
////////////////////////////FUNCIONES PARA GENERAR ELEMENTOS//////////////////////////////////////


axios({
  method:'GET',
  url:'../../Hi-Offer/backend/api/plataforma.php',
  responseType:'json',
}).then(res=>{
  console.log(res.data[0].usuarioActual)
  indexUsuario=res.data[0].usuarioActual;
 // obtenerGuardados();
  obtenerUsuario();
}).catch(error=>{console.error(error);
}); 

axios({
  method:'GET',
  url:urlCategorias,
  responseType:'json',
}).then(res=>{
   listcategorias=res.data;
   generar_categorias()
   //generarCarrito();
}).catch(error=>{console.error(error);
}); 

function obtenerUsuario(){
  axios({
    method:'GET',
    url:urlUsuarios+`?id=${indexUsuario}`,
    responseType:'json',
  }).then(res=>{
     usuario=res.data;
     console.log(usuario)
    // generarCarrito(usuario);
  }).catch(error=>{console.error(error);
  }); 
}




$('.collapse').collapse()
function generar_categorias(){
    console.log(document.getElementById('categoriasMenu'));
    document.getElementById('categoriasMenu').innerHTML="";
    for(let i=0; i<listcategorias.length; i++){
      document.getElementById('categoriasMenu').innerHTML+=`<a class="dropdown-item" class="mover" onclick="verCategoria(${i})" href="#">${listcategorias[i].nombre_categoria}</a>       `
    }
}



function verCategoria(index){
    window.location='perfil/categoria.html'
  }
  
function verProducto(categoria,promocion){
  window.location=`perfil/promocion.php?cat=${categoria}&id=${promocion}`
}


function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
  results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}


function generarCarrito(usuario){
  document.getElementById('list-carrito').innerHTML="";
  if(usuario.carrito.length>0){
    for(let i=0; i<usuario.carrito.length;i++)
    document.getElementById('list-carrito').innerHTML+=`<tr>
    <td></td>
    <td>
      <h5 class="mt-3">
        <strong>${listcategorias[usuario.carrito[i].idCat].promociones[usuario.carrito[i].idPromo].nombre}</strong>
      </h5>
      <p class="text-muted">${listcategorias[usuario.carrito[i].idCat].nombre_categoria}</p>
    </td>
    <td>White</td>
    <td></td>
    <td>${listcategorias[usuario.carrito[i].idCat].promociones[usuario.carrito[i].idPromo].nombre}</td>
    <td>
      <input type="number" value="${parseInt(usuario.carrito[i].cantidad)}" aria-label="Search" class="form-control" style="width: 100px">
    </td>
    <td class="font-weight-bold">
      <strong>L.${listcategorias[usuario.carrito[i].idCat].promociones[usuario.carrito[i].idPromo].precio_descuento}</strong>
    </td>
    <td>
      <button type="button" class="btn btn-sm btn-primary" data-toggle="tooltip" data-placement="top"
        title="Remove item" style="background-color: #546991!important;">X
      </button>
    </td>
  </tr>`
  }
  
}



function verNot(){
  $('.toast').toast('show');
}