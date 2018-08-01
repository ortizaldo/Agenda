<?php
include_once("../../db/db.php");

$DB = new DAO();
$conn = $DB->getConnect();
$response = [];

$desc = $_POST["obj"]["desc"];
$CMed = $_POST["obj"]["CMed"];
$InvMinimo = $_POST["obj"]["InvMinimo"];
$Inventario = $_POST["obj"]["Inventario"];
$IdMed = $_POST["obj"]["IdMed"];
if(isset($desc) && $CMed != "0"){
    $createItemSQL="UPDATE medicamentos 
                    SET 
                    Descripcion = ?, 
                    IdClasificacion = ?, 
                    CantidadMinima = ?, 
                    Total = ?, 
                    ModifiedAt = Now() 
                    where IdMedicamento = ?;";
    if ($createItem = $conn->prepare($createItemSQL)) {
        $createItem->bind_param("siiii", $desc,$CMed,$InvMinimo,$Inventario,$IdMed);
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
}else{
	$response["status"] = "ERROR";
    $response["code"] = "500";
    $response["response"] = "Campos Vacios";
}

function GetUnidades($IdTBit)
{
    $response = [];
    $DB = new DAO();
	$conn = $DB->getConnect();
    //obtenemos un valor true o false si el area que intentamos registrar existe
    $query = "SELECT med.CantidadTempo, med.CantidadPresentacion, med.Total, med.idMedicamento
              FROM medicamentos as med
              where 0=0
              and med.idMedicamento = ? limit 1;";

	if ($cmd = $conn->prepare($query)) {
	    $cmd->bind_param("i", $IdTBit);
	    if ($cmd->execute()) {
	        $cmd->store_result();
            
            $cmd->bind_result($CantidadTempo, $CantidadMed, $CantidadPresentacion, $Total, $idMedicamento, $IdBitacora);
            $cont = 0;            
            while ($cmd->fetch()) {
                $response["CantidadPresentacion"] = $CantidadPresentacion;
                $response["CantidadTempo"] = $CantidadTempo;
                $response["CantidadMed"] = $CantidadMed;
                $response["Total"] = $Total;
                $response["idMedicamento"] = $idMedicamento;
                $response["IdBitacora"] = $IdBitacora;
            }
	    }
	}else{
	    echo "error ".$conn->error;
	}

	return $response;
}
?>