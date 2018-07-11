<?php
include_once("../../db/db.php");

$DB = new DAO();
$conn = $DB->getConnect();
$response = [];
$IdDoc = $_POST["IdDoc"];
if(isset($IdDoc)){
	$createItemSQL="UPDATE enfdoctable SET IsEnabled = 0 where IdDoc = ?;";
	if ($createItem = $conn->prepare($createItemSQL)) {
	    $createItem->bind_param("i", $IdDoc);
	    if (!$createItem->execute()) {
	    	$response = null;
	        $response["status"] = "ERROR";
	        $response["code"] = "500";
	        $response["response"] = "Ocurrio un error en la eliminacion del registro" . $conn->error;
	        echo json_encode($response);
	    }else{
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
?>