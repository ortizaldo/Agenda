<?php
include_once("../../db/db.php");

$DB = new DAO();
$conn = $DB->getConnect();
$response = [];
$nombre = $_POST["obj"]["nombre"];
$apellidos = $_POST["obj"]["apellidos"];
$dir = $_POST["obj"]["dir"];
$telefonos = $_POST["obj"]["telefonos"];
//var_dump($_POST["obj"]);
if(isset($nombre) && isset($apellidos) && isset($dir)){
	$createItemSQL="INSERT INTO agenda(nombre, apellidos, direccion, FecCreacion, FecActualizacion, Habilitado) VALUES(?, ?, ?, NOW(), NOW(), 1);";
	if ($createItem = $conn->prepare($createItemSQL)) {
	    $createItem->bind_param("sss", $nombre, $apellidos, $dir);
	    if (!$createItem->execute()) {
	    	$response = null;
	        $response["status"] = "ERROR";
	        $response["code"] = "500";
	        $response["response"] = "Ocurrio un error en la insercion" . $conn->error;
	        echo json_encode($response);
	    }else{
	    	$id_agenda = $conn->insert_id;
	    	$res = InsertTelefonos($telefonos, $id_agenda, $conn);
	    	$response = null;
	        $response["status"] = "SUCCESS";
			$response["code"] = "200";
			if($res["done"]){
	        	$response["response"] = "Se realizo correctamente el registro";
	        }else{
	        	$response["response"] = "Hubo un problema al insertar los numeros de telefono" . $res["err"];
	        }
	        echo json_encode($response);
	    }
	}else{
	    $response["status"] = "ERROR";
	    $response["code"] = "500";
	    $response["response"] = "Ocurrio un error en la insercion" . $conn->error;
	    echo json_encode($response);
	}
}else{
	$response["status"] = "ERROR";
    $response["code"] = "500";
    $response["response"] = "Campos Vacios";
}

function InsertTelefonos($tels, $id_agenda, $conn)
{
    $response = [];
	foreach ($tels as $key => $value) {
	    $createTelefonoSQL="INSERT INTO telefonosagenda(IdAgenda, Telefono, FecCreacion, Habilitado) VALUES(?, ?, NOW(), 1);";
	    if ($createTelefono = $conn->prepare($createTelefonoSQL)) {
		    $createTelefono->bind_param("is", $id_agenda, $value[0]);
		    if (!$createTelefono->execute()) {
		    	$response["done"] = false;
	    		$response["err"] = $conn->error;
		    }else{
		        $response["done"] = true;
	    		$response["err"] = "ok";
		    }
		}else{
		    $response["done"] = false;
	    	$response["err"] = $conn->error;
		}
	}
	return $response;
}
//idagenda, nombre, apellidos, IdTelefono, DirArchivo, direccion, FecCreacion, FecActualizacion, Habilitado
?>