<?php

use  PHPMailer \ PHPMailer \ PHPMailer ;
use  PHPMailer \ PHPMailer \ Exception ;

require '../../PHPMailer/Exception.php'; 
require '../../PHPMailer/PHPMailer.php'; 
require '../../PHPMailer/SMTP.php' ;


abstract class  Persona{
 protected $nombre_usuario;  
 protected $correo_electronico;
 protected $contrasena;


 public function __construct($nombre_usuario, $correo_electronico,$contrasena){
  $this->nombre_usuario=$nombre_usuario; 
  $this->correo_electronico=$correo_electronico;
  $this->contrasena=$contrasena;
 }


 /**
  * Get the value of nombre_usuario
  */ 
 public function getNombre_usuario()
 {
  return $this->nombre_usuario;
 }

 /**
  * Set the value of nombre_usuario
  *
  * @return  self
  */ 
 public function setNombre_usuario($nombre_usuario)
 {
  $this->nombre_usuario = $nombre_usuario;

  return $this;
 }

 /**
  * Get the value of correo_electronico
  */ 
 public function getCorreo_electronico()
 {
  return $this->correo_electronico;
 }

 /**
  * Set the value of correo_electronico
  *
  * @return  self
  */ 
 public function setCorreo_electronico($correo_electronico)
 {
  $this->correo_electronico = $correo_electronico;

  return $this;
 }

 /**
  * Get the value of contrasena
  */ 
 public function getContrasena()
 {
  return $this->contrasena;
 }

 /**
  * Set the value of contrasena
  *
  * @return  self
  */ 
 public function setContrasena($contrasena)
 {
  $this->contrasena = $contrasena;

  return $this;
 }


public static function VerificarCuentaCorreo($correo_electronico){
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