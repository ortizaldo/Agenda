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

$("#tbl_personalmed").on("click", ".btn-update-pmed", function(e) {
    e.preventDefault();
    var id = $(this).attr("data-id");
    GetPersonalMedico(id, true, false);
});

$("#tbl_personalmed").on("click", ".btn-del-pmed", function(e) {
    e.preventDefault();
    var id = $(this).attr("data-id");
    alertify.confirm('Eliminar Registros', 'Desea Eliminar este Registro', function(){ 
        DelPersonalMedico(id, true);
    }, function(){ 
        alertify.error('Se cancelo la accion..')
    });
});

$("#modal-add-personalmed").on("click",".close", function() {
    CleanModalAddPersMed();
});

$("#clean-item-med").on("click", function(e) {
    e.preventDefault();
    CleanModalAddPersMed();
    GetPersonalMedico(0, false, false);
});

function CleanModalAddPersMed(){
    $("#nomb_personal").val("");
    $("#ape_mat").val("");
    $("#ape_pat").val("");
    $("#SelectTitulo").val(0).change();
    $("#upd-item-med").hide();
    $("#save-item-med").show();
    $("#tbl_personalmed").DataTable().destroy();
    $("#tbl_personalmed tbody").html("");
    //llamamos la funcion para obtener los registros de la tabla de personal medico
}