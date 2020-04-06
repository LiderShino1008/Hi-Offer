

function paso1(){
    document.getElementById('barra1').style.backgroundColor="#546991";
    document.getElementById('barra2').style.backgroundColor="#CCCCCC";
    document.getElementById('texto1').style.color="#546991";
    document.getElementById('planes').style.display="block";
    document.getElementById('formulario').style.display="none";

} paso1();

function paso2(){
    document.getElementById('planes').style.display="none";
    document.getElementById('formulario').style.display="block";
    document.getElementById('barra2').style.backgroundColor="#546991";
    document.getElementById('barra1').style.backgroundColor="#CCCCCC";
    document.getElementById('texto1').style.color="#CCCCCC";
    document.getElementById('texto2').style.color="#546991";
}


function registrarEmpresa(){
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
    
    let estado_vacio_nombreUs=validarCampoVacio('usuario');
    let estado_vacio_correUs=validarCampoVacio('correoUsuario');
    let estado_vacio_contraUs=validarCampoVacio('contraseña');
    let estado_vacio_contra2Us=validarCampoVacio('contraseña2');

    let correo_valido_emp=validarEmail(document.getElementById('correoEmpresa'));
    let correo_valido_us=validarEmail(document.getElementById('correoUsuario'));

    let contraseñatamano=validarContraseña('contraseña');
    let contraigual=validarContraseñasIguales(document.getElementById('contraseña').value,document.getElementById('contraseña2').value);

    //control de nombre empresa
    if(estado_vacio_NombreEmp){
        document.getElementById('camp-vacio-nombreEmpresa').classList.add('d-block');
        document.getElementById('NombreDeLaEmpresa').style.borderColor="red";
    }else{
        document.getElementById('camp-vacio-nombreEmpresa').classList.remove('d-block');
        document.getElementById('NombreDeLaEmpresa').style.borderColor="#ced4da";
    }

    //control correo empresa, campo vacio y direccion de correo invalida
    if(estado_vacio_correoEmp){
        document.getElementById('camp-vacio-correo').classList.add('d-block');
        document.getElementById('correoEmpresa').style.borderColor="red";
    }else{
        if(correo_valido_emp==false){
            document.getElementById('invalid-correo').classList.add('d-block');
            document.getElementById('correoEmpresa').style.borderColor="red";
            document.getElementById('camp-vacio-correo').classList.remove('d-block');
            }else{
               document.getElementById('camp-vacio-correo').classList.remove('d-block');
               document.getElementById('correoEmpresa').style.borderColor="#ced4da";
               document.getElementById('invalid-correo').classList.remove('d-block');
            }
    }

    //control eslogan empresa
    if(estado_vacio_esloganEmp){
        document.getElementById('camp-vacio-eslogan').classList.add('d-block');
        document.getElementById('eslogan').style.borderColor="red";
    }else{
        document.getElementById('camp-vacio-eslogan').classList.remove('d-block');
        document.getElementById('eslogan').style.borderColor="#ced4da";
    }


     //control descripcion empresa
     if(estado_vacio_descripcionEmp){
        document.getElementById('camp-vacio-descripcion').classList.add('d-block');
        document.getElementById('descripcion').style.borderColor="red";
    }else{
        document.getElementById('camp-vacio-descripcion').classList.remove('d-block');
        document.getElementById('descripcion').style.borderColor="#ced4da";
    }

     //control direccion empresa
     if(estado_vacio_direccionEmp){
        document.getElementById('camp-vacio-direccion').classList.add('d-block');
        document.getElementById('direccion').style.borderColor="red";
    }else{
        document.getElementById('camp-vacio-direccion').classList.remove('d-block');
        document.getElementById('direccion').style.borderColor="#ced4da";
    }

     //control pais empresa
     if(estado_vacio_paisEmp){
        document.getElementById('camp-vacio-pais').classList.add('d-block');
        document.getElementById('pais').style.borderColor="red";
    }else{
        document.getElementById('camp-vacio-pais').classList.remove('d-block');
        document.getElementById('pais').style.borderColor="#ced4da";
    }
    
    if(estado_vacio_latitudEmp){
        document.getElementById('camp-vacio-latitud').classList.add('d-block');
        document.getElementById('latitud').style.borderColor="red";
    }else{
        document.getElementById('camp-vacio-latitud').classList.remove('d-block');
        document.getElementById('latitud').style.borderColor="#ced4da";
    }
    
    if(estado_vacio_longitudEmp){
        document.getElementById('camp-vacio-longitud').classList.add('d-block');
        document.getElementById('longitud').style.borderColor="red";
    }else{
        document.getElementById('camp-vacio-longitud').classList.remove('d-block');
        document.getElementById('longitud').style.borderColor="#ced4da";
    }

    if(estado_vacio_facebookEmp){
        document.getElementById('facebook').style.borderColor="red";
    }else{
        document.getElementById('facebook').style.borderColor="#ced4da";
    }

    if(estado_vacio_instagramEmp){
        document.getElementById('instagram').style.borderColor="red";
    }else{
        document.getElementById('instagram').style.borderColor="#ced4da";
    }

    if(estado_vacio_twiterEmp){
        document.getElementById('twiter').style.borderColor="red";
    }else{
        document.getElementById('twiter').style.borderColor="#ced4da";
    }
    //validacion de Admin
    if(estado_vacio_nombreUs){
        document.getElementById('camp-vacio-usuario').classList.add('d-block');
        document.getElementById('usuario').style.borderColor="red";
    }else{
        document.getElementById('camp-vacio-usuario').classList.remove('d-block');
        document.getElementById('usuario').style.borderColor="#ced4da";
    }
   
    console.log(estado_vacio_correUs);
    //correo electronico Admin
    if(estado_vacio_correUs){
        document.getElementById('camp-vacio-correo-us').classList.add('d-block');
        document.getElementById('correoUsuario').style.borderColor="red";
    }else{
        if(correo_valido_us==false){
            document.getElementById('correo-invalido').classList.add('d-block');
            document.getElementById('correoUsuario').style.borderColor="red";
            document.getElementById('camp-vacio-correo-us').classList.remove('d-block');
            }else{
               document.getElementById('camp-vacio-correo').classList.remove('d-block');
               document.getElementById('correoUsuario').style.borderColor="#ced4da";
               document.getElementById('correo-invalido').classList.remove('d-block');
            }
    }


    //Contrasena Admin
    if(estado_vacio_contraUs){
        document.getElementById('camp-vacio-contraseña').classList.add('d-block');
        document.getElementById('contraseña').style.borderColor="red";
    }else{
         if(contraseñatamano==false){
            document.getElementById('contraseña').style.borderColor="red";
            document.getElementById('contraseña-tamaño').classList.add('d-block');
            document.getElementById('camp-vacio-contraseña').classList.remove('d-block');
         }else{
            document.getElementById('camp-vacio-contraseña').classList.remove('d-block');
            document.getElementById('contraseña').style.borderColor="#ced4da";
            document.getElementById('contraseña-tamaño').classList.remove('d-block');
         }
       
    }
   
    //Contrasena 2 Admin
    if(estado_vacio_contra2Us){
        document.getElementById('camp-vacio-contraseña2').classList.add('d-block');
        document.getElementById('contraseña2').style.borderColor="red";
    }else{
        if(contraigual==false){
            document.getElementById('invalid-contraseña2').classList.add('d-block');
            document.getElementById('contraseña2').style.borderColor="red";
            document.getElementById('camp-vacio-contraseña2').classList.remove('d-block');
        }else{
            document.getElementById('invalid-contraseña2').classList.remove('d-block');
            document.getElementById('camp-vacio-contraseña2').classList.remove('d-block');
            document.getElementById('contraseña2').style.borderColor="#ced4da";
        }
        
    }
   

    if((estado_vacio_NombreEmp==false)&&(estado_vacio_correoEmp==false)&&(estado_vacio_esloganEmp==false)&&(estado_vacio_descripcionEmp==false)&&(estado_vacio_direccionEmp==false)&&(estado_vacio_paisEmp==false)&&(estado_vacio_latitudEmp==false)&&(estado_vacio_longitudEmp==false)&&(estado_vacio_facebookEmp==false)&&(estado_vacio_instagramEmp==false)&&(estado_vacio_twiterEmp==false)&&(estado_vacio_nombreUs==false)&&(estado_vacio_correUs==false)&&(estado_vacio_contraUs==false)&&(estado_vacio_contra2Us==false)&&(correo_valido_emp)&&(correo_valido_us)&&(contraseñatamano)&&(contraigual)){
        console.log("exito");
        window.location="InicioEmpresas.html";
    }
   


}






