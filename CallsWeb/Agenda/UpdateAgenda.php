<?php
include_once("../../db/db.php");

$DB = new DAO();
$conn = $DB->getConnect();
$response = [];
$nombre = $_POST["obj"]["nombre"];
$idagenda = $_POST["obj"]["id_agenda"];
$apellidos = $_POST["obj"]["apellidos"];
$dir = $_POST["obj"]["dir"];
$telefonos = $_POST["obj"]["telefonos"];
//var_dump($_POST["obj"]);
if(isset($nombre) && isset($apellidos) && isset($dir)){
	$createItemSQL="UPDATE agenda SET nombre = ?, apellidos = ?, direccion = ?, FecActualizacion = NOW() where idagenda = ?;";
	if ($createItem = $conn->prepare($createItemSQL)) {
	    $createItem->bind_param("sssi", $nombre, $apellidos, $dir, $idagenda);
	    if (!$createItem->execute()) {
	    	$response = null;
	        $response["status"] = "ERROR";
	        $response["code"] = "500";
	        $response["response"] = "Ocurrio un error en la actualizacion" . $conn->error;
	        echo json_encode($response);
	    }else{
	    	DeleteTeelfonos($idagenda, $conn);
	    	$res = InsertTelefonos($telefonos, $idagenda, $conn);
	    	$response = null;
	        $response["status"] = "SUCCESS";
	        $response["code"] = "200";
	        if($res){
	        	$response["response"] = "Se actualizo correctamente el registro";
	        }else{
	        	$response["response"] = "Hubo un problema al insertar los numeros de telefono";
	        }
	        echo json_encode($response);
	    }
	}else{
	    $response["status"] = "ERROR";
	    $response["code"] = "500";
	    $response["response"] = "Ocurrio un error en la Actualizacion" . $conn->error;
	    echo json_encode($response);
	}
}else{
	$response["status"] = "ERROR";
    $response["code"] = "500";
    $response["response"] = "Campos Vacios";
}

function InsertTelefonos($tels, $id_agenda, $conn)
{
	foreach ($tels as $key => $value) {
		$done = false;
		$createTelefonoSQL="INSERT INTO TelefonosAgenda(IdAgenda, Telefono, FecCreacion, Habilitado) VALUES(?, ?, NOW(), 1);";
		if ($createTelefono = $conn->prepare($createTelefonoSQL)) {
		    $createTelefono->bind_param("is", $id_agenda, $value[0]);
		    if (!$createTelefono->execute()) {
		    	$done = false;
		    }else{
		    	$done = true;
		    }
		}
		return $done;
	}
}

function DeleteTeelfonos($id_agenda, $conn)
{
	$done = false;
	$createTelefonoSQL="DELETE FROM TelefonosAgenda WHERE IdAgenda = ?;";
	if ($createTelefono = $conn->prepare($createTelefonoSQL)) {
	    $createTelefono->bind_param("i", $id_agenda);
	    if (!$createTelefono->execute()) {
	    	$done = false;
	    }else{
	    	$done = true;
	    }
	}
	return $done;
}
//idagenda, nombre, apellidos, IdTelefono, DirArchivo, direccion, FecCreacion, FecActualizacion, Habilitado
?>