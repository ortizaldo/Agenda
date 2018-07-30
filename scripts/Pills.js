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
    var InvMinimo = parseInt($("#InvMinimo").val());
    var Inventario = parseInt($("#Inventario").val());
    var CantPresentacion = parseInt($("#CantPresentacion").val());
    var PresentacionMed = $("#PresentacionMed option:selected").val();

    if(_.isEmpty(AddClasifMed) && AddClasifMed === 0){
        alertify.error("El campo 'Clasif. de Med.' es obligatorio");
        return false;
    }
    
    if(_.isEmpty(DescripcionMedicamento)){
        alertify.error("El campo 'Medicamento y/o Procedimiento' es obligatorio");
        return false;
    }

    var obj = {}

    if( $("#AddClasifMed option:selected").text() !== "PROCEDIMIENTOS"){
        if(InvMinimo === 0){
            alertify.error("El campo 'Cantidad Minima' es obligatorio");
            return false;
        }
        
        if(Inventario === 0){
            alertify.error("El campo 'Inventario' es obligatorio");
            return false;
        }

        if(Inventario < InvMinimo){
            alertify.error("El campo 'Inventario' no puede ser menor a la Cantidad Minima");
            return false;
        }

        if(InvMinimo > Inventario){
            alertify.error("El campo 'Cantidad Minima' no puede ser mayor al Inventario");
            return false;
        }

        if(CantPresentacion === 0 && (PresentacionMed !== "0" && PresentacionMed !== "NA") ){
            alertify.error("El campo 'Cantidad Minima' es obligatorio");
            return false;
        }

        if(PresentacionMed === 0){
            alertify.error("El campo 'Presentacion' es obligatorio");
            return false;
        }

        obj = {
            'desc':DescripcionMedicamento,
            'CMed':AddClasifMed,
            'InvMinimo':InvMinimo,
            'Inventario':Inventario,
            'CantPresentacion':CantPresentacion,
            'PresentacionMed':PresentacionMed
        }
    }else{
        obj = {
            'desc':DescripcionMedicamento,
            'CMed':AddClasifMed,
            'InvMinimo':0,
            'Inventario':0,
            'CantPresentacion':0,
            'PresentacionMed':"NA"
        }
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

$("#AddClasifMed").on("change", function(e) {
    e.preventDefault();
    if( $("#AddClasifMed option:selected").text() === "PROCEDIMIENTOS" || $("#AddClasifMed option:selected").val() === "0"){
        $(".totales").hide();
    }else{
        $(".totales").show();
    }
});

$("#upd-cmed").on("click", function(e) {
    e.preventDefault();

    e.preventDefault();
    
    var AddClasifMed = parseInt($("#AddClasifMed option:selected").val());
    var DescripcionMedicamento = $("#DescripcionMedicamento").val();
    var InvMinimo = parseInt($("#InvMinimo").val());
    var Inventario = parseInt($("#Inventario").val());
    var CantPresentacion = parseInt($("#CantPresentacion").val());
    var PresentacionMed = $("#PresentacionMed option:selected").val();

    if( $("#AddClasifMed option:selected").text() !== "PROCEDIMIENTOS"){
        if(InvMinimo === 0){
            alertify.error("El campo 'Cantidad Minima' es obligatorio");
            return false;
        }
        
        if(Inventario === 0){
            alertify.error("El campo 'Inventario' es obligatorio");
            return false;
        }

        if(Inventario < InvMinimo){
            alertify.error("El campo 'Inventario' no puede ser menor a la Cantidad Minima");
            return false;
        }

        if(InvMinimo > Inventario){
            alertify.error("El campo 'Cantidad Minima' no puede ser mayor al Inventario");
            return false;
        }

        obj = {
            'desc':DescripcionMedicamento,
            'CMed':AddClasifMed,
            'InvMinimo':InvMinimo,
            'Inventario':Inventario,
            'IdMed':ICMed
        }
    }else{
        obj = {
            'desc':DescripcionMedicamento,
            'CMed':AddClasifMed,
            'InvMinimo':0,
            'Inventario':0,
            'IdMed':ICMed
        }
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

$( "#CantPresentacion" ).keypress(function(e) {
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

$( "#InvMinimo" ).keypress(function(e) {
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

$( "#Inventario" ).keypress(function(e) {
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