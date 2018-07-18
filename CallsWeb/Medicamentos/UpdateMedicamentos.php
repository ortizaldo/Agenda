<?php
include_once("../../db/db.php");

$DB = new DAO();
$conn = $DB->getConnect();
$response = [];

$desc = $_POST["obj"]["desc"];
$CMed = $_POST["obj"]["CMed"];
$IdMed = $_POST["obj"]["IdMed"];

if(isset($desc) && $CMed != "0"){
    $createItemSQL="UPDATE medicamentos SET Descripcion = ?, IdClasificacion = ?, ModifiedAt = Now() where IdMedicamento = ?;";
    if ($createItem = $conn->prepare($createItemSQL)) {
        $createItem->bind_param("sii", $desc,$CMed, $IdMed);
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
?>