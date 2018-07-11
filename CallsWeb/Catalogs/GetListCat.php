<?php
include_once("../../db/db.php");

$DB = new DAO();
$conn = $DB->getConnect();
$areasplanta =  [];
$idAreasPlanta = $_GET["idCat"];
if($idAreasPlanta > 0){
    $query = "SELECT idAreasPlanta, Area FROM areasplanta where idAreasPlanta = ? order by idAreasPlanta desc;";
}else{
    $query = "SELECT idAreasPlanta, Area FROM areasplanta order by idAreasPlanta desc;";
}

if ($cmd = $conn->prepare($query)) {
    if($idAreasPlanta > 0){
        $cmd->bind_param("i", $idAreasPlanta);
    }
    if ($cmd->execute()) {
        $cmd->store_result();
        $cmd->bind_result($idAreasPlanta_,$Area);
        $cont=0;
        while ($cmd->fetch()) {
            $areasplanta[$cont]["idAreasPlanta"] = $idAreasPlanta_;
            $areasplanta[$cont]["Area"] = $Area;
            $cont++;
        }
        $info["respuesta"] = $areasplanta;
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
?>