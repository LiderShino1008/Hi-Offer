<?php
use  PHPMailer \ PHPMailer \ PHPMailer ;
use  PHPMailer \ PHPMailer \ Exception ;

require '../../PHPMailer/Exception.php'; 
require '../../PHPMailer/PHPMailer.php'; 
require '../../PHPMailer/SMTP.php' ;

    include_once('class-persona.php');
    class Administrador extends Persona{
       
    public function __construct($nombre_usuario, $correo_electronico,$contrasena){
       parent::__construct($nombre_usuario, $correo_electronico,$contrasena);
    }
 
    
    public function agregarAdminEmpresaRegistro(){
        $contenido_archivo= file_get_contents("../data/empresas.json");
        $empresas=json_decode($contenido_archivo,true);
        $indexEmp=sizeof($empresas)-1;
        
        $empresas[$indexEmp]["administradores"][]=Array(
            "nombre_usuario"=>$this->nombre_usuario,
            "correo_Electronico"=>$this->correo_electronico,
            "contrasena"=>$this->contrasena
        );
    
    $archivo=fopen("../data/empresas.json","w");
    fwrite($archivo,json_encode($empresas)); 
    fclose($archivo);

    }


    public static function VerificarCuentaCorreo($correo_electronico)
    {
        //generar codigo
        $codigo= mt_rand(100000, 500000);
        $mail = new PHPMailer(true);

        try {
        //configuracion
            $mail->SMTPDebug = 0;                                       // debug para desactivarlo (esta en 0)
            $mail->isSMTP();                                            // Send using SMTP
            $mail->Host       = 'smtp.gmail.com';                    // Servicio de correo que se utilizara (GMAIL)
            $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
            $mail->Username   = 'hioffergc@gmail.com';                     // SMTP correo de la plataforma
            $mail->Password   = 'CabreraRamos.17.';                               // SMTP contrasena de la plataforma
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
            $mail->Port       = 587;                                    // Puerto que se utilizara

            //Datos para el envio de correo
            $mail->setFrom('hioffergc@gmail.com', 'Hi-Offer'); 
            $mail->addAddress($correo_electronico);    
        
            // Content
            $mail->isHTML(true);                                  // Set email format to HTML
            $mail->Subject = 'Codigo de verificacion';   //asunto
            $mail->Body    = '<br> <br> <div style="margin-left:50px"> 
            Hola, <br>
            Usa el código siguiente para completar la verificación: <br>
            <h2>'.$codigo.'</h2>
            Este código expirará en 10 minutos.
            <br>
            ¡Gracias por registrate en Hi-Offer!';
            
            $mail->send();//si el mensaje se envio
            $code=Array("codigo"=>$codigo);
            echo json_encode($code);
        } catch (Exception $e) {
            echo "Raioz: {$mail->ErrorInfo}";
        }

    }

   


  }


?>