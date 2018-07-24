<?php
include_once("../../db/db.php");

$DB = new DAO();
$conn = $DB->getConnect();
$response = [];

if (isset($_POST["obj"])) {
    if (InsertarEmpleados($_POST["obj"])) {
        $response["response"] = "Se realizo correctamente el registro";
        $response["status"] = "SUCCESS";
        $response["code"] = "200";
    } else {
        $response["status"] = "ERROR";
        $response["code"] = "500";
        $response["response"] = "Ocurrio un error en la Insercion";
    }
    echo json_encode($response);
} else {
    $response["status"] = "ERROR";
    $response["code"] = "500";
    $response["response"] = "Campos Vacios";
    echo json_encode($response);
}

function InsertarEmpleados($arr){
    $DB = new DAO();
	$conn = $DB->getConnect();
    $response = false;
    
    $NumEmpleado = $arr["num_emp"];
    $Nombre = $arr["nombre"];
    $ApellidoPaterno = $arr["apellido_pat"];
    $ApellidoMaterno = $arr["apellido_mat"];
    $Area = $arr["area"];
    $sexo = $arr["sexo"];
    $depto = $arr["depto"];
    $actividad = $arr["actividad"];
    $antiguedad = $arr["antiguedad"];
    
    //(IdEmpleado,NumEmpleado,Nombre,ApellidoPaterno,ApellidoMaterno,Area,IsEnabled,CreatedAt,ModifiedAt)
    $createItemSQL="INSERT INTO empleados(NumEmpleado,Nombre,ApellidoPaterno,ApellidoMaterno,Area,
                                          sexo,IdDpto,actividad,FecAntiguedad,
                                          IsEnabled,CreatedAt,ModifiedAt) 
                    VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, 1, NOW(), NOW());";
    if ($createItem = $conn->prepare($createItemSQL)) {
        $createItem->bind_param("ssssisiss", $NumEmpleado,$Nombre,$ApellidoPaterno,$ApellidoMaterno,$Area,
        $sexo,$depto,$actividad,$antiguedad);
        if (!$createItem->execute()) {
            $response = false;
        }else{
            $response = true;
        }
    }else{
        $response = false;
    }

    return $response;
}

function ExistEmpleado($NumEmpleado)
{
    $res = false;
    $DB = new DAO();
	$conn = $DB->getConnect();
	//obtenemos un valor true o false si el area que intentamos registrar existe
	$query = "SELECT IdEmpleado FROM empleados where NumEmpleado = ? order by IdEmpleado desc limit 1;";

	if ($cmd = $conn->prepare($query)) {
	    $cmd->bind_param("s", $NumEmpleado);
	    if ($cmd->execute()) {
	        $cmd->store_result();
	        $cmd->bind_result($IdEmpleado);
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