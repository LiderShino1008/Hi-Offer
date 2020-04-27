/*controlador para gestionar la informacion de lo usuarios*/

$('.collapse').collapse()
function generar_categorias(){
    console.log(document.getElementById('categoriasMenu'));
    document.getElementById('categoriasMenu').innerHTML="";
    for(let i=0; i<categorias.length; i++){
      document.getElementById('categoriasMenu').innerHTML+=`<a class="dropdown-item" onclick="verCategoria(${i})" href="#">${categorias[i].nombreCategoria}</a>       `
    }
}

generar_categorias();

function verCategoria(index){
    window.location='perfil/categoria.html'
  }
  
function verProducto(index1,index2){
  window.location='perfil/promocion.html'
}