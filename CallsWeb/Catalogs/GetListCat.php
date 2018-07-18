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
?>