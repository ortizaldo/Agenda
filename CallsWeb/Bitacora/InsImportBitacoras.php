<?php
include_once("../../db/db.php");

$DB = new DAO();
$conn = $DB->getConnect();
$response = [];

if (isset($_POST["data_"])) {
    $res = false;
    foreach ($_POST["data_"] as $key => $bit) {
        //recorremos a los empleados obtenidos por el CSV
        $res = InsertarBitacoras($bit);
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

function InsertarBitacoras($arr){
    $DB = new DAO();
	$conn = $DB->getConnect();
    $response = false;
    
    $ResArea = GetCatalog( $arr["AREA"], "area");
    $ResDepto = GetCatalog( $arr["DEPARTAMENTO"], "depto");
    $ResEmp = GetCatalog( $arr, "emp" );
    if($ResEmp == 0){
        $ResEmp = InsEmpleado($arr, $ResArea, $ResDepto);
    }
    $ResSup = GetCatalog( $arr["SUPERVISOR"], "sup");
    $ResClasifd = GetCatalog( $arr["CLASIFICACION"], "clasifd");
    $ResPmed = GetPMed( $arr );
    $diag = $arr["DIAGNOSTICO"];
    $turno = $arr["TURNO"];
    $created = new DateTime($arr["FECHA"] . " " . $arr["HORA"]);
    $created_f = date_format($created, 'Y-m-d H:i:s');
    $createItemSQL="INSERT INTO bitacoraconsulta
                    (
                        IdSupervisor,
                        IdEnfDoc,
                        IdClasificacion,
                        IdEmpleado,
                        Diagnostico,
                        Turno,
                        CreationDate,
                        ModifiedAt,
                        IsEnabled
                    ) 
                    VALUES(?,?,?,?,?,?,?, NOW(), 1);";
    if ($createItem = $conn->prepare($createItemSQL)) {
        $createItem->bind_param("iiiisis", $ResSup, $ResPmed, $ResClasifd, $ResEmp, $diag, $turno, $created_f);
        if (!$createItem->execute()) {
            echo "error ".$conn->error;
            $response = false;
        }else{
            $response = true;
        }
    }else{
        echo "error ".$conn->error;
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
        if($res == 0 && $band != "emp"){
            //Insertamos el Area
            $res = InsCat($Cat, $band);
        }
    }
    return $res;    
}

function GetPMed($Cat)
{
    $res = 0;
    if ($Cat != "") {
        //validamos que exista y si existe devolvemos el id pero si no existe insertamos el area y devolvemos el id
        $res = GetIdPMed($Cat);
        if($res == 0){
            //Insertamos el Area
            $res = InsPMed($Cat);
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
    }else if($band == "emp"){
        $query = "SELECT IdEmpleado FROM empleados where NumEmpleado = ? order by IdEmpleado desc limit 1;";
    }else if($band == "sup"){
        $query = "SELECT idSupervisor FROM supervisor where SupervisorName = ? order by idSupervisor desc limit 1;";
    }else if($band == "clasifd"){
        $query = "SELECT idClasificacionDolor FROM clasificaciondolor where ClasifDesc = ? order by idClasificacionDolor desc limit 1;";
    }
	

	if ($cmd = $conn->prepare($query)) {
        if($band == "emp"){
            $cmd->bind_param("s", $cat["#EMP"]);
        }else{
            $cmd->bind_param("s", $cat);
        }
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
    }else if($band == "sup"){
        $createItemSQL = "INSERT supervisor(SupervisorName)VALUES(?)";
    }else if($band == "clasifd"){
        $createItemSQL = "INSERT clasificaciondolor(ClasifDesc)VALUES(?)";
    }

	if ($createItem = $conn->prepare($createItemSQL)) {
        $createItem->bind_param("s", $cat);
        if ($createItem->execute()) {
            $res = $conn->insert_id;
        }
    }

    return $res;
}

function GetIdPMed($cat)
{
    $res = 0;
    $DB = new DAO();
	$conn = $DB->getConnect();
    
    //obtenemos un valor true o false si el area que intentamos registrar existe
    $query = "SELECT IdDoc 
              FROM enfdoctable 
              where 0=0
              and Titulo = ? 
              and Nombre = ? 
              and ApellidoPaterno = ? 
              and ApellidoMaterno = ? 
              order by IdDoc 
              desc limit 1;";

	if ($cmd = $conn->prepare($query)) {
        $cmd->bind_param("ssss", $cat["TITLE"],$cat["ATENDIO"],$cat["APATPMED"],$cat["AMATPMED"]);
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

function InsPMed($cat)
{
    $res = 0;
    $DB = new DAO();
    $conn = $DB->getConnect();
    $createItemSQL = "";
    
    $createItemSQL="INSERT INTO enfdoctable(Nombre, ApellidoPaterno, ApellidoMaterno, Titulo, CreatedAt, IsEnabled) 
    VALUES(?,?,?,?, NOW(), 1);";
	if ($createItem = $conn->prepare($createItemSQL)) {
        $createItem->bind_param("ssss", $cat["ATENDIO"],$cat["APATPMED"],$cat["AMATPMED"], $cat["TITLE"]);
        if ($createItem->execute()) {
            $res = $conn->insert_id;
        }
    }

    return $res;
}

function InsEmpleado($cat, $IdArea, $Idpto)
{
    $res = 0;
    $DB = new DAO();
    $conn = $DB->getConnect();
    $createItemSQL = "";
    $createItemSQL="INSERT INTO empleados(NumEmpleado,Nombre, ApellidoPaterno, ApellidoMaterno, 
    Area, IdDpto, sexo, actividad, FecAntiguedad, CreatedAt, ModifiedAt, IsEnabled) 
    VALUES(?,?,?,?,?,?,?,?,NOW(), NOW(),NOW(), 1);";
	if ($createItem = $conn->prepare($createItemSQL)) {
        $createItem->bind_param("ssssiiss", $cat["#EMP"],$cat["NOMBRE"],$cat["APAT"],
        $cat["AMAT"], $IdArea, $Idpto , $cat["SEXO"], $cat["ACTIVIDAD"]);
        if ($createItem->execute()) {
            $res = $conn->insert_id;
        }
    }

    return $res;
}
?>