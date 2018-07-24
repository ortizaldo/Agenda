<?php
include_once("../../db/db.php");

$DB = new DAO();
$conn = $DB->getConnect();
$empleadoArr =  [];
$idempleado_ = $_GET["id_empleado"];
if($idempleado_ > 0){
    $query = "SELECT emp.IdEmpleado,emp.NumEmpleado,emp.Nombre,emp.ApellidoPaterno,emp.ApellidoMaterno,ap.Area,
              emp.sexo,depto.NombreDepto,emp.actividad,emp.FecAntiguedad,emp.IsEnabled,emp.CreatedAt 
              FROM empleados as emp, areasplanta as ap, departamento as depto
              where 0=0
              and emp.Area = ap.idAreasPlanta
              and depto.IdDepto = emp.IdDpto
              and emp.IsEnabled = 1
              and emp.IdEmpleado = ? 
              order by emp.IdEmpleado desc;";
}else{
    $query = "SELECT emp.IdEmpleado,emp.NumEmpleado,emp.Nombre,emp.ApellidoPaterno,emp.ApellidoMaterno,ap.Area,
              emp.sexo,depto.NombreDepto,emp.actividad,emp.FecAntiguedad,emp.IsEnabled,emp.CreatedAt 
              FROM empleados as emp, areasplanta as ap, departamento as depto
              where 0=0
              and emp.Area = ap.idAreasPlanta
              and depto.IdDepto = emp.IdDpto
              and emp.IsEnabled = 1
              order by emp.IdEmpleado desc;";
}

if ($cmd = $conn->prepare($query)) {
    if($idempleado_ > 0){
        $cmd->bind_param("i", $idempleado_);
    }
    if ($cmd->execute()) {
        $cmd->store_result();
        $cmd->bind_result($IdEmpleado,$NumEmpleado,$Nombre,$ApellidoPaterno,$ApellidoMaterno,$Area,
        $sexo,$depto,$actividad,$antiguedad,$IsEnabled,$CreatedAt);
        $cont=0;
        
        while ($cmd->fetch()) {
            $empleadoArr[$cont]["IdEmpleado"] = $IdEmpleado;
            $empleadoArr[$cont]["NumEmpleado"] = $NumEmpleado;
            $empleadoArr[$cont]["Nombre"] = $Nombre;
            $empleadoArr[$cont]["ApellidoPaterno"] = $ApellidoPaterno;
            $empleadoArr[$cont]["ApellidoMaterno"] = $ApellidoMaterno;
            $empleadoArr[$cont]["Area"] = $Area;
            $empleadoArr[$cont]["sexo"] = $sexo;
            $empleadoArr[$cont]["NombreDepto"] = $depto;
            $empleadoArr[$cont]["actividad"] = $actividad;
            $empleadoArr[$cont]["FecAntiguedad"] = $antiguedad;
            $empleadoArr[$cont]["IsEnabled"] = $IsEnabled;
            $empleadoArr[$cont]["CreatedAt"] = $CreatedAt;
            $cont++;
        }
        
        $requests = null;
        $response["status"] = "OK";
        $response["code"] = "200";
        $response["response"] = $empleadoArr;

        echo json_encode($response);
        $conn->close();
    }
}else{
    echo "error ".$conn->error;
}
?>