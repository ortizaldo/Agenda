<?php
include_once("../../db/db.php");

$DB = new DAO();
$conn = $DB->getConnect();
$response = [];

if (isset($_POST["obj"])) {
    //validamos que el medicamento que se esta registrando no sea mayor a lo que se tiene en stock
    if(ValidStock( $_POST["obj"]["Medicamento"], $_POST["obj"]["TotQuantity"], true )){
        $pres = GetStockPresentacion($_POST["obj"]["Medicamento"]);
        if(ValidStock( $_POST["obj"]["Medicamento"], $_POST["obj"]["TotQuantity"], false ) && 
           ($_POST["obj"]["TotQuantity"] <= $pres["CantidadTempo"] || $pres["CantidadTempo"] == 0)){
            $IdMedBitacora = InsertarMedBitacora($_POST["obj"]);
            if ($IdMedBitacora > 0) {
                //actualizamos el inventario
                UpdateInventarioPresentacion( $_POST["obj"]["Medicamento"], $_POST["obj"]["TotQuantity"]);
                $response["response"] = "Se realizo correctamente el registro";
                $response["status"] = "SUCCESS";
                $response["code"] = "200";
                $response["MedBits"] = GetMedBitacora($_POST["obj"]["IBitacora"]);
            } else {
                $response["status"] = "ERROR";
                $response["code"] = "500";
                $response["response"] = "Ocurrio un error en la Insercion";
            }
        }else{
            $response["status"] = "ERROR";
            $response["code"] = "501";
            $response["response"] = "La cantidad capturada no debe exceder la cantidad de presentacion del medicamento";
        }
    }else{
        $response["status"] = "ERROR";
        $response["code"] = "501";
        $response["response"] = "No hay existencia en Inventario para este Medicamento";
    }
    echo json_encode($response);
} else {
    $response["status"] = "ERROR";
    $response["code"] = "500";
    $response["response"] = "Campos Vacios";
    echo json_encode($response);
}

function InsertarMedBitacora($arr){
    $DB = new DAO();
	$conn = $DB->getConnect();
    $response = 0;
    
    $IBitacora = $arr["IBitacora"];
    $Medicamento = $arr["Medicamento"];
    $TotQuantity = $arr["TotQuantity"];
    
    //(IdEmpleado,NumEmpleado,Nombre,ApellidoPaterno,ApellidoMaterno,Area,IsEnabled,CreatedAt,ModifiedAt)
    $createItemSQL="INSERT INTO tratamientobitacora(IdBitacora,IdMedicamento,CantidadMed,CreationDate,ModifiedDate) 
                    VALUES(?, ?, ?,NOW(), NOW());";
    if ($createItem = $conn->prepare($createItemSQL)) {
        $createItem->bind_param("iii", $IBitacora,$Medicamento,$TotQuantity);
        if ($createItem->execute()) {
            $response = $conn->insert_id;
        }
    }

    return $response;
}

function GetMedBitacora($IdMedBitacora)
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

function ValidStock($Medicamento,$TotQuantity, $IsStock)
{
    $response = false;
    $DB = new DAO();
	$conn = $DB->getConnect();
    //obtenemos un valor true o false si el area que intentamos registrar existe
    $query = "";
    if($IsStock){
        $query = "SELECT Total FROM medicamentos where idMedicamento = ? limit 1;";   
    }else{
        $query = "SELECT CantidadPresentacion FROM medicamentos where idMedicamento = ? limit 1;";
    }

	if ($cmd = $conn->prepare($query)) {
	    $cmd->bind_param("i", $Medicamento);
	    if ($cmd->execute()) {
	        $cmd->store_result();
            
            $cmd->bind_result($Total);
            $cont = 0;            
            while ($cmd->fetch()) {
                if($Total > 0){
                    if($TotQuantity <= $Total){
                        $response = true;
                    }
                }
            }
	    }
	}else{
	    echo "error ".$conn->error;
	}

	return $response;
}

function GetStockPresentacion($Medicamento)
{
    $response = [];
    $DB = new DAO();
	$conn = $DB->getConnect();
    //obtenemos un valor true o false si el area que intentamos registrar existe
    $query = "SELECT CantidadPresentacion, CantidadTempo FROM medicamentos where idMedicamento = ? limit 1;";

	if ($cmd = $conn->prepare($query)) {
	    $cmd->bind_param("i", $Medicamento);
	    if ($cmd->execute()) {
	        $cmd->store_result();
            
            $cmd->bind_result($CantidadPresentacion, $CantidadTempo);
            $cont = 0;            
            while ($cmd->fetch()) {
                $response["CantidadPresentacion"] = $CantidadPresentacion;
                $response["CantidadTempo"] = $CantidadTempo;
            }
	    }
	}else{
	    echo "error ".$conn->error;
	}

	return $response;
}

function GetStock($Medicamento)
{
    $response = 0;
    $DB = new DAO();
	$conn = $DB->getConnect();
    //obtenemos un valor true o false si el area que intentamos registrar existe
    $query = "";

    $query = "SELECT Total FROM medicamentos where idMedicamento = ? limit 1;";

	if ($cmd = $conn->prepare($query)) {
	    $cmd->bind_param("i", $Medicamento);
	    if ($cmd->execute()) {
	        $cmd->store_result();
            
            $cmd->bind_result($Total);
            $cont = 0;            
            while ($cmd->fetch()) {
                $response = $Total;
            }
	    }
	}else{
	    echo "error ".$conn->error;
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

function UpdateInventarioPresentacion($Medicamento,$TotQuantity)
{
    $response = false;
    $StockPresentacion = GetStockPresentacion($Medicamento);
    if($StockPresentacion["CantidadTempo"] == 0){
        $presentacion = $StockPresentacion["CantidadPresentacion"] - $TotQuantity;
        $response = SetPresentacion($presentacion, $Medicamento);

        $inventario = GetStock($Medicamento);
        $total = $inventario - 1;
        UpdateInventario($Medicamento,$total);
    }else{
        $presentacion = $StockPresentacion["CantidadTempo"] - $TotQuantity;
        $response = SetPresentacion($presentacion, $Medicamento);
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
?>