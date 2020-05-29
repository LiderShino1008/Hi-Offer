/*******************FUNCIONES DE ANIMACION******************* */
// MDB Lightbox Init
var urlCategorias='../../Hi-Offer/backend/api/categorias.php';
var urlUsuarios='../../Hi-Offer/backend/api/usuarios.php';
var urlPrmociones='../../Hi-Offer/backend/api/promociones.php';
var urlCarrito='../../Hi-Offer/backend/api/carrito.php';
var urlventas='../../Hi-Offer/backend/api/ventas.php';
var urlpedidos='../../Hi-Offer/backend/api/pedidos.php';
var urlEmpresas='../../Hi-Offer/backend/api/empresas.php';
////////////////////////SECCION DE VARIABLES GLOBALES////////////////////////////////////////
var listcategorias;
var indexUsuario;
var usuario;
var guardados=[];
var estado_guardado=true;
////////////////////////////FUNCIONES PARA GENERAR ELEMENTOS//////////////////////////////////////
axios({
  method:'GET',
  url:'../../Hi-Offer/backend/api/plataforma.php',
  responseType:'json',
}).then(res=>{
  console.log(res.data[0].usuarioActual)
  indexUsuario=res.data[0].usuarioActual;
  //obtenerGuardados();
  obtenerUsuario();
}).catch(error=>{console.error(error);
}); 




function obtenerUsuario(){
  axios({
    method:'GET',
    url:urlUsuarios+`?id=${indexUsuario}`,
    responseType:'json',
  }).then(res=>{
     guardado=res.data.guardado;
     evaluar();
     usuario=res.data;
     console.log(usuario)
     obtenerCategorias();
  }).catch(error=>{console.error(error);
  }); 
}

function obtenerCategorias(){
    axios({
        method:'GET',
        url:urlCategorias,
        responseType:'json',
      }).then(res=>{
         listcategorias=res.data;
         generar_categorias();
         generarInfoCat();
         //generarCarrito();
         generarCarrito(usuario);
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
  let idEtiqueta;
  if(usuario.carrito.length>0){
    for(let i=0; i<usuario.carrito.length;i++){
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
      <input type="number" id="cantidad-${i}" value="" aria-label="Search" class="form-control" style="width: 100px">
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
    idEtiqueta=`#cantidad-${i}`
    //document.getElementById(idEtiqueta).value=usuario.carrito[i].cantidad
    console.log("test",usuario.carrito[i].idCantidad)
    $(idEtiqueta).val(parseInt(usuario.carrito[i].idCantidad));
   
   }
  }
  
}



function verNot(){
  $('.toast').toast('show');
}


/*$(function () {
    $("#mdb-lightbox-ui").load("mdb-addons/mdb-lightbox-ui.html");
 });


 // Material Select Initialization
 
$(document).ready(function() {
	$('.mdb-select').material_select();
});*/

///obtener el indice de la categoria y del producto
var indexPromo=getParameterByName('id');
var indexcat=getParameterByName('cat');
console.log(indexPromo,indexcat);
var promocion;

function obtenerPromocion(){
    axios({
        method:'GET',
        url:urlPrmociones+`?idCat=${indexcat}&idPromo=${indexPromo}`,
        responseType:'json',
      }).then(res=>{
         promocion=res.data;
         console.log(promocion);
         obtenerGuardados()
         generarPromocion()
         generarCalificacion()
         obtenerCategorias();
      }).catch(error=>{console.error(error);
      }); 
}obtenerPromocion();
//promociones.php?idCat=2&idPromo=0


function obtenerGuardados(){
    console.log("indice",indexUsuario)
    axios({
      method:'GET',
      url:urlUsuarios+`?id=${indexUsuario}`,
      responseType:'json',
    }).then(res=>{
        console.log(res.data.guardado)
        guardados=res.data.guardado;
        evaluar();
    }).catch(error=>{console.error(error);
    }); 
  }

$(".my-rating").starRating({
    starSize: 20,
    callback: function(currentRating, $el){
       console.log("hola")
    }
});




function generarPromocion(){
    document.getElementById('visor-img').innerHTML+=`<img src="../${promocion.imagen}"
    alt="First slide" class="img-fluid">`;
    document.getElementById('info-2').innerHTML+=`<h2 class="h2-responsive text-center text-md-left product-name font-weight-bold dark-grey-text mb-1 ml-xl-0 ml-4">${promocion.nombre}</h2>
    <span class="badge badge-danger product mb-4 ml-xl-0 ml-4">Promoción</span>
   `
    if(promocion.stock>0){
        document.getElementById('info-2').innerHTML+=` <span class="badge badge-success product mb-4 ml-2">disponible</span>`
    }else{
        document.getElementById('info-2').innerHTML+=` <span class="badge badge-danger product mb-4 ml-2">Agotado</span>`
    }
    document.getElementById('info-3').innerHTML+=` <span class="red-text font-weight-bold">
        <strong>L.${promocion.precio_descuento}</strong>
    </span>
    <span class="grey-text">
        <small>
        <s>L. ${promocion.precio_real}</s>
        </small>
    </span>
    <span class=" font-weight-bold"><br>
        <strong style="font-size: 15px;">${promocion.porcentaje_descuento}% de descuento</strong>
        </span>
        `
    document.getElementById('info-4').innerHTML+=` <p class="ml-xl-0 ml-4">${promocion.descripcion}.</p>
        <p class="ml-xl-0 ml-4">
          <strong style="font-weight: bold;">Stock: </strong>${promocion.stock}</p>
          <p class="ml-xl-0 ml-4">
          <strong style="font-weight: bold;">ID: </strong>${promocion.stock}</p>
        <p class="ml-xl-0 ml-4" id="name-cat">
          <p class="ml-xl-0 ml-4">
            <strong style="font-weight: bold;">Distribuidor: </strong>${promocion.Distribuidor}</p>`

    document.getElementById('botones').innerHTML+=`<button onclick="agregarAlCarrito()"  data-toggle="modal" data-target="#ModalWarning1"  class="btn btn-primary btn-rounded p-3 ml-auto  text-md-left" style="background-color:#184F78!important" >
    <i class="fas fa-cart-plus mr-2 col-2"  aria-hidden="true"></i> Añadir al carrito</button>
    <button class="btn btn-primary btn-rounded p-3 ml-auto  text-md-left" onclick="prepararModalPagoUnoSolo()" data-toggle="modal" data-target="#ModalPago" style="background-color: #1F69B3!important;">
        <i class="fas fa-cart-plus mr-2  col-2" aria-hidden="true"></i> Comprar ahora</button>
        
`
        
}

function  generarInfoCat(){
    document.getElementById('name-cat').innerHTML="";
    document.getElementById('name-cat').innerHTML+=`  <strong style="font-weight: bold;">Categoría: </strong>${listcategorias[indexcat].nombre_categoria}</p>`
}

        function evaluar(){
            if(guardados.length>0){
                for(let i=0; i<guardados.length;i++){
                    if(guardados[i].idCat==indexcat && guardados[i].idPromo==indexPromo){
                        estado_guardado=false
                    }
                }
                evaluarEstadoGuardado();
            } 
        }

       function generarCalificacion(){
            let calificacion=promocion.calificacion
            console.log("la calificacion es:",calificacion)
            $('.my-rating-4').starRating({ 
                totalStars: 5,
                initialRating:calificacion,
                starShape: 'rounded',
                starSize: 23,
                emptyColor: 'lightgray',
                hoverColor: '#FFC107',
                activeColor: '#FFC107',
                useGradient: false,
                readOnly: true
            });
        }
        
var estado
function agregarAlCarrito(){
    axios({
        method:'POST',
        url:urlCarrito+`?idUsuario=${indexUsuario}`,
        responseType:'json',
        data:{
            "idCat":parseInt(indexcat),
            "idPromo":parseInt(indexPromo),
            "cantidad":parseInt($('#input-cant').val())
        }
      }).then(res=>{
        console.log(res.data)
        estado=res.data.estado
         obtenerUsuario();
         comprobarEstado()
        
      }).catch(error=>{console.error(error);
      });  
}

function comprobarEstado(){
    if(estado){
        generarNotificacion1("Este articulo ya fue agregado al carrito.<br>")
    }else{
        generarNotificacion1("Acabas de agregar un elemento al carrito.<br>¡Que vivan las compras!")
    }
}


function generarNotificacion1(mensaje){
    $('#info-not').html(mensaje)
}


function guardarPromocion(){
   //guardar la publicacion en el servidor
   axios({
    method:'POST',
    url:urlUsuarios,
    responseType:'json',
    data:{"guardarPromo":0,"idUS":indexUsuario,"idCat":parseInt(indexcat),"idPromo":parseInt(indexPromo)}
  }).then(res=>{
    console.log(res.data)
    estado_guardado=res.data.estado
    obtenerUsuario();
    evaluarEstadoGuardado();
  }).catch(error=>{console.error(error);
  });  
}

function evaluarEstadoGuardado(){
    if(!estado_guardado){//lo guard0
        document.getElementById('estado-guardado').innerHTML= `<a class="col-lg-3" onclick="guardarPromocion()" style="font-size:15px; float: right;">Guardado<i style="font-size: 20px; color:#546991!important"  class=" ml-2 fas fa-bookmark"></i></a>`
    }else{
        document.getElementById('estado-guardado').innerHTML=`<a class="col-lg-3" onclick="guardarPromocion()" style="font-size:15px; float: right;">Guardar<i style="font-size: 20px;"  class=" ml-2 far fa-bookmark"></i></a>`
    }
}

function prepararModalPagoCarrito(){
    document.getElementById('productos').innerHTML="";
    document.getElementById('total').innerHTML="";
    let total=0;
    let total_general=0
    for(let i=0; i<usuario.carrito.length;i++){
        total=listcategorias[usuario.carrito[i].idCat].promociones[usuario.carrito[i].idPromo].precio_descuento;
        total=total*(usuario.carrito[i].idCantidad);
        total_general+=total;
        document.getElementById('productos').innerHTML+=`<dl class="row">
        <dd class="col-sm-8">
         ${listcategorias[usuario.carrito[i].idCat].promociones[usuario.carrito[i].idPromo].nombre}
        </dd>
        <dd class="col-sm-4">
          L. ${total}
        </dd>
      </dl>
      <hr>`
    }
    document.getElementById('total').innerHTML=`<dt class="col-sm-8">
        Total
    </dt>
    <dt class="col-sm-4">
        ${total_general}
    </dt>`;
}


function prepararModalPagoUnoSolo(){
    document.getElementById('productos').innerHTML="";
    document.getElementById('total').innerHTML="";
    let total=0;
        total=listcategorias[indexcat].promociones[indexPromo].precio_descuento;
        total=total*parseInt($('#input-cant').val());
        document.getElementById('productos').innerHTML=`<dl class="row">
        <dd class="col-sm-8">
         ${listcategorias[indexcat].promociones[indexPromo].nombre}
        </dd>
        <dd class="col-sm-4">
          L. ${total}
        </dd>
      </dl>
      <hr>`
    document.getElementById('total').innerHTML=`<dt class="col-sm-8">
        Total
    </dt>
    <dt class="col-sm-4">
        ${total}
    </dt>`;
}

    


    function validarCamposDatosPago(){
        let validar=false;
        if($('#address').val()==""){
            validar=false;
            $('#address').removeClass('is-valid')
            $('#address').addClass('is-invalid')
            $('#add-vacio').removeClass('d-none')
            $('#add-vacio').addClass('d-block')
        }else{
            validar=true;
            $('#address').removeClass('is-invalid')
            $('#address').addClass('is-valid')
            $('#add-vacio').removeClass('d-block')
            $('#add-vacio').addClass('d-none')
        }

        if($('#address-2').val()==""){
            validar=false;
            $('#address-2').removeClass('is-valid')
            $('#address-2').addClass('is-invalid')
            $('#add-vacio-2').removeClass('d-none')
            $('#add-vacio-2').addClass('d-block')
        }else{
            validar=true;
            $('#address-2').removeClass('is-invalid')
            $('#address-2').addClass('is-valid')
            $('#add-vacio-2').removeClass('d-block')
            $('#add-vacio-2').addClass('d-none')
        }

        
        if($('#country').val()=="-"){
            validar=false;
            $('#pais-vacio').removeClass('d-none')
            $('#pais-vacio').addClass('d-block')
        }else{
            validar=true;
            $('#pais-vacio').removeClass('d-block')
            $('#pais-vacio').addClass('d-none')
        }

        if($('#depto').val()==""){
            validar=false;
            $('#depto').removeClass('is-valid')
            $('#depto').addClass('is-invalid')
            $('#depto-vacio').removeClass('d-none')
            $('#depto-vacio').addClass('d-block')
        }else{
            validar=true;
            $('#depto').removeClass('is-invalid')
            $('#depto').addClass('is-valid')
            $('#depto-vacio').removeClass('d-block')
            $('#depto-vacio').addClass('d-none')
        }

        if($('#zip').val()==""){
            validar=false;
            $('#zip').removeClass('is-valid')
            $('#zip').addClass('is-invalid')
            $('#zip-vacio').removeClass('d-none')
            $('#zip-vacio').addClass('d-block')
        }else{
            validar=true;
            $('#zip').removeClass('is-invalid')
            $('#zip').addClass('is-valid')
            $('#zip-vacio').removeClass('d-block')
            $('#zip-vacio').addClass('d-none')
        }
        return validar;
    }

    function generateUUID() {
      var d = new Date().getTime();
      var uuid = 'X4XYXX'.replace(/[XY]/g, function (c) {
          var r = (d + Math.random() * 16) % 16 | 0;
          d = Math.floor(d / 16);
          return (c == 'X' ? r : (r & 0x3 | 0x8)).toString(16);
      });
      return uuid;
  }

    var informacionPedido;
    function addInformacionPedido(){
        console.log("entree")
        let validar=validarCamposDatosPago();
        console.log(validar)
        if(validar){
            informacionPedido={
                "idPromocion":parseInt(indexPromo),
                "idCategoria":parseInt(indexcat),
                  "cantidad":parseInt($('#input-cant').val()),
                  "datos":{
                    direccion:$('#address').val(),
                    direccion2:$('#address-2').val(),
                    pais:$('#country').val(),
                    departamento:$('#depto').val(),
                    zip:$('#zip').val()
                  },
                  "Norden": generateUUID(),
                  "estado":"No entregado"
            }
          $('#tabCheckoutBilling123').removeClass('active')
          $("#paso2").attr("data-toggle","tab");
          $("#paso2").attr("href","#tabCheckoutPayment123");
          $("#role").attr("href","role");
          $('#tabCheckoutPayment123').addClass('active')
          console.log(informacionPedido)
        }
    }


  
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
    
      
       
    
    //PRIMERO: agregar pago a las ventas de la empresa
    let indexEmpresa=listcategorias[indexcat].promociones[indexPromo].idEmpresa;
    let cantidad=parseInt(listcategorias[indexcat].promociones[indexPromo].precio_descuento)
    estado=verificarCantidad()
    if(estado){
      $('#btn-one').html('<span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>Autorizando...').addClass('disabled');
      axios({
        method:'PUT',
        url:urlventas+`?id=${indexEmpresa}`,
        responseType:'json',
        data:{"cantidad":cantidad*parseInt($('#input-cant').val())}
      }).then(res=>{
        $('#btn-one').addClass('d-none');
        $('#pay-exit').removeClass('d-none');
        $('#pay-exit').addClass('d-block');
        $('#btn-next').removeClass('d-none');
        $('#btn-next').addClass('d-block');
        axios({
          method:'POST',
          url:urlpedidos+`?idEmpresa=${indexEmpresa}&idUsuario=${indexUsuario}`,
          responseType:'json',
          data:informacionPedido
        }).then(res=>{
          //peticion para actualizar ventas y stock
          let parametros=`?idEmp=${indexEmpresa}&stock=${($('#input-cant').val())}&idProducto=${listcategorias[indexcat].promociones[indexPromo].idproducto}&idCat=${indexcat}&idPromo=${indexPromo}`;
          console.log(urlEmpresas+parametros)
          axios({
            method:'PUT',
            url:urlEmpresas+parametros,
            responseType:'json',
            data:{"accion":8}
          }).then(res=>{
            console.log("hola")
          }).catch(error=>{console.error(error)
          }); 
        }).catch(error=>{console.error(error)
        });  
      }).catch(error=>{console.error(error);
        $('#btn-one').addClass('d-none');
        $('#pay-error').removeClass('d-none');
        $('#pay-error').addClass('d-block');
        setTimeout(console.log.bind(null, 'Two second later'), 8000);
      });  
    }
   
      
  } 




function continuar(){
    resetModalPago();
    $('#ModalPago').modal('hide');
  }
  

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


  function resetModalPago(){
    $("#radioWithGap5").prop('checked', false);
    $("#radioWithGap6").prop('checked', false);
    $("#radioWithGap4").prop('checked', false);
    $('#address').val("");
    $('#address-2').val("");
    $('#country').val("");
    $('#depto').val("");
    $('#zip').val("");
    $("#cc-name123").val("");
    $("#cc-number123").val("");
    $("#cc-expiration123").val("");
    $("#cc-cvv123").val("");
    $('#btn-one').html('Autorizar Pago').addClass('disabled');
     
  }
  


  function verificarCantidad(){
    let valido=false
    if($('#input-cant').val()>parseInt(listcategorias[indexcat].promociones[indexPromo].stock)){
      $('#cant-dis').removeClass('d-none');
       $('#cant-dis').addClass('d-block');
      valido=false;
    }else{
       valido=true;
      $('#cant-dis').removeClass('d-block');
      $('#cant-dis').addClass('d-none');
      
    }
     return valido;
  }




  function seleccionarSucursales(){
    document.getElementById('link-sucursales').style.color="#184F78";
    document.getElementById('link-comentarios').style.color="#949398";
  }

  function seleccionarComentarios(){
    document.getElementById('link-sucursales').style.color="#949398";
    document.getElementById('link-comentarios').style.color="#184F78";
  } seleccionarComentarios()