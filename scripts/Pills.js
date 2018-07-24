$("#medicamentos").on("click", function(e) {
    e.preventDefault();
    GetListCat(0, "CMed", $(".ClasifMed"));
    GetMedicamentos(0, false, false);
    $('#modal-add-medicamento').modal({backdrop: 'static', keyboard: false});
});

$(".add-clasif-med").on("click", function(e) {
    e.preventDefault();
    console.log('e', e);
    $("#modal-add-medicamento").hide();
    alertify.prompt( 'Agregar una Clasificacion de Medicamento', 'Clasificacion', 'Clasificacion', function(evt, value) {
        if(value !== 'Area de Trabajo'){
            
            var obj = {
                'Cmed':value,
            }

            AddClasifMed(obj, $("#modal-add-medicamento"));

        }else{
            alertify.error("Debe de capturar un valor diferente al de default..");
        }
        $("#modal-add-medicamento").show();    
    }, function() { 
        alertify.error('Cancel');
        $("#modal-add-medicamento").show();
    });
});

//save-cmed
$("#save-cmed").on("click", function(e) {
    e.preventDefault();
    
    var AddClasifMed = parseInt($("#AddClasifMed option:selected").val());
    var DescripcionMedicamento = $("#DescripcionMedicamento").val();

    if(_.isEmpty(AddClasifMed) && AddClasifMed === 0){
        alertify.error("El campo 'Clasif. de Med.' es obligatorio");
        return false;
    }
    
    if(_.isEmpty(DescripcionMedicamento)){
        alertify.error("El campo 'Medicamento y/o Procedimiento' es obligatorio");
        return false;
    }

    var obj = {
        'desc':DescripcionMedicamento,
        'CMed':AddClasifMed
    }

    $.ajax({
        method: "POST",
        url: "CallsWeb/Medicamentos/InsMedicamento.php",
        dataType: "JSON",
        data: {obj},
        success: function (data) {
            if(parseInt(data.code) == 200){
                alertify.success(data.response);
                CleanModalAddMedicamento();
                GetMedicamentos(0, false, false);
            }else{
                alertify.error(data.response);
            }
        }
    });

});

$("#upd-cmed").on("click", function(e) {
    e.preventDefault();

    e.preventDefault();
    
    var AddClasifMed = parseInt($("#AddClasifMed option:selected").val());
    var DescripcionMedicamento = $("#DescripcionMedicamento").val();

    if(_.isEmpty(AddClasifMed) && AddClasifMed === 0){
        alertify.error("El campo 'Numero de Empleado' es obligatorio");
        return false;
    }
    
    if(_.isEmpty(DescripcionMedicamento)){
        alertify.error("El campo 'Nombre' es obligatorio");
        return false;
    }

    if(ICMed === 0){
        alertify.error("No se puede editar este registro");
        return false;
    }

    var obj = {
        'desc':DescripcionMedicamento,
        'CMed':AddClasifMed,
        'IdMed':ICMed
    }

    $.ajax({
        method: "POST",
        url: "CallsWeb/Medicamentos/UpdateMedicamentos.php",
        dataType: "JSON",
        data: {obj},
        success: function (data) {
            if(parseInt(data.code) == 200){
                alertify.success(data.response);
                CleanModalAddMedicamento();
                GetMedicamentos(0, false, false);
            }else{
                alertify.error(data.response);
            }
        }
    });
});

$("#tbl_cmed").on("click", ".btn-update-cmed", function(e) {
    e.preventDefault();
    var id = $(this).attr("data-id");
    GetMedicamentos(id, true, false);
});

$("#tbl_cmed").on("click", ".btn-del-cmed", function(e) {
    e.preventDefault();
    var id = $(this).attr("data-id");
    alertify.confirm('Eliminar Registros', 'Desea Eliminar este Registro', function(){ 
        DelMedicamentos(id, true);
    }, function(){ 
        alertify.error('Se cancelo la accion..')
    });
});

$("#clean-cmed").on("click", function(e) {
    e.preventDefault();
    CleanModalAddMedicamento();
    GetMedicamentos(0, false, false);
    GetListCat(0, "CMed", $(".ClasifMed"));
});

$(".close-mod-medic").on("click", function(e) {
    e.preventDefault();
    CleanModalAddMedicamento();
});