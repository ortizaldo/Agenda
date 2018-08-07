
$(".add-bitacora").on("click", function(e) {
    e.preventDefault();
    $(".title-modal-bit").text("Agregar Bitacora");
    BuildFormAddBitacora();
    ChangeClassActive($("#bitacorad"), "dash");
    HideModalsF("bitacora");
    $('#modal-add-bitacora').modal({backdrop: 'static', keyboard: false});
});

//add-supervisor
$(".add-supervisor").on("click", function(e) {
    e.preventDefault();
    $("#modal-add-bitacora").hide();
    alertify.prompt( 'Agregar un Supervisor', 'Supervisor', 'Supervisor', function(evt, value) {
        if(value !== 'Supervisor'){
            
            var obj = {
                'val':value,
                'cat':'Supervisor'
            }

            AddCatalog(obj, $("#modal-add-bitacora"));

        }else{
            alertify.error("Debe de capturar un valor diferente al de default..");
        }
        $("#modal-add-bitacora").show();    
    }, function() { 
        alertify.error('Cancel');
        $("#modal-add-bitacora").show();
    });
});

$(".add-clasif").on("click", function(e) {
    e.preventDefault();
    $("#modal-add-bitacora").hide();
    alertify.prompt( 'Agregar una Clasificacion', 'Clasificacion', 'Clasificacion', function(evt, value) {
        if(value !== 'Clasificacion'){
            
            var obj = {
                'val':value,
                'cat':'ClasifBit'
            }

            AddCatalog(obj, $("#modal-add-bitacora"));

        }else{
            alertify.error("Debe de capturar un valor diferente al de default..");
        }
        $("#modal-add-bitacora").show();    
    }, function() { 
        alertify.error('Cancel');
        $("#modal-add-bitacora").show();
    });
});

$("#SelectEmpleado").on("change", function(e) {
    var IdEmp = $(this).val();
    $("#InfoEmpleado").html("");
    $("#InfoEmpleado").hide();
    if(IdEmp > 0){
        $.ajax({
            method: "GET",
            url: "CallsWeb/Empleados/ListEmpleados.php",
            data: {id_empleado: IdEmp},
            dataType: "JSON",
            success: function (data) {
                if(parseInt(data.code) === 200){
                    var html = "",
                        nombre = data.response[0].Nombre + " " + data.response[0].ApellidoPaterno + " " + data.response[0].ApellidoMaterno;
                    if(data.response.length === 1){
                        html += '<address>';
                            html += '<strong>Informacion del Empleado</strong><br>';
                            html += '<strong>Nombre:</strong> '+nombre+'<br>';
                            html += '<strong>Sexo:</strong> '+data.response[0].sexo+'<br>';
                            html += '<strong>Area:</strong> '+data.response[0].Area+'<br>';
                            html += '<strong>Depto:</strong> '+data.response[0].NombreDepto+'<br>';
                            html += '<strong>Actividad:</strong> '+data.response[0].actividad+'<br>';
                            html += '<strong>Antiguedad:</strong> '+data.response[0].FecAntiguedad+'<br>';
                        html += '</address>';
                        $("#InfoEmpleado").html(html);
                        $("#InfoEmpleado").show();
                    }
                }else{
                    $("#InfoEmpleado").html("");
                    $("#InfoEmpleado").hide();
                    alertify.error("Ocurrio un error al obtener la informacion de los Empleados..");
                }
            }
        });
    }else{
        $("#InfoEmpleado").html("");
        $("#InfoEmpleado").hide();
    }
});

$("#save-bitacora").on("click", function(e) {
    var IdEmpleado = $("#SelectEmpleado option:selected").val();
    var IdSupervisor = $("#SelectSupervisor option:selected").val();
    var IdClasificacion = $("#SelectClasificacion option:selected").val();
    var Turno = $("#SelectTurno option:selected").val();
    var IdEnfDoc = $("#SelectAtendio option:selected").val();
    var Diagnostico = $("#diagnostico").val();
    
    if( IdEmpleado === 0 ){
        alertify.error("El campo 'Num. Empleado' es obligatorio");
        return false;
    }

    if( IdSupervisor === 0 ){
        alertify.error("El campo 'Supervisor' es obligatorio");
        return false;
    }
    if( IdClasificacion === 0 ){
        alertify.error("El campo 'Clasificacion' es obligatorio");
        return false;
    }
    if( Turno === 0 ){
        alertify.error("El campo 'Turno' es obligatorio");
        return false;
    }
    if( IdEnfDoc === 0 ){
        alertify.error("El campo 'Atendio' es obligatorio");
        return false;
    }

    if(_.isEmpty(Diagnostico)){
        alertify.error("El campo 'Diagnostico' es obligatorio");
        return false;
    }

    var obj = {
        'IdSupervisor': IdSupervisor,
        'IdEnfDoc': IdEnfDoc,
        'IdClasificacion': IdClasificacion,
        'IdEmpleado': IdEmpleado,
        'Diagnostico': Diagnostico,
        'Turno': Turno
    }
    
    SaveBitacora(obj, "CallsWeb/Bitacora/InsBitacora.php", "POST", false);
});

$("#upd-bitacora").on("click", function(e) {
    var IdEmpleado = $("#SelectEmpleado option:selected").val();
    var IdSupervisor = $("#SelectSupervisor option:selected").val();
    var IdClasificacion = $("#SelectClasificacion option:selected").val();
    var Turno = $("#SelectTurno option:selected").val();
    var IdEnfDoc = $("#SelectAtendio option:selected").val();
    var Diagnostico = $("#diagnostico").val();
    
    if( IdEmpleado === 0 ){
        alertify.error("El campo 'Num. Empleado' es obligatorio");
        return false;
    }

    if( IdSupervisor === 0 ){
        alertify.error("El campo 'Supervisor' es obligatorio");
        return false;
    }
    if( IdClasificacion === 0 ){
        alertify.error("El campo 'Clasificacion' es obligatorio");
        return false;
    }
    if( Turno === 0 ){
        alertify.error("El campo 'Turno' es obligatorio");
        return false;
    }
    if( IdEnfDoc === 0 ){
        alertify.error("El campo 'Atendio' es obligatorio");
        return false;
    }

    if(_.isEmpty(Diagnostico)){
        alertify.error("El campo 'Diagnostico' es obligatorio");
        return false;
    }

    var obj = {
        'IdSupervisor': IdSupervisor,
        'IdEnfDoc': IdEnfDoc,
        'IdClasificacion': IdClasificacion,
        'IdEmpleado': IdEmpleado,
        'Diagnostico': Diagnostico,
        'Turno': Turno,
        'IdBitacora': IBitacora
    }

    SaveBitacora(obj, "CallsWeb/Bitacora/UpdateBitacora.php", "POST", true);
});

function SaveBitacora(obj, url, method_url, IsUpdate) {
    $.ajax({
        method: method_url,
        url: url,
        dataType: "JSON",
        data: {obj},
        success: function (data) {
            if(parseInt(data.code) == 200){
                alertify.success(data.response);
                $("#FormBitacora").hide();
                BuildDetailBitacora(data.bitacora);
                IBitacora = data.bitacora.idBitacoraConsulta;
                GetBitacora(IBitacora, IsUpdate, false);
            }else{
                alertify.error(data.response);
            }
        }
    });
}

$("#tbl_bitacora").on("click", ".btn-update-bitacora", function(e) {
    e.preventDefault();
    var IdBitacora = $(this).attr("data-id");
    IBitacora = $(this).attr("data-id");
    $(".title-modal-bit").text("Bitacora");
    GetBitacora(IdBitacora, true, true);
});

$("#tbl_bitmed").on("click", ".btn-del-bmed", function(e) {
    e.preventDefault();
    var id = $(this).attr("data-id");
    alertify.confirm('Eliminar Registros', 'Desea Eliminar este Registro', function(){ 
        DelMedBit(id, true);
    }, function(){ 
        alertify.error('Se cancelo la accion..')
    });
});

function DelMedBit(IdMedBit) {
    $.ajax({
        method: "POST",
        url: "CallsWeb/Bitacora/DeleteMedBitacora.php",
        data: {IdMedBit: IdMedBit},
        dataType: "JSON",
        success: function (data) {
            if(parseInt(data.code) === 200){
                alertify.success(data.response);
                GetBitacoraMed(IBitacora,0, false);
            }else{
                alertify.error("Ocurrio un error al obtener la informacion de los empleados..");
            }
        }
    });
}

$(".InfoBitacora").on("click", "#update-bitacora", function(e) {
    e.preventDefault();
    $(".title-modal-bit").text("Actualizar Bitacora");
    $(".InfoPaciente").html("");
    $(".InfoBitacora").html("");
    $("#DetailFormBitacora").hide();
    $(".addMedBit").hide();
    $("#save-bitacora").hide();
    $("#upd-bitacora").show();
    $("#cancel-upd").show();
    
    
    
    GetListCat(0, "Emp", $("#SelectEmpleado"), Bitacora.NumeroEmpleado);
    GetListCat(0, "Supervisor", $("#SelectSupervisor"), Bitacora.SupervisorName);
    GetListCat(0, "ClasifBit", $("#SelectClasificacion"), Bitacora.ClasifDesc);
    
    var doc = Bitacora.Titulo +' '+ Bitacora.NomDoc +' '+ Bitacora.ApePatDoc;
    
    GetPersonalMedico(0, false, true, doc);
    
    $("#SelectTurno").val(Bitacora.Turno).change();
    $("#diagnostico").val(Bitacora.Diagnostico);
    
    $("#FormBitacora").show();

    

    $("#tbl_bitmed").DataTable().destroy();
    $("#tbl_bitmed tbody").html("");
    

    IBitacora = $(this).attr("data-id");
});



$("#cancel-upd").on("click",function(e) {
    e.preventDefault();
    var IdBitacora = $(this).attr("data-id");
    GetBitacora(IBitacora, true, false);
});

//close-bitacora
$(".close-bitacora").on("click", function(e) {
    e.preventDefault();
    CleanModalAddBitacora();
});

//add-med-bit
$(".add-med-bit").on("click", function(e) {
    var SelectMedicamento = parseInt($("#SelectMedicamento option:selected").val());
    var TotQuantity = $("#TotQuantity").val();
    
    if( SelectMedicamento === 0 ){
        alertify.error("El campo 'Medicamento' es obligatorio");
        return false;
    }

    if( TotQuantity === 0  && TMed !== "PADECIMIENTOS"){
        alertify.error("El campo 'Cantidad' es obligatorio");
        return false;
    }

    var obj = {
        'IBitacora':IBitacora,
        'Medicamento': SelectMedicamento,
        'TotQuantity': TotQuantity
    }

    console.log("obj", obj);
    
    return false;
    $.ajax({
        method: "POST",
        url: "CallsWeb/Bitacora/InsMedBitacora.php",
        dataType: "JSON",
        data: {obj},
        success: function (data) {
            console.log("data", data);
            if(parseInt(data.code) == 200){
                alertify.success(data.response);
                GetBitacoraMed(IBitacora,0, false);
            }else{
                alertify.error(data.response);
            }
        }
    });
});

$("#bitacorad").on("click", function(e) {
    e.preventDefault();
    HideModalsF("bitacora");
    ChangeClassActive($("#bitacorad"), "dash");
});

function GetBitacoraMed(IdBitacora,IdMedBit, IsUpdate) {
    $.ajax({
        method: "GET",
        url: "CallsWeb/Bitacora/GetListBitMed.php",
        data: {
            'IdBitacora': IdBitacora,
            'IdMedBit': IdMedBit,
        },
        dataType: "JSON",
        success: function (data) {
            if(parseInt(data.code) === 200){
                if(IsUpdate){
                    if(data.response.length === 1){
                        console.log('res', data.response);
                    }
                }else{
                    BuildArrTBLBitMed(data.response);
                }
            }else{
                alertify.error("Ocurrio un error al obtener la informacion del Personal Medico..");
            }
        }
    });
}

function GetBitacora(IdBitacora,IsUpdate, IsModal) {
    $.ajax({
        method: "GET",
        url: "CallsWeb/Bitacora/GetListBitacoras.php",
        data: {
            'IdBitacora': IdBitacora,
        },
        dataType: "JSON",
        success: function (data) {
            if(parseInt(data.code) === 200){
                if(IsUpdate){
                    if(data.response.length === 1){
                        $("#FormBitacora").hide();
                        Bitacora = data.response[0];
                        BuildDetailBitacora(data.response[0]);
                        GetBitacoraMed(IdBitacora,0, false);
                        BuildFormAddBitacora();
                        if(IsModal){
                            ChangeClassActive($("#bitacorad"), "dash");
                            HideModalsF("bitacora");
                            $('#modal-add-bitacora').modal({backdrop: 'static', keyboard: false});
                        }
                    }
                }else{
                    Bitacoras = data.response;
                    BuildArrTBLBitacora(data.response);
                }
            }else{
                alertify.error("Ocurrio un error al obtener la informacion del Personal Medico..");
            }
        }
    });
}

function BuildDetailBitacora(data) {
    var html = "",
        html_bit = "",
        nombre = data.Nombre + " " + data.ApellidoPaterno + " " + data.ApellidoMaterno,
        nombre_doc = '<i class="fas fa-user-md"></i> ' + data.Titulo + " " + data.NomDoc + " " + data.ApePatDoc + " " + data.ApeMatDoc;
    
    html += '<address>';
    html += '<strong>Informacion del Paciente</strong><br>';
    html += '<strong>Num. Empleado:</strong> '+data.NumeroEmpleado+'<br>';
    html += '<strong>Paciente:</strong> '+nombre+'<br>';
    html += '<strong>Sexo:</strong> '+data.sexo+'<br>';
    html += '<strong>Area:</strong> '+data.Area+'<br>';
    html += '<strong>Depto:</strong> '+data.NombreDepto+'<br>';
    html += '<strong>Actividad:</strong> '+data.Actividad+'<br>';
    html += '<strong>Antiguedad:</strong> '+data.FecAntiguedad+'<br>';
    html += '</address>';
    
    html_bit += '<strong>Bitacora</strong><br>';
    html_bit += '<strong>Supervisor:</strong> '+data.SupervisorName+'<br>';
    html_bit += '<strong>Clasif. Dolor:</strong> '+data.ClasifDesc+'<br>';
    html_bit += '<strong>Turno:</strong> '+data.Turno+'<br>';
    html_bit += '<strong>Atendio:</strong> '+nombre_doc+'<br>';
    html_bit += '<strong>Diagnostico:</strong> '+data.Diagnostico+'<br>';
    html_bit += '</address>';
    html_bit += '<hr class="mb-4">';
    html_bit += '<button class="btn btn-outline-warning" id="update-bitacora" type="button" data-id="'+data.idBitacoraConsulta+'">Actualizar Bitacora</button>';
    
    GetListCat(0, "LMed", $("#SelectMedicamento"));
    
    $(".InfoPaciente").html(html);
    $(".InfoBitacora").html(html_bit);
    $("#DetailFormBitacora").show();

    $(".addMedBit").show();
}

function BuildFormAddBitacora() {
    $(".fec-bitacora").text(moment(new Date()).format("DD-MM-YYYY HH:mm:ss"));
    GetListCat(0, "Emp", $("#SelectEmpleado"));
    GetListCat(0, "Supervisor", $("#SelectSupervisor"));
    GetListCat(0, "ClasifBit", $("#SelectClasificacion"));
    GetPersonalMedico(0, false, true);
}

function CleanModalAddBitacora() {
    $("#SelectEmpleado").val(0).change();
    $("#SelectSupervisor").val(0).change();
    $("#SelectClasificacion").val(0).change();
    $("#SelectTurno").val(0).change();
    $("#SelectAtendio").val(0).change();
    $("#diagnostico").val("");

    $(".InfoPaciente").html("");
    $(".InfoBitacora").html("");
    $("#DetailFormBitacora").hide();
    $(".addMedBit").hide();
    $("#save-bitacora").show();
    $("#upd-bitacora").hide();
    $("#cancel-upd").hide();
    $("#FormBitacora").show();

    $("#tbl_bitmed").DataTable().destroy();
    $("#tbl_bitmed tbody").html("");
}

$( "#TotQuantity" ).keypress(function(e) {
    var tecla = (document.all) ? e.keyCode : e.which;

    //Tecla de retroceso para borrar, siempre la permite
    if (tecla==8){
        return true;
    }
        
    // Patron de entrada, en este caso solo acepta numeros
    patron =/[0-9]/;
    var tecla_final = String.fromCharCode(tecla);
    return patron.test(tecla_final);
});

$("#SelectMedicamento").on("change", function(e) {
    var IdMed = $(this).val();
    if(IdMed > 0){
        $.ajax({
            method: "GET",
            url: "CallsWeb/Medicamentos/ListMedicamentos.php",
            data: {id_medicamento: IdMed},
            dataType: "JSON",
            success: function (data) {
                if(parseInt(data.code) === 200){
                    console.log("data", data);
                    if(data.response.length === 1){
                        var row = data.response[0];
                        TMed = row.ClasifMedDescripcion.toUpperCase();
                        if(row.ClasifMedDescripcion.toUpperCase() !== "PADECIMIENTOS"){
                            $(".TotQuantity").show();
                        }else{
                            $(".TotQuantity").hide();
                        }
                    }
                }else{
                    alertify.error("Ocurrio un error al obtener la informacion de los Empleados..");
                }
            }
        });
    }
});

GetBitacora(0,false, false);
