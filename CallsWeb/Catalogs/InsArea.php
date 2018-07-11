<?php
include_once("../../db/db.php");

$DB = new DAO();
$conn = $DB->getConnect();
$response = [];
$area = $_POST["obj"]["area"];
//var_dump($_POST["obj"]);
if(isset($area)){
	if(ExistArea($area)){
		$response["status"] = "ERROR";
	    $response["code"] = "500";
	    $response["response"] = "El Area que desea registrar Ya Existe!" . $conn->error;
	    echo json_encode($response);
	}else{
		$createItemSQL="INSERT INTO areasplanta(Area) VALUES(?);";
		if ($createItem = $conn->prepare($createItemSQL)) {
		    $createItem->bind_param("s", $area);
		    if (!$createItem->execute()) {
		    	$response = null;
		        $response["status"] = "ERROR";
		        $response["code"] = "500";
		        $response["response"] = "Ocurrio un error en la insercion" . $conn->error;
		        echo json_encode($response);
		    }else{
		    	$id_area = $conn->insert_id;
		    	$response = null;
		        $response["status"] = "SUCCESS";
		        $response["code"] = "200";
		        $response["IdArea"] = $id_area;
		        $response["response"] = "Se realizo correctamente el registro";
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

function ExistArea($Area)
{
	$DB = new DAO();
	$conn = $DB->getConnect();
	$res = false;
	//obtenemos un valor true o false si el area que intentamos registrar existe
	$query = "SELECT idAreasPlanta FROM areasplanta where Area = ? order by idAreasPlanta desc limit 1;";

	if ($cmd = $conn->prepare($query)) {
	    $cmd->bind_param("s", $Area);
	    if ($cmd->execute()) {
	        $cmd->store_result();
	        $cmd->bind_result($idAreasPlanta_);
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