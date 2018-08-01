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
    
    $ResArea = GetCatalog($arr["Area"], "area");

    $NumEmpleado = $arr["Num. Empleado"];
    $Nombre = $arr["Nombre"];
    $ApellidoPaterno = $arr["Ape. Paterno"];
    $ApellidoMaterno = $arr["Ape. Materno"];
    $Area = $arr["Area"];
    
    $ResDepto = GetCatalog($arr["Departamento"], "depto");
    $Sexo = $arr["Sexo"];
    $Actividad = $arr["Actividad"];
    $FecAntiguedad = $arr["FecAntiguedad"];

    //(IdEmpleado,NumEmpleado,Nombre,ApellidoPaterno,ApellidoMaterno,Area,IsEnabled,CreatedAt,ModifiedAt)
    $createItemSQL="INSERT INTO empleados(NumEmpleado,Nombre,ApellidoPaterno,ApellidoMaterno,
                                          sexo, IdDpto, actividad, FecAntiguedad,Area,IsEnabled,CreatedAt,ModifiedAt) 
                    VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, 1, NOW(), NOW());";
    if ($createItem = $conn->prepare($createItemSQL)) {
        $createItem->bind_param("sssssissi", $NumEmpleado,$Nombre,$ApellidoPaterno,$ApellidoMaterno,
        $Sexo,$ResDepto,$Actividad,$FecAntiguedad,$ResArea);
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

function GetCatalog($Cat, $band)
{
    $res = 0;
    if ($Cat != "") {
        //validamos que exista y si existe devolvemos el id pero si no existe insertamos el area y devolvemos el id
        $res = GetIdCat($Cat, $band);
        if($res == 0){
            //Insertamos el Area
            $res = InsCat($Cat, $band);
        }
    }

    return $res;    
}

function GetIdCat($cat, $band)
{
    $res = 0;
    $DB = new DAO();
	$conn = $DB->getConnect();
    //obtenemos un valor true o false si el area que intentamos registrar existe
    $query = "";
    if($band == "area"){
        $query = "SELECT idAreasPlanta FROM areasplanta where Area = ? order by idAreasPlanta desc limit 1;";
    }else if($band == "depto"){
        $query = "SELECT IdDepto FROM departamento where NombreDepto = ? order by IdDepto desc limit 1;";
    }
	

	if ($cmd = $conn->prepare($query)) {
	    $cmd->bind_param("s", $cat);
	    if ($cmd->execute()) {
	        $cmd->store_result();
	        $cmd->bind_result($iCat_);
	        $cont=0;
            while ($cmd->fetch()) {
                $res = $iCat_;
            }
	    }
	}else{
	    echo "error ".$conn->error;
	}

	return $res;
}

function InsCat($cat, $band)
{
    $res = 0;
    $DB = new DAO();
    $conn = $DB->getConnect();
    $createItemSQL = "";
    if($band == "area"){
        $createItemSQL="INSERT INTO areasplanta(Area) VALUES(?);";
    }else if($band == "depto"){
        $createItemSQL="INSERT INTO departamento(NombreDepto) VALUES(?);";
    }
	if ($createItem = $conn->prepare($createItemSQL)) {
        $createItem->bind_param("s", $cat);
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