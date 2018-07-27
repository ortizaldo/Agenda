<?php
include_once("../../db/db.php");

$DB = new DAO();
$conn = $DB->getConnect();
$medArr =  [];
$id_medicamento_ = $_GET["id_medicamento"];
if($id_medicamento_ > 0){
    $query = "SELECT med.idMedicamento,med.Descripcion,med.CreatedAt,cmed.ClasifMedDescripcion,
              med.Presentacion,med.CantidadPresentacion,med.CantidadMinima,med.Total
              FROM medicamentos as med, clasificacionmedicamento as cmed
              where 0=0
              and med.IdClasificacion = cmed.idClasificacionMedicamento
              and med.IsEnabled = 1
              and med.idMedicamento = ? 
              order by med.idMedicamento desc;";
}else{
    $query = "SELECT med.idMedicamento,med.Descripcion,med.CreatedAt,cmed.ClasifMedDescripcion,
              med.Presentacion,med.CantidadPresentacion,med.CantidadMinima,med.Total
              FROM medicamentos as med, clasificacionmedicamento as cmed
              where 0=0
              and med.IdClasificacion = cmed.idClasificacionMedicamento
              and med.IsEnabled = 1
              order by med.idMedicamento desc;";
}

if ($cmd = $conn->prepare($query)) {
    if($id_medicamento_ > 0){
        $cmd->bind_param("i", $id_medicamento_);
    }
    if ($cmd->execute()) {
        $cmd->store_result();
        $cmd->bind_result($idMedicamento,$Descripcion,$CreatedAt,$ClasifMedDescripcion,
        $Presentacion,$CantidadPresentacion,$CantidadMinima,$Total);
        $cont=0;
        
        while ($cmd->fetch()) {
            $medArr[$cont]["idMedicamento"] = $idMedicamento;
            $medArr[$cont]["Descripcion"] = $Descripcion;
            $medArr[$cont]["CreatedAt"] = $CreatedAt;
            $medArr[$cont]["ClasifMedDescripcion"] = $ClasifMedDescripcion;
            $medArr[$cont]["Presentacion"] = $Presentacion;
            $medArr[$cont]["CantidadPresentacion"] = $CantidadPresentacion;
            $medArr[$cont]["CantidadMinima"] = $CantidadMinima;
            $medArr[$cont]["Total"] = $Total;
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