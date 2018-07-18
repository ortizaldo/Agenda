<?php
include_once("../../db/db.php");

$DB = new DAO();
$conn = $DB->getConnect();
$response = [];

$num_empleado = $_POST["obj"]["num_empleado"];
$nombre = $_POST["obj"]["nombre"];
$ape_pat = $_POST["obj"]["apellido_pat"];
$ape_mat = $_POST["obj"]["apellido_mat"];
$area = $_POST["obj"]["area"];
$IdEmp = $_POST["obj"]["IdEmp"];

if(isset($nombre) && isset($ape_pat) && isset($ape_mat) && $area != "0"){
    $createItemSQL="UPDATE empleados SET NumEmpleado = ?, Nombre = ?, ApellidoPaterno = ?, ApellidoMaterno = ?, Area = ? where IdEmpleado = ?;";
    if ($createItem = $conn->prepare($createItemSQL)) {
        $createItem->bind_param("ssssii", $num_empleado,$nombre, $ape_pat, $ape_mat, $area, $IdEmp);
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