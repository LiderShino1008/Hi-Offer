//Funcion para Agregar un usuario

var  usuarios=[{
        NombreDeUsuario:'Maria',
        correo:'mariag@gmail.com',
        contraseña:'msj213'
    }];
 

function AgregarUsuario(){
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
       
        let user={
            NombreDeUsuario:document.getElementById('usuario').value,
            correo:document.getElementById('email').value,
            contraseña:document.getElementById('contraseña').value,
            foto_de_perfil:"imagen.jpg",
            promociones_favoritas:[],
            empresas_favoritas:[],
            carrito:[],
        };

        usuarios.push(user);
        console.log('Exito');
        location.hash='InicioUsuarios.html';
        window.location="InicioUsuarios.html";
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

