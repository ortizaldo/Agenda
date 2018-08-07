$(".add-agenda").on("click", function(e) {
    e.preventDefault();
    ChangeClassActive($(".add-agenda"), "agenda");
    HideModalsF("otros");
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
        url: "CallsWeb/Agenda/UpdateAgenda.php",
        dataType: "JSON",
        data: {obj},
        success: function (data) {
            if(parseInt(data.code) == 200){
                alertify.success(data.response);
                GetListAgenda(0, false);
                CleanModalEdit();
            }else{
                alertify.error(data.response);
            }
        }
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

//tabs
$("#agenda-tab").on("click", function(argument) {
    GetListAgenda(0, false);
});

$("#tbl_agenda").on("click", ".btn-update-agenda", function(e) {
    e.preventDefault();
    var id = $(this).attr("data-id");
    GetListAgenda(id, true);
});

$("#tbl_agenda").on("click", ".btn-del-agenda", function(e) {
    e.preventDefault();
    var id = $(this).attr("data-id");
    alertify.confirm("Desea eliminar este registro", "Eliminar registro", 
        function(){ 
            var obj = {
                'id_agenda':id
            }
            $.ajax({
                method: "POST",
                url: "CallsWeb/Agenda/DelAgenda.php",
                dataType: "JSON",
                data: {obj},
                success: function (data) {
                    if(parseInt(data.code) == 200){
                        alertify.success(data.response);
                        GetListAgenda(0, false);
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