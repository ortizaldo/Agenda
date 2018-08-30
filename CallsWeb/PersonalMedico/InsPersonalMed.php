<?php
include_once("../../db/db.php");

$DB = new DAO();
$conn = $DB->getConnect();
$response = [];
$nombre = $_POST["obj"]["nombre"];
$apellido_pat = $_POST["obj"]["apellido_pat"];
$apellido_mat = $_POST["obj"]["apellido_mat"];
$titulo = $_POST["obj"]["titulo"];
$username = $_POST["obj"]["username"];
$password = $_POST["obj"]["password"];
//var_dump($_POST["obj"]);
if(isset($nombre) && isset($apellido_pat) && isset($apellido_mat) && $titulo != "0"){
	if (GetPersMedExists($nombre, $apellido_pat, $apellido_mat, $titulo, $username)) {
		$response["status"] = "ERROR";
        $response["code"] = "500";
        $response["response"] = "Ya existe un un registro con la informacion que esta tratando de enviar..";
        echo json_encode($response);
	}else{
		$createItemSQL="INSERT INTO enfdoctable(Nombre, ApellidoPaterno, ApellidoMaterno, Titulo, Usuario, Password, CreatedAt) 
		VALUES(?, ?, ?, ?, ?, ?, NOW());";
		if ($createItem = $conn->prepare($createItemSQL)) {
		    $createItem->bind_param("ssssss", $nombre, $apellido_pat, $apellido_mat, $titulo, $username, $password );
		    if (!$createItem->execute()) {
		    	$response = null;
		        $response["status"] = "ERROR";
		        $response["code"] = "500";
		        $response["response"] = "Ocurrio un error en la insercion" . $conn->error;
		        echo json_encode($response);
		    }else{
		    	$response["response"] = "Se realizo correctamente el registro";
		    	$response["status"] = "SUCCESS";
		        $response["code"] = "200";
		        echo json_encode($response);
		    }
		}else{
		    $response["status"] = "ERROR";
		    $response["code"] = "500";
		    $response["response"] = "Ocurrio un error en la insercion" . $conn->error;
		    echo json_encode($response);
		}
	}
}else{
	$response["status"] = "ERROR";
    $response["code"] = "500";
    $response["response"] = "Campos Vacios";
}

function GetPersMedExists($nombre, $ape_pat, $ape_mat, $titulo, $username)
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
			  and Usuario = ? 
			  order by IdDoc desc limit 1;";

	if ($cmd = $conn->prepare($query)) {
	    $cmd->bind_param("sssss", $nombre,$ape_mat,$ape_pat,$titulo, $username);
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