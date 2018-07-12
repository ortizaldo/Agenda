
$(function () {
    $('[data-toggle="tooltip"]').tooltip();
    var IDoc = 0;

    $(".add-agenda").on("click", function(e) {
        e.preventDefault();
        console.log('e', e);
        $('#modal-add-agenda').modal({backdrop: 'static', keyboard: false});
    });

    $(".add-bitacora").on("click", function(e) {
        e.preventDefault();
        $(".fec-bitacora").text(moment(new Date()).format("DD-MM-YYYY HH:mm:ss"));
        GetListCat(0);
        GetPersonalMedico(0, false, true);
        $('#modal-add-bitacora').modal({backdrop: 'static', keyboard: false});
    });

    $("#empleados").on("click", function(e) {
        e.preventDefault();
        $('#modal-add-empleados').modal({backdrop: 'static', keyboard: false});
    });

    $("#save-item").on("click", function(e) {
        e.preventDefault();
        var nombre = $("#nombre").val();
        var apellidos = $("#apellidos").val();
        var dir = $("#dir").val();

        if(_.isEmpty(nombre)){
            alertify.error("El campo 'Nombre' es obligatorio");
            return false;
        }

        if(_.isEmpty(apellidos)){
            alertify.error("El campo 'Apellidos' es obligatorio");
            return false;
        }

        if(_.isEmpty(dir)){
            alertify.error("El campo 'Direccion' es obligatorio");
            return false;
        }

        var arr_tel = [];
        $("#list-telefonos  > tbody  > tr").each(function() {
            console.log('this', $(this));
            arr_tel.push([
                $(this).attr("data-id")
            ]);
        });

        if(arr_tel.length === 0){
            alertify.error("Por lo menos se tiene que capturar un numero de telefono");
            return false;
        }

        var obj = {
            'nombre':nombre,
            'apellidos':apellidos,
            'dir':dir,
            'telefonos':arr_tel
        }

        $.ajax({
            method: "POST",
            url: "CallsWeb/Agenda/InsAgenda.php",
            dataType: "JSON",
            data: {obj},
            success: function (data) {
                if(parseInt(data.code) == 200){
                    alertify.success(data.response);
                    CleanModalAdd();
                }else{
                    alertify.error(data.response);
                }
            }
        });
    });

    $("#update-item").on("click", function(e) {
        e.preventDefault();
        var nombre = $("#nombre-edit").val();
        var apellidos = $("#apellidos-edit").val();
        var dir = $("#dir-edit").val();

        if(_.isEmpty(nombre)){
            alertify.error("El campo 'Nombre' es obligatorio");
            return false;
        }

        if(_.isEmpty(apellidos)){
            alertify.error("El campo 'Apellidos' es obligatorio");
            return false;
        }

        if(_.isEmpty(dir)){
            alertify.error("El campo 'Direccion' es obligatorio");
            return false;
        }

        var arr_tel = [];
        $("#list-telefonos-edit  > tbody  > tr").each(function() {
            arr_tel.push([
                $(this).attr("data-id")
            ]);
        });

        if(arr_tel.length === 0){
            alertify.error("Por lo menos se tiene que capturar un numero de telefono");
            return false;
        }

        var obj = {
            'id_agenda':$("#idagenda-edit").val(),
            'nombre':nombre,
            'apellidos':apellidos,
            'dir':dir,
            'telefonos':arr_tel
        }

        $.ajax({
            method: "POST",
            url: "CallsWeb/UpdateAgenda.php",
            dataType: "JSON",
            data: {obj},
            success: function (data) {
                if(parseInt(data.code) == 200){
                    alertify.success(data.response);
                    GetListAgenda();
                    CleanModalEdit();
                }else{
                    alertify.error(data.response);
                }
            }
        });
    });

    $(".add-emp-area").on("click", function(e) {
        e.preventDefault();
        console.log('e', e);
        $("#modal-add-empleados").hide();
        alertify.prompt( 'Agregar un Area de Trabajo', 'Area de Trabajo', 'Area de Trabajo', function(evt, value) {
            if(value !== 'Area de Trabajo'){
                
                var obj = {
                    'area':value,
                }

                AddArea(obj, $("#modal-add-empleados"));

            }else{
                alertify.error("Debe de capturar un valor diferente al de default..");
            }
            $("#modal-add-empleados").show();    
        }, function() { 
            alertify.error('Cancel');
            $("#modal-add-empleados").show();
        });
    });

    $(".add-area").on("click", function(e) {
        e.preventDefault();
        console.log('e', e);
        $("#modal-add-bitacora").hide();
        alertify.prompt( 'Agregar un Area de Trabajo', 'Area de Trabajo', 'Area de Trabajo', function(evt, value) {
            if(value !== 'Area de Trabajo'){
                
                var obj = {
                    'area':value,
                }

                AddArea(obj, $("#modal-add-bitacora"));

            }else{
                alertify.error("Debe de capturar un valor diferente al de default..");
            }
            $("#modal-add-bitacora").show();    
        }, function() { 
            alertify.error('Cancel');
            $("#modal-add-bitacora").show();
        });
    });

    $("#add-phone").on("click", function(e) {
        var phone = $("#telefono").val();
        if(isNumeric(phone)){
            var html = '';
            if(phone.length === 10){
                html = '<tr data-id="'+phone+'">';
                html += '<td>';
                html += phone;
                html += '</td>';
                html += '<td>';
                html += '<button class="btn btn-danger btn-block del-phone" type="button"><i class="fas fa-trash"></i></button>';
                html += '</td>';
                html += '</tr>';

                $("#list-telefonos tbody").append(html);
                $("#telefono").val("");
            }else{
                alertify.error("Se debe de capturar un valor con una longitud igual a 10 digitos..");
            }
        }else{
            alertify.error("Se debe de capturar un valor numerico en el campo de texto..");
        }
    });

    $("#personal-med").on("click", function(e) {
        //obtenemos los datos del personal medico registrado
        GetPersonalMedico(0, false, false);
        $('#modal-add-personalmed').modal({backdrop: 'static', keyboard: false});
    });

    $("#save-item-med").on("click", function(e) {
        e.preventDefault();
        var nombre = $("#nomb_personal").val();
        var ape_pat = $("#ape_pat").val();
        var ape_mat = $("#ape_mat").val();
        var SelectTitulo = $("#SelectTitulo option:selected").val();

        if(_.isEmpty(nombre)){
            alertify.error("El campo 'Nombre' es obligatorio");
            return false;
        }

        if(_.isEmpty(ape_pat)){
            alertify.error("El campo 'Apellido Paterno' es obligatorio");
            return false;
        }

        if(_.isEmpty(ape_mat)){
            alertify.error("El campo 'Apellido Materno' es obligatorio");
            return false;
        }

        if(_.isEmpty(SelectTitulo)){
            alertify.error("El campo 'Titulo' es obligatorio");
            return false;
        }

        var obj = {
            'nombre':nombre,
            'apellido_pat':ape_pat,
            'apellido_mat':ape_mat,
            'titulo':SelectTitulo
        }

        $.ajax({
            method: "POST",
            url: "CallsWeb/PersonalMedico/InsPersonalMed.php",
            dataType: "JSON",
            data: {obj},
            success: function (data) {
                if(parseInt(data.code) == 200){
                    alertify.success(data.response);
                    CleanModalAddPersMed();
                    GetPersonalMedico(0, false, false);
                }else{
                    alertify.error(data.response);
                }
            }
        });
    });

    $("#upd-item-med").on("click", function(e) {
        e.preventDefault();
        var nombre = $("#nomb_personal").val();
        var ape_pat = $("#ape_pat").val();
        var ape_mat = $("#ape_mat").val();
        var SelectTitulo = $("#SelectTitulo option:selected").val();

        if(_.isEmpty(nombre)){
            alertify.error("El campo 'Nombre' es obligatorio");
            return false;
        }

        if(_.isEmpty(ape_pat)){
            alertify.error("El campo 'Apellido Paterno' es obligatorio");
            return false;
        }

        if(_.isEmpty(ape_mat)){
            alertify.error("El campo 'Apellido Materno' es obligatorio");
            return false;
        }

        if(_.isEmpty(SelectTitulo)){
            alertify.error("El campo 'Titulo' es obligatorio");
            return false;
        }

        var obj = {
            'nombre':nombre,
            'apellido_pat':ape_pat,
            'apellido_mat':ape_mat,
            'titulo':SelectTitulo,
            'IdDoc' : IDoc
        }

        $.ajax({
            method: "POST",
            url: "CallsWeb/PersonalMedico/UpdatePMedico.php",
            dataType: "JSON",
            data: {obj},
            success: function (data) {
                if(parseInt(data.code) == 200){
                    IDoc = 0;
                    alertify.success(data.response);
                    CleanModalAddPersMed();
                    GetPersonalMedico(0, false, false);
                }else{
                    alertify.error(data.response);
                }
            }
        });
    });

    function SendData(data_, btn) {
        if(data_.length > 0){
            $.ajax({
                method: "POST",
                url: "CallsWeb/Empleados/InsEmpleadosImport.php",
                dataType: "JSON",
                data: {data_},
                success: function (data) {
                    if(parseInt(data.code) == 200){
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

    //upload csv
    $('#UploadCSV').change(function(evt){
        var input = this;
        var url = $(this).val();
        var ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase();
        var types_img = ["csv"];
        var btn = $(this);    
        btn.prop('disabled', true);

        if (input.files && input.files[0] && (types_img.indexOf(ext) >= 0)){
            //procedemos a procesar el csv

            var file = input.files[0], data = [];
            Papa.parse(file, {
                header: true,
                dynamicTyping: true,
                complete: function(results) {
                    console.log('results', results);
                    data = results.data;
                    SendData(data, btn);
                }
            });

        }else{
            alertify.error("Formato de archivo seleccionado es incorrecto..");
            btn.prop('disabled', false);
        }
    });

    $("#tbl_personalmed").on("click", ".btn-update-pmed", function(e) {
        e.preventDefault();
        var id = $(this).attr("data-id");
        GetPersonalMedico(id, true, false);
    });

    //btn-del-pmed
    $("#tbl_personalmed").on("click", ".btn-del-pmed", function(e) {
        e.preventDefault();
        var id = $(this).attr("data-id");
        alertify.confirm('Eliminar Registros', 'Desea Eliminar este Registro', function(){ 
            DelPersonalMedico(id, true);
        }, function(){ 
            alertify.error('Se cancelo la accion..')
        });
    });

    $("#clean-item-med").on("click", function(e) {
        e.preventDefault();
        CleanModalAddPersMed();
    });

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
            //complete: completeFn,
            //error: errorFn,
        };
    }

    function GetPersonalMedico(IdPersonalMed, update, dd) {
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
                        BuildDD(data.response);
                    }else{
                        BuildArr(data.response);
                    }
                }else{
                    alertify.error("Ocurrio un error al obtener la informacion del Personal Medico..");
                }
            }
        });
    }

    function GetListAgenda(id_agenda) {
        $.ajax({
            method: "GET",
            url: "CallsWeb/Agenda/GetListAgenda.php",
            data: {id_agenda: id_agenda},
            dataType: "JSON",
            success: function (data) {
                if(parseInt(data.code) === 200){
                    console.log('data.response',data.response)
                    BuildArrTBLAgenda(data.response);
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

                html_dropdown_ += '<a class="dropdown-item btn-update-agenda" data-id="' + rows.ID + '" href="#">';
                html_dropdown_ += '<i class="fas fa-edit"></i>';
                html_dropdown_ += '&nbsp;&nbsp;Update Record';
                html_dropdown_ += '</a>';
                
                html_dropdown_ += '<a class="dropdown-item btn-del-agenda" data-id="' + rows.ID + '" href="#">';
                html_dropdown_ += '<i class="fas fa-trash"></i>';
                html_dropdown_ += '&nbsp;&nbsp;Delete Record';
                html_dropdown_ += '</a>';

                html_dropdown_ += '</div>';
            html_dropdown_ += '</div>';

            telefonos_ = '<address>';
            telefonos_ += '<strong>Telefonos</strong><br>';
            _.each(rows.telefonos, function(tel_rw) {
                telefonos_ += '<abbr title="Phone"><i class="fas fa-mobile-alt"></i>:</abbr> '+tel_rw.telefono+'';
            });
            telefonos_ += '</address>';

            titulo_ = '<span><i class="fas fa-user-md"></i> '+ rows.Titulo + ' ' + rows.Nombre +'</span>';

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

    function BuildDD(data) {
        var html = "", arr_new = [], html_dropdown_ = "", titulo_ = "", fecha_ = "";
        $("#SelectAtendio").html("");    
        html_dropdown_ = '<option value="0">Seleccionar una Opcion</>';
        _.each(data, function(rows) {
            html_dropdown_ += '<option value="'+rows.IdDoc+'">'+ rows.Titulo +' '+ rows.Nombre +' '+ rows.ApellidoPaterno +'</>';
        });
        $("#SelectAtendio").html(html_dropdown_);
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
        tbl.not('.initialized').addClass('initialized').dataTable();
    }

    function isNumeric(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }

    function GetListCat(idCat) {
        $.ajax({
            method: "GET",
            url: "CallsWeb/Catalogs/GetListCat.php",
            data: {idCat: idCat},
            dataType: "JSON",
            success: function (data) {
                if(parseInt(data.code) === 200){
                    var html = "";
                    html = '<option value="0">Seleccionar una Opcion</option>';
                    _.each(data.response.respuesta, function(rows) {
                        html += '<option value="'+rows.idAreasPlanta+'">'+rows.Area+'</option>';
                    });

                    $(".SelectArea").html("");

                    $(".SelectArea").html(html);
                }
            }
        });
    }

    function CleanModalAdd(){
        $("#nombre").val("");
        $("#apellidos").val("");
        $("#dir").val("");
        $("#list-telefonos tbody").html("");
        $("#telefono").val("");
        $('#modal-add-agenda').modal('toggle');
    }

    function CleanModalAddPersMed(){
        $("#nomb_personal").val("");
        $("#ape_mat").val("");
        $("#ape_pat").val("");
        $("#SelectTitulo").val(0).change();
        $("#upd-item-med").hide();
        $("#save-item-med").show();
        //llamamos la funcion para obtener los registros de la tabla de personal medico
    }

    function CleanModalEdit(){
        $("#nombre-edit").val("");
        $("#apellidos-edit").val("");
        $("#dir-edit").val("");
        $("#list-telefonos-edit tbody").html("");
        $("#telefono-edit").val("");
        $('#modal-edit-agenda').modal('toggle');
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
                    GetListCat(0);
                }else{
                    alertify.error(data.response);
                }
            }
        });
    }

    $("#modal-add-agenda .close").on("click", function() {
        CleanModalAdd();
    });

    $("#modal-edit-agenda").on("click",".close", function() {
        CleanModalEdit();
    });

    $("#modal-add-personalmed").on("click",".close", function() {
        CleanModalAddPersMed();
    });

    $("#modal-edit-agenda").on("click",".edit-close", function() {
        CleanModalEdit();
    });
    //modal-edit-agenda
    $("#modal-add-agenda .cerrar").on("click", function() {
        CleanModalAdd();
    });

    //tabs
    $("#agenda-tab").on("click", function(argument) {
        GetListAgenda(0);
    });
});
