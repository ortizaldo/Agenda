<?php
include_once("../../db/db.php");

$DB = new DAO();
$conn = $DB->getConnect();
$response = [];

$num_empleado = $_POST["obj"]["num_emp"];
$nombre = $_POST["obj"]["nombre"];
$ape_pat = $_POST["obj"]["apellido_pat"];
$ape_mat = $_POST["obj"]["apellido_mat"];
$area = $_POST["obj"]["area"];
$IdEmp = $_POST["obj"]["IdEmp"];
$sexo = $_POST["obj"]["sexo"];
$depto = $_POST["obj"]["depto"];
$actividad = $_POST["obj"]["actividad"];
$antiguedad = $_POST["obj"]["antiguedad"];

if(isset($nombre) && isset($ape_pat) && isset($ape_mat) && $area != "0"){
    $createItemSQL="UPDATE empleados SET NumEmpleado = ?, Nombre = ?, 
                                         ApellidoPaterno = ?, ApellidoMaterno = ?, 
                                         Area = ?, sexo = ?, IdDpto = ?, actividad = ?, FecAntiguedad = ?, 
                                         ModifiedAt = NOW()
                    where IdEmpleado = ?;";
    if ($createItem = $conn->prepare($createItemSQL)) {
        $createItem->bind_param("ssssisissi", $num_empleado,$nombre, $ape_pat, $ape_mat, $area, 
        $sexo,$depto,$actividad,$antiguedad,$IdEmp);
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