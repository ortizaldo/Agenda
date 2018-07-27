<?php
include_once("../../db/db.php");

$DB = new DAO();
$conn = $DB->getConnect();
$response = [];
$desc = $_POST["obj"]["desc"];
$CMed = $_POST["obj"]["CMed"];
$InvMinimo = $_POST["obj"]["InvMinimo"];
$Inventario = $_POST["obj"]["Inventario"];
$CantPresentacion = $_POST["obj"]["CantPresentacion"];
$PresentacionMed = $_POST["obj"]["PresentacionMed"];

if(isset($desc) && $CMed != "0"){
	if (GetMedExists($CMed, $desc)) {
		$response["status"] = "ERROR";
        $response["code"] = "500";
        $response["response"] = "Ya existe un un registro con la informacion que esta tratando de enviar..";
        echo json_encode($response);
	}else{
		$createItemSQL="INSERT INTO medicamentos(IdClasificacion,Descripcion,CreatedAt,ModifiedAt,IsEnabled,
						CantidadMinima,Total,CantidadPresentacion,CantidadTempo,Presentacion) 
                        VALUES(?, ?, NOW(), NOW(), 1, ?, ?, ?, ?);";
		if ($createItem = $conn->prepare($createItemSQL)) {
		    $createItem->bind_param("isiiiis", $CMed, $desc, $InvMinimo, $Inventario, $CantPresentacion,$CantPresentacion, $PresentacionMed );
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

function GetMedExists($CMed, $desc)
{
    //idMedicamento	IdClasificacion	Descripcion	CreatedAt	ModifiedAt
	$DB = new DAO();
	$conn = $DB->getConnect();
	$res = false;
	//obtenemos un valor true o false si el area que intentamos registrar existe
	$query = "SELECT idMedicamento 
			  FROM medicamentos 
			  where 0=0
			  and Descripcion = ? 
			  and IdClasificacion = ?
			  and IsEnabled = 1
			  order by idMedicamento desc limit 1;";

	if ($cmd = $conn->prepare($query)) {
	    $cmd->bind_param("si", $desc,$CMed);
	    if ($cmd->execute()) {
	        $cmd->store_result();
	        $cmd->bind_result($IdMedicamento);
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