<?php
use  PHPMailer \ PHPMailer \ PHPMailer ;
use  PHPMailer \ PHPMailer \ Exception ;

require '. ./../PHPMailer/Exception.php'; 
require '../../PHPMailer/PHPMailer.php'; 
require '../../PHPMailer/SMTP.php' ;

// Instanciando el objeto phpMailer para enviar el correo
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
    $mail->setFrom('hioffergc@gmail.com', 'Hi-Offer');  //destinatario
    $mail->addAddress('gabrielaca2019@gmail.com');     // receptor
  /*  $mail->addAddress('ellen@example.com');               // Name is optional
    $mail->addReplyTo('info@example.com', 'Information');
    $mail->addCC('cc@example.com');
    $mail->addBCC('bcc@example.com'); */

   /*  // Attachments
    $mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
    $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name  */

    // Content
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = 'Prueba';   //asunto
    $mail->Body    = 'Este es un correo de prueba <b>in bold!</b>
    <h2>Holaa<h2>';
    $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

    $mail->send();//si el mensaje se envio
    echo 'Mensaje enviado correctamente';
} catch (Exception $e) {
    echo "Raioz: {$mail->ErrorInfo}";
}
?>