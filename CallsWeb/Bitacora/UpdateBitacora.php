<?php
include_once("../../db/db.php");

$DB = new DAO();
$conn = $DB->getConnect();
$response = [];

if (isset($_POST["obj"])) {
    $IdBitacora = UpdateBitacora($_POST["obj"]);
    if ($IdBitacora) {
        $response["response"] = "Se realizo correctamente el registro";
        $response["status"] = "SUCCESS";
        $response["code"] = "200";
        $response["bitacora"] = GetBitacora($_POST["obj"]["IdBitacora"]);
    } else {
        $response["status"] = "ERROR";
        $response["code"] = "500";
        $response["response"] = "Ocurrio un error en la Insercion";
    }
    echo json_encode($response);
} else {
    $response["status"] = "ERROR";
    $response["code"] = "500";
    $response["response"] = "Campos Vacios";
    echo json_encode($response);
}

function UpdateBitacora($arr){
    $DB = new DAO();
	$conn = $DB->getConnect();
    $response = false;
    
    $IdSupervisor = $arr["IdSupervisor"];
    $IdEnfDoc = $arr["IdEnfDoc"];
    $IdClasificacion = $arr["IdClasificacion"];
    $IdEmpleado = $arr["IdEmpleado"];
    $Diagnostico = $arr["Diagnostico"];
    $Turno = $arr["Turno"];
    $IdBitacora = $arr["IdBitacora"];
    
    //(IdEmpleado,NumEmpleado,Nombre,ApellidoPaterno,ApellidoMaterno,Area,IsEnabled,CreatedAt,ModifiedAt)
    $createItemSQL="UPDATE bitacoraconsulta SET 
                    IdSupervisor= ?,IdEnfDoc= ?,IdClasificacion= ?,IdEmpleado= ?,Diagnostico= ?,
                    Turno= ?,ModifiedAt= NOW() 
                    WHERE idBitacoraConsulta = ?;";
    if ($createItem = $conn->prepare($createItemSQL)) {
        $createItem->bind_param("iiiisii", $IdSupervisor,$IdEnfDoc,$IdClasificacion,$IdEmpleado,$Diagnostico,
        $Turno, $IdBitacora);
        if ($createItem->execute()) {
            $response = true;
        }else{
            echo $conn->error;
        }
    }

    return $response;
}

function GetBitacora($IdBitacora)
{
    $bitacoraArr = [];
    $DB = new DAO();
	$conn = $DB->getConnect();
	//obtenemos un valor true o false si el area que intentamos registrar existe
	$query = "SELECT bc.idBitacoraConsulta, bc.Diagnostico, bc.Turno, bc.CreationDate,
              sup.SupervisorName, cd.ClasifDesc,emp.Nombre, emp.ApellidoPaterno, emp.ApellidoMaterno,
              emp.NumEmpleado, emp.Actividad, emp.sexo, emp.FecAntiguedad, ap.Area, depto.NombreDepto, doc.Titulo, doc.Nombre as NomDoc,
              doc.ApellidoPaterno as ApePatDoc, doc.ApellidoMaterno as ApeMatDoc
              FROM bitacoraconsulta as bc, enfdoctable as doc, clasificaciondolor as cd, 
                   empleados as emp, supervisor as sup, areasplanta as ap, departamento as depto
              where 0=0
              and bc.IdEnfDoc = doc.IdDoc
              and bc.IdClasificacion = cd.idClasificacionDolor
              and bc.IdEmpleado = emp.IdEmpleado
              and bc.IdSupervisor = sup.idSupervisor
              and emp.Area = ap.idAreasPlanta
              and emp.IdDpto = depto.IdDepto
              and bc.idBitacoraConsulta = ?
              and bc.IsEnabled = 1
              order by bc.idBitacoraConsulta desc limit 1;";

	if ($cmd = $conn->prepare($query)) {
	    $cmd->bind_param("i", $IdBitacora);
	    if ($cmd->execute()) {
	        $cmd->store_result();
            
            $cmd->bind_result($idBitacoraConsulta,$Diagnostico,$Turno,$CreationDate,
            $SupervisorName,$ClasifDesc,$Nombre,$ApellidoPaterno,$ApellidoMaterno,
            $NumeroEmpleado,$Actividad,$sexo,$FecAntiguedad,$Area,$NombreDepto,
            $Titulo, $NomDoc, $ApePatDoc, $ApeMatDoc);
            
            while ($cmd->fetch()) {
                $bitacoraArr["idBitacoraConsulta"] = $idBitacoraConsulta;
                $bitacoraArr["Diagnostico"] = $Diagnostico;
                $bitacoraArr["Turno"] = $Turno;
                $bitacoraArr["CreationDate"] = $CreationDate;
                $bitacoraArr["SupervisorName"] = $SupervisorName;
                $bitacoraArr["ClasifDesc"] = $ClasifDesc;
                $bitacoraArr["Nombre"] = $Nombre;
                $bitacoraArr["ApellidoPaterno"] = $ApellidoPaterno;
                $bitacoraArr["ApellidoMaterno"] = $ApellidoMaterno;
                $bitacoraArr["NumeroEmpleado"] = $NumeroEmpleado;
                $bitacoraArr["Actividad"] = $Actividad;
                $bitacoraArr["sexo"] = $sexo;
                $bitacoraArr["FecAntiguedad"] = $FecAntiguedad;
                $bitacoraArr["Area"] = $Area;
                $bitacoraArr["NombreDepto"] = $NombreDepto;
                $bitacoraArr["Titulo"] = $Titulo;
                $bitacoraArr["NomDoc"] = $NomDoc;
                $bitacoraArr["ApePatDoc"] = $ApePatDoc;
                $bitacoraArr["ApeMatDoc"] = $ApeMatDoc;
            }
	    }
	}else{
	    echo "error ".$conn->error;
	}

	return $bitacoraArr;
}
?>