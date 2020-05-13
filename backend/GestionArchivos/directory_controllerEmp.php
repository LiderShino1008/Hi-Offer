
<?php
$nombre_temporal=$_FILES['archivo']['tmp_name'];
$nombre=$_FILES['archivo']['name'];
move_uploaded_file($nombre_temporal, '../archivos-subidos/empresas/empresa'.$_GET['id'].'/'.$nombre);
?>