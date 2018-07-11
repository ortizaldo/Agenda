<?php
include_once("../../db/db.php");

$DB = new DAO();
$conn = $DB->getConnect();
$agendaArr =  [];
$idagenda_ = $_GET["id_agenda"];
if($idagenda_ > 0){
    $query = "SELECT idagenda, nombre, apellidos, DirArchivo, direccion, FecActualizacion FROM agenda where idagenda = ?;";
}else{
    $query = "SELECT idagenda, nombre, apellidos, DirArchivo, direccion, FecActualizacion FROM agenda;";
}

if ($cmd = $conn->prepare($query)) {
    if($idagenda_ > 0){
        $cmd->bind_param("i", $idagenda_);
    }
    if ($cmd->execute()) {
        $cmd->store_result();
        $cmd->bind_result($idagenda,$nombre,$apellidos,$DirArchivo,$direccion,$FecActualizacion);
        $cont=0;
        while ($cmd->fetch()) {
            $agendaArr[$cont]["idagenda"] = $idagenda;
            $agendaArr[$cont]["nombre"] = $nombre;
            $agendaArr[$cont]["apellidos"] = $apellidos;
            $agendaArr[$cont]["DirArchivo"] = $DirArchivo;
            $agendaArr[$cont]["direccion"] = $direccion;
            $agendaArr[$cont]["FecActualizacion"] = $FecActualizacion;
            $agendaArr[$cont]["telefonos"] = GetTelefonos($conn, $idagenda);
            $cont++;
        }
        
        $requests = null;
        $response["status"] = "OK";
        $response["code"] = "200";
        $response["response"] = $agendaArr;
    }
}else{
    echo "error ".$conn->error;
}

function GetTelefonos($conn, $idagenda)
{
    $agendaArr =  [];
    $query = "SELECT IdTelefonosAgenda, telefono FROM telefonosagenda where IdAgenda = ?;";
    if ($cmd = $conn->prepare($query)) {
        $cmd->bind_param("i", $idagenda);
        if ($cmd->execute()) {
            $cmd->store_result();
            $cmd->bind_result($IdTelefonosAgenda,$telefono);
            $cont=0;
            while ($cmd->fetch()) {
                $agendaArr[$cont]["IdTelefonosAgenda"] = $IdTelefonosAgenda;
                $agendaArr[$cont]["telefono"] = $telefono;
                $cont++;
            }
        }
    }
    return $agendaArr;
}

echo json_encode($response);
$conn->close();
?>