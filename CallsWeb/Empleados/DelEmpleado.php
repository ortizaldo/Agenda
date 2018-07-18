<?php
include_once("../../db/db.php");

$DB = new DAO();
$conn = $DB->getConnect();
$response = [];
$IdEmpleado = $_POST["IdEmpleado"];
if(isset($IdEmpleado)){
	$createItemSQL="UPDATE empleados SET IsEnabled = 0 where IdEmpleado = ?;";
	if ($createItem = $conn->prepare($createItemSQL)) {
	    $createItem->bind_param("i", $IdEmpleado);
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