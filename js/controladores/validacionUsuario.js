

function validacionUsuario(){
    console.log("entre")
        let camp_vacio_usuario=validarCampoVacio('usuario');
        let camp_vacio_correo=validarCampoVacio('email-usuario');
       
        let camp_vacio_contrasena=validarCampoVacio('contraseña');
        let camp_vacio_contrasena2=validarCampoVacio('contraseña2');
      
        let validar_correo_=validarEmail(document.getElementById('email-usuario'));
        let validar_contrasena=validarContraseña('contraseña');
        let validar_igualdad=validarContraseñasIguales(document.getElementById('contraseña').value,document.getElementById('contraseña2').value);
        
       
        if(camp_vacio_usuario==true){
            document.getElementById('usuario').classList.add('is-invalid');
            document.getElementById('camp-vacio-us').style.marginTop="px";
            document.getElementById('camp-vacio-us').classList.add('d-block');
        }else{
            document.getElementById('usuario').classList.remove('is-invalid');
            document.getElementById('camp-vacio-us').classList.remove('d-block');
        }

        if(camp_vacio_correo==true){
            document.getElementById('email-usuario').classList.add('is-invalid');
            document.getElementById('camp-vacio-correo-us').classList.add('d-block');
        }else{
            if(validar_correo_==false){
                document.getElementById('email-usuario').classList.add('is-invalid');
               document.getElementById('correo-invalido-us').classList.add('d-block');
              document.getElementById('camp-vacio-correo-us').classList.remove('d-block');
            }else{
                document.getElementById('email-usuario').classList.remove('is-invalid');
                document.getElementById('camp-vacio-correo-us').classList.remove('d-block');
                document.getElementById('correo-invalido-us').classList.remove('d-block');
            }
           
        }

        if(camp_vacio_contrasena==true){
            document.getElementById('contraseña').classList.add('is-invalid');
            document.getElementById('camp-vacio-contra-us').classList.add('d-block');
        }else{
            if(validar_contrasena==false){
                
                document.getElementById('contraseña').classList.add('is-invalid');
                document.getElementById('camp-vacio-contra-us').classList.remove('d-block');
                document.getElementById('contraseña-incorrecta').classList.add('d-block');
            }else{
                document.getElementById('contraseña-incorrecta').classList.remove('d-block');
                document.getElementById('contraseña').classList.remove('is-invalid');
                 document.getElementById('camp-vacio-contra-us').classList.remove('d-block');
            }
            
        }

        if(camp_vacio_contrasena2==true){
            document.getElementById('contraseña2').classList.add('is-invalid');
            document.getElementById('camp-vacio-contra2').classList.add('d-block');
        }else{
            if(validar_igualdad==false){
                document.getElementById('contraseña2').classList.add('is-invalid');
                document.getElementById('camp-vacio-contra2').classList.remove('d-block');
                document.getElementById('contraseña-no-coincide').classList.add('d-block');
            }
            document.getElementById('contraseña2').classList.remove('is-invalid');
            document.getElementById('camp-vacio-contra2').classList.remove('d-block');
            document.getElementById('contraseña-no-coincide').classList.remove('d-block');
        }
        if((camp_vacio_usuario==false)&&(camp_vacio_contrasena2==false)&&(camp_vacio_correo==false)&&(camp_vacio_contrasena==false)&&(validar_correo_)&&(validar_contrasena)&&(validar_igualdad)){
            return true;
        }


       

}