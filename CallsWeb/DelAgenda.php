<?php
include_once("../db/db.php");

$DB = new DAO();
$conn = $DB->getConnect();
$response = [];
$idagenda = $_POST["obj"]["id_agenda"];
if(isset($idagenda)){
	$createItemSQL="DELETE FROM agenda where idagenda = ?;";
	if ($createItem = $conn->prepare($createItemSQL)) {
	    $createItem->bind_param("i", $idagenda);
	    if (!$createItem->execute()) {
	    	$response = null;
	        $response["status"] = "ERROR";
	        $response["code"] = "500";
	        $response["response"] = "Ocurrio un error en la eliminacion del registro" . $conn->error;
	        echo json_encode($response);
	    }else{
	    	DeleteTeelfonos($idagenda, $conn);
	    	$response = null;
	        $response["status"] = "SUCCESS";
	        $response["code"] = "200";
	        $response["response"] = "Se elimino correctamente el registro";
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
?>