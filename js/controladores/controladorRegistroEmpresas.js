

function paso1(){
    document.getElementById('barra1').style.backgroundColor="#546991";
    document.getElementById('barra2').style.backgroundColor="#CCCCCC";
    document.getElementById('barra3').style.backgroundColor="#CCCCCC";
    document.getElementById('barra4').style.backgroundColor="#CCCCCC";
    document.getElementById('texto1').style.color="#546991";
    document.getElementById('planes').style.display="block";
    document.getElementById('formulario').style.display="none";
    document.getElementById('panel-administrador').style.display="none";
    
} paso1();

function paso2(){
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
}


function registrarEmpresa1(){
    console.log("Hello");
    let estado_vacio_NombreEmp=validarCampoVacio('NombreDeLaEmpresa');
    let estado_vacio_correoEmp=validarCampoVacio('correoEmpresa');
    let estado_vacio_esloganEmp=validarCampoVacio('eslogan');
    let estado_vacio_descripcionEmp=validarCampoVacio('descripcion');
    let estado_vacio_direccionEmp=validarCampoVacio('direccion');
    let estado_vacio_paisEmp= validarCampoVacioSelect('pais','Pais');
    let estado_vacio_latitudEmp=validarCampoVacio('latitud');
    let estado_vacio_longitudEmp=validarCampoVacio('longitud');
    let estado_vacio_facebookEmp=validarCampoVacio('facebook');
    let estado_vacio_instagramEmp=validarCampoVacio('instagram');
    let estado_vacio_twiterEmp=validarCampoVacio('twiter');
    let estado_vacio_telefono=validarCampoVacio('telefono');
    

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
        document.getElementById('camp-vacio-latitud').classList.remove('d-block');
        document.getElementById('latitud').classList.remove('is-invalid');
       
    }
    
    if(estado_vacio_longitudEmp){
        document.getElementById('camp-vacio-longitud').classList.add('d-block');
        document.getElementById('longitud').classList.add('is-invalid');
    }else{
        document.getElementById('camp-vacio-longitud').classList.remove('d-block');
       
    }

    if(estado_vacio_facebookEmp){
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
       
    }
    //validacion de Admin
    
   

    if((estado_vacio_NombreEmp==false)&&(estado_vacio_correoEmp==false)&&(estado_vacio_esloganEmp==false)&&(estado_vacio_descripcionEmp==false)&&(estado_vacio_direccionEmp==false)&&(estado_vacio_paisEmp==false)&&(estado_vacio_latitudEmp==false)&&(estado_vacio_longitudEmp==false)&&(estado_vacio_facebookEmp==false)&&(estado_vacio_instagramEmp==false)&&(estado_vacio_twiterEmp==false)&&(correo_valido_emp)){
        console.log("exito");
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
    }
    

}


function registrarEmpresa(){
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





function validacionCampos(){
   let  respuesta= validacionUsuario();
   if(respuesta==true){
    document.getElementById('verificacion').classList.remove('d-none');
    document.getElementById('panel-administrador').style.display="none";
    document.getElementById('texto3').style.color="#CCCCCC";
    document.getElementById('barra3').style.backgroundColor="#CCCCCC";
    document.getElementById('texto4').style.color="#546991";
    document.getElementById('barra4').style.backgroundColor="#546991";

   }

 
   
}

function atrasAdmin(){
    document.getElementById('formulario').style.display="block";
    document.getElementById('panel-administrador').style.display="none";
    document.getElementById('barra2').style.backgroundColor="#546991";
    document.getElementById('barra3').style.backgroundColor="#CCCCCC";
    document.getElementById('texto3').style.color="#CCCCCC";
    document.getElementById('texto2').style.color="#546991";

}

function verificarCodigo(){
    
    let cam_vacio_codigo=validarCampoVacio('code'); 
    if(cam_vacio_codigo){
        document.getElementById('txt-error').classList.remove('d-none');
    }else{
        window.location="InicioEmpresas.html";
    }


}


