$('[data-toggle="tooltip"]').tooltip();
var IDoc = 0;
var IEmp = 0;
var ICMed = 0;
var IMed = 0;
var IBitacora = 0;
var Bitacora = {};
var Bitacoras = [];
var TMed = "";

function SendData(data_, btn) {
    if(data_.length > 0){
        $.ajax({
            method: "POST",
            url: "CallsWeb/Empleados/InsEmpleadosImport.php",
            dataType: "JSON",
            data: {data_},
            success: function (data) {
                if(parseInt(data.code) == 200){
                    //Cargamos la tabla de empleados
                    GetEmpleados(0, false, false);
                    alertify.success(data.response);
                    btn.prop("disabled", false);
                    $('#UploadCSV').val("");
                }else{
                    alertify.error(data.response);
                }
            }
        });
    }else{
        alertify.error("No se obtuvieron datos del Archivo Seleccionado");
        btn.prop('disabled', false);
    }
}

function GetListCat(idCat, bandera, select_html, value) {
    $.ajax({
        method: "GET",
        url: "CallsWeb/Catalogs/GetListCat.php",
        data: {idCat: idCat, bandera:bandera},
        dataType: "JSON",
        success: function (data) {
            if(parseInt(data.code) === 200){
                var html = "";
                html = '<option value="0">Seleccionar una Opcion</option>';
                
                _.each(data.response.respuesta, function(rows) {
                    html += '<option value="'+rows.Id+'">'+rows.Desc+'</option>';
                });

                select_html.html("");

                select_html.html(html);
                select_html.select2();

                if( !_.isEmpty(value) ){
                    SetDD(select_html, value);
                }
            }
        }
    });
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function buildConfig()
{
    return {
        delimiter: ",",
        header: true,
        dynamicTyping: false,
        skipEmptyLines: true,
        preview: parseInt(0),
        step: undefined,
        encoding: "UTF-8",
        worker: false,
        comments: "",
    };
}

function GetPersonalMedico(IdPersonalMed, update, dd, value) {
    $.ajax({
        method: "GET",
        url: "CallsWeb/PersonalMedico/GetListPMed.php",
        data: {IdPersonalMed: IdPersonalMed},
        dataType: "JSON",
        success: function (data) {
            if(parseInt(data.code) === 200){
                if(update && !dd){
                    console.log('res', data.response);
                    if(data.response.length === 1){

                        $("#nomb_personal").val(data.response[0].Nombre);
                        $("#ape_pat").val(data.response[0].ApellidoPaterno);
                        $("#ape_mat").val(data.response[0].ApellidoMaterno);
                        $("#SelectTitulo").val(data.response[0].Titulo).change();

                        IDoc = data.response[0].IdDoc;

                        $("#save-item-med").hide();
                        $("#upd-item-med").show();
                    }
                }else if(dd && !update){
                    BuildDD(data.response, $("#SelectAtendio"));
                    SetDD($("#SelectAtendio"), value);
                }else{
                    BuildArr(data.response);
                }
            }else{
                alertify.error("Ocurrio un error al obtener la informacion del Personal Medico..");
            }
        }
    });
}

function GetListAgenda(id_agenda, IsUpdate) {
    $.ajax({
        method: "GET",
        url: "CallsWeb/Agenda/GetListAgenda.php",
        data: {id_agenda: id_agenda},
        dataType: "JSON",
        success: function (data) {
            if(parseInt(data.code) === 200){
                if (IsUpdate) {
                    //mandamos a crear el formulario de edicion
                    if(data.response.length === 1){
                        BuildModalEditAgenda(data.response[0]);
                    }
                }else{
                    console.log('data.response',data.response)
                    BuildArrTBLAgenda(data.response);
                }
            }else{
                alertify.error("Ocurrio un error al obtener la informacion del Personal Medico..");
            }
        }
    });
}

function DelPersonalMedico(IdPersonalMed) {
    $.ajax({
        method: "POST",
        url: "CallsWeb/PersonalMedico/DelPMedico.php",
        data: {IdDoc: IdPersonalMed},
        dataType: "JSON",
        success: function (data) {
            if(parseInt(data.code) === 200){
                alertify.success(data.response);
                GetPersonalMedico(0, false);
            }else{
                alertify.error("Ocurrio un error al obtener la informacion del Personal Medico..");
            }
        }
    });
}

function DelEmpleados(IdEmpleado) {
    $.ajax({
        method: "POST",
        url: "CallsWeb/Empleados/DelEmpleado.php",
        data: {IdEmpleado: IdEmpleado},
        dataType: "JSON",
        success: function (data) {
            if(parseInt(data.code) === 200){
                alertify.success(data.response);
                GetEmpleados(0, false, false);
            }else{
                alertify.error("Ocurrio un error al obtener la informacion de los empleados..");
            }
        }
    });
}

function DelMedicamentos(IdMedicamento) {
    $.ajax({
        method: "POST",
        url: "CallsWeb/Medicamentos/DelMedicamento.php",
        data: {IdMedicamento: IdMedicamento},
        dataType: "JSON",
        success: function (data) {
            if(parseInt(data.code) === 200){
                alertify.success(data.response);
                GetMedicamentos(0, false, false);
            }else{
                alertify.error("Ocurrio un error al obtener la informacion de los empleados..");
            }
        }
    });
}

function BuildArr(data) {
    var html = "", arr_new = [], html_dropdown_ = "", titulo_ = "", fecha_ = "";
    
    _.each(data, function(rows) {

        //creamos el boton para eliminar y editar
        html_dropdown_ = '<div class="btn-group">';
        html_dropdown_ += '<button class="btn btn-info btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">';
        html_dropdown_ += 'Acciones';
        html_dropdown_ += '</button>';
            html_dropdown_ += '<div class="dropdown-menu">';

            html_dropdown_ += '<a class="dropdown-item btn-update-pmed" data-id="' + rows.IdDoc + '" href="#">';
            html_dropdown_ += '<i class="fas fa-edit"></i>';
            html_dropdown_ += '&nbsp;&nbsp;Update Record';
            html_dropdown_ += '</a>';
            
            html_dropdown_ += '<a class="dropdown-item btn-del-pmed" data-id="' + rows.IdDoc + '" href="#">';
            html_dropdown_ += '<i class="fas fa-trash"></i>';
            html_dropdown_ += '&nbsp;&nbsp;Delete Record';
            html_dropdown_ += '</a>';

            html_dropdown_ += '</div>';
        html_dropdown_ += '</div>';
        

        titulo_ = '<span><i class="fas fa-user-md"></i> '+ rows.Titulo + ' ' + rows.Nombre +'</span>';

        fecha_ = moment(new Date(rows.CreatedAt)).format("YYYY-MM-DD hh:mm:ss");
        arr_new.push([
            html_dropdown_,
            titulo_,
            rows.ApellidoPaterno,
            rows.ApellidoMaterno,
            fecha_,
        ]);
    });

    FillDTPersonalMed(arr_new);
}

function BuildArrTBLAgenda(data) {
    var html = "", arr_new = [], html_dropdown_ = "", telefonos_ = "", titulo_ = "", fecha_ = "";
    
    _.each(data, function(rows) {

        //creamos el boton para eliminar y editar
        html_dropdown_ = '<div class="btn-group">';
        html_dropdown_ += '<button class="btn btn-info btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">';
        html_dropdown_ += 'Acciones';
        html_dropdown_ += '</button>';
            html_dropdown_ += '<div class="dropdown-menu">';

            html_dropdown_ += '<a class="dropdown-item btn-update-agenda" data-id="' + rows.idagenda + '" href="#">';
            html_dropdown_ += '<i class="fas fa-edit"></i>';
            html_dropdown_ += '&nbsp;&nbsp;Update Record';
            html_dropdown_ += '</a>';
            
            html_dropdown_ += '<a class="dropdown-item btn-del-agenda" data-id="' + rows.idagenda + '" href="#">';
            html_dropdown_ += '<i class="fas fa-trash"></i>';
            html_dropdown_ += '&nbsp;&nbsp;Delete Record';
            html_dropdown_ += '</a>';

            html_dropdown_ += '</div>';
        html_dropdown_ += '</div>';

        telefonos_ = '<address>';
        telefonos_ += '<strong>Telefonos</strong><br>';
        _.each(rows.telefonos, function(tel_rw) {
            telefonos_ += '<abbr title="Phone"><i class="fas fa-mobile-alt"></i>:</abbr> '+tel_rw.telefono+'<br />';
        });
        telefonos_ += '</address>';
        
        fecha_ = moment(new Date(rows.CreatedAt)).format("YYYY-MM-DD hh:mm:ss");
        
        arr_new.push([
            html_dropdown_,
            rows.nombre,
            rows.apellidos,
            rows.direccion,
            telefonos_,
            rows.FecActualizacion,
        ]);
    });

    FillDTabs(arr_new, $("#tbl_agenda"), $("#tbl_agenda tbody"));
}

function BuildArrTBLEmp(data) {
    var html = "", arr_new = [], html_dropdown_ = "", telefonos_ = "", titulo_ = "", fecha_ = "";
    
    _.each(data, function(rows) {

        //creamos el boton para eliminar y editar
        html_dropdown_ = '<div class="btn-group">';
        html_dropdown_ += '<button class="btn btn-info btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">';
        html_dropdown_ += 'Acciones';
        html_dropdown_ += '</button>';
            html_dropdown_ += '<div class="dropdown-menu">';

            html_dropdown_ += '<a class="dropdown-item btn-update-emp" data-id="' + rows.IdEmpleado + '" href="#">';
            html_dropdown_ += '<i class="fas fa-edit"></i>';
            html_dropdown_ += '&nbsp;&nbsp;Update Record';
            html_dropdown_ += '</a>';
            
            html_dropdown_ += '<a class="dropdown-item btn-del-emp" data-id="' + rows.IdEmpleado + '" href="#">';
            html_dropdown_ += '<i class="fas fa-trash"></i>';
            html_dropdown_ += '&nbsp;&nbsp;Delete Record';
            html_dropdown_ += '</a>';

            html_dropdown_ += '</div>';
        html_dropdown_ += '</div>';

        fecha_ = moment(new Date(rows.CreatedAt)).format("YYYY-MM-DD hh:mm:ss");
        
        arr_new.push([
            html_dropdown_,
            rows.NumEmpleado,
            rows.Nombre,
            rows.ApellidoPaterno,
            rows.ApellidoMaterno,
            rows.Area,
            fecha_,
        ]);
    });

    FillDTabs(arr_new, $("#tbl_emp"), $("#tbl_emp tbody"));
}

function BuildArrTBLCMed(data) {
    var html = "", arr_new = [], html_dropdown_ = "", span = '', fecha_ = "";
    
    _.each(data, function(rows) {
        //creamos el boton para eliminar y editar
        html_dropdown_ = '<div class="btn-group">';
        html_dropdown_ += '<button class="btn btn-info btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">';
        html_dropdown_ += 'Acciones';
        html_dropdown_ += '</button>';
            html_dropdown_ += '<div class="dropdown-menu">';

            html_dropdown_ += '<a class="dropdown-item btn-update-cmed" data-id="' + rows.idMedicamento + '" href="#">';
            html_dropdown_ += '<i class="fas fa-edit"></i>';
            html_dropdown_ += '&nbsp;&nbsp;Update Record';
            html_dropdown_ += '</a>';
            
            html_dropdown_ += '<a class="dropdown-item btn-del-cmed" data-id="' + rows.idMedicamento + '" href="#">';
            html_dropdown_ += '<i class="fas fa-trash"></i>';
            html_dropdown_ += '&nbsp;&nbsp;Delete Record';
            html_dropdown_ += '</a>';

            html_dropdown_ += '</div>';
        html_dropdown_ += '</div>';

        fecha_ = moment(new Date(rows.CreatedAt)).format("YYYY-MM-DD hh:mm:ss");

        rows.Presentacion = GetPresentacion(rows.Presentacion);

        if(rows.Total == rows.CantidadMinima){
            span = GetSpan(40, rows.Total);
        }else if(rows.Total < rows.CantidadMinima){
            span = GetSpan(50, rows.Total);
        }else{
            span = GetSpan(30, rows.Total);
        }
        
        arr_new.push([
            html_dropdown_,
            rows.ClasifMedDescripcion,
            rows.Descripcion,
            rows.Presentacion,
            rows.CantidadPresentacion,
            rows.CantidadMinima,
            span,
            fecha_,
        ]);
    });

    FillDTabs(arr_new, $("#tbl_cmed"), $("#tbl_cmed tbody"));
}

function GetPresentacion(Presentacion) {
    var res = "";
    switch (Presentacion) {
        case "NA":
            res = "NA";
        break;
        case "ml":
            res = "Mililitros";
        break;
        case "tab":
            res = "Tableta";
        break;
        case "cap":
            res = "Capsula";
        break;
        case "pza":
            res = "Pieza";
        break;
    }

    return res;
}

function GetSpan(IdStatus, Quantity) {
    var status = '';
    if (parseInt(IdStatus) == 30) {
        status = '<span class="badge badge-success">' + Quantity + '</span>';
    } else if (parseInt(IdStatus) == 40) {
        status = '<span class="badge badge-warning">' + Quantity + '</span>';
    } else if (parseInt(IdStatus) == 50) {
        status = '<span class="badge badge-danger">' + Quantity + '</span>';
    }
    return status;
}

function BuildArrTBLBitMed(data) {
    var html = "", arr_new = [], html_dropdown_ = "", telefonos_ = "", titulo_ = "", fecha_ = "";
    
    _.each(data, function(rows) {
        //creamos el boton para eliminar y editar
        html_dropdown_ = '<div class="btn-group">';
        html_dropdown_ += '<button class="btn btn-info btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">';
        html_dropdown_ += 'Acciones';
        html_dropdown_ += '</button>';
            html_dropdown_ += '<div class="dropdown-menu">';

            html_dropdown_ += '<a class="dropdown-item btn-del-bmed" data-id="' + rows.IdTratBitacora + '" href="#">';
            html_dropdown_ += '<i class="fas fa-trash"></i>';
            html_dropdown_ += '&nbsp;&nbsp;Delete Record';
            html_dropdown_ += '</a>';

            html_dropdown_ += '</div>';
        html_dropdown_ += '</div>';

        fecha_ = moment(new Date(rows.CreationDate)).format("YYYY-MM-DD hh:mm:ss");
        rows.Presentacion = GetPresentacion(rows.Presentacion);
        
        arr_new.push([
            html_dropdown_,
            rows.ClasifMedDescripcion,
            rows.Presentacion,
            rows.Descripcion,
            rows.CantidadMed,
            fecha_,
        ]);
    });

    FillDTabs(arr_new, $("#tbl_bitmed"), $("#tbl_bitmed tbody"));
}

function BuildArrTBLBitacora(data) {
    var html = "", arr_new = [], html_dropdown_ = "", fecha_ = "", hora_ = "", nombre = "";
    
    _.each(data, function(rows) {
        //creamos el boton para eliminar y editar
        html_dropdown_ = '<div class="btn-group">';
        html_dropdown_ += '<button class="btn btn-info btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">';
        html_dropdown_ += 'Acciones';
        html_dropdown_ += '</button>';
            html_dropdown_ += '<div class="dropdown-menu">';

            html_dropdown_ += '<a class="dropdown-item btn-update-bitacora" data-id="' + rows.idBitacoraConsulta + '" href="#">';
            html_dropdown_ += '<i class="fas fa-edit"></i>';
            html_dropdown_ += '&nbsp;&nbsp;Actualizar Bitacora';
            html_dropdown_ += '</a>';

            html_dropdown_ += '</div>';
        html_dropdown_ += '</div>';

        nombre = rows.Nombre + " " + rows.ApellidoPaterno + " " + rows.ApellidoMaterno,

        fecha_ = moment(new Date(rows.CreationDate)).format("YYYY-MM-DD");
        hora_ = moment(new Date(rows.CreationDate)).format("hh:mm:ss");
        // hh:mm:ss
        
        arr_new.push([
            html_dropdown_,
            fecha_,
            hora_,
            nombre,
            rows.sexo,
            rows.Area,
            rows.NumeroEmpleado,
            rows.SupervisorName,
            rows.Diagnostico
        ]);
    });

    FillDTabs(arr_new, $("#tbl_bitacora"), $("#tbl_bitacora tbody"));
}

function BuildDD(data, select_html) {
    var html = "", arr_new = [], html_dropdown_ = "", titulo_ = "", fecha_ = "";
    select_html.html("");    
    html_dropdown_ = '<option value="0">Seleccionar una Opcion</>';
    _.each(data, function(rows) {
        html_dropdown_ += '<option value="'+rows.IdDoc+'">'+ rows.Titulo +' '+ rows.Nombre +' '+ rows.ApellidoPaterno +'</>';
    });
    select_html.html(html_dropdown_);
}

function BuildModalEditAgenda(rows) {
    var arr_new = [], html_ = "", html_dropdown_ = "";
    var nombre = rows.nombre +" "+rows.apellidos;
    var html_tbl = "";
    
    if(rows.telefonos.length > 0){
        _.each(rows.telefonos, function(row_) {
            html_tbl += '<tr data-id="'+row_.telefono+'">';
            html_tbl += '<td>'+row_.telefono+'</td>';
            html_tbl += '<td><button class="btn btn-danger btn-lg btn-block del-edit-phone" type="button"><i class="fas fa-trash"></i></button></td>';
            html_tbl += '</tr>';
        });
    }

    $("#list-telefonos-edit tbody").html(html_tbl);
    $("#nombre-edit").val(rows.nombre);
    $("#apellidos-edit").val(rows.apellidos);
    $("#dir-edit").val(rows.direccion);
    $("#idagenda-edit").val(rows.idagenda);

    $('#modal-edit-agenda').modal({backdrop: 'static', keyboard: false});
}

function FillDTPersonalMed(data) {
    $("#tbl_personalmed").DataTable().destroy();
    $("#tbl_personalmed tbody").html("");
    $("#tbl_personalmed").DataTable({
        data:           data,
        deferRender:    true,
        scrollCollapse: true,
        scroller: {
            loadingIndicator: true
        },
        "columnDefs": [
            {
                "orderable": true, 
                "targets": "_all"
            }
        ],
        autoWidth: true,
        searching: true,
        "language": {
            "lengthMenu": "Mostrar _MENU_",
            "search": "Buscar:   ",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ registros",
            "paginate": {
                "first": "Primera",
                "previous": "Anterior",
                "next": "Siguiente",
                "last": "Ultima"
            }
        },
    });
    $('#tbl_personalmed').not('.initialized').addClass('initialized').dataTable();
}

function FillDTabs(data, tbl, tbl_body) {
    tbl.DataTable().destroy();
    tbl_body.html("");
    tbl.DataTable({
        data:           data,
        deferRender:    true,
        scrollCollapse: true,
        scroller: {
            loadingIndicator: true
        },
        "columnDefs": [
            {
                "orderable": true, 
                "targets": "_all"
            }
        ],
        autoWidth: false,
        searching: true,
        "language": {
            "lengthMenu": "Mostrar _MENU_",
            "search": "Buscar:   ",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ registros",
            "paginate": {
                "first": "Primera",
                "previous": "Anterior",
                "next": "Siguiente",
                "last": "Ultima"
            }
        },
    });
    tbl.not('.initialized').addClass('initialized').dataTable();
}

function AddArea(obj, modal) {
    $.ajax({
        method: "POST",
        url: "CallsWeb/Catalogs/InsArea.php",
        dataType: "JSON",
        data: {obj},
        success: function (data) {
            if(parseInt(data.code) == 200){
                alertify.success(data.response);
                GetListCat(0, "Area", $(".SelectArea"));
            }else{
                alertify.error(data.response);
            }
        }
    });
}

function AddCatalog(obj) {
    $.ajax({
        method: "POST",
        url: "CallsWeb/Catalogs/InsCatalog.php",
        dataType: "JSON",
        data: {obj},
        success: function (data) {
            if(parseInt(data.code) == 200){
                alertify.success(data.response);
                switch (obj.cat) {
                    case 'Supervisor':
                        GetListCat(0, "Supervisor", $("#SelectSupervisor"));
                        break;
                    case 'ClasifBit':
                        GetListCat(0, "ClasifBit", $("#SelectClasificacion"));
                        break;
                    case 'depto':
                        GetListCat(0, "depto", $(".sel_dpto"));
                        break;
                }
            }else{
                alertify.error(data.response);
            }
        }
    });
}

function CleanModalAddEmpleados(){
    $("#num_emp").val("");
    $("#nomb_emp").val("");
    $("#ape_pat_emp").val("");
    $("#ape_mat_emp").val("");
    $("#sel_area").val(0).change();
    $("#sexo").val("M").change();
    $("#sel_dpto").val(0).change();
    $("#actividad").val("");
    $("#antiguedad").val("");
    $("#UploadCSV").val("");
    $("#save-emp").show();
    $("#upd-emp").hide();

    $("#tbl_emp").DataTable().destroy();
    $("#tbl_emp tbody").html("");
}

function GetEmpleados(IdEmpleado, IsUpdate, dd) {
    $.ajax({
        method: "GET",
        url: "CallsWeb/Empleados/ListEmpleados.php",
        data: {id_empleado: IdEmpleado},
        dataType: "JSON",
        success: function (data) {
            if(parseInt(data.code) === 200){
                if(IsUpdate && !dd){
                    if(data.response.length === 1){
                        
                        $("#num_emp").val(data.response[0].NumEmpleado);
                        $("#nomb_emp").val(data.response[0].Nombre);
                        $("#ape_pat_emp").val(data.response[0].ApellidoPaterno);
                        $("#ape_mat_emp").val(data.response[0].ApellidoMaterno);
                        $("#actividad").val(data.response[0].actividad);
                        $("#antiguedad").val(data.response[0].FecAntiguedad);
                        
                        var select_html = $("#sel_area");
                        SetDD(select_html, data.response[0].Area);
                        
                        select_html = $("#sexo");
                        SetDD(select_html, data.response[0].sexo);

                        select_html = $(".sel_dpto");
                        SetDD(select_html, data.response[0].NombreDepto);

                        IEmp = data.response[0].IdEmpleado;

                        $("#save-emp").hide();
                        $("#upd-emp").show();

                        $( "#num_emp" ).focus();
                    }
                }else if(dd && !IsUpdate){
                    //BuildArrTBLEmp(data.response);
                }else{
                    BuildArrTBLEmp(data.response);
                }
            }else{
                alertify.error("Ocurrio un error al obtener la informacion de los Empleados..");
            }
        }
    });
}

function SetDD(select_html, Val) {
    select_html.find('option').each(function() {
        if ($(this).text() === Val) {
            select_html.val($(this).val()).change();
        }
    });
}

function AddClasifMed(obj, modal) {
    $.ajax({
        method: "POST",
        url: "CallsWeb/Catalogs/InsClasifMed.php",
        dataType: "JSON",
        data: {obj},
        success: function (data) {
            if(parseInt(data.code) == 200){
                alertify.success(data.response);
                GetListCat(0, "CMed", $(".ClasifMed"));
            }else{
                alertify.error(data.response);
            }
        }
    });
}

function CleanModalAddMedicamento(){
    
    $("#AddClasifMed").val(0).change();
    $("#DescripcionMedicamento").val("");
    $("#InvMinimo").val("");
    $("#Inventario").val("");
    $("#CantPresentacion").val("").prop("disabled", false);
    $("#PresentacionMed").val(0).change().prop("disabled", false);
    $("#save-cmed").show();
    $("#upd-cmed").hide();

    $("#tbl_medicamento").DataTable().destroy();
    $("#tbl_medicamento tbody").html("");
    $(".totales").hide();
}

function GetMedicamentos(IdMedicamento, IsUpdate, dd) {
    $.ajax({
        method: "GET",
        url: "CallsWeb/Medicamentos/ListMedicamentos.php",
        data: {id_medicamento: IdMedicamento},
        dataType: "JSON",
        success: function (data) {
            if(parseInt(data.code) === 200){
                if(IsUpdate && !dd){
                    if(data.response.length === 1){
                        var data_ = data.response[0];
                        
                        $("#DescripcionMedicamento").val(data_.Descripcion);
                        $("#InvMinimo").val(data_.CantidadMinima);
                        $("#Inventario").val(data_.Total);
                        $("#CantPresentacion").val(data_.CantidadPresentacion).prop("disabled", true);
                        $("#PresentacionMed").val(data_.Presentacion).change().prop("disabled", true);
                        
                        var select_html = $("#AddClasifMed");
                        SetDD(select_html, data.response[0].ClasifMedDescripcion);

                        ICMed = data.response[0].idMedicamento;

                        $("#save-cmed").hide();
                        $("#upd-cmed").show();

                        $( "#AddClasifMed" ).focus();
                    }
                }else if(dd && !IsUpdate){
                    //BuildArrTBLEmp(data.response);
                }else{
                    BuildArrTBLCMed(data.response);
                }
            }else{
                alertify.error("Ocurrio un error al obtener la informacion de los Empleados..");
            }
        }
    });
}

function CleanModalEdit(){
    $("#nombre-edit").val("");
    $("#apellidos-edit").val("");
    $("#dir-edit").val("");
    $("#list-telefonos-edit tbody").html("");
    $("#telefono-edit").val("");
    $('#modal-edit-agenda').modal('toggle');
}

function CleanModalAdd(){
    $("#nombre").val("");
    $("#apellidos").val("");
    $("#dir").val("");
    $("#list-telefonos tbody").html("");
    $("#telefono").val("");
    $('#modal-add-agenda').modal('toggle');
}