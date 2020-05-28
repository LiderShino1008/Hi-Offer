var indexPlan;
var planes1=[];
var urlEmp='../../Hi-Offer/backend/api/empresas.php';
var urlAdmin='../../Hi-Offer/backend/api/administradores.php';
var urlSucursales='../../Hi-Offer/backend/api/sucursales.php';
var empresa;
var administrador;
var indexEmp;
var horaEnvio;

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


function paso1(){
    document.getElementById('barra1').style.backgroundColor="#546991";
    document.getElementById('barra2').style.backgroundColor="#CCCCCC";
    document.getElementById('barra3').style.backgroundColor="#CCCCCC";
    document.getElementById('barra4').style.backgroundColor="#CCCCCC";
    document.getElementById('texto1').style.color="#546991";
    document.getElementById('planes').style.display="block";
    document.getElementById('formulario').style.display="none";
    document.getElementById('panel-administrador').style.display="none";
    document.getElementById('verificacion').style.display="none";
    document.getElementById('estado').style.display="none";
    document.getElementById('error').style.display="none";

} paso1();

function paso2(index){
    indexPlan=index;
    document.getElementById('planes').style.display="none";
    document.getElementById('formulario').style.display="block";
    document.getElementById('panel-administrador').style.display="none";
    document.getElementById('barra2').style.backgroundColor="#546991";
    document.getElementById('barra1').style.backgroundColor="#CCCCCC";
    document.getElementById('texto1').style.color="#CCCCCC";
    document.getElementById('texto2').style.color="#546991";
}

function atrasEmpresa(){
    document.getElementById('planes').style.display="block";
    document.getElementById('formulario').style.display="none";
    document.getElementById('barra1').style.backgroundColor="#546991";
    document.getElementById('barra2').style.backgroundColor="#CCCCCC";
    document.getElementById('texto2').style.color="#CCCCCC";
    document.getElementById('texto1').style.color="#546991";

}



function obtenerPlanes(){
    axios({
      method:'GET',
      url:'../../Hi-Offer/backend/api/planes.php',
      responseType:'json',
      
  }).then(res=>{
      this.planes1=res.data;
      generarPlanes1();
  }).catch(error=>{console.error(error);
  });  
  } obtenerPlanes();


  function generarPlanes1(){
    document.getElementById('cont-planes').innerHTML="";
    for (let i=0; i<planes1.length; i++){
        console.log("gaby");
      if(planes1[i].diseno=="Básico"){

        document.getElementById('cont-planes').innerHTML+=` <div class="col-md-5 col-xl-3  col-lg-3 col-8 col-xl-3   mx-auto mb-4 p-2">
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
              <a  onclick="paso2(${i})"  class="btn btn-outline-indigo btn-md" href="#" role="button">Comenzar</a>
          </div>
        </div>
      </div>`
      }else{
        document.getElementById('cont-planes').innerHTML+=`
        
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
              <a class="btn btn-md" onclick="paso2(${i})" style="background-color: #51668C!important; color: white;" href="#" role="button">Comenzar</a>
          </div>
        </div>
      </div>`
      }
    }
  }



function validarEmpresa(){
    console.log("Hello");
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
      
       // window.location="InicioEmpresas.html";
       document.getElementById('formulario').style.display="none";
       document.getElementById('panel-administrador').style.display="block";
       document.getElementById('barra2').style.backgroundColor="#CCCCCC";
       document.getElementById('barra1').style.backgroundColor="#CCCCCC";
       document.getElementById('texto1').style.color="#CCCCCC";
       document.getElementById('texto2').style.color="#CCCCCC";
       document.getElementById('texto3').style.color="#546991";
       document.getElementById('texto4').style.color="#CCCCCC";
       document.getElementById('barra3').style.backgroundColor="#546991";
       return true;
    }else{
        return false;
    }
    

}


function registrarEmpres(){
    document.getElementById('formulario').style.display="none";
    document.getElementById('panel-administrador').style.display="block";
    document.getElementById('barra2').style.backgroundColor="#CCCCCC";
    document.getElementById('barra1').style.backgroundColor="#CCCCCC";
    document.getElementById('texto1').style.color="#CCCCCC";
    document.getElementById('texto2').style.color="#CCCCCC";
    document.getElementById('texto3').style.color="#546991";
    document.getElementById('texto4').style.color="#CCCCCC";
    document.getElementById('barra3').style.backgroundColor="#546991";
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

function validacionCampos(){
   let  respuesta= validacionUsuario();
   let estado= document.getElementById("checkbox").checked;
     if(!estado){
        document.getElementById("checkbox").classList.add('is-invalid');
     }else{
        document.getElementById("checkbox").classList.remove('is-invalid');
     }
   if(respuesta&&estado){
  
    document.getElementById('estado').style.display="block";
    document.getElementById('panel-administrador').style.display="none";
    document.getElementById('texto3').style.color="#CCCCCC";
    document.getElementById('barra3').style.backgroundColor="#CCCCCC";
    document.getElementById('texto4').style.color="#546991";
    document.getElementById('barra4').style.backgroundColor="#546991";
    
 
    administrador={
        "nombre_usuario":document.getElementById("usuario").value,
        "correo_electronico":document.getElementById("email-usuario").value,
        "contrasena":document.getElementById("contraseña").value,
        "accion":"r"
        
    } 

    enviarCodigo();

   }

 
   
}

function atrasAdmin(){
  
    document.getElementById('panel-administrador').style.display="none";
    document.getElementById('texto4').style.color="#CCCCCC";
    document.getElementById('verificacion').style.display="none"
    document.getElementById('barra4').style.backgroundColor="#CCCCCC";
    document.getElementById('formulario').style.display="block";
    document.getElementById('barra3').style.backgroundColor="#CCCCCC";
    document.getElementById('barra2').style.backgroundColor="#546991";
    document.getElementById('texto2').style.color="#546991";
    document.getElementById('texto3').style.color="#CCCCCC";
    document.getElementById('texto4').style.color="#CCCCCC";
    document.getElementById('barra4').style.backgroundColor="#CCCCCC";


}


function atrasVerific(){
    document.getElementById('verificacion').style.display="none"
    document.getElementById('panel-administrador').style.display="block";
    document.getElementById('texto4').style.color="#CCCCCC";
    document.getElementById('barra4').style.backgroundColor="#CCCCCC";
    document.getElementById('formulario').style.display="none";
    document.getElementById('barra2').style.backgroundColor="#CCCCCC";
    document.getElementById('barra3').style.backgroundColor="#546991";
    document.getElementById('texto3').style.color="#546991";
    document.getElementById('texto2').style.color="#CCCCCC";
}


function registrarEmpresa(){
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
                "numeroTelefono":document.getElementById("telefono").value,
                "diaReg":moment().format("YYYY-MM-DD"),
                "mes":n
        }

     
          }
       


    }

    var codigo;
    var horaRecp;
    function enviarCodigo(){
        document.getElementById('verificacion').style.display="none";
        document.getElementById('estado').style.display="block";
        
         //Hacer una peticion GET para que el servidor  de administradoresenvie un correo y responda si todo esta bien
        axios({
            method:'GET',
            url:urlAdmin+`?correo=${document.getElementById("email-usuario").value}`,
            responseType:'json',
        }).then(res=>{
            try {
                codigo=res.data.codigo;
                console.log(res.data);
                document.getElementById('verificacion').style.display="block";
                document.getElementById('estado').style.display="none";
                document.getElementById('mensaje-error').style.display="none";
                horaEnvio=moment().format('HH:mm:ss');
              }
              catch(error) {
                document.getElementById('estado').style.display="none";
                document.getElementById('error').style.display="block";
              }
        }).catch(error=>{console.error("El error", error);
        
        });  
    }
        /*  la informacion se guardara hasta que el codigo de verificacion este bien  */

        
  
 var plan;       
function verificarCodigo(){
    /*agregar a la empresa la referencia al plan */
    let referencia={
        "indexPlan":indexPlan,
        "accion":2
    }
  let cam_vacio_codigo=validarCampoVacio('code'); 
    if(cam_vacio_codigo){
        document.getElementById('txt-error').classList.remove('d-none');
    }else{
        horaRecp=moment().format('HH:mm:ss');
        console.log(document.getElementById("code").value,codigo)
        if(document.getElementById("code").value==codigo){
            axios({
                method:'POST',
                url:urlEmp,
                responseType:'json',
                data:empresa
              }).then(res=>{
                axios({
                    method:'POST',
                    url:urlAdmin,
                    responseType:'json',
                    data:administrador
                  }).then(res=>{
                    axios({
                        method:'POST',
                        url:urlEmp,
                        responseType:'json',
                        data:referencia
                      }).then(res=>{
                        
                      }).catch(error=>{console.error(error);
                      }); 
                  }).catch(error=>{console.error(error);
                  }); 
              }).catch(error=>{console.error(error);
              });  
             

           
           
         }else{
            
         }  

    } 
}              
            
        
        
      
        

