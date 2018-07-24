<?php
include_once("../../db/db.php");

$DB = new DAO();
$conn = $DB->getConnect();
$catarr =  [];
$IdCat = $_GET["idCat"];
$bandera = $_GET["bandera"];

$Query = GetQuery($IdCat, $bandera);

if ($cmd = $conn->prepare($Query)) {
    if($IdCat > 0){
        $cmd->bind_param("i", $IdCat);
    }
    if ($cmd->execute()) {
        $cmd->store_result();
        $cmd->bind_result($IdCat_,$Desc);
        $cont=0;
        while ($cmd->fetch()) {
            $catarr[$cont]["Id"] = $IdCat_;
            $catarr[$cont]["Desc"] = $Desc;
            $cont++;
        }
        $info["respuesta"] = $catarr;
        $requests = null;
        $response["status"] = "OK";
        $response["code"] = "200";
        $response["response"] = $info;
    }
}else{
    echo "error ".$conn->error;
}

echo json_encode($response);
$conn->close();

function GetQuery($IdCat, $bandera)
{
    $query = "";
    switch ($bandera) {
        case 'Area':
            $query = ($IdCat != 0) ? GetQueryAreaById() : GetQueryArea();
            break;
        case 'CMed':
            $query = ($IdCat != 0) ? GetQueryCMedById() : GetQueryCMed();
            break;
        case 'LMed':
            $query = ($IdCat != 0) ? GetQueryLMedById() : GetQueryLMed();
            break;
        case 'Supervisor':
            $query = ($IdCat != 0) ? GetQuerySupById() : GetQuerySup();
            break;
        case 'ClasifBit':
            $query = ($IdCat != 0) ? GetQueryClasifBitById() : GetQueryClasifBit();
            break;
        case 'Emp':
            $query = ($IdCat != 0) ? GetQueryEmpById() : GetQueryEmp();
            break;
    }

    return $query;
}

function GetQueryAreaById()
{
    $query = "SELECT idAreasPlanta, Area FROM areasplanta where idAreasPlanta = ? order by idAreasPlanta desc;";
    return $query;
}

function GetQueryCMedById()
{
    $query = "SELECT idClasificacionMedicamento,ClasifMedDescripcion 
              FROM clasificacionmedicamento 
              where idClasificacionMedicamento = ? 
              order by idClasificacionMedicamento desc;";
    return $query;
}

function GetQueryArea()
{
    $query = "SELECT idAreasPlanta, Area FROM areasplanta order by idAreasPlanta desc;";
    return $query;
}

function GetQueryCMed()
{
    $query = "SELECT idClasificacionMedicamento,ClasifMedDescripcion 
              FROM clasificacionmedicamento
              order by idClasificacionMedicamento desc;";
    return $query;
}

function GetQuerySupById()
{
    $query = "SELECT idSupervisor,SupervisorName FROM supervisor where idSupervisor = ? order by idSupervisor desc;";
    return $query;
}

function GetQuerySup()
{
    $query = "SELECT idSupervisor,SupervisorName FROM supervisor order by SupervisorName desc;";
    return $query;
}

function GetQueryClasifBitById()
{
    $query = "SELECT idClasificacionDolor,ClasifDesc FROM clasificaciondolor where idClasificacionDolor = ? order by idClasificacionDolor desc;";
    return $query;
}

function GetQueryClasifBit()
{
    $query = "SELECT idClasificacionDolor,ClasifDesc FROM clasificaciondolor order by idClasificacionDolor desc;";
    return $query;
}

function GetQueryLMedById()
{
    $query = "SELECT idMedicamento,Descripcion FROM medicamentos where idMedicamento = ? and IsEnabled = 1 order by idMedicamento desc;";
    return $query;
}

function GetQueryLMed()
{
    $query = "SELECT idMedicamento,Descripcion FROM medicamentos where IsEnabled = 1 order by idMedicamento desc;";
    return $query;
}

function GetQueryEmpById()
{
    $query = "SELECT IdEmpleado,NumEmpleado FROM empleados where IdEmpleado = ? and IsEnabled = 1 order by IdEmpleado desc;";
    return $query;
}

function GetQueryEmp()
{
    $query = "SELECT IdEmpleado,NumEmpleado FROM empleados where IsEnabled = 1 order by IdEmpleado desc;";
    return $query;
}
?>