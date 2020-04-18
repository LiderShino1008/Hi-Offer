
//Funciones de Validacion
function validarContraseña(id){
    let validacion;
    let password=document.getElementById(id).value;
    if(password.length>=8){
        validacion=true;
    }else{
        validacion=false;
    }
    return validacion;
}

function validarContraseñasIguales(password1,password2){
    let validacion;
     if(password1==password2){  
         validacion=true;
         
     }else{
         validacion=false
     }
     return validacion;
 }

//Funcion para validar un campo vacio
function validarCampoVacio(id){
    let respuesta;
    if (document.getElementById(id).value == ''){
        respuesta=true;
    }else{
       respuesta=false;
    }
    return respuesta;
}


function validarCampoVacioSelect(id,valor){
    let respuesta;
    if (document.getElementById(id).value == valor){
        respuesta=true;
    }else{
       respuesta=false;
    }
    return respuesta;
}

//Funcion para validar un correo electronico
function validarEmail(etiqueta){
    let respuesta;
    console.log(etiqueta);
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(etiqueta.value)){
        respuesta=true;
    }else{
        respuesta=false;
    }
    
    return respuesta;
}