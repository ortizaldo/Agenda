<?php
include_once("../../db/db.php");

$DB = new DAO();
$conn = $DB->getConnect();
$response = [];

if (isset($_POST["data_"])) {
    $res = false;
    foreach ($_POST["data_"] as $key => $emp) {
        //recorremos a los empleados obtenidos por el CSV
        if (!ExistEmpleado($emp["Num. Empleado"])) {
            $res = InsertarEmpleados($emp);
        }else{
            $res = true;
        }
    }
    if ($res) {
        $response["response"] = "Se realizo correctamente el registro";
        $response["status"] = "SUCCESS";
        $response["code"] = "200";
    } else {
        $response["status"] = "ERROR";
        $response["code"] = "500";
        $response["response"] = "Ocurrio un error en la Importacion";
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
    
    $ResArea = GetArea($arr["Area"]);

    $NumEmpleado = $arr["Num. Empleado"];
    $Nombre = $arr["Nombre"];
    $ApellidoPaterno = $arr["Ape. Paterno"];
    $ApellidoMaterno = $arr["Ape. Materno"];
    $Area = $arr["Area"];
    
    //(IdEmpleado,NumEmpleado,Nombre,ApellidoPaterno,ApellidoMaterno,Area,IsEnabled,CreatedAt,ModifiedAt)
    $createItemSQL="INSERT INTO empleados(NumEmpleado,Nombre,ApellidoPaterno,ApellidoMaterno,
                                          Area,IsEnabled,CreatedAt,ModifiedAt) 
                    VALUES(?, ?, ?, ?, ?, 1, NOW(), NOW());";
    if ($createItem = $conn->prepare($createItemSQL)) {
        $createItem->bind_param("ssssi", $NumEmpleado,$Nombre,$ApellidoPaterno,$ApellidoMaterno,$ResArea);
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

function GetArea($Area)
{
    $res = 0;
    if ($Area != "") {
        //validamos que exista y si existe devolvemos el id pero si no existe insertamos el area y devolvemos el id
        $res = GetIdArea($Area);
        if($res == 0){
            //Insertamos el Area
            $res = InsArea($Area);
        }
    }

    return $res;    
}

function GetIdArea($Area)
{
    $res = 0;
    $DB = new DAO();
	$conn = $DB->getConnect();
	//obtenemos un valor true o false si el area que intentamos registrar existe
	$query = "SELECT idAreasPlanta FROM areasplanta where Area = ? order by idAreasPlanta desc limit 1;";

	if ($cmd = $conn->prepare($query)) {
	    $cmd->bind_param("s", $Area);
	    if ($cmd->execute()) {
	        $cmd->store_result();
	        $cmd->bind_result($idAreasPlanta_);
	        $cont=0;
            while ($cmd->fetch()) {
                $res = $idAreasPlanta_;
            }
	    }
	}else{
	    echo "error ".$conn->error;
	}

	return $res;
}

function InsArea($Area)
{
    $res = 0;
    $DB = new DAO();
    $conn = $DB->getConnect();
    
    $createItemSQL="INSERT INTO areasplanta(Area) VALUES(?);";
	if ($createItem = $conn->prepare($createItemSQL)) {
        $createItem->bind_param("s", $Area);
        if ($createItem->execute()) {
            $res = $conn->insert_id;
        }
    }

    return $res;
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