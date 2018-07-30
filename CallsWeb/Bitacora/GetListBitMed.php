<?php
include_once("../../db/db.php");

$DB = new DAO();
$conn = $DB->getConnect();
$medArr =  [];
$IdBitacora = $_GET["IdBitacora"];
$IdMedBit = $_GET["IdMedBit"];
if($IdMedBit > 0){
    $query = "SELECT tb.IdTratBitacora,tb.CantidadMed,tb.CreationDate,med.Descripcion,
              cm.ClasifMedDescripcion, med.Presentacion
              FROM bitacoraconsulta as bc, medicamentos as med, tratamientobitacora as tb, clasificacionmedicamento as cm
              where 0=0
              and tb.IdBitacora = bc.idBitacoraConsulta
              and tb.IdMedicamento = med.idMedicamento
              and med.IdClasificacion = cm.idClasificacionMedicamento
              and bc.IdTratBitacora = ?
              order by tb.IdTratBitacora desc;";
}else{
    $query = "SELECT tb.IdTratBitacora,tb.CantidadMed,tb.CreationDate,med.Descripcion,
              cm.ClasifMedDescripcion, med.Presentacion
              FROM bitacoraconsulta as bc, medicamentos as med, tratamientobitacora as tb, clasificacionmedicamento as cm
              where 0=0
              and tb.IdBitacora = bc.idBitacoraConsulta
              and tb.IdMedicamento = med.idMedicamento
              and med.IdClasificacion = cm.idClasificacionMedicamento
              and bc.idBitacoraConsulta = ?
              order by tb.IdTratBitacora desc;";
}

if ($cmd = $conn->prepare($query)) {
    if($IdMedBit > 0){
        $cmd->bind_param("i", $IdMedBit);
    }else{
        $cmd->bind_param("i", $IdBitacora);
    }
    if ($cmd->execute()) {
        $cmd->store_result();
        $cmd->bind_result($IdTratBitacora,$CantidadMed,$CreationDate,$Descripcion,$ClasifMedDescripcion, $presentacion);
        $cont=0;
        
        while ($cmd->fetch()) {
            $medArr[$cont]["IdTratBitacora"] = $IdTratBitacora;
            $medArr[$cont]["Descripcion"] = $Descripcion;
            $medArr[$cont]["CantidadMed"] = $CantidadMed;
            $medArr[$cont]["CreationDate"] = $CreationDate;
            $medArr[$cont]["ClasifMedDescripcion"] = $ClasifMedDescripcion;
            $medArr[$cont]["Presentacion"] = $presentacion;
            $cont++;
        }
        
        $requests = null;
        $response["status"] = "OK";
        $response["code"] = "200";
        $response["response"] = $medArr;

        echo json_encode($response);
        $conn->close();
    }
}else{
    echo "error ".$conn->error;
}
?>