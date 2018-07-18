<?php
include_once("../../db/db.php");

$DB = new DAO();
$conn = $DB->getConnect();
$response = [];
$Cmed = $_POST["obj"]["Cmed"];
//var_dump($_POST["obj"]);
if(isset($Cmed)){
	if(ExistCMed($Cmed)){
		$response["status"] = "ERROR";
	    $response["code"] = "500";
	    $response["response"] = "La Clasificacion que desea registrar Ya Existe!" . $conn->error;
	    echo json_encode($response);
	}else{
		$createItemSQL="INSERT INTO clasificacionmedicamento(ClasifMedDescripcion) VALUES(?);";
		if ($createItem = $conn->prepare($createItemSQL)) {
		    $createItem->bind_param("s", $Cmed);
		    if (!$createItem->execute()) {
		    	$response = null;
		        $response["status"] = "ERROR";
		        $response["code"] = "500";
		        $response["response"] = "Ocurrio un error en la insercion" . $conn->error;
		        echo json_encode($response);
		    }else{
		    	$IdCmed = $conn->insert_id;
		    	$response = null;
		        $response["status"] = "SUCCESS";
		        $response["code"] = "200";
		        $response["IdCmed"] = $IdCmed;
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

function ExistCMed($CmedDesc)
{
	$DB = new DAO();
	$conn = $DB->getConnect();
	$res = false;
	//obtenemos un valor true o false si el area que intentamos registrar existe
	$query = "SELECT idClasificacionMedicamento FROM clasificacionmedicamento where ClasifMedDescripcion = ? order by idClasificacionMedicamento desc limit 1;";

	if ($cmd = $conn->prepare($query)) {
	    $cmd->bind_param("s", $CmedDesc);
	    if ($cmd->execute()) {
	        $cmd->store_result();
	        $cmd->bind_result($idClasificacionMedicamento);
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