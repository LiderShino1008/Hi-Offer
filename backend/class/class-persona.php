<?php

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



/*
public abstract function reprobar();
*/


}
 

?>