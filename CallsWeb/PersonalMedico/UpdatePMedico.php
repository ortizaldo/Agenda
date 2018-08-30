<?php
include_once("../../db/db.php");

$DB = new DAO();
$conn = $DB->getConnect();
$response = [];
$IdDoc = $_POST["obj"]["IdDoc"];
$nombre = $_POST["obj"]["nombre"];
$ape_pat = $_POST["obj"]["apellido_pat"];
$ape_mat = $_POST["obj"]["apellido_mat"];
$titulo = $_POST["obj"]["titulo"];
if(isset($nombre) && isset($ape_pat) && isset($ape_mat) && $titulo != "0"){
	if (GetPersMedExists($nombre, $ape_pat, $ape_mat, $titulo)) {
		$response["status"] = "ERROR";
        $response["code"] = "500";
        $response["response"] = "Ya existe un un registro con la informacion que esta tratando de enviar..";
        echo json_encode($response);
	}else{
		$createItemSQL="UPDATE enfdoctable 
		SET Nombre = ?, ApellidoPaterno = ?, ApellidoMaterno = ?, Titulo = ? 
		where IdDoc = ?;";
		if ($createItem = $conn->prepare($createItemSQL)) {
		    $createItem->bind_param("ssssi", $nombre, $ape_pat, $ape_mat, $titulo, $IdDoc);
		    if (!$createItem->execute()) {
		    	$response = null;
		        $response["status"] = "ERROR";
		        $response["code"] = "500";
		        $response["response"] = "Ocurrio un error en la actualizacion" . $conn->error;
		        echo json_encode($response);
		    }else{
		    	$response = null;
		        $response["status"] = "SUCCESS";
		        $response["code"] = "200";
		        $response["response"] = "Se actualizo correctamente el registro";
		        echo json_encode($response);
		    }
		}else{
		    $response["status"] = "ERROR";
		    $response["code"] = "500";
		    $response["response"] = "Ocurrio un error en la Actualizacion" . $conn->error;
		    echo json_encode($response);
		}
	}
}else{
	$response["status"] = "ERROR";
    $response["code"] = "500";
    $response["response"] = "Campos Vacios";
}

function GetPersMedExists($nombre, $ape_pat, $ape_mat, $titulo)
{
	$DB = new DAO();
	$conn = $DB->getConnect();
	$res = false;
	//obtenemos un valor true o false si el area que intentamos registrar existe
	$query = "SELECT IdDoc 
			  FROM enfdoctable 
			  where 0=0
			  and Nombre = ? 
			  and ApellidoMaterno = ? 
			  and ApellidoPaterno = ? 
			  and Titulo = ?  
			  order by IdDoc desc limit 1;";

	if ($cmd = $conn->prepare($query)) {
	    $cmd->bind_param("ssss", $nombre,$ape_mat,$ape_pat,$titulo);
	    if ($cmd->execute()) {
	        $cmd->store_result();
	        $cmd->bind_result($IdDoc);
	        $cont=0;
	        if($cmd->num_rows > 0){
	        	$res = true;
	        }
	    }
	}else{
	    echo "error ".$conn->error;
	}

	return $res;
}
?>