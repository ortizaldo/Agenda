<?php
include_once("../../db/db.php");

$DB = new DAO();
$conn = $DB->getConnect();
$response = [];
$ValCat = $_POST["obj"]["val"];
$tcat = $_POST["obj"]["cat"];
if(isset($ValCat)){
	if(ExistCat($ValCat, $tcat)){
		$response["status"] = "ERROR";
	    $response["code"] = "500";
	    $response["response"] = "El Registro que desea registrar Ya Existe!" . $conn->error;
	    echo json_encode($response);
	}else{
		$QueryCat = GetQueryCat($tcat);
		if ($createItem = $conn->prepare($QueryCat)) {
		    $createItem->bind_param("s", $ValCat);
		    if (!$createItem->execute()) {
		    	$response = null;
		        $response["status"] = "ERROR";
		        $response["code"] = "500";
		        $response["response"] = "Ocurrio un error en la insercion" . $conn->error;
		        echo json_encode($response);
		    }else{
		    	$IdCat = $conn->insert_id;
		    	$response = null;
		        $response["status"] = "SUCCESS";
		        $response["code"] = "200";
		        $response["IdCat"] = $IdCat;
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

function ExistCat($ValCat, $tcat)
{
	$DB = new DAO();
	$conn = $DB->getConnect();
	$res = false;
	$query = GetQueryExistCat($tcat);
	//obtenemos un valor true o false si el area que intentamos registrar existe
	//$query = "SELECT idAreasPlanta FROM areasplanta where Area = ? order by idAreasPlanta desc limit 1;";

	if ($cmd = $conn->prepare($query)) {
	    $cmd->bind_param("s", $ValCat);
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

function GetQueryExistCat($tcat)
{
	$query = "";
	
	switch ($tcat) {
		case 'Supervisor':
			$query = "SELECT idSupervisor FROM supervisor where SupervisorName = ? order by idSupervisor desc limit 1;";
			break;
		case 'ClasifBit':
			$query = "SELECT idClasificacionDolor FROM clasificaciondolor where ClasifDesc = ? order by idClasificacionDolor desc limit 1;";
			break;
	}

	return $query;
}

function GetQueryCat($tcat)
{
	$query = "";
	
	switch ($tcat) {
		case 'Supervisor':
			$query = "INSERT INTO supervisor(SupervisorName) VALUES(?);";
			break;
		case 'ClasifBit':
			$query = "INSERT INTO clasificaciondolor(ClasifDesc) VALUES(?);";
			break;
	}

	return $query;
}
?>