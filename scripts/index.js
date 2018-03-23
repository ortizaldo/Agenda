
$(".add-agenda").on("click", function(e) {
    e.preventDefault();
    console.log('e', e);
    $('#modal-add-agenda').modal({backdrop: 'static', keyboard: false});
});

$(".add-agenda").on("click", function(e) {
    e.preventDefault();
    console.log('e', e);
    $('#modal-add-agenda').modal({backdrop: 'static', keyboard: false});
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
        console.log('this', $(this).attr("data-id"));
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
        url: "CallsWeb/InsAgenda.php",
        dataType: "JSON",
        data: {obj},
        success: function (data) {
            if(parseInt(data.code) == 200){
                alertify.success(data.response);
                GetListAgenda();
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

//$("#list-telefonos  > tbody  > tr").each(function() {console.log('this', $(this).attr("data-id"))});

$("#add-phone").on("click", function(e) {
    e.preventDefault();
    console.log('e', e);
    //list-telefonos
    var tel = $("#telefono").val();

    if(tel.length < 10 || tel.length > 10){
        alertify.error("La longitud permitida para el numero telefonico es de 10 digitos");
        return false;
    }

    if(!isNumeric(tel)){
        alertify.error("El campo para el numero de telefono debe de ser numerico");
        return false;
    }

    if(!_.isEmpty(tel)){
        var html = '<tr data-id="'+tel+'">';
            html += '<td>'+tel+'</td><td><button class="btn btn-danger btn-lg btn-block del-phone" type="button"><i class="fas fa-trash"></i></button></td>';
            html += '</tr>';
        $("#list-telefonos tbody").append(html);
    }else{
        alertify.error("Se tiene que capturar un numero de telefono para poder agregarlo a la lista");
    }
});

$("#edit-phone").on("click", function(e) {
    e.preventDefault();
    console.log('e', e);
    //list-telefonos
    var tel = $("#telefono-edit").val();

    if(tel.length < 10 || tel.length > 10){
        alertify.error("La longitud permitida para el numero telefonico es de 10 digitos");
        return false;
    }

    if(!isNumeric(tel)){
        alertify.error("El campo para el numero de telefono debe de ser numerico");
        return false;
    }

    if(!_.isEmpty(tel)){
        var html = '<tr data-id="'+tel+'">';
            html += '<td>'+tel+'</td><td><button class="btn btn-danger btn-lg btn-block del-phone" type="button"><i class="fas fa-trash"></i></button></td>';
            html += '</tr>';
        $("#list-telefonos-edit tbody").append(html);
    }else{
        alertify.error("Se tiene que capturar un numero de telefono para poder agregarlo a la lista");
    }
});

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

$("#list-telefonos").on("click", ".del-phone", function(e) {
    e.preventDefault();
    $(this).closest("tr").remove();    
});

$("#list-agenda").on("click", ".edit-dir", function(e) {
    e.preventDefault();
    var id = $(this).attr("data-id");
    console.log("id", id);
    GetAgenda(id);
});

$("#list-agenda").on("click", ".del-dir", function(e) {
    e.preventDefault();
    var id = $(this).attr("data-id");
    alertify.confirm("Desea eliminar este registro", "Eliminar registro", 
        function(){ 
            var obj = {
                'id_agenda':id
            }
            $.ajax({
                method: "POST",
                url: "CallsWeb/DelAgenda.php",
                dataType: "JSON",
                data: {obj},
                success: function (data) {
                    if(parseInt(data.code) == 200){
                        alertify.success(data.response);
                        GetListAgenda();
                    }else{
                        alertify.error(data.response);
                    }
                }
            });
        }, 
        function(){ 
            alertify.error("Se cancelo la accion");
            Pace.stop();
        }
    );
});

function GetListAgenda() {
    $.ajax({
        method: "GET",
        url: "CallsWeb/GetListAgenda.php",
        data: {id_agenda: 0},
        dataType: "JSON",
        success: function (data) {
            if(parseInt(data.code) === 200){
                var arr_new = [], html_ = "", html_dropdown_ = "";
                $("#list-agenda tbody").html("");
                _.each(data.response.respuesta, function(rows) {
                    var nombre = rows.nombre +" "+rows.apellidos;
                    var html_tbl = "";
                    if(rows.telefonos.length > 0){
                        html_tbl = '<table>';
                        _.each(rows.telefonos, function(row_) {
                            html_tbl += '<tr>';
                            html_tbl += '<td>'+row_.telefono+'</td>';
                            html_tbl += '</tr>';
                        });
                        html_tbl += '</table>';
                    }

                    var html_edit = '<button class="btn btn-primary btn-lg btn-block edit-dir" type="button" data-id="'+rows.idagenda+'"><i class="fas fa-edit"></i></button>'
                    var html_del = '<button class="btn btn-danger btn-lg btn-block del-dir" type="button" data-id="'+rows.idagenda+'"><i class="fas fa-trash"></i></button>'

                    html_ += '<tr>';
                    html_ += '<td>'+html_edit+'</td>';
                    html_ += '<td>'+html_del+'</td>';
                    html_ += '<td>'+nombre+'</td>';
                    html_ += '<td>'+rows.direccion+'</td>';
                    html_ += '<td>'+html_tbl+'</td>';
                    html_ += '<td>'+rows.FecActualizacion+'</td>';
                    html_ += '</tr>';
                    $("#list-agenda tbody").html(html_);
                });
            }
        }
    });
}

function GetAgenda(id_agenda) {
    $.ajax({
        method: "GET",
        url: "CallsWeb/GetListAgenda.php",
        data: {id_agenda: id_agenda},
        dataType: "JSON",
        success: function (data) {
            if(parseInt(data.code) === 200){
                var arr_new = [], html_ = "", html_dropdown_ = "";
                _.each(data.response.respuesta, function(rows) {
                    
                    var nombre = rows.nombre +" "+rows.apellidos;
                    var html_tbl = "";
                    
                    if(rows.telefonos.length > 0){
                        _.each(rows.telefonos, function(row_) {
                            html_tbl += '<tr>';
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
                })
                
                $('#modal-edit-agenda').modal({backdrop: 'static', keyboard: false});
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

function CleanModalEdit(){
    $("#nombre-edit").val("");
    $("#apellidos-edit").val("");
    $("#dir-edit").val("");
    $("#list-telefonos-edit tbody").html("");
    $("#telefono-edit").val("");
    $('#modal-edit-agenda').modal('toggle');
}

$("#modal-add-agenda .close").on("click", function() {
    CleanModalAdd();
});

$("#modal-edit-agenda").on("click",".close", function() {
    CleanModalEdit();
});

$("#modal-edit-agenda").on("click",".edit-close", function() {
    CleanModalEdit();
});
//modal-edit-agenda
$("#modal-add-agenda .cerrar").on("click", function() {
    CleanModalAdd();
});

GetListAgenda();