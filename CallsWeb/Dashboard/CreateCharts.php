<?php
include_once("../../db/db.php");

$DB = new DAO();
$conn = $DB->getConnect();
$bitacoraArr =  [];
$start_date = $_GET["start_date"];
$end_date = $_GET["end_date"];
$filtr = $_GET["filtr"];
$flag = $_GET["flag"];

if($flag == "dpto"){
    $query = GetQueryBitacoraDpto($filtr);
}

if ($cmd = $conn->prepare($query)) {
    if($filtr != "all"){
        $cmd->bind_param("sss", $start_date, $end_date, $filtr);
    }else{
        $cmd->bind_param("ss", $start_date, $end_date);
    }
    if ($cmd->execute()) {
        $cmd->store_result();
        $cont=0;

        $cmd->bind_result($filtr,$NVeces);
            
        while ($cmd->fetch()) {
            $bitacoraArr[$cont]["filtr"] = $filtr;
            $bitacoraArr[$cont]["NVeces"] = $NVeces;
            $cont++;
        }
        
        $requests = null;
        $response["status"] = "OK";
        $response["code"] = "200";
        $response["response"] = $bitacoraArr;

        echo json_encode($response);
        $conn->close();
    }
}else{
    echo "error ".$conn->error;
}

function GetQueryBitacoraDpto($filtr)
{
    $query = "SELECT area.Area, count(area.Area) as NumVeces ";
    $query .= "FROM histmedico.bitacoraconsulta as bc, ";
    $query .= "histmedico.empleados as emp, ";
    $query .= "histmedico.areasplanta as area ";
    $query .= "where 0=0 ";
    $query .= "and bc.IdEmpleado = emp.IdEmpleado ";
    $query .= "and emp.Area = area.idAreasPlanta ";
    $query .= "and bc.IsEnabled = 1 ";
    $query .= "and bc.CreationDate between ? and ? ";
    if($filtr != "all"){
        $query .= "and area.Area = ? ";
    }
    $query .= "group by area.Area ";
    $query .= "order by NumVeces desc ";
    return $query;
}
?>