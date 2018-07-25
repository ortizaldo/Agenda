<?php
include_once("../../db/db.php");

$DB = new DAO();
$conn = $DB->getConnect();
$bitacoraArr =  [];
$IdBitacora_ = $_GET["IdBitacora"];
if($IdBitacora_ > 0){
    $query = GetQueryBitById();
}else{
    $query = GetQueryBitacora();
}

if ($cmd = $conn->prepare($query)) {
    if($IdBitacora_ > 0){
        $cmd->bind_param("i", $IdBitacora_);
    }
    if ($cmd->execute()) {
        $cmd->store_result();
        $cont=0;

        $cmd->bind_result($idBitacoraConsulta,$Diagnostico,$Turno,$CreationDate,
            $SupervisorName,$ClasifDesc,$Nombre,$ApellidoPaterno,$ApellidoMaterno,
            $NumeroEmpleado,$Actividad,$sexo,$FecAntiguedad,$Area,$NombreDepto,
            $Titulo, $NomDoc, $ApePatDoc, $ApeMatDoc);
            
        while ($cmd->fetch()) {
            $bitacoraArr[$cont]["idBitacoraConsulta"] = $idBitacoraConsulta;
            $bitacoraArr[$cont]["Diagnostico"] = $Diagnostico;
            $bitacoraArr[$cont]["Turno"] = $Turno;
            $bitacoraArr[$cont]["CreationDate"] = $CreationDate;
            $bitacoraArr[$cont]["SupervisorName"] = $SupervisorName;
            $bitacoraArr[$cont]["ClasifDesc"] = $ClasifDesc;
            $bitacoraArr[$cont]["Nombre"] = $Nombre;
            $bitacoraArr[$cont]["ApellidoPaterno"] = $ApellidoPaterno;
            $bitacoraArr[$cont]["ApellidoMaterno"] = $ApellidoMaterno;
            $bitacoraArr[$cont]["NumeroEmpleado"] = $NumeroEmpleado;
            $bitacoraArr[$cont]["Actividad"] = $Actividad;
            $bitacoraArr[$cont]["sexo"] = $sexo;
            $bitacoraArr[$cont]["FecAntiguedad"] = $FecAntiguedad;
            $bitacoraArr[$cont]["Area"] = $Area;
            $bitacoraArr[$cont]["NombreDepto"] = $NombreDepto;
            $bitacoraArr[$cont]["Titulo"] = $Titulo;
            $bitacoraArr[$cont]["NomDoc"] = $NomDoc;
            $bitacoraArr[$cont]["ApePatDoc"] = $ApePatDoc;
            $bitacoraArr[$cont]["ApeMatDoc"] = $ApeMatDoc;

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

function GetQueryBitById()
{
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
              order by bc.idBitacoraConsulta desc;";
    return $query;
}

function GetQueryBitacora()
{
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
              and bc.IsEnabled = 1
              order by bc.idBitacoraConsulta desc;";
    return $query;
}
?>