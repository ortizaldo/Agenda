<?php
include_once("../../db/db.php");

$DB = new DAO();
$conn = $DB->getConnect();
$arrdoc =  [];
$IdPersonalMed = $_GET["IdPersonalMed"];
if($IdPersonalMed > 0){
    $query = "SELECT IdDoc, Nombre, ApellidoPaterno, ApellidoMaterno, Titulo, CreatedAt 
              FROM enfdoctable 
              where 0=0 
              and IdDoc = ? 
              and IsEnabled = 1 
              order by IdDoc desc;";
}else{
    $query = "SELECT IdDoc, Nombre, ApellidoPaterno, ApellidoMaterno, Titulo, CreatedAt 
              FROM enfdoctable 
              WHERE 0=0
              AND IsEnabled = 1
              order by IdDoc desc;";
}

if ($cmd = $conn->prepare($query)) {
    if($IdPersonalMed > 0){
        $cmd->bind_param("i", $IdPersonalMed);
    }
    if ($cmd->execute()) {
        $cmd->store_result();
        $cmd->bind_result($IdDoc,$Nombre,$ApellidoPaterno,$ApellidoMaterno,$Titulo, $CreatedAt);
        $cont=0;
        while ($cmd->fetch()) {
            $arrdoc[$cont]["IdDoc"] = $IdDoc;
            $arrdoc[$cont]["Nombre"] = $Nombre;
            $arrdoc[$cont]["ApellidoPaterno"] = $ApellidoPaterno;
            $arrdoc[$cont]["ApellidoMaterno"] = $ApellidoMaterno;
            $arrdoc[$cont]["Titulo"] = $Titulo;
            $arrdoc[$cont]["CreatedAt"] = $CreatedAt;
            $cont++;
        }
        $requests = null;
        $response["status"] = "OK";
        $response["code"] = "200";
        $response["response"] = $arrdoc;
    }
}else{
    $response["status"] = "ERROR";
    $response["code"] = "500";
    $response["response"] = "error ".$conn->error;
}

echo json_encode($response);
$conn->close();
?>