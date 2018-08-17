<?php
include_once("../../db/db.php");

$DB = new DAO();
$conn = $DB->getConnect();
$response = [];

if (isset($_POST["data_"])) {
    $res = false;
    foreach ($_POST["data_"] as $key => $med) {
        //recorremos a los empleados obtenidos por el CSV
        if(count($med) == 6){
            if (!ExistMedicamento($med)) {
                $res = InsertarMedicamentos($med);
            }else{
                $res = true;
            }
        }else{
            $res = true;
        }
    }
    if ($res) {
        $response["response"] = "Se realizo correctamente el registro";
        $response["status"] = "SUCCESS";
        $response["code"] = "200";
    } else {
        $response["status"] = "ERROR";
        $response["code"] = "500";
        $response["response"] = "Ocurrio un error en la Importacion";
    }
    echo json_encode($response);
} else {
    $response["status"] = "ERROR";
    $response["code"] = "500";
    $response["response"] = "Campos Vacios";
    echo json_encode($response);
}

function InsertarMedicamentos($arr){
    $DB = new DAO();
	$conn = $DB->getConnect();
    $response = false;
    
    $ResClasificacion = GetClasif($arr["Clasificacion"]);
    
    //var_dump($arr);
    //die();
    $Medicamento = $arr["Medicamento"];
    $Minima = $arr["Cantidad Minima"];
    $Inv = $arr["Inv Actual"];
    $CPresentacion = $arr["Cantidad Presentacion"];
    $Presentacion = $arr["Presentacion"];

    $createItemSQL="INSERT INTO medicamentos(IdClasificacion,Descripcion,CreatedAt,ModifiedAt,IsEnabled,
						CantidadMinima,Total,CantidadPresentacion,CantidadTempo,Presentacion) 
                        VALUES(?, ?, NOW(), NOW(), 1, ?, ?, ?, ?,?);";
    if ($createItem = $conn->prepare($createItemSQL)) {
        $createItem->bind_param("isiiiis", $ResClasificacion, $Medicamento, $Minima, $Inv, $CPresentacion,
        $CPresentacion,$Presentacion );
        if (!$createItem->execute()) {
            echo "error ".$conn->error;
            $response = false;
        }else{
            $response = true;
        }
    }else{
        echo "error ".$conn->error;
        $response = false;
    }
    
    return $response;
}

function GetClasif($clasif)
{
    $res = 0;
    if ($clasif != "") {
        //validamos que exista y si existe devolvemos el id pero si no existe insertamos la clasificacion 
        //y devolvemos el id
        $res = GetIdClasif($clasif);
        if($res == 0){
            //Insertamos el Area
            $res = InsClasif($clasif);
        }
    }

    return $res;    
}

function GetIdClasif($clasif)
{
    $res = 0;
    $DB = new DAO();
	$conn = $DB->getConnect();
    
    $query = "SELECT idClasificacionMedicamento FROM clasificacionmedicamento where ClasifMedDescripcion = ? order by idClasificacionMedicamento desc limit 1;";

	if ($cmd = $conn->prepare($query)) {
	    $cmd->bind_param("s", $clasif);
	    if ($cmd->execute()) {
	        $cmd->store_result();
	        $cmd->bind_result($iMed_);
	        $cont=0;
            while ($cmd->fetch()) {
                $res = $iMed_;
            }
	    }else{
            echo "error ".$conn->error;
        }
	}else{
	    echo "error ".$conn->error;
	}

	return $res;
}

function InsClasif($clasif)
{
    $res = 0;
    $DB = new DAO();
    $conn = $DB->getConnect();
    
    $createItemSQL="INSERT INTO clasificacionmedicamento(ClasifMedDescripcion) VALUES(?);";

	if ($createItem = $conn->prepare($createItemSQL)) {
        $createItem->bind_param("s", $clasif);
        if ($createItem->execute()) {
            $res = $conn->insert_id;
        }else{
            echo "error ".$conn->error;
        }
    }

    return $res;
}

function ExistMedicamento($med)
{
    $res = false;
    $DB = new DAO();
    $conn = $DB->getConnect();
    $IdClasif = GetIdClasif($med["Clasificacion"]);
    $Descripcion = $med["Medicamento"];
    $CantidadPresentacion = $med["Cantidad Presentacion"];
    $Presentacion = $med["Presentacion"];
	//obtenemos un valor true o false si el area que intentamos registrar existe
	$query = "SELECT idMedicamento 
              FROM medicamentos 
              where 0=0 
              AND IdClasificacion = ? 
              AND Descripcion = ?
              AND CantidadPresentacion = ?
              AND Presentacion = ?
              order by idMedicamento desc limit 1;";

	if ($cmd = $conn->prepare($query)) {
	    $cmd->bind_param("isis", $IdClasif,$Descripcion,$CantidadPresentacion,$Presentacion);
	    if ($cmd->execute()) {
	        $cmd->store_result();
	        $cmd->bind_result($idMedicamento);
	        $cont=0;
            if($cmd->num_rows > 0){
	        	$res = true;
	        }
	    }else{
            echo "error ".$conn->error;
        }
	}else{
	    echo "error ".$conn->error;
	}
	return $res;
}

?>