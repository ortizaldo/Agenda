<?php
include_once("../../db/db.php");

$DB = new DAO();
$conn = $DB->getConnect();
$response = [];
$IdMedBit = $_POST["IdMedBit"];
$unidades = GetUnidades($IdMedBit);
//obtenemos la cantidad de unidades que contiene este registro
$UnidadesDel = $unidades["CantidadMed"];
$CantidadTempo = $unidades["CantidadTempo"];
$CantidadPresentacion = $unidades["CantidadPresentacion"];
$IdMedicamento = $unidades["idMedicamento"];
$Total = $unidades["Total"];
$UStockTempoF = 0;
$StockTempo = 0;
$Restante = 0;
//obtenemos la cantidad de stock temporal faltante

if($CantidadPresentacion > $CantidadTempo && $UnidadesDel > $CantidadTempo){
    if(GetUnidades($IdMedBit)["Total"] == $CantidadPresentacion){
        $Total = GetUnidades($IdMedBit)["Total"] + 1;
        UpdateInventario($IdMedicamento,$Total);
    }
    
    $InvTempo = $UnidadesDel + $CantidadTempo;
    
    SetPresentacion($InvTempo, $IdMedicamento);

    //eliminamos el registro
    if(DelRecord($IdMedBit)){
        $response = null;
        $response["status"] = "SUCCESS";
        $response["code"] = "200";
        $response["bitacorameds"] = GetMBitacora($unidades["IdBitacora"]);
        $response["response"] = "Se elimino correctamente el registro";
        echo json_encode($response);
    }else{
        $response = null;
        $response["status"] = "ERROR";
        $response["code"] = "500";
        $response["response"] = "Ocurrio un error en la eliminacion del registro" . $conn->error;
        echo json_encode($response);
    }
}else if ($CantidadPresentacion > $CantidadTempo && $UnidadesDel <= $CantidadTempo) {
    $UStockTempoF = $CantidadPresentacion - $CantidadTempo;
    if($UnidadesDel > $UStockTempoF){
        if(GetUnidades($IdMedBit)["Total"] == $CantidadPresentacion){
            $Total = GetUnidades($IdMedBit)["Total"] + 1;
            UpdateInventario($IdMedicamento,$Total);
        }
        $Restante = $UnidadesDel - $UStockTempoF;
        SetPresentacion($Restante, $IdMedicamento);
    }else{
        $InvTempo = $UnidadesDel + $CantidadTempo;
        if($InvTempo == $CantidadPresentacion){
            $Total = GetUnidades($IdMedBit)["Total"] + 1;
            UpdateInventario($IdMedicamento,$Total);
        }
        SetPresentacion($InvTempo, $IdMedicamento);
    }

    //eliminamos el registro
    if(DelRecord($IdMedBit)){
        $response = null;
        $response["status"] = "SUCCESS";
        $response["code"] = "200";
        $response["bitacorameds"] = GetMBitacora($unidades["IdBitacora"]);
        $response["response"] = "Se elimino correctamente el registro";
        echo json_encode($response);
    }else{
        $response = null;
        $response["status"] = "ERROR";
        $response["code"] = "500";
        $response["response"] = "Ocurrio un error en la eliminacion del registro" . $conn->error;
        echo json_encode($response);
    }
}else if( ($CantidadPresentacion == $CantidadTempo) && ($UnidadesDel <= $CantidadTempo) ){
    if($UnidadesDel == $CantidadPresentacion){
        $Total = GetUnidades($IdMedBit)["Total"] + 1;
        UpdateInventario($IdMedicamento,$Total);
    }
    SetPresentacion($UnidadesDel, $IdMedicamento);
    //eliminamos el registro
    if(DelRecord($IdMedBit)){
        $response = null;
        $response["status"] = "SUCCESS";
        $response["code"] = "200";
        $response["bitacorameds"] = GetMBitacora($unidades["IdBitacora"]);
        $response["response"] = "Se elimino correctamente el registro";
        echo json_encode($response);
    }else{
        $response = null;
        $response["status"] = "ERROR";
        $response["code"] = "500";
        $response["response"] = "Ocurrio un error en la eliminacion del registro" . $conn->error;
        echo json_encode($response);
    }
}

function GetMBitacora($IdMedBitacora)
{
    $bitacoraArr = [];
    $DB = new DAO();
	$conn = $DB->getConnect();
	//obtenemos un valor true o false si el area que intentamos registrar existe
	$query = "SELECT tb.IdTratBitacora,tb.CantidadMed,tb.CreationDate,med.Descripcion,
              cm.ClasifMedDescripcion
              FROM bitacoraconsulta as bc, medicamentos as med, tratamientobitacora as tb, clasificacionmedicamento as cm
              where 0=0
              and tb.IdBitacora = bc.idBitacoraConsulta
              and tb.IdMedicamento = med.idMedicamento
              and med.IdClasificacion = cm.idClasificacionMedicamento
              and bc.idBitacoraConsulta = ?
              order by tb.IdTratBitacora desc limit 1;";

	if ($cmd = $conn->prepare($query)) {
	    $cmd->bind_param("i", $IdMedBitacora);
	    if ($cmd->execute()) {
	        $cmd->store_result();
            
            $cmd->bind_result($IdTratBitacora,$CantidadMed,$CreationDate,$Descripcion,$ClasifMedDescripcion);
            $cont = 0;            
            while ($cmd->fetch()) {
                $bitacoraArr[$cont]["IdTratBitacora"] = $IdTratBitacora;
                $bitacoraArr[$cont]["CantidadMed"] = $CantidadMed;
                $bitacoraArr[$cont]["CreationDate"] = $CreationDate;
                $bitacoraArr[$cont]["Descripcion"] = $Descripcion;
                $bitacoraArr[$cont]["ClasifMedDescripcion"] = $ClasifMedDescripcion;

                $cont++;
            }
	    }
	}else{
	    echo "error ".$conn->error;
	}

	return $bitacoraArr;
}

function GetUnidades($IdTBit)
{
    $response = [];
    $DB = new DAO();
	$conn = $DB->getConnect();
    //obtenemos un valor true o false si el area que intentamos registrar existe
    $query = "SELECT med.CantidadTempo, tb.CantidadMed, med.CantidadPresentacion, med.Total, med.idMedicamento,
              tb.IdBitacora
              FROM medicamentos as med, tratamientobitacora as tb 
              where 0=0
              and tb.IdMedicamento = med.idMedicamento
              and tb.IdTratBitacora = ? limit 1;";

	if ($cmd = $conn->prepare($query)) {
	    $cmd->bind_param("i", $IdTBit);
	    if ($cmd->execute()) {
	        $cmd->store_result();
            
            $cmd->bind_result($CantidadTempo, $CantidadMed, $CantidadPresentacion, $Total, $idMedicamento, $IdBitacora);
            $cont = 0;            
            while ($cmd->fetch()) {
                $response["CantidadPresentacion"] = $CantidadPresentacion;
                $response["CantidadTempo"] = $CantidadTempo;
                $response["CantidadMed"] = $CantidadMed;
                $response["Total"] = $Total;
                $response["idMedicamento"] = $idMedicamento;
                $response["IdBitacora"] = $IdBitacora;
            }
	    }
	}else{
	    echo "error ".$conn->error;
	}

	return $response;
}

function SetPresentacion($StockPresentacion, $Medicamento)
{
    $response = false;
    $DB = new DAO();
    $conn = $DB->getConnect();
    $createItemSQL="UPDATE medicamentos SET CantidadTempo = ?, ModifiedAt = NOW() where idMedicamento = ?;";
    if ($createItem = $conn->prepare($createItemSQL)) {
        $createItem->bind_param("ii", $StockPresentacion, $Medicamento);
        if ($createItem->execute()) {
            $response = true;
        }
    }

    return $response;
}

function DelRecord($IdBitMed)
{
    $response = false;
    $DB = new DAO();
    $conn = $DB->getConnect();
    $createItemSQL="DELETE FROM tratamientobitacora where IdTratBitacora = ?;";
    if ($createItem = $conn->prepare($createItemSQL)) {
        $createItem->bind_param("i", $IdBitMed);
        if ($createItem->execute()) {
            $response = true;
        }
    }

    return $response;
}

function UpdateInventario($Medicamento,$TotQuantity)
{
    $response = false;
    $DB = new DAO();
    $conn = $DB->getConnect();
    $createItemSQL="UPDATE medicamentos SET Total = ?, ModifiedAt = NOW() where idMedicamento = ?;";
    if ($createItem = $conn->prepare($createItemSQL)) {
        $createItem->bind_param("ii", $TotQuantity, $Medicamento);
        if ($createItem->execute()) {
            $response = true;
        }
    }
    return $response;
}
?>