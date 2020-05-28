var urlPlataforma='../../Hi-Offer/backend/api/plataforma.php';
var urlUsuarios='../../Hi-Offer/backend/api/usuarios.php';




function validarUsuario(){
    let usuario=document.getElementById('usuario').value;
    let email=document.getElementById('email').value;
    let password=document.getElementById('contraseña').value;
    console.log(usuario);
    console.log(email);
    console.log(password);
    let EstadoVacioUsuario=validarCampoVacio('usuario');
    let EstadoVacioEmail=validarCampoVacio('email');
    let EstadoVacioPass=validarCampoVacio('contraseña');
    let EstadoVacioPass2=validarCampoVacio('contraseña');
    let validarCorreo=validarEmail(document.getElementById('email'),'email');
    let validarPassIg=validarContraseñasIguales();
    let validarPass=validarContraseña('contraseña');

    if(EstadoVacioUsuario){
     document.getElementById('camp-vacio-us').style.display="block";
     document.getElementById('usuario').style.marginBottom="1px";
     document.getElementById('usuario').classList.add('input-success');
    }else{
        document.getElementById('usuario').classList.remove('input-success');
        document.getElementById('camp-vacio-us').style.display="none";
     }
    if(EstadoVacioEmail){
        document.getElementById('camp-vacio-email').style.display="block";
        document.getElementById('email').style.marginBottom="1px";
        document.getElementById('email').classList.add('input-success');
     }else{
        document.getElementById('email').classList.remove('input-success');
        document.getElementById('camp-vacio-email').style.display="none";
     }
     if(EstadoVacioEmail){
        document.getElementById('camp-vacio-email').style.display="block";
        document.getElementById('email').style.marginBottom="1px";
        document.getElementById('email').classList.add('input-success');
     }else{
        document.getElementById('email').classList.remove('input-success');
        if(validarCorreo==false){
            document.getElementById('correo-incorrecto').style.display="block";
            document.getElementById('email').classList.add('input-success');
         }else{
            document.getElementById('correo-incorrecto').style.display="none";
            document.getElementById('email').classList.remove('input-success'); 
         }
     }
     if(EstadoVacioPass){
        document.getElementById('camp-vacio-contra').style.display="block";
        document.getElementById('contraseña').style.marginBottom="0px";
        document.getElementById('contraseña').classList.add('input-success');
     }else{
        document.getElementById('camp-vacio-contra').style.display="none";
        if(validarPass==false){
           document.getElementById('contraseña-incorrecta').style.display="block";
           document.getElementById('contraseña').classList.add('input-success');
        }else{
          document.getElementById('contraseña-incorrecta').style.display="none";
          document.getElementById('contraseña').classList.remove('input-success');
          if(validarPassIg==false){
            document.getElementById('contra-no').style.display="block";
             }else{
            document.getElementById('contra-no').style.display="none";
            document.getElementById('contraseña2').classList.remove('input-success');
             }

        }
        
        
     }

     if(EstadoVacioPass2){
        document.getElementById('camp-vacio-contra2').style.display="block";
        document.getElementById('contraseña2').classList.add('input-success');
       }else{
        document.getElementById('camp-vacio-contra2').style.display="none";
        document.getElementById('contraseña2').classList.remove('input-success');
        }

          
     if((EstadoVacioUsuario==false)&&(EstadoVacioEmail==false)&&(EstadoVacioPass==false)&&(validarCorreo==true)&&(validarPassIg==true)&&(validarPass==true)){
        //Agregar usuario
        return true;
        
     }else{
         return false;
     }
}







//Funcion para validar un correo electronico
function validarEmail(etiqueta,id){
    let respuesta;
    console.log(etiqueta);
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(etiqueta.value)){
        respuesta=true;
        document.getElementById(id).classList.remove('input-success');
    }else{
        respuesta=false;
    }
    
    return respuesta;
}
//Funcion para validar un campo vacio
function validarCampoVacio(id){
    let respuesta
    if (document.getElementById(id).value == ''){
        respuesta=true;
    }else{
       respuesta=false;
       document.getElementById(id).classList.remove('input-success');
    }
    return respuesta;
}

//Funcion para Validar Contraseña
function validarContraseñasIguales(){
   let validacion;
    let password1=document.getElementById('contraseña').value;
    let password2=document.getElementById('contraseña2').value;
    if(password1==password2){  
        validacion=true;
        document.getElementById('contraseña2').classList.remove('input-success');
    }else{
        validacion=false
        document.getElementById('contraseña2').classList.add('input-success');
    }
    return validacion;
}

function validarContraseña(id){
    let validacion;
    let password=document.getElementById(id).value;
    if(password.length==8){
        validacion=true;
    }else{
        validacion=false;
    }
    return validacion;
}


var usuario;
/*******************************FUNCIONES PARA REGISTRAR UN USUARIO***************************************************** */
function Registrarse(){
    let permiso=validarUsuario();
    if(permiso){
        usuario={
            nombre_usuario:document.getElementById('usuario').value,
            correo_electronico:document.getElementById('email').value,
            contrasena:document.getElementById('contraseña').value,
        };
      enviarCorreo();
    }
}

var codigo;
function enviarCorreo(){
    $('#button-reg').html('<span id="esperando" class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>Verificando..').addClass('disabled');
    axios({
        method:'GET',
        url:urlUsuarios+`?correo=${document.getElementById("email").value}`,
        responseType:'json',
    }).then(res=>{
        try {
            codigo=res.data.codigo;
            console.log(res.data);
            document.getElementById('div-verificacion').classList.remove('d-none');
            document.getElementById('div-verificacion').classList.add('d-block');
            document.getElementById('form-registro').classList.remove('d-block');
            document.getElementById('form-registro').classList.add('d-none');
            //horaEnvio=moment().format('HH:mm:ss');*/
            $('#button-reg').html('REGISTRARSE')
            $('#button-reg').removeClass('disabled');
          }
          catch(error) {
           /* document.getElementById('estado').style.display="none";
            document.getElementById('error').style.display="block";*/
          }
    }).catch(error=>{console.error("El error", error);
    
    });  
}

function verFormulario(){
    document.getElementById('div-verificacion').classList.remove('d-block');
    document.getElementById('div-verificacion').classList.add('d-none');
    document.getElementById('form-registro').classList.remove('d-none');
    document.getElementById('form-registro').classList.add('d-block');
    $('#button-reg').html('REGISTRARSE')
    $('#button-reg').removeClass('disabled');
}

function resetFormulario(){
    $('#usuario').val("");
    $('#email').val("");
    $('#contrasena').val("");
    $('#contrasena2').val("");
    verFormulario();
    $('#button-reg').html('REGISTRARSE')
    $('#button-reg').removeClass('disabled');

}


function verificarCodigo(){
    if($('#code').val()==codigo){
        axios({
            method:'POST',
            url:urlUsuarios,
            responseType:'json',
            data:usuario
        }).then(res=>{
            window.location="home.php";
        }).catch(error=>{console.error("El error", error);
        }); 
    }
}